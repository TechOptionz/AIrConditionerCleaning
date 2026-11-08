"use client";

import { forwardRef, useId, type ComponentPropsWithoutRef, type ReactNode } from "react";
import { cn } from "@/lib/utils";

export const fieldClass =
  "h-12 w-full rounded-sm border border-line-strong bg-white px-3.5 text-[16px] text-ink outline-none transition-[border-color,box-shadow] duration-150 focus:border-teal-600 focus:shadow-[0_0_0_3px_rgba(19,124,139,.15)] aria-[invalid=true]:border-danger";

export const textareaClass = cn(fieldClass, "h-auto min-h-[112px] resize-y py-3 leading-[1.5]");

type FieldWrapProps = {
  label: ReactNode;
  required?: boolean;
  error?: string;
  hint?: string;
  className?: string;
  children: (props: { id: string; describedBy?: string; invalid: boolean }) => ReactNode;
};

/** Visible label + control + inline error wired with aria-describedby. */
export function FieldWrap({ label, required, error, hint, className, children }: FieldWrapProps) {
  const id = useId();
  const errId = `${id}-err`;
  const hintId = `${id}-hint`;
  const describedBy = [error ? errId : null, hint ? hintId : null].filter(Boolean).join(" ") || undefined;
  return (
    <div className={cn("flex flex-col gap-1.5", className)}>
      <label htmlFor={id} className="text-[13px] font-semibold leading-none text-ink">
        {label}
        {required && (
          <>
            {" "}
            <span aria-hidden="true">*</span>
          </>
        )}
      </label>
      {children({ id, describedBy, invalid: Boolean(error) })}
      {hint && !error && (
        <span id={hintId} className="text-[13px] leading-snug text-muted">
          {hint}
        </span>
      )}
      {error && (
        <span id={errId} role="alert" className="text-[13px] font-medium leading-snug text-danger">
          {error}
        </span>
      )}
    </div>
  );
}

type InputProps = Omit<ComponentPropsWithoutRef<"input">, "id"> & { label: ReactNode; error?: string; hint?: string; wrapClassName?: string };

export const Input = forwardRef<HTMLInputElement, InputProps>(function Input({ label, error, hint, required, wrapClassName, className, ...rest }, ref) {
  return (
    <FieldWrap label={label} required={required} error={error} hint={hint} className={wrapClassName}>
      {({ id, describedBy, invalid }) => (
        <input ref={ref} id={id} aria-describedby={describedBy} aria-invalid={invalid || undefined} aria-required={required || undefined} className={cn(fieldClass, className)} {...rest} />
      )}
    </FieldWrap>
  );
});

type SelectProps = Omit<ComponentPropsWithoutRef<"select">, "id"> & { label: ReactNode; error?: string; hint?: string; wrapClassName?: string };

export const Select = forwardRef<HTMLSelectElement, SelectProps>(function Select({ label, error, hint, required, wrapClassName, className, children, ...rest }, ref) {
  return (
    <FieldWrap label={label} required={required} error={error} hint={hint} className={wrapClassName}>
      {({ id, describedBy, invalid }) => (
        <select ref={ref} id={id} aria-describedby={describedBy} aria-invalid={invalid || undefined} aria-required={required || undefined} className={cn(fieldClass, "field-select", className)} {...rest}>
          {children}
        </select>
      )}
    </FieldWrap>
  );
});

type TextareaProps = Omit<ComponentPropsWithoutRef<"textarea">, "id"> & { label: ReactNode; error?: string; hint?: string; wrapClassName?: string };

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(function Textarea({ label, error, hint, required, wrapClassName, className, ...rest }, ref) {
  return (
    <FieldWrap label={label} required={required} error={error} hint={hint} className={wrapClassName}>
      {({ id, describedBy, invalid }) => (
        <textarea ref={ref} id={id} aria-describedby={describedBy} aria-invalid={invalid || undefined} aria-required={required || undefined} className={cn(textareaClass, className)} {...rest} />
      )}
    </FieldWrap>
  );
});

type CheckboxProps = Omit<ComponentPropsWithoutRef<"input">, "id" | "type"> & { label: ReactNode; error?: string; wrapClassName?: string };

export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(function Checkbox({ label, error, wrapClassName, className, ...rest }, ref) {
  const id = useId();
  const errId = `${id}-err`;
  return (
    <div className={cn("flex flex-col gap-1", wrapClassName)}>
      <label htmlFor={id} className="flex cursor-pointer items-start gap-3 text-[14px] leading-[1.5] text-body">
        <input ref={ref} id={id} type="checkbox" aria-describedby={error ? errId : undefined} aria-invalid={error ? true : undefined} className={cn("mt-0.5 size-5 shrink-0 accent-teal-600", className)} {...rest} />
        <span>{label}</span>
      </label>
      {error && (
        <span id={errId} role="alert" className="pl-8 text-[13px] font-medium leading-snug text-danger">
          {error}
        </span>
      )}
    </div>
  );
});

/** Pill / card toggle group used for premises, cleaning level, time and contact method. */
export function ChipGroup<T extends string>({
  legend,
  options,
  value,
  onChange,
  variant = "pill",
  required,
  error,
  className,
}: {
  legend: ReactNode;
  options: readonly { label: T; sub?: string }[] | readonly T[];
  value: T | "";
  onChange: (v: T) => void;
  variant?: "pill" | "card";
  required?: boolean;
  error?: string;
  className?: string;
}) {
  const items = (options as readonly (T | { label: T; sub?: string })[]).map((o) => (typeof o === "string" ? { label: o as T, sub: undefined } : o));
  return (
    <fieldset className={cn("m-0 min-w-0 border-0 p-0", className)}>
      <legend className="mb-2 p-0 text-[13px] font-semibold leading-none text-ink">
        {legend}
        {required && (
          <>
            {" "}
            <span aria-hidden="true">*</span>
          </>
        )}
      </legend>
      <div className={cn(variant === "pill" ? "flex flex-wrap gap-2" : "grid grid-cols-[repeat(auto-fit,minmax(min(100%,180px),1fr))] gap-2.5")}>
        {items.map((o) => {
          const on = o.label === value;
          return (
            <button
              key={o.label}
              type="button"
              aria-pressed={on}
              onClick={() => onChange(o.label)}
              className={cn(
                "cursor-pointer border font-semibold transition-[background-color,color,border-color] duration-200",
                variant === "pill" ? "h-11 rounded-full px-4 text-[14.5px] leading-none" : "min-h-16 rounded-md px-4 py-3 text-left text-[14.5px] leading-[1.3]",
                on ? "border-teal-600 bg-teal-600 text-white" : "border-line-strong bg-white text-ink hover:border-teal-600",
              )}
            >
              <span className="block">{o.label}</span>
              {o.sub && <span className={cn("mt-0.5 block text-[13px] font-normal", on ? "text-white/85" : "text-muted")}>{o.sub}</span>}
            </button>
          );
        })}
      </div>
      {error && (
        <span role="alert" className="mt-1.5 block text-[13px] font-medium leading-snug text-danger">
          {error}
        </span>
      )}
    </fieldset>
  );
}
