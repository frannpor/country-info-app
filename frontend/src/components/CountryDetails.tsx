import { useState, useEffect } from "react";
import Link from "next/link";
import PopulationChart from "./PopulationChart";

interface BorderCountry {
  countryCode: string;
  commonName: string;
}

interface PopulationData {
  year: number;
  value: number;
}

interface Country {
  name: string;
  officialName: string;
  region: string;
  borders: BorderCountry[];
  population: PopulationData[];
  flag: string;
}

interface CountryDetailsProps {
  country: Country;
}

const CountryDetails: React.FC<CountryDetailsProps> = ({ country }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [imageLoaded, setImageLoaded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  const handleImageLoad = () => {
    setImageLoaded(true);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-blue-100 to-white">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-100 to-white py-8">
      <div className="container mx-auto px-4">
        <Link
          href="/"
          className="inline-block mb-6 text-blue-600 hover:text-blue-800 transition-colors duration-300 bg-blue-100 hover:bg-blue-200 text-lg font-semibold py-2 px-4 rounded-lg shadow-md transform hover:scale-105"
        >
          Back to countries list
        </Link>
        <div className="bg-white rounded-lg shadow-lg p-6 max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold mb-4 text-gray-800">
            {country.name}
          </h2>
          <div className="flex flex-col md:flex-row gap-8">
            <div className="md:w-1/2">
              <img
                src={
                  country.flag && country.flag !== ""
                    ? country.flag
                    : "/flag-placeholder.svg"
                }
                alt={`Flag of ${country.name}`}
                className={`w-full h-auto rounded-lg shadow-md transition-opacity duration-500 ${
                  imageLoaded ? "opacity-100" : "opacity-0"
                }`}
                onLoad={handleImageLoad}
              />
              {!imageLoaded && (
                <div className="bg-gray-200 h-32 rounded-lg flex items-center justify-center">
                  <span className="text-gray-400">Loading flag...</span>
                </div>
              )}
              <div className="mt-4">
                <h3 className="text-xl font-semibold mb-2 text-gray-700">
                  Country Info
                </h3>
                <p className="text-gray-500">
                  <strong className="text-gray-600">Official Name:</strong>{" "}
                  {country.officialName}
                </p>
                <p className="text-gray-500">
                  <strong className="text-gray-600">Region:</strong>{" "}
                  {country.region}
                </p>
              </div>
            </div>
            <div className="md:w-1/2">
              <h3 className="text-xl font-semibold mb-2 text-gray-700">
                Border Countries
              </h3>
              {country.borders.length === 0 ? (
                <div className="bg-yellow-100 border border-yellow-400 text-yellow-700 px-4 py-3 rounded relative">
                  <strong className="font-bold">
                    No border countries available!
                  </strong>
                  <span className="block sm:inline">
                    {" "}
                    This country has no borders.
                  </span>
                </div>
              ) : (
                <ul className="grid grid-cols-2 gap-2">
                  {country.borders.map((border) => (
                    <li
                      key={border.countryCode}
                      className="bg-gray-100 rounded px-3 py-2 text-sm text-gray-700 hover:bg-gray-200 transition-colors duration-300"
                    >
                      <Link
                        href={`/country/${border.countryCode}/${encodeURIComponent(border.commonName)}`}
                      >
                        {border.commonName}
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
          <div className="mt-8">
            <h3 className="text-xl font-semibold mb-4 text-gray-700">
              Population Trend
            </h3>
            <div className="h-64 md:h-96">
              <PopulationChart populationData={country.population} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CountryDetails;
