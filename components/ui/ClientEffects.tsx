"use client";

import { Toaster } from "sonner";
import AIAgent from "@/components/ui/AIAgent";
import SmoothScroll from "@/components/ui/SmoothScroll";

export default function ClientEffects() {
  return (
    <>
      <SmoothScroll />
      <AIAgent />
      <Toaster
        theme="dark"
        toastOptions={{
          style: {
            background: "#0f1e2e",
            border: "1px solid #1b2d40",
            color: "#e8f0f5",
          },
        }}
      />
    </>
  );
}
