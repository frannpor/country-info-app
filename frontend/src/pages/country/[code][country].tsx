import { GetServerSideProps } from "next";
import { fetchCountryDetails } from "@/services/api";

interface Country {
  name: string;
  flagUrl: string;
  borders: { code: string; name: string }[];
  populationData: { year: number; value: number }[];
}

interface CountryPageProps {
  country: Country;
}

export default function CountryPage({ country }: CountryPageProps) {
  return (
    <div>
      <h1>{country.name}</h1>
      <img src={country.flagUrl} alt={`${country.name} flag`} />
      {/* Aquí irían otros componentes como la gráfica de población */}
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { country: name, code } = context.params!;
  const country = await fetchCountryDetails(code as string, name as string);
  console.log("Fetched country data:", country);
  return {
    props: { country },
  };
};
