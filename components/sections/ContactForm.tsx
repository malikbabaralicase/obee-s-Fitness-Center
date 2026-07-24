"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2, Check, AlertCircle } from "lucide-react";
import { contactSchema, type ContactInput, PLAN_OPTIONS } from "@/lib/schema";
import { SELECT_PLAN_EVENT } from "@/lib/planSelection";
import Button from "@/components/ui/Button";
import { cn } from "@/lib/cn";

type Status = "idle" | "loading" | "success" | "error";

const inputBase =
  "w-full rounded-sm border bg-white/[0.03] px-4 py-3 text-body-md text-on-dark placeholder:text-mute " +
  "transition-colors focus:border-accent focus:outline-none focus:ring-0";

export default function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [serverError, setServerError] = useState<string>("");

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm<ContactInput>({
    resolver: zodResolver(contactSchema),
    defaultValues: { plan: "quarterly", company: "" },
  });

  // Sync the dropdown when a membership card is chosen.
  useEffect(() => {
    const onSelect = (e: Event) => {
      const id = (e as CustomEvent<string>).detail;
      if (["monthly", "quarterly", "yearly", "not-sure"].includes(id)) {
        setValue("plan", id as ContactInput["plan"], { shouldValidate: true });
      }
    };
    window.addEventListener(SELECT_PLAN_EVENT, onSelect);
    return () => window.removeEventListener(SELECT_PLAN_EVENT, onSelect);
  }, [setValue]);

  const onSubmit = async (data: ContactInput) => {
    setStatus("loading");
    setServerError("");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const json = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(json?.error || "Something went wrong. Please try again.");
      setStatus("success");
      reset();
    } catch (err) {
      setStatus("error");
      setServerError(err instanceof Error ? err.message : "Something went wrong.");
    }
  };

  if (status === "success") {
    return (
      <div
        className="flex min-h-[420px] flex-col items-center justify-center rounded-sm border border-accent/40 bg-white/[0.02] p-10 text-center"
        role="status"
        aria-live="polite"
      >
        <span className="mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-accent/15">
          <Check className="text-accent" size={32} />
        </span>
        <h3 className="text-heading-md text-on-dark">Message sent.</h3>
        <p className="mt-3 max-w-sm text-body-md text-on-dark-mute">
          Thank you for reaching out. Our team will contact you within 24 hours to get you started.
        </p>
        <div className="mt-8">
          <Button variant="outline" onClick={() => setStatus("idle")} cursorLabel="Again">
            Send another message
          </Button>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="flex flex-col gap-5" aria-label="Membership enquiry form">
      {/* Honeypot — visually hidden, off-screen, ignored by users */}
      <div aria-hidden className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
        <label htmlFor="company">Company</label>
        <input id="company" tabIndex={-1} autoComplete="off" {...register("company")} />
      </div>

      <Field label="Full name" htmlFor="name" error={errors.name?.message}>
        <input
          id="name"
          autoComplete="name"
          className={cn(inputBase, errors.name ? "border-danger" : "border-hairline-dark")}
          placeholder="Your name"
          aria-invalid={!!errors.name}
          {...register("name")}
        />
      </Field>

      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Email" htmlFor="email" error={errors.email?.message}>
          <input
            id="email"
            type="email"
            autoComplete="email"
            className={cn(inputBase, errors.email ? "border-danger" : "border-hairline-dark")}
            placeholder="you@email.com"
            aria-invalid={!!errors.email}
            {...register("email")}
          />
        </Field>

        <Field label="Phone" htmlFor="phone" error={errors.phone?.message}>
          <input
            id="phone"
            type="tel"
            autoComplete="tel"
            className={cn(inputBase, errors.phone ? "border-danger" : "border-hairline-dark")}
            placeholder="+92 3xx xxxxxxx"
            aria-invalid={!!errors.phone}
            {...register("phone")}
          />
        </Field>
      </div>

      <Field label="Interested plan" htmlFor="plan" error={errors.plan?.message}>
        <select
          id="plan"
          className={cn(inputBase, "appearance-none", errors.plan ? "border-danger" : "border-hairline-dark")}
          aria-invalid={!!errors.plan}
          {...register("plan")}
        >
          {PLAN_OPTIONS.map((o) => (
            <option key={o.value} value={o.value} className="bg-black">
              {o.label}
            </option>
          ))}
        </select>
      </Field>

      <Field label="Message" htmlFor="message" error={errors.message?.message}>
        <textarea
          id="message"
          rows={4}
          className={cn(inputBase, "resize-none", errors.message ? "border-danger" : "border-hairline-dark")}
          placeholder="Tell us about your goals…"
          aria-invalid={!!errors.message}
          {...register("message")}
        />
      </Field>

      {status === "error" && (
        <p className="flex items-center gap-2 text-body-sm text-danger" role="alert">
          <AlertCircle size={16} /> {serverError}
        </p>
      )}

      <Button type="submit" size="lg" disabled={status === "loading"} className="mt-1 w-full" cursorLabel="Send">
        {status === "loading" ? (
          <>
            <Loader2 className="animate-spin" size={18} /> Sending…
          </>
        ) : (
          "Send Message"
        )}
      </Button>
    </form>
  );
}

function Field({
  label,
  htmlFor,
  error,
  children,
}: {
  label: string;
  htmlFor: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={htmlFor} className="text-[0.72rem] font-bold uppercase tracking-[0.18em] text-on-dark-mute">
        {label}
      </label>
      {children}
      {error && (
        <span className="text-caption-sm text-danger" role="alert">
          {error}
        </span>
      )}
    </div>
  );
}
