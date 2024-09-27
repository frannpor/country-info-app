import { GetServerSideProps } from "next";
import { fetchCountryDetails } from "@/services/api";
import { ParsedUrlQuery } from "querystring";
import CountryDetails from "@/components/CountryDetails";

interface Params extends ParsedUrlQuery {
  code: string;
  name: string;
}
interface Border {
  countryCode: string;
  commonName: string;
}

interface Country {
  name: string;
  officialName: string;
  region: string;
  borders: Border[];
  population: { year: number; value: number }[];
  flag: string;
}

interface CountryPageProps {
  country: Country;
}

export default function CountryPage({ country }: CountryPageProps) {
  return (
    <div className="container mx-auto px-4 py-8">
      <CountryDetails country={country} />
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { code, name } = context.params as Params;

  if (!code || !name) {
    return {
      notFound: true,
    };
  }

  const country = await fetchCountryDetails(code, name);

  return {
    props: { country },
  };
};
