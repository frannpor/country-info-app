import Link from "next/link";

interface Country {
  countryCode: string;
  name: string;
}

interface CountryListProps {
  countries: Country[];
}

const CountryList: React.FC<CountryListProps> = ({ countries }) => {
  return (
    <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {countries.map((country) => (
        <li
          key={country.countryCode}
          className="bg-white rounded-lg shadow-md overflow-hidden transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
        >
          <Link
            href={`/country/${country.countryCode}/${encodeURIComponent(country.name)}`}
            className="block p-4 h-full"
          >
            <div className="font-semibold text-lg text-gray-800 hover:text-blue-600 transition-colors duration-300">
              {country.name}
            </div>
            <div className="mt-2 text-sm text-gray-600">
              Click to view details
            </div>
          </Link>
        </li>
      ))}
    </ul>
  );
};

export default CountryList;
