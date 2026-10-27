"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Phone, MapPin, Send, CheckCircle, Scale, GraduationCap, Users, BookOpen, Clock } from "lucide-react";
import { siteConfig } from "@/app/config/site";
import Container from "@/app/components/Container";
import SectionHeading from "@/app/components/SectionHeading";
import Reveal from "@/app/components/Reveal";
import { stagger, fadeUp } from "@/app/data/animation";
import { Field, FormError, Honeypot, inputClass, inputState, postJson } from "@/app/components/FormBits";

type FormState = "idle" | "submitting" | "success";

const enquiryTypes = [
  { icon: <Scale className="w-4 h-4" />, label: "Legal Aid Request" },
  { icon: <GraduationCap className="w-4 h-4" />, label: "Capacity Building" },
  { icon: <Users className="w-4 h-4" />, label: "Partnership / Collaboration" },
  { icon: <BookOpen className="w-4 h-4" />, label: "Research & Policy" },
  { icon: <Mail className="w-4 h-4" />, label: "General Enquiry" },
];

const officeInfo = [
  {
    icon: <MapPin className="w-5 h-5 text-[#f7cb06]" />,
    label: "Office Address",
    value: siteConfig.address,
    sub: "By appointment — Mon to Fri, 9am – 5pm",
  },
  {
    icon: <Mail className="w-5 h-5 text-[#f7cb06]" />,
    label: "Email",
    value: siteConfig.email,
    href: `mailto:${siteConfig.email}`,
  },
  {
    icon: <Phone className="w-5 h-5 text-[#f7cb06]" />,
    label: "Phone",
    value: siteConfig.phone,
    href: `tel:${siteConfig.phone}`,
    sub: "Mon – Fri, 9am – 5pm WAT",
  },
  {
    icon: <Clock className="w-5 h-5 text-[#f7cb06]" />,
    label: "Response Time",
    value: "Within 48 hours",
    sub: "For urgent legal matters, call directly",
  },
];

