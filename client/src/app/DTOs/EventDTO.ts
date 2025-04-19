export interface EventDTO {
  tenantId: string;
  title: string;
  description: string;
  start: Date;
  end: Date;
  location?: string;
  type: "meeting" | "event" | "deadline";
  repeat: "once" | "daily" | "weekly" | "monthly" | "yearly";
  repeatEndDate?: Date;
}
