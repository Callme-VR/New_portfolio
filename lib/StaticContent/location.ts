
/* -------------------------------------------------------------------------- */
/*                              GEO LOCATION                                  */
/* -------------------------------------------------------------------------- */

export type GeoLocation = {
  city: string;
  region: string;
  latitude: number;
  longitude: number;
  timezone: string;
};

/**
 * Fallback location.
 *
 * Used when IP-based geolocation fails.
 */
export const FALLBACK_GEO_LOCATION: GeoLocation = {
  city: "Noida",
  region: "Uttar Pradesh",
  latitude: 28.5355,
  longitude: 77.391,
  timezone: "Asia/Kolkata",
};

/**
 * Get the user's approximate location from their IP address.
 */
export async function getUserGeoLocation(): Promise<GeoLocation> {
  try {
    const response = await fetch("https://ipapi.co/json/", {
      cache: "no-store",
    });

    if (!response.ok) {
      return FALLBACK_GEO_LOCATION;
    }

    const data = await response.json();

    // Validate the API response before using it.
    if (
      typeof data.city === "string" &&
      typeof data.region === "string" &&
      typeof data.latitude === "number" &&
      typeof data.longitude === "number" &&
      typeof data.timezone === "string"
    ) {
      return {
        city: data.city,
        region: data.region,
        latitude: data.latitude,
        longitude: data.longitude,
        timezone: data.timezone,
      };
    }
  } catch {
    // Ignore network errors and use fallback.
  }

  return FALLBACK_GEO_LOCATION;
}


/* -------------------------------------------------------------------------- */
/*                              WEATHER                                       */
/* -------------------------------------------------------------------------- */

export type WeatherData = {
  temperature: number;
  unit: "°C";
};

/**
 * Get the current temperature using Open-Meteo.
 *
 * Open-Meteo does not require an API key.
 */
export async function getTemperature(
  latitude: number,
  longitude: number,
): Promise<WeatherData | null> {
  try {
    const url = new URL("https://api.open-meteo.com/v1/forecast");

    url.searchParams.set("latitude", latitude.toString());
    url.searchParams.set("longitude", longitude.toString());
    url.searchParams.set("current", "temperature_2m");
    url.searchParams.set("temperature_unit", "celsius");
    url.searchParams.set("timezone", "auto");

    const response = await fetch(url.toString(), {
      cache: "no-store",
    });

    if (!response.ok) {
      return null;
    }

    const data = await response.json();

    // Validate temperature before returning it.
    if (typeof data.current?.temperature_2m === "number") {
      return {
        temperature: Math.round(data.current.temperature_2m),
        unit: "°C",
      };
    }
  } catch {
    // Weather failure should not break the Hero.
  }

  return null;
}


/* -------------------------------------------------------------------------- */
/*                              CLOCK                                         */
/* -------------------------------------------------------------------------- */

/**
 * Format the current time for a specific timezone.
 *
 * Example:
 * 03:42 PM
 */
export function getCurrentTime(timezone: string): string {
  try {
    return new Intl.DateTimeFormat("en-IN", {
      timeZone: timezone,
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    }).format(new Date());
  } catch {
    // Fallback to browser/local time.
    return new Intl.DateTimeFormat("en-IN", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    }).format(new Date());
  }
}


/**
 * Get the current date for a specific timezone.
 *
 * Example:
 * Aug 11
 */
export function getCurrentDate(timezone: string): string {
  try {
    return new Intl.DateTimeFormat("en-IN", {
      timeZone: timezone,
      month: "short",
      day: "numeric",
    }).format(new Date());
  } catch {
    return new Intl.DateTimeFormat("en-IN", {
      month: "short",
      day: "numeric",
    }).format(new Date());
  }
}
