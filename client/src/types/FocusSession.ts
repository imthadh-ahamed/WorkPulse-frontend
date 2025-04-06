export interface FocusSession {
  id: string;
  tenantId: number;
  title: string;
  focusHours: number;
  endTime?: string;
  description: string;
  isRunning?: boolean;
  created: Date;
  createdBy: string;
  modified?: Date | null;
  modifiedBy?: string | null;
}
