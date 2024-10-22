import React from "react";
import { Radar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
} from "chart.js";

// Register required components
ChartJS.register(
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend
);

const RadarChart = ({ data, labels }) => {
  // Radar chart configuration
  const chartData = {
    labels: labels,
    datasets: [
      {
        label: "Sample Data",
        data: data,
        backgroundColor: "rgba(54, 162, 235, 0.2)",
        borderColor: "rgba(54, 162, 235, 1)",
        // pointBorderColor: "rgb(0, 0, 0)",
        borderWidth: 2,
        pointBackgroundColor: "rgba(54, 162, 235, 1)",
      },
    ],
  };

  const options = {
    scales: {
      r: {
        ticks: {
          beginAtZero: true,
        },
        grid: {
          color: "#999", // Grid line color
        },
        angleLines: {
          color: "#999", // Lines radiating from the center
          //   lineWidth: 2, // Thickness of angle lines
        },
      },
    },
    plugins: {
      legend: {
        display: false,
        position: "top", // Position of the legend ('top', 'bottom', 'left', 'right')
        labels: {
          color: "#333", // Text color of legend
        },
      },
    },
  };

  return (
    <div className="h-[85%] w-[100%]" style={{ width: "100%", margin: "auto" }}>
      <Radar data={chartData} options={options} />
    </div>
  );
};

export default RadarChart;
