
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Patient Reviews | PhysioHeal",
  description: "See what our patients say about their experience with our physiotherapy services.",
};

export default function ReviewsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
