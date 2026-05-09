import { useState } from "react";
import { z } from "zod";
import { toast } from "sonner";
import { Check, ChevronLeft, ChevronRight, Loader2 } from "lucide-react";
import { Field, FieldArea, ChoiceGroup } from "./Field";
import { cn } from "@/lib/utils";

type ProjectType = "residential" | "commercial" | "hospitality" | "other";
type Budget = "under-50" | "50-150" | "150-500" | "500-plus";

interface FormState {
  name: string;
  email: string;
  phone: string;
  projectType: ProjectType | "";
  location: string;
  budget: Budget | "";
  timeline: string;
  message: string;
}

const initial: FormState = {
  name: "", email: "", phone: "",
  projectType: "", location: "", budget: "", timeline: "",
  message: "",
};

const stepSchemas = [
  z.object({
    name: z.string().trim().min(2, "Please enter your full name").max(100),
    email: z.string().trim().email("Enter a valid email").max(255),
    phone: z.string().trim().max(40).optional().or(z.literal("")),
  }),
  z.object({
    projectType: z.enum(["residential", "commercial", "hospitality", "other"], {
      message: "Choose a project type",
    }),
    location: z.string().trim().min(2, "Please add a location").max(120),
    budget: z.enum(["under-50", "50-150", "150-500", "500-plus"], {
      message: "Select an indicative budget",
    }),
    timeline: z.string().trim().min(2, "Add a rough timeline").max(120),
  }),
  z.object({
    message: z.string().trim().min(20, "Tell us a little more (20+ chars)").max(1000),
  }),
];

const stepLabels = ["You", "Project", "Vision"];

