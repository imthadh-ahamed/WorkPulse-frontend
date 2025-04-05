export interface Event {
  id: number;
  tenantId: number;
  title: string;
  description: string;
  start: Date;
  end: Date;
  location?: string;
  type: "meeting" | "event" | "deadline";
  repeat: "once" | "daily" | "weekly" | "monthly" | "yearly";
  repeatEndDate?: Date;
}
