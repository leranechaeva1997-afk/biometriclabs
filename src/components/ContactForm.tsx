"use client";
import { useState } from "react";
import { CheckCircle, WarningCircle } from "@phosphor-icons/react";
import Link from "next/link";
import { FORM } from "@/lib/content";

type Status = "idle" | "submitting" | "success" | "error";

export function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    setStatus("submitting");
    try {
      const res = await fetch(FORM.action, {
        method: "POST",
        body: new FormData(form),
        headers: { Accept: "application/json" },
      });
      if (res.ok) {
        setStatus("success");
        form.reset();
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div className="glass-panel flex flex-col items-start gap-3 rounded-2xl p-8">
        <CheckCircle size={40} weight="fill" className="text-gold" />
        <p className="text-lg font-semibold text-ink">{FORM.success}</p>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      action={FORM.action}
      method="POST"
      className="glass-panel rounded-2xl p-6 sm:p-8"
    >
      <div className="grid gap-5 sm:grid-cols-2">
        {FORM.fields.map((f) => (
          <label key={f.name} className="block">
            <span className="text-sm font-medium text-ink/70">
              {f.label}
              {f.required && <span className="text-gold"> *</span>}
            </span>
            <input
              type={f.type}
              name={f.name}
              required={f.required}
              className="mt-2 w-full border-0 border-b border-line bg-transparent py-2 text-ink outline-none transition-colors placeholder:text-muted focus:border-gold"
            />
          </label>
        ))}
      </div>

      <label className="mt-5 block">
        <span className="text-sm font-medium text-ink/70">
          {FORM.message.label}
        </span>
        <textarea
          name={FORM.message.name}
          rows={3}
          className="mt-2 w-full resize-none border-0 border-b border-line bg-transparent py-2 text-ink outline-none transition-colors focus:border-gold"
        />
      </label>

      <label className="mt-6 flex items-start gap-3 text-sm text-ink/65">
        <input
          type="checkbox"
          name="consent"
          required
          className="mt-1 h-4 w-4 shrink-0 accent-gold"
        />
        <span>
          {FORM.consent}{" "}
          <Link
            href={FORM.privacyHref}
            className="text-gold underline underline-offset-2 hover:text-ink"
          >
            {FORM.consentLink}
          </Link>
        </span>
      </label>

      {status === "error" && (
        <p className="mt-5 flex items-center gap-2 text-sm text-ink/80">
          <WarningCircle size={18} weight="fill" className="text-gold" />
          {FORM.error}
        </p>
      )}

      <button
        type="submit"
        disabled={status === "submitting"}
        className="mt-7 w-full rounded-full bg-ink px-6 py-3.5 text-base font-semibold text-paper transition-opacity hover:opacity-85 disabled:opacity-60 sm:w-auto"
      >
        {status === "submitting" ? "Отправляем…" : FORM.submit}
      </button>
    </form>
  );
}
