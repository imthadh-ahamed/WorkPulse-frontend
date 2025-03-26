"use client";

import type React from "react";
import { useEffect, useState } from "react";
import { Bar, Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardHeader from "@mui/material/CardHeader";
import Button from "@mui/material/Button";
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";
import { CardTitle } from "./UI/card";
import { AlertDescription } from "./UI/alert";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

interface Task {
  id: number;
  title: string;
  completed: boolean;
  dueDate: string;
}

interface Prediction {
  productivityScore: number;
  suggestedTasks: string[];
  insights: string[];
}

const Analytics: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [prediction, setPrediction] = useState<Prediction | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const response = await fetch("/data/tasks");
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setTasks(data);
    } catch (error) {
      console.error("Error fetching tasks:", error);
      setError("Failed to fetch tasks. Please try again later.");
    }
  };

  const generatePrediction = async () => {
    try {
      setError(null); // Clear any previous errors
      const response = await fetch("/data/predict", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ tasks }),
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setPrediction(data);
    } catch (error) {
      console.error("Error generating prediction:", error);
      setError("Failed to generate prediction. Please try again later.");
    }
  };

  const taskCompletionData = {
    labels: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
    datasets: [
      {
        label: "Completed Tasks",
        data: [5, 7, 4, 6, 8],
        backgroundColor: "rgba(75, 192, 192, 0.6)",
      },
      {
        label: "Incomplete Tasks",
        data: [2, 1, 3, 2, 1],
        backgroundColor: "rgba(255, 99, 132, 0.6)",
      },
    ],
  };

  const productivityScoreData = {
    labels: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
    datasets: [
      {
        label: "Productivity Score",
        data: [75, 82, 78, 85, 90],
        borderColor: "rgb(53, 162, 235)",
        backgroundColor: "rgba(53, 162, 235, 0.5)",
      },
    ],
  };

  return (
    <div className="space-y-6">
      {error && (
        <Alert variant="outlined">
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Task Completion</CardTitle>
          </CardHeader>
          <CardContent>
            <Bar data={taskCompletionData} />
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Productivity Score</CardTitle>
          </CardHeader>
          <CardContent>
            <Line data={productivityScoreData} />
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>AI Predictions and Suggestions</CardTitle>
        </CardHeader>
        <CardContent>
          <Button onClick={generatePrediction}>Generate Prediction</Button>
          {prediction && (
            <div className="mt-4">
              <h3 className="text-lg font-semibold">
                Predicted Productivity Score: {prediction.productivityScore}
              </h3>
              <h4 className="text-md font-semibold mt-2">
                Suggested Tasks for Next Week:
              </h4>
              <ul className="list-disc pl-5">
                {prediction.suggestedTasks.map((task, index) => (
                  <li key={index}>{task}</li>
                ))}
              </ul>
              <h4 className="text-md font-semibold mt-2">Insights:</h4>
              <ul className="list-disc pl-5">
                {prediction.insights.map((insight, index) => (
                  <li key={index}>{insight}</li>
                ))}
              </ul>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default Analytics;
