import { forwardRef } from "react";
import { cn } from "@/lib/utils";

interface FieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
}

export const Field = forwardRef<HTMLInputElement, FieldProps>(
  ({ label, error, className, id, ...props }, ref) => {
    const fid = id || props.name;
    return (
      <div className="group relative">
        <input
          ref={ref}
          id={fid}
          placeholder=" "
          className={cn(
            "peer block w-full rounded-xl border bg-warm-white/[0.02] px-4 pb-2.5 pt-6 text-warm-white placeholder-transparent outline-none transition-all",
            "border-warm-white/10 focus:border-gold focus:bg-warm-white/[0.04]",
            error && "border-destructive/60",
            className,
          )}
          {...props}
        />
        <label
          htmlFor={fid}
          className={cn(
            "pointer-events-none absolute left-4 top-2 text-[10px] font-semibold uppercase tracking-[0.25em] text-warm-white/50 transition-all",
            "peer-placeholder-shown:top-4 peer-placeholder-shown:text-sm peer-placeholder-shown:tracking-normal peer-placeholder-shown:normal-case peer-placeholder-shown:text-warm-white/40",
            "peer-focus:top-2 peer-focus:text-[10px] peer-focus:uppercase peer-focus:tracking-[0.25em] peer-focus:text-gold",
          )}
        >
          {label}
        </label>
        {error && <p className="mt-1.5 text-xs text-destructive/80">{error}</p>}
      </div>
    );
  },
);
Field.displayName = "Field";

interface AreaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string;
  error?: string;
}

export const FieldArea = forwardRef<HTMLTextAreaElement, AreaProps>(
  ({ label, error, className, id, ...props }, ref) => {
    const fid = id || props.name;
    return (
      <div className="group relative">
        <textarea
          ref={ref}
          id={fid}
          placeholder=" "
          rows={5}
          className={cn(
            "peer block w-full resize-none rounded-xl border bg-warm-white/[0.02] px-4 pb-2.5 pt-7 text-warm-white placeholder-transparent outline-none transition-all",
            "border-warm-white/10 focus:border-gold focus:bg-warm-white/[0.04]",
            error && "border-destructive/60",
            className,
          )}
          {...props}
        />
        <label
          htmlFor={fid}
          className={cn(
            "pointer-events-none absolute left-4 top-2 text-[10px] font-semibold uppercase tracking-[0.25em] text-warm-white/50 transition-all",
            "peer-placeholder-shown:top-4 peer-placeholder-shown:text-sm peer-placeholder-shown:tracking-normal peer-placeholder-shown:normal-case peer-placeholder-shown:text-warm-white/40",
            "peer-focus:top-2 peer-focus:text-[10px] peer-focus:uppercase peer-focus:tracking-[0.25em] peer-focus:text-gold",
          )}
        >
          {label}
        </label>
        {error && <p className="mt-1.5 text-xs text-destructive/80">{error}</p>}
      </div>
    );
  },
);
FieldArea.displayName = "FieldArea";

export function ChoiceGroup<T extends string>({
  label,
  options,
  value,
  onChange,
  error,
}: {
  label: string;
  options: { value: T; label: string; hint?: string }[];
  value: T | "";
  onChange: (v: T) => void;
  error?: string;
}) {
  return (
    <div>
      <p className="mb-3 text-[10px] font-semibold uppercase tracking-[0.25em] text-warm-white/50">{label}</p>
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        {options.map((o) => {
          const active = value === o.value;
          return (
            <button
              key={o.value}
              type="button"
              onClick={() => onChange(o.value)}
              className={cn(
                "rounded-xl border px-4 py-4 text-left transition-all",
                active
                  ? "border-gold bg-gold/10 shadow-[0_10px_40px_-15px_oklch(0.78_0.13_85/0.4)]"
                  : "border-warm-white/10 bg-warm-white/[0.02] hover:border-warm-white/25",
              )}
            >
              <p className={cn("text-sm font-semibold", active ? "text-gold" : "text-warm-white")}>{o.label}</p>
              {o.hint && <p className="mt-1 text-xs text-warm-white/55">{o.hint}</p>}
            </button>
          );
        })}
      </div>
      {error && <p className="mt-2 text-xs text-destructive/80">{error}</p>}
    </div>
  );
}
