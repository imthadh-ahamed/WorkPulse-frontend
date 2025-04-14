import TaskManagement from "@/components/TaskManagement/TaskManagement";
import AdminTaskManagement from "@/components/TaskManagement/AdminTaskManagement";

export default function TaskManagementPage({
  params,
}: Readonly<{
  params: { projectId: string };
}>) {
  const userRole = localStorage.getItem("userRole") || "User";

  if (userRole === "Admin") {
    return <AdminTaskManagement params={params} />;
  }

  return <TaskManagement params={params} />;
}
