import React, { useEffect, useState } from "react";

/**
 * Updated App.jsx
 * - Professional color palette & spacing (Tailwind classes)
 * - Per-field validation (name, email, message)
 * - Visual error states (red border + helper text)
 * - Accessible toast popup (aria-live) on successful submit
 * - Disabled submit while sending
 *
 * Notes:
 * - This file expects Tailwind to be configured and `src/index.css` to be loaded by main.jsx.
 * - Replace GitHub / image links as needed.
 */

export default function App() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [mailSent, setMailSent] = useState(false);

  // Simple email regex (reasonable for UX)
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  // Validate all fields and return errors object
  const validateAll = (values) => {
    const e = {};
    if (!values.name || values.name.trim().length < 2) {
      e.name = "Please enter your name (min 2 characters).";
    }
    if (!values.email || !emailRegex.test(values.email.trim())) {
      e.email = "Please enter a valid email address.";
    }
    if (!values.message || values.message.trim().length < 10) {
      e.message = "Message must be at least 10 characters.";
    }
    return e;
  };

  // Validate a single field (used on blur/change)
  const validateField = (name, value) => {
    if (name === "name") {
      if (!value || value.trim().length < 2) return "Please enter your name (min 2 characters).";
      return "";
    }
    if (name === "email") {
      if (!value || !emailRegex.test(value.trim())) return "Please enter a valid email address.";
      return "";
    }
    if (name === "message") {
      if (!value || value.trim().length < 10) return "Message must be at least 10 characters.";
      return "";
    }
    return "";
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    // Live-validate field as user types (clear error when valid)
    setErrors((prev) => {
      const copy = { ...prev };
      const err = validateField(name, value);
      if (err) copy[name] = err;
      else delete copy[name];
      return copy;
    });
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    const err = validateField(name, value);
    setErrors((prev) => ({ ...prev, ...(err ? { [name]: err } : {}) }));
    if (!err) {
      // remove any stale error
      setErrors((prev) => {
        const copy = { ...prev };
        delete copy[name];
        return copy;
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const found = validateAll(form);
    setErrors(found);

    if (Object.keys(found).length > 0) {
      // focus first invalid field for UX
      const firstField = Object.keys(found)[0];
      const el = document.querySelector(`[name="${firstField}"]`);
      if (el) el.focus();
      return;
    }

    // simulate sending
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setMailSent(true);
      setForm({ name: "", email: "", message: "" });
      // hide toast after 3s
      setTimeout(() => setMailSent(false), 3000);
    }, 700);
  };

  // keyboard-escape to dismiss toast quickly
  useEffect(() => {
    const onKey = (evt) => {
      if (evt.key === "Escape") setMailSent(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans selection:bg-indigo-100 selection:text-indigo-900">
      {/* NAV / HEADER */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-slate-200">
        <div className="max-w-6xl mx-auto px-6 py-6 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-full overflow-hidden border border-slate-200 shadow-sm">
              <img src="/Raghav.jpeg" alt="Sunil Gowda" className="w-full h-full object-cover" />
            </div>
            <div>
              <div className="text-base text-slate-800 font-semibold">SUNIL GOWDA S</div>
              <div className="text-sm text-slate-500">MCA - Bengaluru</div>
            </div>
          </div>

          <nav className="hidden md:flex gap-6 text-sm text-slate-600">
            <a href="#experience" className="hover:text-slate-900">Experience</a>
            <a href="#projects" className="hover:text-slate-900">Projects</a>
            <a href="#skills" className="hover:text-slate-900">Skills</a>
            <a href="#simulations" className="hover:text-slate-900">Job Simulations</a>
            <a href="#works" className="hover:text-slate-900">My Works</a>
            <a href="#contact" className="hover:text-slate-900">Contact</a>
          </nav>
        </div>
      </header>

      {/* HERO / SUMMARY */}
      <main className="max-w-6xl mx-auto px-6 pb-24">
        <section className="mt-10 grid md:grid-cols-3 gap-8 items-center">
          <div className="md:col-span-2">
            <h1 className="text-4xl md:text-4xl font-extrabold leading-tight tracking-tight text-slate-900">
              Aspiring Software Developer - curious, driven, building.
            </h1>

            <p className="mt-4 text-lg text-slate-600 max-w-3xl">
              Enthusiastic aspiring software developer with a strong foundation in full-stack development and data
              fundamentals. Passionate about solving problems with clean code, learning new technologies, and contributing
              to real-world projects. Open to opportunities to grow, collaborate, and build impactful software.
            </p>

            <div className="mt-6 flex flex-wrap gap-3">
              <a
                href="/resume.pdf"
                className="inline-flex items-center gap-2 px-4 py-2 border border-slate-200 rounded-md text-sm hover:bg-slate-50"
              >
                Download Resume
              </a>

              <a
                href="#contact"
                className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-md text-sm hover:bg-indigo-700"
              >
                Contact
              </a>

              <a
                href="https://github.com/Sunil0623"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 border border-slate-200 rounded-md text-sm hover:bg-slate-50"
              >
                GitHub
              </a>
            </div>

            <div className="mt-5 text-sm text-slate-500">
              Bommanahalli, Bengaluru - 560068 · +91 9206241246 ·{" "}
              <a className="underline text-indigo-600" href="mailto:raghav0623.tech@gmail.com">
                raghav0623.tech@gmail.com
              </a>
            </div>

            <div className="mt-6 flex flex-wrap gap-3 text-sm">
              <div className="px-3 py-1 bg-white border rounded-full text-indigo-800 font-medium">9+ months SBLC (Maker)</div>
              <div className="px-3 py-1 bg-white border rounded-full text-indigo-800 font-medium">90% accuracy</div>
              <div className="px-3 py-1 bg-white border rounded-full text-indigo-800 font-medium">MCA</div>
            </div>
          </div>

          <aside className="flex flex-col items-center">
            <div className="w-52 h-52 rounded-xl overflow-hidden border border-slate-200 shadow-lg">
              <img src="/Raghav.jpeg" alt="Sunil profile" className="w-full h-full object-cover" />
            </div>
            <div className="mt-4 text-sm text-slate-500 text-center">Sunil Gowda S<br />Aspiring software professional</div>
          </aside>
        </section>

        {/* EXPERIENCE */}
        <section id="experience" className="mt-12">
          <h2 className="text-2xl font-semibold mb-6 text-slate-900">Work Experience</h2>

          <div className="grid gap-6">
            <article className="bg-white rounded-2xl shadow-md border p-6">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="text-lg font-semibold">Trade Analyst Support (Contract Employee)</h3>
                  <div className="text-sm text-slate-500">Randstad India - Client: J.P. Morgan Chase & Co. · Feb 2025 – Present</div>
                </div>
                <div className="text-sm text-slate-600 font-medium">Maker · SBLC</div>
              </div>

              <ul className="mt-4 list-disc ml-5 text-slate-700 space-y-2">
                <li>Employee at Randstad working onsite for J.P. Morgan Chase &amp; Co. in Trade Finance.</li>
                <li>Maker in Standby Letters of Credit (SBLC) product — performed document preparation, validation and reconciliation to ensure regulatory compliance.</li>
                <li>Achieved ~90% accuracy across processed transactions through careful checks and standard operating procedures.</li>
                <li>Extensive use of Excel and Word for data validation, reconciliation, and SBLC documentation.</li>
                <li>Collaborated with operations and compliance teams to resolve discrepancies and maintain SLA targets.</li>
              </ul>
            </article>

            <article className="bg-white rounded-2xl shadow-md border p-6">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="text-lg font-semibold">Transaction Processing Officer (Maker)</h3>
                  <div className="text-sm text-slate-500">Mphasis Limited - Client: J.P. Morgan Chase & Co. · Jul 2024 – Oct 2024</div>
                </div>
                <div className="text-sm text-slate-600 font-medium">Maker · SBLC</div>
              </div>

              <ul className="mt-4 list-disc ml-5 text-slate-700 space-y-2">
                <li>Served as a maker for SBLC processing — responsible for accurate transaction handling and document checks.</li>
                <li>Maintained a 90% accuracy rate while processing and reconciling financial documentation.</li>
                <li>Used Excel and Word extensively to maintain records and prepare documents for checks and approvals.</li>
                <li>Worked with cross-functional teams to improve workflows and reduce rework.</li>
              </ul>
            </article>

            <article className="bg-white rounded-2xl shadow-md border p-6">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="text-lg font-semibold">Full Stack Developer Intern</h3>
                  <div className="text-sm text-slate-500">Cranes Software International Limited · Jul 2023 – Oct 2023</div>
                </div>
                <div className="text-sm text-slate-600 font-medium">Java · MySQL</div>
              </div>

              <ul className="mt-4 list-disc ml-5 text-slate-700 space-y-2">
                <li>Contributed to attendance tracking system and landing pages used internally.</li>
                <li>Implemented role-based access features and optimized SQL queries for performance.</li>
                <li>Worked with the team in an Agile environment and deployed databases to cloud for scalability.</li>
              </ul>
            </article>
          </div>
        </section>

        {/* PROJECTS */}
        <section id="projects" className="mt-12">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-semibold text-slate-900">Projects</h2>
            <a className="text-sm text-slate-500 underline" href="https://github.com/Sunil0623?tab=repositories" target="_blank" rel="noreferrer">View all on GitHub</a>
          </div>

          <div className="mt-6 grid md:grid-cols-2 gap-6">
            {/* Project cards */}
            <div className="bg-white rounded-2xl border shadow-sm p-6 hover:shadow-md transition">
              <h4 className="font-semibold">HubSpot Integration Project</h4>
              <p className="mt-2 text-sm text-slate-600">Built APIs to sync data between HubSpot, Airtable and Notion using FastAPI and Redis for caching.</p>
              <div className="mt-3 text-sm text-slate-700">Skills: Python · FastAPI · Redis · React</div>
              <a href="https://github.com/Sunil0623/Hubspot_Integration" target="_blank" rel="noreferrer" className="mt-4 inline-block text-indigo-600">View on GitHub →</a>
            </div>

            <div className="bg-white rounded-2xl border shadow-sm p-6 hover:shadow-md transition">
              <h4 className="font-semibold">Paws & Pixels - Pet Adoption Platform</h4>
              <p className="mt-2 text-sm text-slate-600">Cloud-hosted platform with location-based search using Google Maps API and caching for performance.</p>
              <div className="mt-3 text-sm text-slate-700">Skills: Java · PostgreSQL · Google Maps API</div>
              <a href="https://github.com/Sunil0623/paws-pixels" target="_blank" rel="noreferrer" className="mt-4 inline-block text-indigo-600">View on GitHub →</a>
            </div>

            <div className="bg-white rounded-2xl border shadow-sm p-6 hover:shadow-md transition">
              <h4 className="font-semibold">Precision Performance Analysis - Exam Management</h4>
              <p className="mt-2 text-sm text-slate-600">Secure exam portal with role-based access and analytics for student performance.</p>
              <div className="mt-3 text-sm text-slate-700">Skills: Java · JSP · MySQL</div>
              <a href="https://github.com/Sunil0623/Precession-Performance-analysis-" target="_blank" rel="noreferrer" className="mt-4 inline-block text-indigo-600">View on GitHub →</a>
            </div>

            <div className="bg-white rounded-2xl border shadow-sm p-6 hover:shadow-md transition">
              <h4 className="font-semibold">Prediction Of Autism — ML Project</h4>
              <p className="mt-2 text-sm text-slate-600">Classification models built with scikit-learn achieving ~92% accuracy after preprocessing.</p>
              <div className="mt-3 text-sm text-slate-700">Skills: Python · pandas · scikit-learn</div>
              <a href="https://github.com/Sunil0623/Sunil0623" target="_blank" rel="noreferrer" className="mt-4 inline-block text-indigo-600">View on GitHub →</a>
            </div>
          </div>
        </section>

        {/* SKILLS */}
        <section id="skills" className="mt-12">
          <h2 className="text-2xl font-semibold mb-4 text-slate-900">Skills</h2>

          <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {[
              'Python', 'Java', 'C++', 'JavaScript', 'SQL',
              'pandas', 'NumPy', 'scikit-learn',
              'MySQL', 'PostgreSQL', 'SQL Server', 'Excel',
              'AWS (EC2, S3, Lambda)', 'Kubernetes', 'Git', 'FastAPI', 'Redis', 'React'
            ].map((s) => (
              <div key={s} className="bg-white border rounded-lg p-3 text-sm font-medium text-slate-800 shadow-sm">{s}</div>
            ))}
          </div>
        </section>

        {/* JOB SIMULATIONS */}
        <section id="simulations" className="mt-12">
          <h2 className="text-2xl font-semibold mb-4 text-slate-900">Job Simulations & Virtual Experience</h2>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white rounded-2xl border p-6 shadow-sm">
              <h4 className="font-semibold">Skyscanner - Front-End Simulation (Forage)</h4>
              <p className="mt-2 text-sm text-slate-600">Completed the Skyscanner front-end simulation focusing on UI components, responsive design and accessibility.</p>
            </div>

            <div className="bg-white rounded-2xl border p-6 shadow-sm">
              <h4 className="font-semibold">J.P. Morgan - Midas Core Virtual Experience</h4>
              <p className="mt-2 text-sm text-slate-600">Completed the Midas Core program focusing on software engineering practices and trading platform fundamentals.</p>
            </div>
          </div>
        </section>

        {/* MY WORKS (Live portfolios) */}
        <section id="works" className="mt-12">
          <h2 className="text-2xl font-semibold mb-4 text-slate-900">Live Works</h2>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white rounded-2xl border p-6 shadow-sm flex flex-col justify-between">
              <div>
                <h4 className="font-semibold">Portfolio One (Live)</h4>
                <p className="mt-2 text-sm text-slate-600">A dynamic web application showcasing modern UI design and seamless user experience, built with a focus on performance and scalability.</p>
              </div>
              <a href="https://sunil0623.github.io/ModernPortfolio" target="_blank" rel="noreferrer" className="mt-4 text-indigo-600">Visit →</a>
            </div>

            <div className="bg-white rounded-2xl border p-6 shadow-sm flex flex-col justify-between">
              <div>
                <h4 className="font-semibold">Portfolio Two (Live)</h4>
                <p className="mt-2 text-sm text-slate-600">An interactive platform demonstrating advanced frontend development skills and responsive design principles.</p>
              </div>
              <a href="https://sunil0623.github.io/resume/" target="_blank" rel="noreferrer" className="mt-4 text-indigo-600">Visit →</a>
            </div>

            <div className="bg-white rounded-2xl border p-6 shadow-sm flex flex-col justify-between">
              <div>
                <h4 className="font-semibold">Portfolio Three (Live)</h4>
                <p className="mt-2 text-sm text-slate-600">A fully responsive, user-friendly project designed to highlight creative problem-solving and clean, maintainable code.</p>
              </div>
              <a href="https://sunil0623.github.io/Portfolio/" target="_blank" rel="noreferrer" className="mt-4 text-indigo-600">Visit →</a>
            </div>
          </div>
        </section>

        {/* CONTACT */}
        <section id="contact" className="mt-12">
          <h2 className="text-2xl font-semibold mb-4 text-slate-900">Contact</h2>

          <div className="bg-white rounded-2xl border p-6 max-w-2xl">
            <form onSubmit={handleSubmit} className="grid gap-4" noValidate>
              <div>
                <label htmlFor="name" className="sr-only">Name</label>
                <input
                  id="name"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder="Your name"
                  aria-invalid={errors.name ? "true" : "false"}
                  aria-describedby={errors.name ? "err-name" : undefined}
                  className={`p-3 rounded-md w-full focus:outline-none ${
                    errors.name ? "border-red-500 ring-1 ring-red-200" : "border border-slate-300 focus:border-indigo-600"
                  }`}
                />
                {errors.name && <p id="err-name" className="text-sm text-red-600 mt-1">{errors.name}</p>}
              </div>

              <div>
                <label htmlFor="email" className="sr-only">Email</label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={form.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder="Your email"
                  aria-invalid={errors.email ? "true" : "false"}
                  aria-describedby={errors.email ? "err-email" : undefined}
                  className={`p-3 rounded-md w-full focus:outline-none ${
                    errors.email ? "border-red-500 ring-1 ring-red-200" : "border border-slate-300 focus:border-indigo-600"
                  }`}
                />
                {errors.email && <p id="err-email" className="text-sm text-red-600 mt-1">{errors.email}</p>}
              </div>

              <div>
                <label htmlFor="message" className="sr-only">Message</label>
                <textarea
                  id="message"
                  name="message"
                  value={form.message}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder="Message"
                  rows={4}
                  aria-invalid={errors.message ? "true" : "false"}
                  aria-describedby={errors.message ? "err-message" : undefined}
                  className={`p-3 rounded-md w-full focus:outline-none ${
                    errors.message ? "border-red-500 ring-1 ring-red-200" : "border border-slate-300 focus:border-indigo-600"
                  }`}
                />
                {errors.message && <p id="err-message" className="text-sm text-red-600 mt-1">{errors.message}</p>}
              </div>

              <div className="flex items-center gap-4">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`px-4 py-2 rounded-md text-white ${isSubmitting ? "bg-indigo-300 cursor-wait" : "bg-indigo-600 hover:bg-indigo-700"}`}
                >
                  {isSubmitting ? "Sending..." : "Send Message"}
                </button>
              </div>
            </form>

            {/* Toast / pop-up (accessible) */}
            <div aria-live="polite" className="relative">
              {mailSent && (
                <div
                  role="status"
                  className="fixed right-6 bottom-6 bg-indigo-900 text-white px-4 py-3 rounded-lg shadow-lg animate-toast"
                >
                  Mail Sent Successfully ✓
                </div>
              )}
            </div>
          </div>
        </section>
      </main>

      {/* FOOTER */}
      <footer className="bg-white border-t">
        <div className="max-w-6xl mx-auto px-6 py-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="text-sm text-slate-600">© {new Date().getFullYear()} Sunil Gowda S - Built with React + Tailwind</div>
          <div className="flex items-center gap-4">
            <a href="https://github.com/Sunil0623" target="_blank" rel="noreferrer" className="text-sm text-slate-600 hover:text-slate-900">GitHub</a>
            <a href="https://www.linkedin.com/in/sunil-gowda-s-9934832b5/" target="_blank" rel="noreferrer" className="text-sm text-slate-600 hover:text-slate-900">LinkedIn</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
