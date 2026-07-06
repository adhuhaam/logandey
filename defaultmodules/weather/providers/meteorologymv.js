const Log = require("logger");
const HTTPFetcher = require("#http_fetcher");
const { cardinalToDegrees, convertKmhToMs, isDayTime } = require("../provider-utils");
const {
	MMS_HOME_URL,
	resolveStationName,
	parseMmsTime,
	parseMmsStationFromHtml
} = require("./meteorologymv-parser");

/**
 * Weather provider for the Maldives Meteorological Service.
 * Data source: embedded station payload on https://www.meteorology.gov.mv/
 * Inspired by the community WeatherMv API wrapper: https://github.com/aharen/WeatherMv
 */
class MeteorologyMvProvider {
	constructor (config) {
		this.config = {
			station: "Hulhule",
			lat: 4.1755,
			lon: 73.5093,
			type: "current",
			maxNumberOfDays: 5,
			updateInterval: 10 * 60 * 1000,
			lang: "en",
			...config
		};

		this.locationName = null;
		this.fetcher = null;
		this.onDataCallback = null;
		this.onErrorCallback = null;
	}

	async initialize () {
		this.#initializeFetcher();
	}

	setCallbacks (onData, onError) {
		this.onDataCallback = onData;
		this.onErrorCallback = onError;
	}

	start () {
		if (this.fetcher) {
			this.fetcher.startPeriodicFetch();
		}
	}

	stop () {
		if (this.fetcher) {
			this.fetcher.clearTimer();
		}
	}

	#initializeFetcher () {
		this.fetcher = new HTTPFetcher(MMS_HOME_URL, {
			reloadInterval: this.config.updateInterval,
			headers: {
				"User-Agent": "LoGandey/1.0 (Maldives Weather)",
				"Cache-Control": "no-cache"
			},
			logContext: "weatherprovider.meteorologymv"
		});

		this.fetcher.on("response", async (response) => {
			if (response.status === 304) {
				return;
			}

			try {
				const html = await response.text();
				await this.#handleResponse(html);
			} catch (error) {
				Log.error("[meteorologymv] Failed to process MMS weather:", error);
				if (this.onErrorCallback) {
					this.onErrorCallback({
						message: error.message,
						translationKey: "MODULE_ERROR_UNSPECIFIED"
					});
				}
			}
		});

		this.fetcher.on("error", (errorInfo) => {
			if (this.onErrorCallback) {
				this.onErrorCallback(errorInfo);
			}
		});
	}

	async #handleResponse (html) {
		const station = parseMmsStationFromHtml(html, this.config.station);
		const resolvedName = resolveStationName(this.config.station);
		this.locationName = `${resolvedName}, Maldives`;

		let weatherData;
		switch (this.config.type) {
			case "current":
				weatherData = this.#generateCurrentWeather(station);
				break;
			case "forecast":
			case "daily":
				weatherData = this.#generateForecast(station);
				break;
			default:
				throw new Error(`Unsupported weather type for meteorologymv: ${this.config.type}`);
		}

		if (weatherData && this.onDataCallback) {
			this.onDataCallback(weatherData);
		}
	}

	#generateCurrentWeather (station) {
		const current = station.current;
		if (!current) {
			throw new Error("MMS current observation is unavailable");
		}

		const now = current.date ? new Date(current.date) : new Date();
		const lat = station.lat ?? this.config.lat;
		const lon = station.lon ?? this.config.lon;
		const sunrise = parseMmsTime(station.sunMoon?.sunrise, now);
		const sunset = parseMmsTime(station.sunMoon?.sunset, now);
		const dayTime = isDayTime(now, sunrise, sunset);

		return {
			date: now,
			temperature: parseFloat(current.temperature),
			feelsLikeTemp: current.feels_like != null ? parseFloat(current.feels_like) : null,
			humidity: current.humidity != null ? Math.round(current.humidity) : null,
			windSpeed: convertKmhToMs(parseFloat(current.wind_speed)),
			windFromDirection: cardinalToDegrees(current.wind_direction),
			precipitationAmount: current.past_hour_rain_fall != null ? parseFloat(current.past_hour_rain_fall) : null,
			sunrise,
			sunset,
			weatherType: this.#convertSkyCondition(current.sky_condition, dayTime)
		};
	}

	#generateForecast (station) {
		const days = [
			station.today,
			station.tomorrow,
			station.day3,
			station.day4
		].filter(Boolean);

		const maxDays = Math.max(1, Math.min(this.config.maxNumberOfDays || 5, days.length));

		return days.slice(0, maxDays).map((day) => {
			const date = day.forecast_date ? new Date(day.forecast_date) : new Date();
			const temperature = parseFloat(day.temperature);
			const sunrise = parseMmsTime(station.sunMoon?.sunrise, date);
			const sunset = parseMmsTime(station.sunMoon?.sunset, date);

			return {
				date,
				temperature,
				minTemperature: temperature,
				maxTemperature: temperature,
				windSpeed: convertKmhToMs(parseFloat(day.wind_speed)),
				windFromDirection: cardinalToDegrees(day.wind_direction),
				sunrise,
				sunset,
				weatherType: this.#convertSkyCondition(day.sky_condition, true)
			};
		});
	}

	#convertSkyCondition (condition, isDayTimeValue) {
		const normalized = (condition || "").trim().toLowerCase();
		const day = isDayTimeValue !== false;

		const mappings = {
			clear: day ? "day-sunny" : "night-clear",
			fine: day ? "day-sunny" : "night-clear",
			"partly cloudy": day ? "day-cloudy" : "night-alt-cloudy",
			overcast: day ? "day-sunny-overcast" : "night-alt-partly-cloudy",
			hazy: day ? "day-fog" : "night-fog",
			mist: day ? "day-fog" : "night-fog",
			fog: day ? "day-fog" : "night-fog",
			"slight rain": day ? "day-sprinkle" : "night-sprinkle",
			"moderate rain": day ? "day-rain" : "night-rain",
			"heavy rain": day ? "day-rain-wind" : "night-rain-wind",
			"heavy rainy": day ? "day-rain-wind" : "night-rain-wind",
			"slight showers": day ? "day-showers" : "night-showers",
			"moderate showers": day ? "day-showers" : "night-showers",
			"heavy showers": day ? "day-rain" : "night-rain",
			"squally showers": day ? "day-thunderstorm" : "night-thunderstorm",
			"slight thundershowers": day ? "day-storm-showers" : "night-storm-showers",
			"moderate thundershowers": day ? "day-thunderstorm" : "night-thunderstorm",
			"heavy thundershowers": day ? "day-thunderstorm" : "night-thunderstorm",
			"squally thundershowers": day ? "day-thunderstorm" : "night-thunderstorm",
			thunder: day ? "day-thunderstorm" : "night-thunderstorm"
		};

		return mappings[normalized] || (day ? "day-cloudy" : "night-alt-cloudy");
	}
}

module.exports = MeteorologyMvProvider;