export function ContactForm() {
  const [step, setStep] = useState(0);
  const [data, setData] = useState<FormState>(initial);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);

  const update = <K extends keyof FormState>(k: K, v: FormState[K]) => {
    setData((d) => ({ ...d, [k]: v }));
    if (errors[k as string]) setErrors((e) => ({ ...e, [k as string]: "" }));
  };

  const validateStep = () => {
    const result = stepSchemas[step].safeParse(data);
    if (!result.success) {
      const errs: Record<string, string> = {};
      for (const issue of result.error.issues) errs[String(issue.path[0])] = issue.message;
      setErrors(errs);
      return false;
    }
    setErrors({});
    return true;
  };

  const next = () => validateStep() && setStep((s) => Math.min(s + 1, stepSchemas.length - 1));
  const back = () => setStep((s) => Math.max(s - 1, 0));

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateStep()) return;
    setSubmitting(true);
    try {
      await new Promise((r) => setTimeout(r, 1100));
      setDone(true);
      toast.success("Thank you — we'll be in touch within two business days.");
    } catch {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  if (done) {
    return (
      <div className="glass-strong rounded-2xl p-10 text-center" style={{ animation: "fadeUp .6s both" }}>
        <div className="mx-auto flex size-16 items-center justify-center rounded-full bg-gold/15 ring-1 ring-gold/40">
          <Check className="size-7 text-gold" />
        </div>
        <h3 className="mt-6 font-display text-2xl text-warm-white">Message received.</h3>
        <p className="mx-auto mt-3 max-w-md text-warm-white/65">
          Thank you, {data.name.split(" ")[0]}. A member of our studio will reach out within
          two business days to schedule an introductory call.
        </p>
        <button
          onClick={() => { setData(initial); setStep(0); setDone(false); }}
          className="mt-8 text-xs font-semibold uppercase tracking-[0.2em] text-gold underline-offset-4 hover:underline"
        >
          Send another message
        </button>
        <style>{`@keyframes fadeUp{from{opacity:0;transform:translateY(12px)}to{opacity:1;transform:none}}`}</style>
      </div>
    );
  }

  return (
    <form onSubmit={submit} className="glass-strong rounded-2xl p-6 md:p-10">
      {/* Progress */}
      <div className="mb-8">
        <div className="flex items-center justify-between">
          {stepLabels.map((l, i) => (
            <div key={l} className="flex flex-1 items-center">
              <div
                className={cn(
                  "flex size-8 shrink-0 items-center justify-center rounded-full border text-xs font-semibold transition-all",
                  i < step && "border-gold bg-gold text-charcoal",
                  i === step && "border-gold text-gold",
                  i > step && "border-warm-white/15 text-warm-white/40",
                )}
              >
                {i < step ? <Check className="size-3.5" /> : i + 1}
              </div>
              <span
                className={cn(
                  "ml-3 hidden text-xs font-semibold uppercase tracking-[0.2em] sm:inline",
                  i === step ? "text-warm-white" : "text-warm-white/40",
                )}
              >
                {l}
              </span>
              {i < stepLabels.length - 1 && (
                <div className="mx-3 h-px flex-1 bg-warm-white/10">
                  <div
                    className="h-full bg-gold transition-all duration-700"
                    style={{ width: i < step ? "100%" : "0%" }}
                  />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      <div key={step} style={{ animation: "stepIn .45s both" }} className="space-y-5">
        {step === 0 && (
          <>
            <Field label="Full name" name="name" value={data.name} onChange={(e) => update("name", e.target.value)} error={errors.name} autoComplete="name" />
            <Field label="Email" name="email" type="email" value={data.email} onChange={(e) => update("email", e.target.value)} error={errors.email} autoComplete="email" />
            <Field label="Phone (optional)" name="phone" value={data.phone} onChange={(e) => update("phone", e.target.value)} error={errors.phone} autoComplete="tel" />
          </>
        )}
        {step === 1 && (
          <>
            <ChoiceGroup<ProjectType>
              label="Project type"
              value={data.projectType}
              onChange={(v) => update("projectType", v)}
              error={errors.projectType}
              options={[
                { value: "residential", label: "Residential", hint: "Home, apartment, villa" },
                { value: "commercial", label: "Commercial", hint: "Office, retail" },
                { value: "hospitality", label: "Hospitality", hint: "Hotel, restaurant" },
                { value: "other", label: "Other", hint: "Tell us more" },
              ]}
            />
            <Field label="Location" name="location" value={data.location} onChange={(e) => update("location", e.target.value)} error={errors.location} placeholder="City, country" />
            <ChoiceGroup<Budget>
              label="Indicative budget (EUR)"
              value={data.budget}
              onChange={(v) => update("budget", v)}
              error={errors.budget}
              options={[
                { value: "under-50", label: "Under 50K" },
                { value: "50-150", label: "50 – 150K" },
                { value: "150-500", label: "150 – 500K" },
                { value: "500-plus", label: "500K+" },
              ]}
            />
            <Field label="Timeline" name="timeline" value={data.timeline} onChange={(e) => update("timeline", e.target.value)} error={errors.timeline} placeholder="e.g. start Q3, ready by spring" />
          </>
        )}
        {step === 2 && (
          <FieldArea
            label="Tell us about your space and vision"
            name="message"
            value={data.message}
            onChange={(e) => update("message", e.target.value)}
            error={errors.message}
            maxLength={1000}
          />
        )}
      </div>

      <div className="mt-8 flex items-center justify-between gap-4">
        <button
          type="button"
          onClick={back}
          disabled={step === 0}
          className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-warm-white/60 transition-colors hover:text-warm-white disabled:opacity-30"
        >
          <ChevronLeft className="size-4" /> Back
        </button>

        {step < stepSchemas.length - 1 ? (
          <button
            type="button"
            onClick={next}
            className="group inline-flex items-center gap-2 rounded-full bg-gold px-7 py-3 text-xs font-semibold uppercase tracking-[0.2em] text-charcoal transition-all hover:bg-gold-soft"
          >
            Continue <ChevronRight className="size-4 transition-transform group-hover:translate-x-0.5" />
          </button>
        ) : (
          <button
            type="submit"
            disabled={submitting}
            className="inline-flex items-center gap-2 rounded-full bg-gold px-7 py-3 text-xs font-semibold uppercase tracking-[0.2em] text-charcoal transition-all hover:bg-gold-soft disabled:opacity-70"
          >
            {submitting ? <><Loader2 className="size-4 animate-spin" /> Sending</> : "Send message"}
          </button>
        )}
      </div>
      <style>{`@keyframes stepIn{from{opacity:0;transform:translateY(8px)}to{opacity:1;transform:none}}`}</style>
    </form>
  );
}
