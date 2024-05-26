"use client";

import styles from "./Chart.module.css";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const Chart = ({ type, title, data }) => {
  if (!data?.labels?.length) {
    return;
  }

  let component;

  switch (type) {
    case "bar":
      component = (
        <Bar
          data={data}
          options={{
            responsive: true,
            tooltips: {
              enabled: false,
            },
            plugins: {
              title: {
                display: !!title,
                text: title,
              },
            },
          }}
        />
      );
      break;
  }
  // return component;
  return (
    <div className={styles.container}>
      <div class={styles.chart}>{component}</div>
    </div>
  );
};

export default Chart;
