import axios from "axios";

interface Country {
  code: string;
  name: string;
}

interface CountryData {
  code: string;
  name: string;
}

export const fetchCountries = async (): Promise<Country[]> => {
  const response = await axios.get(
    `${process.env.NEXT_PUBLIC_API_URL}/countries`
  );
  return response.data;
};

export const fetchCountryDetails = async (
  code: string,
  name: string
): Promise<CountryData> => {
  const response = await axios.get(
    `${process.env.NEXT_PUBLIC_API_URL}/country/${code}/${name}`
  );
  return response.data;
};
