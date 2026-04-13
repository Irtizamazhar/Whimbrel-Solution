import { MessageCircle } from "lucide-react";

export default function WhatsAppButton() {
  return (
    <a
      href="https://wa.me/923363893891"
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-5 z-40 inline-flex h-14 w-14 items-center justify-center overflow-hidden rounded-full bg-[#25D366] text-white shadow-[0_0_26px_rgba(37,211,102,0.45)] outline-none transition hover:scale-105 focus-visible:ring-2 focus-visible:ring-white/40 md:bottom-8 md:right-8"
      aria-label="Chat with us on WhatsApp"
      data-cursor="link"
      data-magnetic="true"
    >
      <MessageCircle size={24} />
    </a>
  );
}
