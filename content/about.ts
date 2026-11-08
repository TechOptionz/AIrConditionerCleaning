import { MessageCircle, ListChecks, Sparkles, ShieldCheck } from "lucide-react";
import type { Feature } from "./home";

export const aboutPage = {
  eyebrow: "About Northline Air Care",
  h1Lines: ["Air conditioning care", "with clarity at every step"],
  lead: "We believe understanding the service should be just as easy as requesting it.",
  cta: { label: "Get in touch", href: "/contact" },
  who: {
    eyebrow: "Who we are",
    title: "Specialists in cleaning and servicing air conditioners",
    /** Region is rendered as a visible placeholder until verified. */
    bodyBefore: "Northline Air Care helps customers explore cleaning and servicing options for their air-conditioning systems across ",
    bodyAfter: ". Our focus is on clear communication, practical service information and an easy enquiry experience.",
  },
  pillars: [
    { icon: MessageCircle, title: "Plain-language advice", body: "We explain options in terms that make sense for your home or site." },
    { icon: ListChecks, title: "Scope agreed first", body: "You see the proposed inclusions and charges before work is booked." },
    { icon: Sparkles, title: "Respect for your space", body: "Floors, furniture and the work area are protected during the visit." },
    { icon: ShieldCheck, title: "Honest limits", body: "If something needs qualified diagnosis instead of cleaning, we say so." },
  ] satisfies Feature[],
  how: {
    eyebrow: "How we like to work",
    title: "You should know the next step before any work is arranged",
    principles: [
      { title: "We listen first", body: "Tell us what you have noticed and what type of system you have. That shapes the advice, not a fixed script." },
      { title: "We explain the options", body: "Maintenance clean, detailed clean or an inspection first. We outline what each would involve for your unit." },
      { title: "We confirm before we act", body: "Availability, access and the applicable quote are agreed before an appointment is scheduled or work begins." },
    ],
  },
  approach: {
    eyebrow: "Our approach",
    title: "Care for the unit, the room and the people in it",
    body: "The work varies by equipment and agreed scope. Our process starts with identifying your system, discussing access and clarifying what the service may include. On the day, the team follows appropriate safety procedures, protects the surrounding area and explains any recommended follow-up.",
    commitments: [
      "Appropriate safety procedures on every visit",
      "Surrounding area protected and left tidy",
      "Recommended follow-up explained, never assumed",
      "Practical upkeep advice between services",
    ],
  },
  team: {
    eyebrow: "The team",
    title: "The people behind the service",
    note: "Team history, qualifications and technician profiles are added once confirmed by the business. Nothing here is invented.",
    /** Placeholder cards. Replace with real names, roles and photos. */
    members: [
      { id: 1, name: "[Technician name]", role: "[Role and verified qualification]" },
      { id: 2, name: "[Technician name]", role: "[Role and verified qualification]" },
      { id: 3, name: "[Technician name]", role: "[Role and verified qualification]" },
    ],
  },
  metaDescription: "Northline Air Care focuses on clear communication and practical air-conditioning cleaning advice. Learn how we work and what to expect.",
};
