import type { Metadata } from "next";
import { siteUrl } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Insights, engineering updates, and product stories from Whimbrel Solution.",
  alternates: {
    canonical: `${siteUrl}/blog`,
  },
};

export default function BlogLayout({ children }: { children: React.ReactNode }) {
  return children;
}
