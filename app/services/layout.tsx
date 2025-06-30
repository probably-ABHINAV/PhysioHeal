
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Our Services | PhysioHeal",
  description: "Comprehensive physiotherapy services tailored to your specific needs and recovery goals.",
};

export default function ServicesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
