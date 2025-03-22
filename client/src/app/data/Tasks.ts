import { NextResponse } from "next/server";

export async function GET() {
  // In a real application, you would retrieve this data from a database.
  const tasks = [
    { id: 1, title: "Complete project proposal", completed: true, dueDate: "2023-09-15" },
    { id: 2, title: "Review team performance", completed: false, dueDate: "2023-09-20" },
    { id: 3, title: "Prepare for client meeting", completed: true, dueDate: "2023-09-18" },
    { id: 4, title: "Update documentation", completed: false, dueDate: "2023-09-22" },
    { id: 5, title: "Conduct team training", completed: true, dueDate: "2023-09-25" },
  ];

  return NextResponse.json(tasks);
}