"use client";

import { useState, type FormEvent } from "react";

const BUILDING_TYPES = [
  "Warehouse / industrial shed",
  "Manufacturing plant",
  "Agricultural infrastructure",
  "Institutional / commercial",
  "Other",
];

const TIMELINES = [
  "Immediate (0–3 months)",
  "3–6 months",
  "6–12 months",
  "Just exploring",
];

const inputClasses =
  "w-full border border-white/[0.16] bg-navy px-4 py-3 text-[15px] text-white placeholder:text-ink-800 outline-none transition-colors focus:border-rust";

const labelClasses =
  "font-mono text-[11px] tracking-[0.2em] text-ink-800 uppercase";

export function EnquiryForm() {
  const [status, setStatus] = useState<"idle" | "submitted">("idle");

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);

    const lines = [
      `Name: ${form.get("name")}`,
      `Company: ${form.get("company") || "—"}`,
      `Phone: ${form.get("phone")}`,
      `Email: ${form.get("email") || "—"}`,
      `Location: ${form.get("location") || "—"}`,
      `Building type: ${form.get("buildingType")}`,
      `Approx. span / dimensions: ${form.get("span") || "—"}`,
      `Timeline: ${form.get("timeline")}`,
      "",
      "Message:",
      String(form.get("message") || "—"),
    ];

    const subject = encodeURIComponent(
      `Project enquiry — ${form.get("name")}${
        form.get("company") ? ` (${form.get("company")})` : ""
      }`,
    );
    const body = encodeURIComponent(lines.join("\n"));

    window.location.href = `mailto:orionpeb@gmail.com?subject=${subject}&body=${body}`;
    setStatus("submitted");
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-5">
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <div>
          <label className={labelClasses} htmlFor="name">
            Name
          </label>
          <input
            id="name"
            name="name"
            type="text"
            required
            className={`mt-2 ${inputClasses}`}
            placeholder="Full name"
          />
        </div>
        <div>
          <label className={labelClasses} htmlFor="company">
            Company
          </label>
          <input
            id="company"
            name="company"
            type="text"
            className={`mt-2 ${inputClasses}`}
            placeholder="Organisation (optional)"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <div>
          <label className={labelClasses} htmlFor="phone">
            Phone
          </label>
          <input
            id="phone"
            name="phone"
            type="tel"
            required
            className={`mt-2 ${inputClasses}`}
            placeholder="+91 00000 00000"
          />
        </div>
        <div>
          <label className={labelClasses} htmlFor="email">
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            className={`mt-2 ${inputClasses}`}
            placeholder="you@company.com"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <div>
          <label className={labelClasses} htmlFor="location">
            Site location
          </label>
          <input
            id="location"
            name="location"
            type="text"
            className={`mt-2 ${inputClasses}`}
            placeholder="City, district"
          />
        </div>
        <div>
          <label className={labelClasses} htmlFor="buildingType">
            Building type
          </label>
          <select
            id="buildingType"
            name="buildingType"
            required
            defaultValue=""
            className={`mt-2 ${inputClasses} appearance-none`}
          >
            <option value="" disabled>
              Select one
            </option>
            {BUILDING_TYPES.map((type) => (
              <option key={type} value={type} className="bg-navy">
                {type}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <div>
          <label className={labelClasses} htmlFor="span">
            Approx. span / dimensions
          </label>
          <input
            id="span"
            name="span"
            type="text"
            className={`mt-2 ${inputClasses}`}
            placeholder="e.g. 30m x 60m clear span"
          />
        </div>
        <div>
          <label className={labelClasses} htmlFor="timeline">
            Project timeline
          </label>
          <select
            id="timeline"
            name="timeline"
            required
            defaultValue=""
            className={`mt-2 ${inputClasses} appearance-none`}
          >
            <option value="" disabled>
              Select one
            </option>
            {TIMELINES.map((timeline) => (
              <option key={timeline} value={timeline} className="bg-navy">
                {timeline}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div>
        <label className={labelClasses} htmlFor="message">
          Message
        </label>
        <textarea
          id="message"
          name="message"
          rows={4}
          className={`mt-2 ${inputClasses} resize-none`}
          placeholder="Anything else that would help us scope this — utility factors, existing site conditions, occupancy plans."
        />
      </div>

      <button
        type="submit"
        className="mt-2 bg-rust px-[34px] py-[19px] font-mono text-[13px] tracking-[0.16em] text-white uppercase transition-colors hover:bg-rust-dark"
      >
        Send enquiry
      </button>

      {status === "submitted" && (
        <p className="font-mono text-xs tracking-[0.1em] text-apricot">
          Opening your email app with these details — send it across and
          we&apos;ll come back with a preliminary design.
        </p>
      )}
    </form>
  );
}
