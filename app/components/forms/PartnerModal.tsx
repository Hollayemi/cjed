"use client";
import { useState } from "react";
import { Send } from "lucide-react";
import Modal from "@/app/components/Modal";
import { Field, FormError, Honeypot, SubmitButton, SuccessPanel, inputClass, inputState, postJson } from "@/app/components/FormBits";
import { ORGANISATION_TYPES } from "@/lib/form-options";

const empty = { organisation: "", contactPerson: "", email: "", phone: "", organisationType: "", message: "", website: "" };
type Values = typeof empty;

export default function PartnerModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [values, setValues] = useState<Values>(empty);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [formError, setFormError] = useState("");
  const [busy, setBusy] = useState(false);
  const [done, setDone] = useState(false);

  const set = (key: keyof Values) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setValues((v) => ({ ...v, [key]: e.target.value }));
    setErrors((prev) => ({ ...prev, [key]: "" }));
  };

  const close = () => {
    onClose();
    setTimeout(() => {
      if (done) {
        setValues(empty);
        setDone(false);
      }
      setFormError("");
    }, 250);
  };

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (busy) return;

    const next: Record<string, string> = {};
    if (values.organisation.trim().length < 2) next.organisation = "Enter your organisation's name";
    if (values.contactPerson.trim().length < 2) next.contactPerson = "Enter a contact person";
    if (!/^\S+@\S+\.\S+$/.test(values.email.trim())) next.email = "Enter a valid email address";
    if (!values.organisationType) next.organisationType = "Choose your organisation type";
    if (values.message.trim().length < 10) next.message = "Please write a little more (at least 10 characters)";
    setErrors(next);
    setFormError("");
    if (Object.keys(next).length) return;

    setBusy(true);
    const result = await postJson("/api/partner", values);
    setBusy(false);

    if (result.ok) return setDone(true);
    setErrors((prev) => ({ ...prev, ...result.fields }));
    setFormError(result.error);
  };

  return (
    <Modal open={open} onClose={close} title="Partner with us" description="We work with NGOs, law firms, universities, agencies and funders. Tell us about your organisation.">
      {done ? (
        <SuccessPanel title="Request received" onDone={close}>
          Thank you for your interest in partnering with CJED. Our team will review your message and respond by email.
        </SuccessPanel>
      ) : (
        <form onSubmit={submit} noValidate className="relative flex flex-col gap-5">
          <Honeypot value={values.website} onChange={(v) => setValues((s) => ({ ...s, website: v }))} />

          <Field label="Organisation" htmlFor="p-org" required error={errors.organisation}>
            <input id="p-org" name="organisation" autoComplete="organization" value={values.organisation} onChange={set("organisation")} placeholder="Organisation name" maxLength={160} aria-invalid={!!errors.organisation} className={`${inputClass} ${inputState(errors.organisation)}`} />
          </Field>

          <Field label="Organisation type" htmlFor="p-type" required error={errors.organisationType}>
            <select id="p-type" name="organisationType" value={values.organisationType} onChange={set("organisationType")} aria-invalid={!!errors.organisationType} className={`${inputClass} ${inputState(errors.organisationType)} ${values.organisationType ? "" : "text-gray-300"}`}>
              <option value="" disabled>
                Select a type
              </option>
              {ORGANISATION_TYPES.map((t) => (
                <option key={t} value={t} className="text-gray-700">
                  {t}
                </option>
              ))}
            </select>
          </Field>

          <div className="grid sm:grid-cols-2 gap-5">
            <Field label="Contact person" htmlFor="p-person" required error={errors.contactPerson}>
              <input id="p-person" name="contactPerson" autoComplete="name" value={values.contactPerson} onChange={set("contactPerson")} placeholder="Full name" maxLength={120} aria-invalid={!!errors.contactPerson} className={`${inputClass} ${inputState(errors.contactPerson)}`} />
            </Field>
            <Field label="Phone" htmlFor="p-phone" error={errors.phone}>
              <input id="p-phone" name="phone" type="tel" autoComplete="tel" value={values.phone} onChange={set("phone")} placeholder="+234 xxx xxx xxxx" maxLength={30} aria-invalid={!!errors.phone} className={`${inputClass} ${inputState(errors.phone)}`} />
            </Field>
          </div>

          <Field label="Email address" htmlFor="p-email" required error={errors.email}>
            <input id="p-email" name="email" type="email" autoComplete="email" value={values.email} onChange={set("email")} placeholder="you@organisation.org" maxLength={200} aria-invalid={!!errors.email} className={`${inputClass} ${inputState(errors.email)}`} />
          </Field>

          <Field label="How would you like to partner?" htmlFor="p-msg" required error={errors.message}>
            <textarea id="p-msg" name="message" rows={4} value={values.message} onChange={set("message")} placeholder="Briefly describe your organisation and the kind of partnership you have in mind…" maxLength={5000} aria-invalid={!!errors.message} className={`${inputClass} ${inputState(errors.message)} resize-none`} />
          </Field>

          <FormError message={formError} />

          <SubmitButton busy={busy} busyLabel="Sending…">
            <Send className="w-4 h-4" />
            Send partnership request
          </SubmitButton>
        </form>
      )}
    </Modal>
  );
}
