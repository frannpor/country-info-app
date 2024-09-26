import Link from "next/link";

interface Country {
  code: string;
  name: string;
}

interface CountryListProps {
  countries: Country[];
}

const CountryList: React.FC<CountryListProps> = ({ countries }) => {
  return (
    <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {countries.map((country) => (
        <li
          key={country.code}
          className="bg-white rounded-lg shadow-md overflow-hidden transition-transform duration-300 hover:scale-105"
        >
          <Link
            href={`/country/${country.code}/${encodeURIComponent(country.name)}`}
            className="block p-4 h-full"
          >
            <div className="font-semibold text-lg text-gray-800 hover:text-blue-600 transition-colors duration-300">
              {country.name}
            </div>
          </Link>
        </li>
      ))}
    </ul>
  );
};

export default CountryList;
