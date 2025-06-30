
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Book Appointment | PhysioHeal",
  description: "Book your physiotherapy consultation appointment with our expert team.",
};

export default function BookLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
