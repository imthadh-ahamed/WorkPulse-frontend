export interface WorkLog {
    timestamp: string
    description: string
    hours: number
  }
  
  export interface TaskData {
    id: string
    title: string
    description: string
    assignedTo: string
    priority: string
    status: string
    deadline: string
    createdAt: string
    logs: WorkLog[]
  }
  
  