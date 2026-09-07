import { ArrowUpRight, Mail, MessageSquare, Phone } from "lucide-react";
import { mailtoHref, phoneHref, smsHref } from "@/lib/utils";

export function ContactDirect({
  phone,
  email,
}: {
  phone: string;
  email: string;
}) {
  const items = [
    {
      href: phoneHref(phone),
      label: "Call Us",
      value: phone,
      icon: Phone,
      tone: "bg-navy text-white hover:bg-navy-light",
    },
    {
      href: smsHref(phone, "Hi Ariosa, I'd like to request an estimate."),
      label: "Text Us",
      value: "Instant SMS",
      icon: MessageSquare,
      tone: "bg-brick text-white hover:bg-brick-dark",
    },
    {
      href: mailtoHref(email, "Project inquiry — Ariosa & Constructions"),
      label: "Email",
      value: email,
      icon: Mail,
      tone: "border border-navy/15 bg-white text-navy hover:border-navy",
    },
  ];

  return (
    <div className="grid gap-3">
      {items.map((item) => (
        <a
          key={item.label}
          href={item.href}
          className={`group flex items-center gap-4 px-5 py-5 transition ${item.tone}`}
        >
          <item.icon className="h-5 w-5 shrink-0" />
          <div className="min-w-0 flex-1">
            <div className="text-[10px] font-bold uppercase tracking-[0.18em] opacity-75">
              {item.label}
            </div>
            <div className="truncate font-semibold">{item.value}</div>
          </div>
          <ArrowUpRight className="h-4 w-4 opacity-60 transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:opacity-100" />
        </a>
      ))}
    </div>
  );
}
