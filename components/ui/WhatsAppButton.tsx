import { MessageCircle } from "lucide-react";

export default function WhatsAppButton() {
  return (
    <a
      href="https://wa.me/923340007247"
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-5 z-40 inline-flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-[0_0_26px_rgba(37,211,102,0.45)] transition hover:scale-105 md:bottom-8 md:right-8"
      aria-label="Chat with us on WhatsApp"
      data-cursor="link"
      data-magnetic="true"
    >
      <MessageCircle size={24} />
      <span className="absolute inset-0 animate-ping rounded-full bg-[#25D366]/30" />
    </a>
  );
}
