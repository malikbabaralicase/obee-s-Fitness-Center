import { MapPin, Phone, Clock, MessageCircle } from "lucide-react";
import SectionHeading from "@/components/ui/SectionHeading";
import Reveal from "@/components/ui/Reveal";
import Button from "@/components/ui/Button";
import CornerSquare from "@/components/ui/CornerSquare";
import ContactForm from "./ContactForm";
import { BUSINESS } from "@/lib/constants";
import { fadeUp } from "@/lib/motion";

const MAP_SRC =
  "https://www.google.com/maps?q=" +
  encodeURIComponent("8 Tulsa Rd, Lalazar, Rawalpindi, 46000, Pakistan") +
  "&output=embed";

export default function Contact() {
  return (
    <section id="contact" className="section-pad relative overflow-hidden bg-black">
      <div aria-hidden className="absolute inset-x-0 top-0 h-px bg-hairline-dark" />

      <div className="container-content relative">
        <SectionHeading
          eyebrow="Contact"
          title={
            <>
              Your first rep <span className="text-gradient-accent">starts here.</span>
            </>
          }
          intro="Have a question or ready to join? Reach out and our team will get you set up."
        />

        <div className="mt-16 grid gap-10 lg:grid-cols-2 lg:gap-14">
          {/* Left — details */}
          <div className="flex flex-col gap-6">
            <Reveal variants={fadeUp}>
              <ul className="flex flex-col gap-5">
                <InfoRow icon={<MapPin size={20} />} label="Visit us">
                  {BUSINESS.address.full}
                </InfoRow>
                <InfoRow icon={<Phone size={20} />} label="Call us">
                  <a href={`tel:${BUSINESS.phoneHref}`} className="transition-colors hover:text-accent">
                    {BUSINESS.phoneDisplay}
                  </a>
                </InfoRow>
                <InfoRow icon={<Clock size={20} />} label="Opening hours">
                  <span className="flex flex-col gap-1">
                    {BUSINESS.hours.map((h) => (
                      <span key={h.day} className="flex flex-wrap gap-x-3">
                        <span className="min-w-[9rem] text-on-dark">{h.day}</span>
                        <span>{h.time}</span>
                      </span>
                    ))}
                  </span>
                </InfoRow>
              </ul>
            </Reveal>

            <Reveal variants={fadeUp} delay={0.1}>
              <Button
                as="link"
                href={`https://wa.me/${BUSINESS.whatsapp}?text=${encodeURIComponent(
                  "Hi Obee's! I'd like to know more about membership."
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                variant="outline"
                size="lg"
                cursorLabel="Chat"
              >
                <MessageCircle size={18} /> Chat on WhatsApp
              </Button>
            </Reveal>

            {/* Map */}
            <Reveal variants={fadeUp} delay={0.15} className="relative mt-2">
              <div className="relative overflow-hidden rounded-sm border border-hairline-dark">
                <CornerSquare corner="tl" />
                <iframe
                  title={`Map to ${BUSINESS.name}`}
                  src={MAP_SRC}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="h-[280px] w-full grayscale-[0.3] invert-[0.9] hue-rotate-180"
                  style={{ border: 0 }}
                />
              </div>
            </Reveal>
          </div>

          {/* Right — form */}
          <Reveal variants={fadeUp} delay={0.1} className="relative">
            <div className="card-dark relative p-6 sm:p-8">
              <CornerSquare corner="tr" size={16} />
              <ContactForm />
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function InfoRow({
  icon,
  label,
  children,
}: {
  icon: React.ReactNode;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <li className="flex gap-4">
      <span className="mt-0.5 flex h-11 w-11 shrink-0 items-center justify-center rounded-sm border border-hairline-dark text-accent">
        {icon}
      </span>
      <div className="flex flex-col gap-1">
        <span className="text-[0.72rem] font-bold uppercase tracking-[0.18em] text-mute">{label}</span>
        <span className="text-body-md text-on-dark-mute">{children}</span>
      </div>
    </li>
  );
}
