import TaskManagement from "@/components/TaskManagement/TaskManagement";
import AdminTaskManagement from "@/components/TaskManagement/AdminTaskManagement";

interface TaskManagementPageProps {
  readonly params: { readonly projectId: string };
}

export default function TaskManagementPage({
  params,
}: TaskManagementPageProps) {
  const userRole =
    typeof window !== "undefined"
      ? localStorage.getItem("userRole") || "User"
      : "User";

  if (userRole === "Admin") {
    return <AdminTaskManagement params={params} />;
  }

  return <TaskManagement params={params} />;
}