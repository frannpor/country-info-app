import PopulationChart from "./PopulationChart";

interface BorderCountry {
  code: string;
  name: string;
}

interface PopulationData {
  year: number;
  value: number;
}

interface Country {
  name: string;
  flagUrl: string;
  borders: BorderCountry[];
  populationData: PopulationData[];
}

interface CountryDetailsProps {
  country: Country;
}

const CountryDetails: React.FC<CountryDetailsProps> = ({ country }) => {
  return (
    <div className="bg-white rounded-lg shadow-lg p-6 max-w-4xl mx-auto">
      <h2 className="text-3xl font-bold mb-4 text-gray-800">{country.name}</h2>
      <div className="flex flex-col md:flex-row gap-8">
        <div className="md:w-1/2">
          <img
            src={country.flagUrl}
            alt={`Flag of ${country.name}`}
            className="w-full h-auto rounded-lg shadow-md"
          />
        </div>
        <div className="md:w-1/2">
          <h3 className="text-xl font-semibold mb-2 text-gray-700">
            Border Countries
          </h3>
          <ul className="grid grid-cols-2 gap-2">
            {country.borders.map((border) => (
              <li
                key={border.code}
                className="bg-gray-100 rounded px-3 py-1 text-sm text-gray-700"
              >
                {border.name}
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="mt-8">
        <h3 className="text-xl font-semibold mb-4 text-gray-700">
          Population Trend
        </h3>
        <div className="h-64">
          <PopulationChart populationData={country.populationData} />
        </div>
      </div>
    </div>
  );
};

export default CountryDetails;
