export interface FocusSession {
  id: string;
  tenantId: number;
  title: string;
  startTime: string;
  endTime: string;
  description: string;
  created: Date;
  createdBy: string;
  modified?: Date | null;
  modifiedBy?: string | null;
}
