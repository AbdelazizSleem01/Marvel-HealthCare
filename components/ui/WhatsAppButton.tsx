"use client";
import { RiWhatsappLine } from "react-icons/ri";

export default function WhatsAppButton() {
  return (
    <a
      href="https://wa.me/201000000000"
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat on WhatsApp"
      className="fixed bottom-6 right-6 z-50 w-14 h-14 bg-secondary-500 hover:bg-secondary-600 rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-300 group"
      style={{ boxShadow: "0 0 20px rgba(225,177,94,0.4)" }}
    >
      <RiWhatsappLine className="text-white group-hover:scale-110 transition-transform" size={28} />
      {/* Pulse ring */}
      <span className="absolute inset-0 rounded-full bg-secondary-500 animate-ping opacity-30" />
    </a>
  );
}
