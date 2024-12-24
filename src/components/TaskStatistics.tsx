import { useEffect, useState } from "react";
import {
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import { useTask } from "../context/useTask";

interface IStatCard {
  title: string;
  value: number;
  color: string;
  icon: string;
}
interface Itask {
  totalTasks: number;
  completedTasks: number;
  pendingTasks: number;
  tasksLast7Days: number;
}

const TaskStatistics = () => {
  const [stats, setStats] = useState<Itask | null>(null);
  const { allTasks } = useTask(); // Access task and setTask from context
  console.log("stats", stats);

  useEffect(() => {
    if (allTasks) {
      const totalTasks = allTasks.length;
      const completedTasks = allTasks.filter((task) => task.isCompleted).length;
      const pendingTasks = totalTasks - completedTasks;

      const tasksLast7Days = allTasks.filter((task) => {
        const createdAt = new Date(task?.createdAt); // adjust if different
        const now = new Date();
        const sevenDaysAgo = new Date(now.setDate(now.getDate() - 7));
        return createdAt > sevenDaysAgo;
      }).length;

      setStats({
        totalTasks,
        completedTasks,
        pendingTasks,
        tasksLast7Days,
      });
    }
  }, [allTasks]);

  const pieChartData = [
    { name: "Completed", value: stats?.completedTasks ?? 0 },
    { name: "Pending", value: stats?.pendingTasks ?? 0 },
  ];

  const COLORS = ["#4CAF50", "#FFC107"];

  return (
    <div className="mt-8 bg-white shadow-lg rounded-lg p-6">
      <h2 className="text-2xl font-semibold mb-6 text-center text-gray-800">
        Task Statistics
      </h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <StatCard
          title="Total Tasks"
          value={stats?.totalTasks ?? 0}
          color="bg-blue-100 text-blue-800"
          icon="📊"
        />
        <StatCard
          title="Completed"
          value={stats?.completedTasks ?? 0}
          color="bg-green-100 text-green-800"
          icon="✅"
        />
        <StatCard
          title="Pending"
          value={stats?.pendingTasks ?? 0}
          color="bg-yellow-100 text-yellow-800"
          icon="⏳"
        />
        <StatCard
          title="Last 7 Days"
          value={stats?.tasksLast7Days ?? 0}
          color="bg-purple-100 text-purple-800"
          icon="📅"
        />
      </div>
      <div className="">
        <div className="bg-gray-50 p-4 rounded-lg lg:col-span-5">
          <h3 className="font-medium mb-4 text-center text-gray-700">
            Task Completion Status
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={pieChartData}
                cx="50%"
                cy="50%"
                labelLine={false}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
                label={({ name, percent }) =>
                  `${name} ${(percent * 100).toFixed(0)}%`
                }
              >
                {pieChartData.map((_entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{ backgroundColor: "white", borderRadius: "8px" }}
              />
              <Legend verticalAlign="bottom" height={36} />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

const StatCard = ({ title, value, color, icon }: IStatCard) => (
  <div
    className={`${color} rounded-lg p-4 flex flex-col items-center justify-center transition-transform hover:scale-105`}
  >
    <div className="text-3xl mb-2">{icon}</div>
    <h3 className="font-medium text-center text-sm">{title}</h3>
    <p className="text-2xl font-bold mt-1">{value}</p>
  </div>
);

export default TaskStatistics;
