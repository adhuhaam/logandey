const MMS_HOME_URL = "https://www.meteorology.gov.mv/";
const STATIONS = ["Hulhule", "Hanimaadhoo", "Kadhdhoo", "Kaadehdhoo", "Gan"];

const STATION_ALIASES = {
	Male: "Hulhule",
	Malé: "Hulhule",
	Hanimadhoo: "Hanimaadhoo",
	Kahdhoo: "Kadhdhoo"
};

/**
 * Resolve a configured station name to the MMS station id used on meteorology.gov.mv.
 * @param {string} station
 * @returns {string}
 */
function resolveStationName (station) {
	const trimmed = (station || "Hulhule").trim();
	return STATION_ALIASES[trimmed] || trimmed;
}

/**
 * Extract a JSON object that follows a keyed property in a larger HTML/JSON blob.
 * @param {string} source
 * @param {string} key
 * @param {number} fromIndex
 * @returns {object|null}
 */
function extractJsonObject (source, key, fromIndex = 0) {
	const marker = `"${key}":`;
	const keyIndex = source.indexOf(marker, fromIndex);
	if (keyIndex < 0) {
		return null;
	}

	let cursor = keyIndex + marker.length;
	while (cursor < source.length && /\s/.test(source[cursor])) {
		cursor++;
	}

	if (source[cursor] !== "{") {
		return null;
	}

	let depth = 0;
	let inString = false;
	let escape = false;

	for (let i = cursor; i < source.length; i++) {
		const ch = source[i];

		if (inString) {
			if (escape) {
				escape = false;
			} else if (ch === "\\") {
				escape = true;
			} else if (ch === "\"") {
				inString = false;
			}
			continue;
		}

		if (ch === "\"") {
			inString = true;
			continue;
		}

		if (ch === "{") {
			depth++;
		} else if (ch === "}") {
			depth--;
			if (depth === 0) {
				return JSON.parse(source.slice(cursor, i + 1));
			}
		}
	}

	return null;
}

/**
 * Parse a MMS time string into a Date in Maldives local time.
 * @param {string} value
 * @param {Date} referenceDate
 * @returns {Date|null}
 */
function parseMmsTime (value, referenceDate = new Date()) {
	if (!value) {
		return null;
	}

	if (value.includes("T") || value.includes("-")) {
		const parsed = new Date(value);
		return Number.isNaN(parsed.getTime()) ? null : parsed;
	}

	const parts = value.split(":").map(Number);
	if (parts.length < 2 || parts.some(Number.isNaN)) {
		return null;
	}

	const date = new Date(referenceDate);
	date.setHours(parts[0], parts[1], parts[2] || 0, 0);
	return date;
}

/**
 * Parse one MMS station block from the homepage HTML payload.
 * @param {string} html
 * @param {string} stationName
 * @returns {object}
 */
function parseMmsStationFromHtml (html, stationName) {
	const resolvedName = resolveStationName(stationName);
	if (!STATIONS.includes(resolvedName)) {
		throw new Error(`Unsupported MMS station "${stationName}". Use one of: ${STATIONS.join(", ")}`);
	}

	const anchor = html.indexOf(`"name":"${resolvedName}"`);
	if (anchor < 0) {
		throw new Error(`Station "${resolvedName}" was not found on meteorology.gov.mv`);
	}

	const latMatch = html.slice(anchor, anchor + 250).match(/"lat":"([^"]+)"/);
	const lonMatch = html.slice(anchor, anchor + 250).match(/"lon":"([^"]+)"/);

	return {
		name: resolvedName,
		lat: latMatch ? parseFloat(latMatch[1]) : null,
		lon: lonMatch ? parseFloat(lonMatch[1]) : null,
		current: extractJsonObject(html, "current_hour_forecast", anchor),
		today: extractJsonObject(html, "todays_forecast", anchor),
		tomorrow: extractJsonObject(html, "tomorrows_forecast", anchor),
		day3: extractJsonObject(html, "third_day_forecast", anchor),
		day4: extractJsonObject(html, "fourth_day_forecast", anchor),
		sunMoon: extractJsonObject(html, "sun_moon_info_today", anchor)
	};
}

/**
 * Fetch and parse one MMS station block from the homepage payload.
 * @param {string} stationName
 * @returns {Promise<object>}
 */
async function fetchMmsStation (stationName) {
	const response = await fetch(MMS_HOME_URL, {
		headers: {
			"User-Agent": "LoGandey/1.0 (Maldives Weather)",
			"Accept-Encoding": "gzip, deflate, br"
		},
		signal: AbortSignal.timeout(120000)
	});

	if (!response.ok) {
		throw new Error(`MMS homepage request failed: HTTP ${response.status}`);
	}

	return parseMmsStationFromHtml(await response.text(), stationName);
}

module.exports = {
	MMS_HOME_URL,
	STATIONS,
	STATION_ALIASES,
	resolveStationName,
	extractJsonObject,
	parseMmsTime,
	parseMmsStationFromHtml,
	fetchMmsStation
};
