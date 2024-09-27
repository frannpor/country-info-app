import { Line } from "react-chartjs-2";
import { Chart, registerables } from "chart.js";

Chart.register(...registerables);

interface PopulationData {
  year: number;
  value: number;
}

interface PopulationChartProps {
  populationData: PopulationData[];
}

const PopulationChart: React.FC<PopulationChartProps> = ({
  populationData,
}) => {
  if (populationData.length === 0) {
    return (
      <div className="bg-yellow-100 border border-yellow-400 text-yellow-700 px-4 py-3 rounded relative">
        <strong className="font-bold">No data available!</strong>
        <span className="block sm:inline"> Please try another country :(</span>
      </div>
    );
  }

  const data = {
    labels: populationData.map((item) => item.year),
    datasets: [
      {
        label: "Population",
        data: populationData.map((item) => item.value),
        fill: false,
        borderColor: "rgba(59, 130, 246, 1)",
        backgroundColor: "rgba(59, 130, 246, 0.2)",
        tension: 0.1,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "top" as const,
      },
      title: {
        display: true,
        text: "Population Over Time",
        font: {
          size: 16,
          weight: "bold",
          family: "'Helvetica Neue', 'Helvetica', 'Arial', sans-serif",
        },
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: "Year",
        },
      },
      y: {
        title: {
          display: true,
          text: "Population",
        },
        beginAtZero: true,
      },
    },
  };

  return <Line data={data} options={options} />;
};

export default PopulationChart;