export default function ContactPageContent() {
  const [formState, setFormState] = useState<FormState>("idle");
  const [selectedType, setSelectedType] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
    website: "", // honeypot
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [formError, setFormError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (formState === "submitting") return;

    const next: Record<string, string> = {};
    if (formData.name.trim().length < 2) next.name = "Enter your full name";
    if (!/^\S+@\S+\.\S+$/.test(formData.email.trim())) next.email = "Enter a valid email address";
    if (formData.message.trim().length < 10) next.message = "Please write a little more (at least 10 characters)";
    setErrors(next);
    setFormError("");
    if (Object.keys(next).length) return;

    setFormState("submitting");
    const result = await postJson("/api/contact", { ...formData, enquiryType: selectedType });
    if (result.ok) return setFormState("success");

    setFormState("idle");
    setErrors((prev) => ({ ...prev, ...result.fields }));
    setFormError(result.error);
  };

  return (
    <>
      {/* Hero */}
      <section className="pt-36 pb-20 bg-[#F5F7F8]">
        <Container>
          <motion.div
            variants={stagger}
            initial="hidden"
            animate="visible"
            className="max-w-3xl"
          >
            <motion.span
              variants={fadeUp}
              className="text-xs font-semibold tracking-widest uppercase text-[#f7cb06] block mb-5"
            >
              Get in Touch
            </motion.span>
            <motion.h1
              variants={fadeUp}
              className="text-4xl md:text-5xl lg:text-6xl text-[#0068C1] leading-tight mb-6"
              style={{ fontFamily: "'DM Serif Display', Georgia, serif" }}
            >
              We are here to help. Reach out.
            </motion.h1>
            <motion.p variants={fadeUp} className="text-gray-500 text-lg leading-relaxed">
              Whether you need legal aid, want to partner with us, or simply have a question — our team responds within 48 hours.
            </motion.p>
          </motion.div>
        </Container>
      </section>

      {/* Main content */}
      <section className="py-16 lg:py-24 bg-white">
        <Container>
          <div className="grid lg:grid-cols-5 gap-12 lg:gap-16">

            {/* Left: Contact info */}
            <div className="lg:col-span-2 flex flex-col gap-6">
              <Reveal>
                <h2
                  className="text-2xl text-[#0068C1] mb-2"
                  style={{ fontFamily: "'DM Serif Display', Georgia, serif" }}
                >
                  Contact information
                </h2>
                <p className="text-sm text-gray-500 leading-relaxed">
                  Our offices are based in Abuja. We serve clients across all 36 states of Nigeria and the FCT.
                </p>
              </Reveal>

              <motion.div
                variants={stagger}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="flex flex-col gap-4"
              >
                {officeInfo.map((item) => (
                  <motion.div
                    key={item.label}
                    variants={fadeUp}
                    className="flex items-start gap-4 p-5 rounded-2xl bg-[#F5F7F8] hover:bg-[#0068C1]/5 transition-colors duration-200"
                  >
                    <div className="w-10 h-10 rounded-xl bg-[#0068C1]/8 flex items-center justify-center flex-shrink-0">
                      {item.icon}
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-1">
                        {item.label}
                      </p>
                      {item.href ? (
                        <a
                          href={item.href}
                          className="text-sm font-semibold text-[#0068C1] hover:text-[#f7cb06] transition-colors"
                        >
                          {item.value}
                        </a>
                      ) : (
                        <p className="text-sm font-semibold text-[#0068C1]">{item.value}</p>
                      )}
                      {item.sub && (
                        <p className="text-xs text-gray-400 mt-0.5">{item.sub}</p>
                      )}
                    </div>
                  </motion.div>
                ))}
              </motion.div>

              {/* Map placeholder */}
              <Reveal delay={0.2}>
                <div className="rounded-2xl overflow-hidden h-48 bg-[#0068C1]/8 relative border border-gray-100 flex items-center justify-center">
                  <div className="text-center">
                    <MapPin className="w-8 h-8 text-[#0068C1]/30 mx-auto mb-2" />
                    <p className="text-xs text-gray-400">Abuja, Federal Capital Territory</p>
                    <p className="text-xs text-gray-300 mt-1">Nigeria</p>
                  </div>
                </div>
              </Reveal>
            </div>

            {/* Right: Form */}
            <div className="lg:col-span-3">
              <Reveal>
                <div className="p-8 lg:p-10 rounded-3xl bg-[#F5F7F8] border border-gray-100">
                  {formState === "success" ? (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="flex flex-col items-center justify-center text-center py-12 gap-5"
                    >
                      <div className="w-16 h-16 rounded-full bg-[#0068C1] flex items-center justify-center">
                        <CheckCircle className="w-8 h-8 text-[#f7cb06]" />
                      </div>
                      <h3
                        className="text-2xl text-[#0068C1]"
                        style={{ fontFamily: "'DM Serif Display', Georgia, serif" }}
                      >
                        Message received
                      </h3>
                      <p className="text-gray-500 text-sm max-w-sm leading-relaxed">
                        Thank you for reaching out. A member of our team will respond within 48 hours. For urgent legal matters, please call us directly.
                      </p>
                      <button
                        onClick={() => {
                          setFormState("idle");
                          setFormData({ name: "", email: "", phone: "", message: "", website: "" });
                          setErrors({});
                          setFormError("");
                          setSelectedType("");
                        }}
                        className="text-xs font-semibold text-[#0068C1] underline mt-2"
                      >
                        Send another message
                      </button>
                    </motion.div>
                  ) : (
                    <form onSubmit={handleSubmit} noValidate className="relative flex flex-col gap-6">
                      <Honeypot value={formData.website} onChange={(v) => setFormData((p) => ({ ...p, website: v }))} />
                      <div>
                        <h3
                          className="text-xl text-[#0068C1] mb-1"
                          style={{ fontFamily: "'DM Serif Display', Georgia, serif" }}
                        >
                          Send us a message
                        </h3>
                        <p className="text-sm text-gray-500">All fields marked * are required.</p>
                      </div>

                      {/* Enquiry type */}
                      <div>
                        <p className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-3">
                          I am enquiring about
                        </p>
                        <div className="flex flex-wrap gap-2">
                          {enquiryTypes.map((type) => (
                            <button
                              type="button"
                              key={type.label}
                              aria-pressed={selectedType === type.label}
                              onClick={() => setSelectedType(selectedType === type.label ? "" : type.label)}
                              className={`inline-flex items-center gap-2 px-3.5 py-2 rounded-full text-xs font-semibold transition-all duration-200 ${
                                selectedType === type.label
                                  ? "bg-[#0068C1] text-white"
                                  : "bg-white border border-gray-200 text-gray-500 hover:border-[#0068C1]/30 hover:text-[#0068C1]"
                              }`}
                            >
                              {type.icon}
                              {type.label}
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* Fields */}
                      <div className="grid sm:grid-cols-2 gap-4">
                        <Field label="Full Name" htmlFor="c-name" required error={errors.name}>
                          <input id="c-name" type="text" name="name" autoComplete="name" value={formData.name} onChange={handleChange} placeholder="Your full name" maxLength={120} aria-invalid={!!errors.name} className={`${inputClass} ${inputState(errors.name)}`} />
                        </Field>
                        <Field label="Email Address" htmlFor="c-email" required error={errors.email}>
                          <input id="c-email" type="email" name="email" autoComplete="email" value={formData.email} onChange={handleChange} placeholder="you@example.com" maxLength={200} aria-invalid={!!errors.email} className={`${inputClass} ${inputState(errors.email)}`} />
                        </Field>
                      </div>

                      <Field label="Phone Number" htmlFor="c-phone" error={errors.phone}>
                        <input id="c-phone" type="tel" name="phone" autoComplete="tel" value={formData.phone} onChange={handleChange} placeholder="+234 xxx xxx xxxx" maxLength={30} aria-invalid={!!errors.phone} className={`${inputClass} ${inputState(errors.phone)}`} />
                      </Field>

                      <Field label="Your Message" htmlFor="c-message" required error={errors.message}>
                        <textarea id="c-message" name="message" value={formData.message} onChange={handleChange} rows={5} placeholder="Briefly describe your situation or enquiry…" maxLength={5000} aria-invalid={!!errors.message} className={`${inputClass} ${inputState(errors.message)} resize-none`} />
                      </Field>

                      <FormError message={formError} />

                      <motion.button
                        type="submit"
                        disabled={formState === "submitting"}
                        whileHover={{ scale: 1.01 }}
                        whileTap={{ scale: 0.98 }}
                        className="inline-flex items-center justify-center gap-2 px-7 py-4 rounded-2xl bg-[#0068C1] text-white text-sm font-semibold hover:bg-[#0759a1] disabled:opacity-60 disabled:cursor-not-allowed transition-all duration-200"
                      >
                        {formState === "submitting" ? (
                          <>
                            <motion.span
                              animate={{ rotate: 360 }}
                              transition={{ duration: 0.8, repeat: Infinity, ease: "linear" }}
                              className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full"
                            />
                            Sending…
                          </>
                        ) : (
                          <>
                            <Send className="w-4 h-4" />
                            Send Message
                          </>
                        )}
                      </motion.button>

                      <p className="text-xs text-gray-400 leading-relaxed">
                        Your information is kept strictly confidential and used only to respond to your enquiry.
                        For urgent legal emergencies, please call us directly.
                      </p>
                    </form>
                  )}
                </div>
              </Reveal>
            </div>
          </div>
        </Container>
      </section>

      {/* FAQ strip */}
      <section className="py-16 bg-[#F5F7F8] border-t border-gray-100">
        <Container>
          <SectionHeading
            eyebrow="Common Questions"
            title="Before you reach out"
            className="mb-10"
          />
          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5"
          >
            {[
              {
                q: "Who qualifies for free legal aid?",
                a: "We prioritise individuals who cannot afford private legal representation — particularly those facing criminal charges, housing disputes, domestic violence, or labour rights violations.",
              },
              {
                q: "How quickly will you respond?",
                a: "We respond to all enquiries within 48 business hours. Urgent legal matters should be communicated by phone for faster triage.",
              },
              {
                q: "Do you handle cases outside Abuja?",
                a: "Yes. Through our mobile clinic network and partner organisations, we handle cases across all 36 states and the FCT.",
              },
              {
                q: "Can organisations partner with CJED?",
                a: "Absolutely. We welcome partnerships with NGOs, law firms, academic institutions, government agencies, and international development organisations.",
              },
              {
                q: "Do you accept pro-bono lawyers?",
                a: "Yes, we actively recruit volunteer lawyers and paralegals to expand our service delivery. Use the Volunteer button at the bottom of any page to send us your details and CV.",
              },
              {
                q: "How do I support CJED financially?",
                a: "Use any Donate button on this site to see our Providus Bank account details. All contributions are acknowledged and used transparently in line with our annual impact reporting.",
              },
            ].map((faq) => (
              <motion.div
                key={faq.q}
                variants={fadeUp}
                className="p-6 rounded-2xl bg-white border border-gray-100 hover:border-[#0068C1]/15 hover:shadow-md transition-all duration-300"
              >
                <h4 className="text-sm font-semibold text-[#0068C1] mb-2">{faq.q}</h4>
                <p className="text-xs text-gray-500 leading-relaxed">{faq.a}</p>
              </motion.div>
            ))}
          </motion.div>
        </Container>
      </section>
    </>
  );
}