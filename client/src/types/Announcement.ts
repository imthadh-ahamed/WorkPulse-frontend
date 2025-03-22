export interface Announcement {
  id: number;
  title: string;
  description: string;
  tenantId: number;
  created: string;
  createdBy: string;
  modified?: string | null;
  modifiedBy?: string | null;
}
