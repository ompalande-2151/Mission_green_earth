import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { TextPlugin } from 'gsap/TextPlugin';
import { motion, AnimatePresence } from "framer-motion";
import { z } from "zod";
import { toast, Toaster } from "sonner";

gsap.registerPlugin(ScrollTrigger, TextPlugin);

// --- Form Schema ---
const schema = z.object({
  fullName: z
    .string()
    .trim()
    .min(2, "Please enter your full name")
    .max(100),
  company: z
    .string()
    .trim()
    .min(1, "Company name is required")
    .max(100),
  email: z
    .string()
    .trim()
    .email("Enter a valid email")
    .max(255),
  phone: z
    .string()
    .trim()
    .min(6, "Enter a valid phone number")
    .max(20),
  interest: z.enum(["buy", "sell"], { message: "Select an option" }),
  message: z
    .string()
    .trim()
    .min(5, "Message is too short")
    .max(1000)
});

const initial = {
  fullName: "",
  company: "",
  email: "",
  phone: "",
  interest: "",
  message: ""
};

// --- Local UI Components ---
const Button = ({ children, className, disabled, type = "button", size = "md", ...props }) => {
  const sizes = {
    sm: "px-4 py-2 text-xs",
    md: "px-6 py-3 text-sm",
    lg: "px-8 py-4 text-base"
  };
  return (
    <button
      type={type}
      disabled={disabled}
      className={`rounded-full font-semibold transition-all active:scale-95 disabled:opacity-50 disabled:active:scale-100 ${sizes[size]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

const Input = ({ className, ...props }) => (
  <input
    className={`flex h-12 w-full rounded-xl border border-outline/20 bg-surface px-4 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-outline/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 ${className}`}
    {...props}
  />
);

const Textarea = ({ className, ...props }) => (
  <textarea
    className={`flex min-h-[80px] w-full rounded-xl border border-outline/20 bg-surface px-4 py-2 text-sm ring-offset-background placeholder:text-outline/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 ${className}`}
    {...props}
  />
);

const Label = ({ children, className, ...props }) => (
  <label className={`text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 ${className}`} {...props}>
    {children}
  </label>
);

const Field = ({ label, error, children }) => (
  <div className="flex flex-col gap-2">
    <Label className="text-sm font-medium text-on-surface">{label}</Label>
    {children}
    <AnimatePresence>
      {error && (
        <motion.p
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          className="text-xs text-error font-medium"
        >
          {error}
        </motion.p>
      )}
    </AnimatePresence>
  </div>
);

const App = () => {
  const containerRef = useRef(null);
  const headlineRef = useRef(null);
  const subtextRef = useRef(null);

  // Form State
  const [data, setData] = useState(initial);
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);

  const update = (k, v) => {
    setData(d => ({ ...d, [k]: v }));
    setErrors(e => ({ ...e, [k]: "" }));
  };

  const onSubmit = async e => {
    e.preventDefault();
    const result = schema.safeParse(data);
    if (!result.success) {
      const fieldErrors = {};
      for (const issue of result.error.issues) {
        fieldErrors[issue.path[0]] = issue.message;
      }
      setErrors(fieldErrors);
      return;
    }
    setSubmitting(true);
    await new Promise(r => setTimeout(r, 1000));
    setSubmitting(false);
    toast.success("Enquiry sent", {
      description: "Our sustainability team will reach out to you shortly."
    });
    setData(initial);
  };

  useEffect(() => {
    const content = [
      {
        h: "Expand the Horizon Avail the Latent Potential",
        p: "We Synergize our Expertise with your aspirations"
      },
      {
        h: "Net-Zero is not a liability ! It’s a calling",
        p: "Responsible efforts today, resilient ecosystems tomorrow"
      }
    ];

    subtextRef.current.innerText = content[0].p;
    gsap.set(subtextRef.current, { opacity: 1 });

    const tl = gsap.timeline({ repeat: -1 });

    content.forEach((item, index) => {
      const nextIndex = (index + 1) % content.length;

      tl.to(headlineRef.current, {
        duration: 2,
        text: item.h,
        ease: "none"
      })
        .to({}, { duration: 3 })
        .to(headlineRef.current, {
          duration: 1,
          text: "",
          ease: "none"
        })
        .to(subtextRef.current, {
          duration: 0.5,
          opacity: 0
        }, "-=0.5")
        .set(subtextRef.current, {
          innerText: content[nextIndex].p
        })
        .to(subtextRef.current, {
          duration: 0.5,
          opacity: 1
        });
    });

    return () => tl.kill();
  }, []); const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div ref={containerRef} className="bg-surface font-body-md text-on-surface">
      <Toaster position="top-center" richColors />
      <nav className="fixed top-4 md:top-6 left-1/2 -translate-x-1/2 w-[92%] md:w-[95%] max-w-container-max z-50 bg-primary/95 backdrop-blur-xl border border-white/10 shadow-2xl rounded-[2rem] md:rounded-full transition-all duration-500 overflow-hidden">
        <div className="flex justify-between items-center w-full px-6 md:px-gutter h-[64px] md:h-[70px]">
          <img
            src="/logos/White_Text_Mission_Green_Earth_logo-01.png"
            alt="Mission Green Earth"
            className="h-[70px] md:h-[120px] w-auto object-cover"
          />

          {/* Desktop Nav */}
          <div className="hidden md:flex gap-lg items-center font-label-sm text-label-sm uppercase tracking-widest text-white/70">
            <a href="#about" className="hover:text-secondary-fixed transition-colors">About Us</a>
            <a href="#services" className="hover:text-secondary-fixed transition-colors">Services</a>
            <a href="#enquiry" className="hover:text-secondary-fixed transition-colors">Contact Us</a>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden text-white p-5"
          >
            <span className="material-symbols-outlined">{isMenuOpen ? 'close' : 'menu'}</span>
          </button>
        </div>

        {/* Mobile Nav Menu */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="md:hidden border-t border-white/10 bg-primary/95 px-6 py-6"
            >
              <div className="flex flex-col gap-6 font-label-sm text-label-sm uppercase tracking-widest text-white/70">
                <a href="#about" onClick={() => setIsMenuOpen(false)} className="hover:text-secondary-fixed transition-colors">About Us</a>
                <a href="#services" onClick={() => setIsMenuOpen(false)} className="hover:text-secondary-fixed transition-colors">Services</a>
                <a href="#enquiry" onClick={() => setIsMenuOpen(false)} className="hover:text-secondary-fixed transition-colors">Contact Us</a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      <main className="story-scroll-container">
        <section className="flow-section bg-[#9AD872] px-6 md:px-gutter">
          <div className="max-w-container-max w-full grid grid-cols-1 md:grid-cols-2 gap-xl items-center pt-20 md:pt-0">
            <div className="flex flex-col gap-md text-center md:text-left items-center md:items-start z-10 w-full">
              <span className="font-label-sm text-[10px] md:text-label-sm uppercase tracking-[0.3em] text-primary/80 font-bold">
                The sustainability renaissance
              </span>
              <h1
                ref={headlineRef}
                className="font-display text-[28px] sm:text-4xl md:text-display uppercase text-primary tracking-tighter leading-[1.1] md:leading-[0.9] h-[100px] sm:h-[120px] md:h-[240px] mb-2 md:mb-6 flex items-center md:items-start justify-center md:justify-start"
              >
              </h1>
              <p
                ref={subtextRef}
                className="font-body-lg text-sm md:text-body-lg text-primary/80 max-w-md font-medium py-2 md:py-0"
              >
              </p>
            </div>

            <div className="flex justify-center items-center w-full mt-8 md:mt-0">
              <div className="relative h-[240px] md:h-[400px] w-full max-w-[800px] rounded-2xl overflow-hidden transform hover:scale-[1.02] transition-transform duration-700">
                <div
                  className="absolute inset-0 bg-cover bg-center"
                  style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuBxJv0eR3gU1VRBXcqKcm9e4Dxsa4gemrA0DVD6haRMR4AWrZB7GmIxIc_gn3Y-BeP_bUvMNJm1dtKFOoB4-aEAAkwBF6v4ICMt6a0kgXKGy0XEy2OvciXjnK-t_Awjzg4MppWAV5_2W3RM0RXdkSJzVSEmIs6q35vDHmOoE-7uWkOU8NFvN7bd3rYYEv802o-1sNKMmMi8iVn5EqxGG8FY3yTBKSLfh9wbn7SggNTTiRbZzmwESmyRvlBHxmYwJ3cArBjidDwTl24')" }}
                ></div>
                <div className="absolute inset-0 bg-primary/10"></div>
              </div>
            </div>
          </div>
        </section>

        <section id="about" className="flow-section">
          <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuDWVEC-0sWyLfqMfw0_dMh-MvceMhMd797OJ-cLhThjgGXGK4J-ZYsQpNAmwfznQmuv_rMxfwMZncS4JGb4hAJE_LKAVNzWa5XUGzVEOdkwd2BTtt0Vr4lE-2W_YrSI6jhAw3H4hhb4Unwi_OUaEWtH4rIFBW4eF9YPcREZbYqtkxFXR6sRwjc4XBGGTOs2LEKQn9Vj4NNUlPyXA_56pLf2O2ksOYmy2dDhbIIGl_wIuikf1WM0ZHKy2FDLDKn1k4lclmBmg3Nq3oI')" }}></div>
          <div className="absolute inset-0 bg-primary-container/20 backdrop-blur-sm"></div>
          <div className="relative z-10 w-full max-w-container-max px-6 md:px-gutter">
            <div className="flex flex-col gap-lg md:gap-xl">
              <div className="max-w-3xl">
                <h2 className="font-display text-3xl md:text-h1 uppercase text-white tracking-tight border-l-4 border-secondary-fixed pl-4 md:pl-md mb-6 md:mb-md">
                  Mission Green Earth: Where Shared Passion Shapes the Future of Sustainability
                </h2>
                <div className="flex flex-col gap-6 md:gap-md text-white text-base md:text-body-lg">
                  <p>Global warming, driven by the increase in greenhouse gases (GHGs) is having profound effects on the planet's climate impacting adversely to the sustainable existence of the Flora and Fauna in future. Sustainability is crucial for several key reasons, both for the environment and for the long-term well-being of society and the global economy.</p>
                  <p>Mission Green Earth is committed in providing End to End solutions helping all entities involved in the cause i.e. on one hand helping the project owners to get incentivize through Carbon Credits and on the other, helping organizations to meet their Net Zero and SDG goals.</p>
                  <p className="font-bold text-secondary-fixed italic text-lg md:text-xl">Equipped with seasoned and agile workforce, powered with cutting edge information and communications technologies, Mission Green Earth becomes an ideal Co-pilot in this novel calling.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="services" className="flow-section bg-[#f0fdf4]">
          <div className="grid grid-cols-1 md:grid-cols-2 w-full h-full">
            <div className="relative overflow-hidden min-h-[300px] md:min-h-full">
              <img
                alt="Sustainability Trees and Plants"
                className="w-full h-full object-cover hover:scale-105 transition-all duration-700 absolute inset-0"
                src="/sustainability_plants_trees.png"
              />
            </div>
            <div className="flex flex-col justify-center px-6 md:px-xl py-12 md:py-0 bg-surface-container-low">
              <h2 className="font-display text-4xl md:text-h1 uppercase text-primary mb-8 md:mb-lg tracking-tighter">Carbon Credit Parameters</h2>
              <div className="flex flex-col gap-md">
                <div className="border-l-2 border-primary pl-md">
                  <h4 className="font-bold text-lg uppercase">1. Equivalent CO2 (tCO2e)</h4>
                  <p className="text-on-surface-variant text-body-md italic">Represents total GHG emissions reduced, removed, or avoided. 1 Credit = 1 Metric Ton CO2e.</p>
                </div>
                <div className="border-l-2 border-primary pl-md">
                  <h4 className="font-bold text-lg uppercase">2. Number of Carbon Credits</h4>
                  <p className="text-on-surface-variant text-body-md italic">Indicates total verified credits generated, supporting Net Zero, ESG, and SDG commitments.</p>
                </div>
                <div className="border-l-2 border-primary pl-md">
                  <h4 className="font-bold text-lg uppercase">3. Seller Information</h4>
                  <p className="text-on-surface-variant text-body-md italic">Verified details of project owner, registry, and location ensuring trust and traceability.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="flow-section">
          <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: "url('/green_leaves_canopy.png')" }}></div>
          <div className="absolute inset-0 bg-primary/90 mix-blend-multiply"></div>
          <div className="relative z-10 w-full max-w-container-max px-6 md:px-gutter">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 md:gap-lg text-white">
              <div className="flex flex-col gap-4">
                <h3 className="font-display text-2xl md:text-h2 text-secondary-fixed uppercase leading-tight">Verified Sustainability Assets</h3>
                <p className="text-sm md:text-body-md opacity-80">Undergoes structured validation aligned with internationally recognized climate standards.</p>
              </div>
              <div className="flex flex-col gap-4">
                <h3 className="font-display text-2xl md:text-h2 text-secondary-fixed uppercase leading-tight">Environmental Accountability</h3>
                <p className="text-sm md:text-body-md opacity-80">Ensures that environmental claims are backed by rigorous scientific evidence and data.</p>
              </div>
              <div className="flex flex-col gap-4">
                <h3 className="font-display text-2xl md:text-h2 text-secondary-fixed uppercase leading-tight">Tangible Climate Impact</h3>
                <p className="text-sm md:text-body-md opacity-80">Focuses on initiatives that create measurable, long-term benefits for ecosystems worldwide.</p>
              </div>
            </div>
          </div>
        </section>

        <section className="flow-section bg-primary-container pb-20">
          <div className="max-w-container-max w-full px-6 md:px-gutter flex flex-col items-center">
            <div className="w-full border-t border-white/10 pt-10 md:pt-xl flex flex-col items-center text-center">
              <h2 className="font-display text-4xl md:text-[100px] lg:text-[120px] leading-tight md:leading-none uppercase text-white tracking-tighter mb-8 md:mb-xl">
                Share your Net Zero<br className="hidden md:block" /> journey with us!
              </h2>
              <p className="font-body-lg text-lg md:text-body-lg text-on-primary-container/80 mb-6 md:mb-lg">Let us be your Net Zero Sarthi</p>
            </div>
          </div>
        </section>

        <section id="enquiry" className="flow-section bg-surface-container-low py-20 lg:py-xl overflow-y-auto">
          <div className="mx-auto max-w-7xl px-6 md:px-gutter w-full">
            <div className="flex flex-col lg:flex-row gap-16 lg:gap-xl items-start lg:items-center">
              {/* Left Column: Branding & Impact */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="flex flex-col items-center lg:items-start text-center lg:text-left gap-lg w-full lg:w-1/2"
              >
                <img
                  src="/logos/Mission_Green_Earth_logo-02.png"
                  alt="Mission Green Earth"
                  className="w-full max-w-[300px] md:max-w-[400px] h-auto object-contain"
                />
                <div className="flex flex-col gap-md">
                  <h2 className="font-display text-4xl md:text-h1 uppercase text-primary tracking-tighter leading-tight">
                    Partner with the <span className="text-secondary">Pioneers</span> of Sustainability
                  </h2>
                  <p className="text-lg md:text-body-lg text-on-surface-variant max-w-md mx-auto lg:mx-0">
                    Whether you're looking to offset your footprint or monetize your green initiatives, our experts are here to guide you every step of the way.
                  </p>
                </div>
              </motion.div>

              {/* Right Column: Form */}
              <div className="flex flex-col gap-md w-full lg:w-1/2">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5 }}
                  className="text-left"
                >
                  <span className="text-xs font-semibold uppercase tracking-[0.2em] text-secondary">
                    Inquiry Form
                  </span>
                  <h2 className="mt-3 text-3xl font-bold tracking-tight text-on-surface md:text-4xl uppercase font-display">
                    Buy or Sell Carbon Credits
                  </h2>
                </motion.div>

                <motion.form
                  onSubmit={onSubmit}
                  noValidate
                  initial={{ opacity: 0, x: 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6 }}
                  className="rounded-3xl border border-outline/10 bg-surface p-6 md:p-8 shadow-2xl"
                >
                  <div className="grid gap-5 md:grid-cols-2">
                    <Field label="Full Name" error={errors.fullName}>
                      <Input
                        value={data.fullName}
                        onChange={e => update("fullName", e.target.value)}
                        placeholder="Jane Doe"
                      />
                    </Field>
                    <Field label="Company Name" error={errors.company}>
                      <Input
                        value={data.company}
                        onChange={e => update("company", e.target.value)}
                        placeholder="Acme Inc."
                      />
                    </Field>
                    <Field label="Email Address" error={errors.email}>
                      <Input
                        type="email"
                        value={data.email}
                        onChange={e => update("email", e.target.value)}
                        placeholder="jane@company.com"
                      />
                    </Field>
                    <Field label="Phone Number" error={errors.phone}>
                      <Input
                        type="tel"
                        value={data.phone}
                        onChange={e => update("phone", e.target.value)}
                        placeholder="+1 555 000 0000"
                      />
                    </Field>
                    <div className="md:col-span-2">
                      <Field label="Interested In" error={errors.interest}>
                        <select
                          value={data.interest}
                          onChange={e => update("interest", e.target.value)}
                          className="flex h-12 w-full rounded-xl border border-outline/20 bg-surface-container-lowest px-4 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                        >
                          <option value="">Select an option</option>
                          <option value="buy">Buy Carbon Credits</option>
                          <option value="sell">Sell Carbon Credits</option>
                        </select>
                      </Field>
                    </div>
                  </div>

                  <div className="mt-5">
                    <Field label="Message" error={errors.message}>
                      <Textarea
                        rows={4}
                        value={data.message}
                        onChange={e => update("message", e.target.value)}
                        placeholder="Tell us about your goals or project..."
                      />
                    </Field>
                  </div>

                  <div className="mt-7">
                    <Button
                      type="submit"
                      size="lg"
                      disabled={submitting}
                      className="w-full bg-primary text-on-primary hover:bg-secondary transition-colors duration-300 rounded-xl py-4 shadow-lg"
                    >
                      {submitting ? "Sending..." : "Submit Enquiry"}
                    </Button>
                  </div>
                </motion.form>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-tertiary dark:bg-primary w-full border-t border-white/5">
        <div className="flex flex-col md:flex-row justify-between items-center w-full px-gutter py-xl gap-xl max-w-container-max mx-auto">
          <div className="font-display text-h2 text-on-tertiary dark:text-primary-fixed uppercase tracking-tighter">Mission Green Earth</div>

          <div className="flex flex-wrap justify-center gap-md items-center">
            <a href="https://instagram.com/mstblockchain" target="_blank" rel="noopener noreferrer" className="text-on-tertiary/60 hover:text-secondary-fixed transition-colors duration-300" title="Instagram">
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" /></svg>
            </a>
            <a href="https://facebook.com/MSTBlockchain" target="_blank" rel="noopener noreferrer" className="text-on-tertiary/60 hover:text-secondary-fixed transition-colors duration-300" title="Facebook">
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" /></svg>
            </a>
            <a href="https://t.me/MSTBlockchain" target="_blank" rel="noopener noreferrer" className="text-on-tertiary/60 hover:text-secondary-fixed transition-colors duration-300" title="Telegram">
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M11.944 0C5.352 0 0 5.352 0 12s5.352 12 12 12 12-5.352 12-12S18.536 0 11.944 0zM17.562 8.161c-.18 1.898-1.062 7.125-1.508 9.505-.19.99-.548 1.32-.903 1.352-.772.072-1.358-.508-2.106-1.002-1.171-.772-1.832-1.252-2.969-2.002-1.312-.865-.461-1.341.286-2.115.196-.203 3.601-3.3 3.667-3.58.008-.036.016-.17-.059-.236-.075-.066-.184-.043-.264-.025-.113.024-1.912 1.214-5.401 3.571-.51.351-.973.521-1.389.512-.46-.01-1.343-.26-2.001-.472-.806-.262-1.449-.4-1.393-.847.029-.233.351-.472.964-.716 3.774-1.644 6.291-2.727 7.551-3.249 3.593-1.488 4.338-1.748 4.823-1.756.107-.002.344.024.498.15.13.105.166.248.178.35.013.111.026.355.011.536z" /></svg>
            </a>
            <a href="https://x.com/MasterStrokeTec" target="_blank" rel="noopener noreferrer" className="text-on-tertiary/60 hover:text-secondary-fixed transition-colors duration-300" title="X (Twitter)">
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.045 4.126H5.078z" /></svg>
            </a>
            <a href="https://linkedin.com/company/masterstroke-technosoft" target="_blank" rel="noopener noreferrer" className="text-on-tertiary/60 hover:text-secondary-fixed transition-colors duration-300" title="LinkedIn">
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" /></svg>
            </a>
            <a href="https://youtube.com/@MasterstrokeTec" target="_blank" rel="noopener noreferrer" className="text-on-tertiary/60 hover:text-secondary-fixed transition-colors duration-300" title="YouTube">
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" /></svg>
            </a>
          </div>

          <div className="font-label-sm text-label-sm uppercase tracking-widest text-tertiary-fixed-dim opacity-60 text-center md:text-right">
            © Mission Green Earth.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;
