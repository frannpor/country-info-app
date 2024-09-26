import { Line } from "react-chartjs-2";

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
  const data = {
    labels: populationData.map((item) => item.year),
    datasets: [
      {
        label: "Population",
        data: populationData.map((item) => item.value),
        fill: false,
        borderColor: "rgba(75,192,192,1)",
        tension: 0.1,
      },
    ],
  };

  return <Line data={data} />;
};

export default PopulationChart;
