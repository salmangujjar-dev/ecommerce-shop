interface CountryResponse {
  name: {
    common: string;
    official: string;
  };
}

export interface Country {
  name: string;
  code: string;
}

// Cache for countries data
let countriesCache: Country[] | null = null;

export async function fetchCountries(): Promise<Country[]> {
  // Return cached data if available
  if (countriesCache) {
    return countriesCache;
  }

  try {
    const response = await fetch(
      'https://restcountries.com/v3.1/all?fields=name'
    );
    const data = (await response.json()) as CountryResponse[];

    // Transform and sort the data
    const countries = data
      .map((country) => ({
        name: country.name.common,
        code: country.name.common.slice(0, 2).toUpperCase(),
      }))
      .sort((a, b) => a.name.localeCompare(b.name));

    // Store in cache
    countriesCache = countries;
    return countries;
  } catch (error) {
    console.error('Error fetching countries:', error);
    throw error;
  }
}

export async function fetchCities(countryCode: string): Promise<string[]> {
  try {
    const response = await fetch(
      'https://countriesnow.space/api/v0.1/countries'
    );
    const data = (await response.json()) as {
      error: boolean;
      msg: string;
      data: Array<{
        country: string;
        cities: string[];
      }>;
    };

    if (!data.data) {
      throw new Error('Invalid response format');
    }

    const country = data.data.find(
      (c) => c.country.slice(0, 2).toUpperCase() === countryCode
    );
    if (!country) {
      throw new Error('Country not found');
    }

    return country.cities;
  } catch (error) {
    console.error('Error fetching cities:', error);
    throw error;
  }
}
