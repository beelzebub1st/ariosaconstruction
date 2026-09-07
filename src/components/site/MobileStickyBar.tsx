"use client";

import { MessageSquare, Phone, Sparkles } from "lucide-react";
import { useEstimate } from "@/components/estimate/EstimateContext";
import { phoneHref, smsHref } from "@/lib/utils";

export function MobileStickyBar({ phone }: { phone: string }) {
  const { openEstimate } = useEstimate();

  return (
    <div className="fixed inset-x-0 bottom-0 z-50 border-t border-white/10 bg-navy-dark/95 pb-[env(safe-area-inset-bottom)] backdrop-blur-xl md:hidden">
      <div className="grid grid-cols-3">
        <a
          href={phoneHref(phone)}
          className="flex flex-col items-center gap-1 py-3 text-[10px] font-bold uppercase tracking-[0.16em] text-white/85"
        >
          <Phone className="h-4 w-4 text-gold" />
          Call
        </a>
        <a
          href={smsHref(phone, "Hi Ariosa, I'd like to request an estimate.")}
          className="flex flex-col items-center gap-1 border-x border-white/10 py-3 text-[10px] font-bold uppercase tracking-[0.16em] text-white/85"
        >
          <MessageSquare className="h-4 w-4 text-gold" />
          Text
        </a>
        <button
          type="button"
          onClick={() => openEstimate()}
          className="flex flex-col items-center gap-1 bg-brick py-3 text-[10px] font-bold uppercase tracking-[0.16em] text-white"
        >
          <Sparkles className="h-4 w-4" />
          Estimate
        </button>
      </div>
    </div>
  );
}
