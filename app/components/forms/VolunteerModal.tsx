"use client";
import { useRef, useState } from "react";
import { FileText, Send, Upload, X } from "lucide-react";
import Modal from "@/app/components/Modal";
import { Field, FormError, Honeypot, SubmitButton, SuccessPanel, inputClass, inputState, postForm } from "@/app/components/FormBits";
import { CV_ACCEPT, CV_MAX_BYTES, VOLUNTEER_LEVELS, cvProblem, formatBytes } from "@/lib/form-options";

const empty = { fullName: "", institution: "", level: "", website: "" };

export default function VolunteerModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [values, setValues] = useState(empty);
  const [cv, setCv] = useState<File | null>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [formError, setFormError] = useState("");
  const [busy, setBusy] = useState(false);
  const [done, setDone] = useState(false);
  const fileInput = useRef<HTMLInputElement>(null);

  const set = (key: keyof typeof empty) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setValues((v) => ({ ...v, [key]: e.target.value }));
    setErrors((prev) => ({ ...prev, [key]: "" }));
  };

  const pickFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] ?? null;
    if (!file) return;
    const problem = cvProblem(file);
    setErrors((prev) => ({ ...prev, cv: problem }));
    setCv(problem ? null : file);
    if (problem && fileInput.current) fileInput.current.value = "";
  };

  const clearFile = () => {
    setCv(null);
    if (fileInput.current) fileInput.current.value = "";
  };

  const close = () => {
    onClose();
    // Reset after the closing animation so the form doesn't flash empty.
    setTimeout(() => {
      if (done) {
        setValues(empty);
        setCv(null);
        setDone(false);
      }
      setFormError("");
    }, 250);
  };

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (busy) return;

    const next: Record<string, string> = {};
    if (values.fullName.trim().length < 2) next.fullName = "Enter your full name";
    if (values.institution.trim().length < 2) next.institution = "Enter your school or institution";
    if (!values.level) next.level = "Choose your level";
    if (!cv) next.cv ||= errors.cv || "Upload your CV";
    setErrors(next);
    setFormError("");
    if (Object.values(next).some(Boolean) || !cv) return;

    const body = new FormData();
    body.set("fullName", values.fullName);
    body.set("institution", values.institution);
    body.set("level", values.level);
    body.set("website", values.website);
    body.set("cv", cv);

    setBusy(true);
    const result = await postForm("/api/volunteer", body);
    setBusy(false);

    if (result.ok) return setDone(true);
    setErrors((prev) => ({ ...prev, ...result.fields }));
    setFormError(result.error);
  };

  return (
    <Modal open={open} onClose={close} title="Volunteer with CJED" description="Tell us a little about yourself and attach your CV. Our team will be in touch.">
      {done ? (
        <SuccessPanel title="Application received" onDone={close}>
          Thank you for offering your time. We&apos;ve received your details and CV, and a member of our team will review your application.
        </SuccessPanel>
      ) : (
        <form onSubmit={submit} noValidate className="relative flex flex-col gap-5">
          <Honeypot value={values.website} onChange={(v) => setValues((s) => ({ ...s, website: v }))} />

          <Field label="Full name" htmlFor="v-name" required error={errors.fullName}>
            <input id="v-name" name="fullName" autoComplete="name" value={values.fullName} onChange={set("fullName")} placeholder="Your full name" maxLength={120} aria-invalid={!!errors.fullName} className={`${inputClass} ${inputState(errors.fullName)}`} />
          </Field>

          <Field label="School / Institution" htmlFor="v-school" required error={errors.institution}>
            <input id="v-school" name="institution" value={values.institution} onChange={set("institution")} placeholder="e.g. University of Abuja" maxLength={160} aria-invalid={!!errors.institution} className={`${inputClass} ${inputState(errors.institution)}`} />
          </Field>

          <Field label="Level" htmlFor="v-level" required error={errors.level}>
            <select id="v-level" name="level" value={values.level} onChange={set("level")} aria-invalid={!!errors.level} className={`${inputClass} ${inputState(errors.level)} ${values.level ? "" : "text-gray-300"}`}>
              <option value="" disabled>
                Select your level
              </option>
              {VOLUNTEER_LEVELS.map((l) => (
                <option key={l} value={l} className="text-gray-700">
                  {l}
                </option>
              ))}
            </select>
          </Field>

          <Field label="Upload CV" htmlFor="v-cv" required error={errors.cv} hint={`PDF or Word, up to ${formatBytes(CV_MAX_BYTES)}.`}>
            {cv ? (
              <div className="flex items-center gap-3 rounded-xl border border-[#0068C1]/20 bg-[#0068C1]/5 px-4 py-3">
                <FileText className="w-5 h-5 text-[#0068C1] flex-shrink-0" />
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-semibold text-[#0068C1]">{cv.name}</p>
                  <p className="text-xs text-gray-400">{formatBytes(cv.size)}</p>
                </div>
                <button type="button" onClick={clearFile} aria-label="Remove CV" className="w-8 h-8 rounded-full flex items-center justify-center text-gray-400 hover:bg-white hover:text-red-500 transition-colors">
                  <X className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <label htmlFor="v-cv" className={`flex cursor-pointer flex-col items-center gap-2 rounded-xl border-2 border-dashed px-4 py-7 text-center transition-colors ${errors.cv ? "border-red-300 bg-red-50/40" : "border-gray-200 hover:border-[#0068C1]/40 hover:bg-[#0068C1]/5"}`}>
                <Upload className="w-5 h-5 text-[#0068C1]" />
                <span className="text-sm font-semibold text-[#0068C1]">Choose a file</span>
                <span className="text-xs text-gray-400">.pdf, .doc or .docx</span>
              </label>
            )}
            <input ref={fileInput} id="v-cv" type="file" accept={CV_ACCEPT} onChange={pickFile} className="sr-only" />
          </Field>

          <FormError message={formError} />

          <SubmitButton busy={busy} busyLabel="Uploading and sending…">
            <Send className="w-4 h-4" />
            Submit application
          </SubmitButton>
        </form>
      )}
    </Modal>
  );
}
