export interface FocusSession {
  _id: string;
  tenantId: string;
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
