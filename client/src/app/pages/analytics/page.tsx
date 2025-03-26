"use client";

import { useState } from "react";
import {
  Box,
  Card,
  CardContent,
  CardHeader,
  Tabs,
  Tab,
  Typography,
  Button,
  CircularProgress,
  Alert,
  Container,
  Grid,
} from "@mui/material";
import {
  Psychology, // Replacing BrainAlt with Psychology icon
  Error as ErrorIcon,
} from "@mui/icons-material";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip as RechartsTooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";
import { styled } from "@mui/material/styles";

// Sample data for charts
const productivityData = [
  { day: "Mon", score: 65 },
  { day: "Tue", score: 75 },
  { day: "Wed", score: 85 },
  { day: "Thu", score: 70 },
  { day: "Fri", score: 90 },
];

const taskCompletionData = [
  { name: "Completed", value: 75, color: "#0088FE" },
  { name: "In Progress", value: 15, color: "#00C49F" },
  { name: "Not Started", value: 10, color: "#FFBB28" },
];

// Custom styled components
const StyledTab = styled(Tab)({
  fontWeight: 500,
  fontSize: "0.9rem",
  minWidth: 120,
});

// TabPanel component for tab content
interface TabPanelProps {
  children: React.ReactNode;
  value: number;
  index: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`analytics-tabpanel-${index}`}
      aria-labelledby={`analytics-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ py: 3 }}>{children}</Box>}
    </div>
  );
}

export default function AnalyticsPage() {
  const [activeTab, setActiveTab] = useState(0);
  const [isGenerating, setIsGenerating] = useState(false);
  const [predictions, setPredictions] = useState<{
    productivityScore: number;
    suggestedTasks: string[];
    insights: string[];
  } | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setActiveTab(newValue);
  };

  const generatePredictions = async () => {
    try {
      setIsGenerating(true);
      setError(null);

      const response = await fetch("/data/predict", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ productivityData, taskCompletionData }),
      });

      if (!response.ok) {
        throw new Error("Failed to generate predictions");
      }

      const data = await response.json();
      setPredictions(data);
    } catch (error) {
      console.error("Error generating predictions:", error);
      setError("Failed to generate predictions. Please try again.");
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h4" component="h1" fontWeight="bold" gutterBottom>
        Analytics
      </Typography>

      <Box sx={{ borderBottom: 1, borderColor: "divider", mb: 3 }}>
        <Tabs
          value={activeTab}
          onChange={handleTabChange}
          aria-label="analytics tabs"
          textColor="primary"
          indicatorColor="primary"
        >
          <StyledTab label="Overview" id="analytics-tab-0" />
          <StyledTab label="Productivity" id="analytics-tab-1" />
          <StyledTab label="Department" id="analytics-tab-2" />
        </Tabs>
      </Box>

      {/* Overview Tab */}
      <TabPanel value={activeTab} index={0}>
        <Grid container spacing={3}>
          {/* Weekly Productivity Score Chart */}
          <Grid item xs={12} md={6}>
            <Card elevation={2}>
              <CardHeader title="Weekly Productivity Score" />
              <CardContent>
                <Box sx={{ height: 300 }}>
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={productivityData}>
                      <XAxis dataKey="day" />
                      <YAxis />
                      <RechartsTooltip />
                      <Line
                        type="monotone"
                        dataKey="score"
                        stroke="#8884d8"
                        strokeWidth={2}
                        dot={{ r: 4 }}
                        activeDot={{ r: 6 }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </Box>
              </CardContent>
            </Card>
          </Grid>

          {/* Task Completion Status Chart */}
          <Grid item xs={12} md={6}>
            <Card elevation={2}>
              <CardHeader title="Task Completion Status" />
              <CardContent>
                <Box sx={{ height: 300 }}>
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={taskCompletionData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                        label={({ name, percent }) =>
                          `${name}: ${(percent * 100).toFixed(0)}%`
                        }
                      >
                        {taskCompletionData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Legend />
                    </PieChart>
                  </ResponsiveContainer>
                </Box>
              </CardContent>
            </Card>
          </Grid>

          {/* AI Predictions and Suggestions */}
          <Grid item xs={12}>
            <Card elevation={2}>
              <CardHeader title="AI Predictions and Suggestions" />
              <CardContent>
                {error && (
                  <Alert severity="error" sx={{ mb: 2 }}>
                    <ErrorIcon fontSize="small" sx={{ mr: 1 }} />
                    {error}
                  </Alert>
                )}

                <Button
                  variant="contained"
                  color="primary"
                  onClick={generatePredictions}
                  disabled={isGenerating}
                  startIcon={
                    isGenerating ? (
                      <CircularProgress size={20} color="inherit" />
                    ) : (
                      <Psychology />
                    )
                  }
                  sx={{ mb: 3 }}
                >
                  {isGenerating ? "Generating..." : "Generate Predictions"}
                </Button>

                {predictions ? (
                  <Box>
                    <Typography variant="h6" gutterBottom>
                      Predicted Productivity Score:{" "}
                      {predictions.productivityScore}
                    </Typography>

                    <Typography
                      variant="subtitle1"
                      fontWeight="medium"
                      gutterBottom
                      sx={{ mt: 2 }}
                    >
                      Suggested Tasks for Next Week:
                    </Typography>
                    <Box component="ul" sx={{ pl: 4 }}>
                      {predictions.suggestedTasks.map((task, index) => (
                        <li key={index}>
                          <Typography variant="body1">{task}</Typography>
                        </li>
                      ))}
                    </Box>

                    <Typography
                      variant="subtitle1"
                      fontWeight="medium"
                      gutterBottom
                      sx={{ mt: 2 }}
                    >
                      Insights:
                    </Typography>
                    <Box component="ul" sx={{ pl: 4 }}>
                      {predictions.insights.map((insight, index) => (
                        <li key={index}>
                          <Typography variant="body1">{insight}</Typography>
                        </li>
                      ))}
                    </Box>
                  </Box>
                ) : (
                  <Box sx={{ textAlign: "center", py: 4 }}>
                    <Psychology
                      sx={{ fontSize: 48, color: "text.disabled", mb: 2 }}
                    />
                    <Typography color="text.secondary">
                      Click the button above to generate AI predictions based on
                      your work patterns
                    </Typography>
                  </Box>
                )}
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </TabPanel>

      {/* Productivity Tab */}
      <TabPanel value={activeTab} index={1}>
        <Card elevation={2}>
          <CardHeader title="Detailed Productivity Analysis" />
          <CardContent>
            <Typography variant="body1">
              Detailed productivity analytics content would go here.
            </Typography>
          </CardContent>
        </Card>
      </TabPanel>

      {/* Department Tab */}
      <TabPanel value={activeTab} index={2}>
        <Card elevation={2}>
          <CardHeader title="Department Analytics" />
          <CardContent>
            <Typography variant="body1">
              Department analytics content would go here.
            </Typography>
          </CardContent>
        </Card>
      </TabPanel>
    </Container>
  );
}
