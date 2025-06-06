import { Event } from "@/types/Calender";

export const events: Event[] = [
  {
    id: 1,
    tenantId: 1,
    title: "Team Meeting",
    description: "Monthly team meeting to discuss project updates.",
    start: new Date(2025, 9, 1, 10, 0),
    end: new Date(2025, 9, 1, 11, 0),
    location: "Conference Room A",
    type: "meeting",
    repeat: "monthly",
    repeatEndDate: new Date(2026, 9, 1),
  },
  {
    id: 2,
    tenantId: 1,
    title: "Project Deadline",
    description: "Final deadline for project submission.",
    start: new Date(2025, 9, 5, 17, 0),
    end: new Date(2025, 9, 5, 17, 0),
    type: "deadline",
    repeat: "once",
  },
  {
    id: 3,
    tenantId: 1,
    title: "Client Call",
    description: "Call with the client to discuss requirements.",
    start: new Date(2025, 9, 3, 14, 0),
    end: new Date(2025, 9, 3, 15, 0),
    location: "Zoom",
    type: "meeting",
    repeat: "weekly",
    repeatEndDate: new Date(2025, 11, 3),
  },
  {
    id: 4,
    tenantId: 1,
    title: "Workshop",
    description: "Workshop on new technologies.",
    start: new Date(2025, 9, 7, 9, 0),
    end: new Date(2025, 9, 7, 12, 0),
    location: "Hall B",
    type: "event",
    repeat: "once",
  },
  {
    id: 5,
    tenantId: 1,
    title: "Code Review",
    description: "Review the codebase for the current sprint.",
    start: new Date(2025, 9, 8, 11, 0),
    end: new Date(2025, 9, 8, 12, 0),
    type: "meeting",
    repeat: "weekly",
    repeatEndDate: new Date(2025, 11, 8),
  },
  {
    id: 6,
    tenantId: 1,
    title: "Team Lunch",
    description: "Lunch with the team to celebrate milestones.",
    start: new Date(2025, 9, 10, 13, 0),
    end: new Date(2025, 9, 10, 14, 0),
    location: "Cafeteria",
    type: "event",
    repeat: "once",
  },
  {
    id: 7,
    tenantId: 1,
    title: "Product Launch",
    description: "Launch event for the new product.",
    start: new Date(2025, 9, 15, 10, 0),
    end: new Date(2025, 9, 15, 12, 0),
    location: "Main Hall",
    type: "event",
    repeat: "once",
  },
  {
    id: 8,
    tenantId: 1,
    title: "Sprint Planning",
    description: "Planning session for the upcoming sprint.",
    start: new Date(2025, 9, 12, 9, 0),
    end: new Date(2025, 9, 12, 10, 30),
    type: "meeting",
    repeat: "monthly",
    repeatEndDate: new Date(2026, 9, 12),
  },
  {
    id: 9,
    tenantId: 1,
    title: "Design Review",
    description: "Review the design for the new feature.",
    start: new Date(2025, 9, 14, 15, 0),
    end: new Date(2025, 9, 14, 16, 0),
    type: "meeting",
    repeat: "once",
  },
  {
    id: 10,
    tenantId: 1,
    title: "Quarterly Review",
    description: "Quarterly review meeting with stakeholders.",
    start: new Date(2025, 9, 20, 10, 0),
    end: new Date(2025, 9, 20, 12, 0),
    location: "Conference Room B",
    type: "meeting",
    repeat: "yearly",
    repeatEndDate: new Date(2028, 9, 20),
  },
  // Add similar updates for the remaining events...
];
