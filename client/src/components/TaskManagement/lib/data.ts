import type { TaskData } from "../../../types/types";

export const employees = [
  "John Smith",
  "Sarah Johnson",
  "Michael Brown",
  "Emily Davis",
  "David Wilson",
];

export const initialTasks: TaskData[] = [
  {
    id: "task-1",
    title: "Complete website redesign",
    description: "Redesign the company website with new branding guidelines",
    assignedTo: "Sarah Johnson",
    priority: "high",
    status: "in-progress",
    deadline: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(), // 7 days from now
    createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(), // 3 days ago
  },
  {
    id: "task-2",
    title: "Quarterly financial report",
    description: "Prepare Q2 financial report for board meeting",
    assignedTo: "Michael Brown",
    priority: "high",
    status: "pending",
    deadline: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString(), // 14 days from now
    createdAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(), // 1 day ago
  },
  {
    id: "task-3",
    title: "Client presentation",
    description: "Prepare presentation for ABC Corp client meeting",
    assignedTo: "Emily Davis",
    priority: "medium",
    status: "completed",
    deadline: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(), // 1 day ago
    createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(), // 5 days ago
  },
  {
    id: "task-4",
    title: "Update employee handbook",
    description:
      "Update company policies and procedures in the employee handbook",
    assignedTo: "David Wilson",
    priority: "low",
    status: "in-progress",
    deadline: new Date(Date.now() + 21 * 24 * 60 * 60 * 1000).toISOString(), // 21 days from now
    createdAt: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString(), // 10 days ago
  },
  {
    id: "task-5",
    title: "Social media campaign",
    description: "Create and schedule social media posts for product launch",
    assignedTo: "John Smith",
    priority: "medium",
    status: "pending",
    deadline: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toISOString(), // 5 days from now
    createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(), // 2 days ago
  },
];
