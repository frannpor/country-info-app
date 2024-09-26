import axios from "axios";

interface Country {
  code: string;
  name: string;
  flagUrl: string;
  borders: { code: string; name: string }[];
  populationData: { year: number; value: number }[];
}

export const fetchCountries = async (): Promise<Country[]> => {
  const response = await axios.get(
    `${process.env.NEXT_PUBLIC_API_URL}/countries`
  );
  return response.data;
};

export const fetchCountryDetails = async (code: string, name: string): Promise<Country> => {
  const response = await axios.get(
    `${process.env.NEXT_PUBLIC_API_URL}/country/${code}/${name}`
  );
  return response.data;
};
