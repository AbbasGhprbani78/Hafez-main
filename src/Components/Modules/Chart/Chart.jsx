import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styles from "./Chart.module.css";
import { faChartPie } from "@fortawesome/free-solid-svg-icons";

import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

const data = [
  { name: "فروردین", sales: 120, views: 300 },
  { name: "اردیبهشت", sales: 200, views: 500 },
  { name: "خرداد", sales: 150, views: 400 },
  { name: "تیر", sales: 278, views: 600 },
  { name: "مرداد", sales: 189, views: 350 },
  { name: "شهریور", sales: 239, views: 700 },
];

export default function Chart() {
  return (
    <div className={styles.wrapper}>
      <div className={styles.title}>
        <FontAwesomeIcon icon={faChartPie} />
        <span>گزارش</span>
      </div>
      <div className={styles.chartContainer}>
        <ResponsiveContainer width="100%" height={"100%"}>
          <LineChart data={data}>
            <CartesianGrid stroke="#eee" strokeDasharray="5 5" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line
              type="monotone"
              dataKey="sales"
              stroke="#8884d8"
              strokeWidth={2}
              name="فروش"
            />
            <Line
              type="monotone"
              dataKey="views"
              stroke="#82ca9d"
              strokeWidth={2}
              name="بازدید"
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
