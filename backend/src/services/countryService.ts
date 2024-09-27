import apiClient from "../utils/api-client";
import "dotenv/config";

const COUNTRY_INFO_URL = process.env.COUNTRY_INFO_URL;
const COUNTRY_POPULATION_URL =
  "https://countriesnow.space/api/v0.1/countries/population";
const COUNTRY_FLAG_IMAGE_URL = process.env.COUNTRY_FLAG_IMAGE_URL;
const COUNTRIES_URL = process.env.COUNTRIES_URL;

export const fetchAvailableCountries = async () => {
  try {
    const response = await apiClient.get(`${COUNTRIES_URL}`);
    return response.data;
  } catch (error) {
    throw new Error("Error fetching available countries");
  }
};

const fetchCountryBorders = async (code: string) => {
  try {
    const response = await apiClient.get(`${COUNTRY_INFO_URL}/${code}`);
    const { commonName, officialName, region, borders } = response.data;
    const result = {
      name: commonName,
      officialName,
      region,
      borders: borders.map((border: any) => ({
        commonName: border.commonName,
        countryCode: border.countryCode,
      })),
    };
    // console.log(result);
    return result;
  } catch (error) {
    throw new Error("Error fetching country borders");
  }
};

const fetchCountryPopulation = async (
  countryName: string,
  availableCountries: string[]
) => {
  try {
    const response = await apiClient.get(COUNTRY_POPULATION_URL);
    // console.log("This is the response of the population", response);
    const countries = response.data.data;

    if (!countries || countries.length === 0) {
      throw new Error("No population data available.");
    }

    const filteredCountries = countries.filter((country: any) =>
      availableCountries.includes(country.country.toLowerCase().trim())
    );

    const countryData = filteredCountries.find(
      (country: any) =>
        country.country.toLowerCase().trim() ===
        countryName.toLowerCase().trim()
    );

    if (!countryData) {
      throw new Error(`No population data found for country: ${countryName}`);
    }

    return countryData.populationCounts;
  } catch (error) {
    console.error("Error fetching population data:", error);
    throw new Error(`Error fetching country population for ${countryName}`);
  }
};

const fetchCountryFlag = async (countryName: string) => {
  try {
    const response = await apiClient.get(`${COUNTRY_FLAG_IMAGE_URL}`);
    const country = response.data.data.find(
      (country: any) => country.name === countryName
    );
    // console.log(country?.flag);
    return country?.flag;
  } catch (error) {
    throw new Error("Error fetching country flag");
  }
};

export const fetchCountryInfo = async (code: string, countryName: string) => {
  try {
    const availableCountriesResponse = await fetchAvailableCountries();
    const availableCountries = availableCountriesResponse.map((country: any) =>
      country.name.toLowerCase().trim()
    );

    const [countryData, population, flag] = await Promise.all([
      fetchCountryBorders(code),
      fetchCountryPopulation(countryName, availableCountries),
      fetchCountryFlag(countryName),
    ]);

    return {
      ...countryData,
      population,
      flag,
    };
  } catch (error) {
    throw new Error("Error fetching country info");
  }
};

export default {
  fetchAvailableCountries,
  fetchCountryInfo,
};
