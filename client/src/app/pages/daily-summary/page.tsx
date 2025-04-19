import DailySummary from "@/components/DailySummary/DailySummary";
import { TaskData } from "@/types/types";

const tasks: TaskData[] = [
  {
    id: "1",
    title: "Design Homepage",
    description: "Create a responsive design for the homepage.",
    assignedTo: "Alice",
    priority: "High",
    status: "In Progress",
    deadline: "2023-10-15",
    createdAt: "2023-10-01",
  },
  {
    id: "2",
    title: "Fix Login Bug",
    description: "Resolve the issue with user login on mobile devices.",
    assignedTo: "Bob",
    priority: "Medium",
    status: "Completed",
    deadline: "2023-10-10",
    createdAt: "2023-09-25",
  },
  {
    id: "3",
    title: "Update Documentation",
    description: "Add details about the new API endpoints.",
    assignedTo: "Charlie",
    priority: "Low",
    status: "Pending",
    deadline: "2023-10-20",
    createdAt: "2023-10-05",
  },
];

export default function DailySummaryPage() {
  return <DailySummary tasks={tasks} />;
}
