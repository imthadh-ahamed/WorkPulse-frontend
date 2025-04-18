export interface Announcement {
  _id?: string;
  id?: string;
  title: string;
  description: string;
  tenantId: string;
  created: Date;
  createdBy: string;
  modified?: Date | null;
  modifiedBy?: string | null;
}
