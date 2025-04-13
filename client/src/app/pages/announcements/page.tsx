import { announcements } from "@/app/data/Announcement";
import { Announcements } from "@/components/Announcement/Announcement";

export default function AnnouncementsPage() {
  return <Announcements announcements={announcements} />;
}
