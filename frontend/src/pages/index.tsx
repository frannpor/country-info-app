import { GetStaticProps, InferGetStaticPropsType } from "next";
import { fetchCountries } from "../services/api";
import CountryList from "@/components/CountryList";

type HomeProps = InferGetStaticPropsType<typeof getStaticProps>;

export default function Home({ countries }: HomeProps) {
  return (
    <div className="min-h-screen bg-gray-100">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-center mb-8 text-gray-800">
          Countries List
        </h1>
        <CountryList countries={countries} />
      </div>
    </div>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const countries = await fetchCountries();
  return {
    props: { countries },
  };
};
