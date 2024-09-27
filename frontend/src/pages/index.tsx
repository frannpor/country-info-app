import { GetStaticProps, InferGetStaticPropsType } from "next";
import { useState, useEffect } from "react";
import { fetchCountries } from "../services/api";
import CountryList from "@/components/CountryList";

type HomeProps = InferGetStaticPropsType<typeof getStaticProps>;

export default function Home({ countries }: HomeProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  const filteredCountries = countries.filter((country: { name: string }) =>
    country.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-100 to-white">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-center mb-8 text-gray-800">
          Explore Countries
        </h1>
        <div className="mb-6">
          <input
            type="text"
            placeholder="Search countries..."
            className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        {isLoading ? (
          <div className="flex items-center justify-center h-64">
            <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-blue-500"></div>
          </div>
        ) : (
          <CountryList countries={filteredCountries} />
        )}
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
