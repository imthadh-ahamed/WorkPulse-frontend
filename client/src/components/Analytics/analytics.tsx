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
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Divider from "@mui/material/Divider";
import Box from "@mui/material/Box";

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
    <Box sx={{ padding: 4 }}>
      {error && (
        <Alert severity="error" sx={{ marginBottom: 2 }}>
          {error}
        </Alert>
      )}
      <Grid container spacing={4}>
        <Grid item xs={12} md={6}>
          <Card>
            <CardHeader
              title="Task Completion"
              titleTypographyProps={{ variant: "h6", fontWeight: "bold" }}
            />
            <Divider />
            <CardContent>
              <Bar data={taskCompletionData} />
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={6}>
          <Card>
            <CardHeader
              title="Productivity Score"
              titleTypographyProps={{ variant: "h6", fontWeight: "bold" }}
            />
            <Divider />
            <CardContent>
              <Line data={productivityScoreData} />
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <Card sx={{ marginTop: 4 }}>
        <CardHeader
          title="AI Predictions and Suggestions"
          titleTypographyProps={{ variant: "h6", fontWeight: "bold" }}
        />
        <Divider />
        <CardContent>
          <Button
            variant="contained"
            color="primary"
            onClick={generatePrediction}
            sx={{ marginBottom: 2 }}
          >
            Generate Prediction
          </Button>
          {prediction && (
            <Box>
              <Typography variant="h6" fontWeight="bold" gutterBottom>
                Predicted Productivity Score: {prediction.productivityScore}
              </Typography>
              <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
                Suggested Tasks for Next Week:
              </Typography>
              <ul>
                {prediction.suggestedTasks.map((task, index) => (
                  <li key={index}>
                    <Typography variant="body1">{task}</Typography>
                  </li>
                ))}
              </ul>
              <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
                Insights:
              </Typography>
              <ul>
                {prediction.insights.map((insight, index) => (
                  <li key={index}>
                    <Typography variant="body1">{insight}</Typography>
                  </li>
                ))}
              </ul>
            </Box>
          )}
        </CardContent>
      </Card>
    </Box>
  );
};

export default Analytics;
