"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  ArrowUp01Icon,
  Call02Icon,
  Clock01Icon,
  Facebook01Icon,
  InstagramIcon,
  Linkedin01Icon,
  Location05Icon,
  Mail01Icon,
} from "@hugeicons/core-free-icons";


const LOGO = "/potto_logo.svg";

const PRODUCTS = [
  "Potto Secure",
  "Potto Assess",
  "Potto Pay",
  "Potto Pocket",
  "Potto Store",
  "Potto Admin",
  "Potto Comm",
];

const COMPANY = [
  { label: "Features", href: "#features" },
  { label: "Solutions", href: "#solutions" },
  { label: "Potto Suite", href: "#suite" },
  { label: "Watch demo", href: "#intro-video" },
  { label: "Testimonials", href: "#testimonials" },
];

const PHONES = ["+234 808 472 4276", "+234 812 557 8825"];
const EMAILS = ["Info@potto.ng", "support@potto.ng"];

const OFFICE_HOURS = [
  { days: "Monday – Friday", time: "8AM – 4PM" },
  { days: "Saturday", time: "8AM – 12 Noon" },
];

const ADDRESS =
  "House 83 Coal City Gardens, Behind Central Bank of Nigeria, Okpara Avenue, Enugu.";


const SOCIALS = [
  {
    label: "Potto on Facebook",
    icon: Facebook01Icon,
    href: "https://www.facebook.com/potto.ngr",
  },
  {
    label: "Potto on Instagram",
    icon: InstagramIcon,
    href: "https://www.instagram.com/potto.ng",
  },
  {
    label: "Potto on LinkedIn",
    icon: Linkedin01Icon,
    href: "https://www.linkedin.com/company/potto-ng",
  },
];


const BUILD_YEAR = new Date().getFullYear();

export default function SiteFooter() {
  
  const [year, setYear] = useState(BUILD_YEAR);
  useEffect(() => setYear(new Date().getFullYear()), []);

  return (
    <footer
      data-nav-tone="light"
      data-nav-bg="var(--canvas)"
      className="relative pt-20 pb-10 text-ink md:pt-24"
    >
      <div className="mx-auto w-full max-w-7xl px-5 md:px-6 lg:px-8">
        <div className="grid gap-12 sm:grid-cols-2 md:grid-cols-3 lg:gap-10 xl:grid-cols-[1.5fr_1fr_1fr_1.5fr_1fr]">
          <div className="max-w-sm">
            <Link href="/" className="inline-flex items-center">
              <Image
                src={LOGO}
                alt="Potto"
                width={148}
                height={55}
                className="h-8 w-auto brightness-0"
              />
            </Link>

            <p className="mt-5 text-[0.95rem] leading-8 text-soft">
              A security management solution built to keep students safe — from
              early detection to quick response, using leading-edge technologies.
            </p>

            <p className="mt-6 text-sm text-soft" suppressHydrationWarning>
              © {year} Potto. All rights reserved
            </p>
            <a
              href="https://www.instagram.com/potto.ng"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-1 inline-block text-sm font-semibold text-brand transition-colors hover:text-brand-teal"
            >
              @Potto.ng
            </a>

            <ul className="mt-6 flex gap-2.5">
              {SOCIALS.map((social) => (
                <li key={social.label}>
                  <a
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.label}
                    className="grid h-10 w-10 place-items-center rounded-full bg-ink/5 text-ink transition hover:bg-brand hover:text-brand-fg"
                  >
                    <HugeiconsIcon icon={social.icon} size={17} strokeWidth={2} />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="font-header text-sm font-bold uppercase tracking-[0.14em]">
              Products
            </h2>
            <ul className="mt-5 space-y-3">
              {PRODUCTS.map((product) => (
                <li key={product}>
                  <Link
                    href="#suite"
                    className="text-[0.95rem] text-soft transition-colors hover:text-brand"
                  >
                    {product}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="font-header text-sm font-bold uppercase tracking-[0.14em]">
              Company
            </h2>
            <ul className="mt-5 space-y-3">
              {COMPANY.map((item) => (
                <li key={item.label}>
                  <Link
                    href={item.href}
                    className="text-[0.95rem] text-soft transition-colors hover:text-brand"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="font-header text-sm font-bold uppercase tracking-[0.14em]">
              Contact
            </h2>
            <ul className="mt-5 space-y-4 text-[0.95rem] text-soft">
              <li className="flex items-start gap-3">
                <HugeiconsIcon
                  icon={Location05Icon}
                  size={18}
                  strokeWidth={1.8}
                  className="mt-1 shrink-0 text-brand"
                />
                <span className="leading-7">{ADDRESS}</span>
              </li>

              {EMAILS.map((email) => (
                <li key={email}>
                  <a
                    href={`mailto:${email}`}
                    className="flex items-start gap-3 transition-colors hover:text-brand"
                  >
                    <HugeiconsIcon
                      icon={Mail01Icon}
                      size={18}
                      strokeWidth={1.8}
                      className="mt-0.5 shrink-0 text-brand"
                    />
                    {email}
                  </a>
                </li>
              ))}

              {PHONES.map((phone) => (
                <li key={phone}>
                  <a
                    href={`tel:${phone.replace(/\s/g, "")}`}
                    className="flex items-start gap-3 transition-colors hover:text-brand"
                  >
                    <HugeiconsIcon
                      icon={Call02Icon}
                      size={18}
                      strokeWidth={1.8}
                      className="mt-0.5 shrink-0 text-brand"
                    />
                    {phone}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="font-header text-sm font-bold uppercase tracking-[0.14em]">
              Office Hours
            </h2>
            <ul className="mt-5 space-y-4 text-[0.95rem] text-soft">
              {OFFICE_HOURS.map((slot) => (
                <li key={slot.days} className="flex items-start gap-3">
                  <HugeiconsIcon
                    icon={Clock01Icon}
                    size={18}
                    strokeWidth={1.8}
                    className="mt-0.5 shrink-0 text-brand"
                  />
                  <span>
                    <span className="block font-medium text-ink">{slot.days}</span>
                    <span className="mt-0.5 block">{slot.time}</span>
                  </span>
                </li>
              ))}
            </ul>

            <Link
              href="/register"
              className="mt-7 inline-flex animate-glow items-center justify-center rounded-full bg-brand px-6 py-3 text-sm font-semibold text-brand-fg [--glow:var(--color-brand-teal)] transition duration-300 hover:bg-brand-teal"
            >
              Get Started
            </Link>
          </div>
        </div>

        <div className="mt-16 flex flex-col items-center gap-5 border-t border-line pt-8 sm:flex-row sm:justify-between">
         
          <p className="order-2 text-sm text-soft sm:order-1">
            Built for schools across Nigeria.
          </p>

          <div className="order-1 flex items-center gap-6 sm:order-2">
            <Link
              href="/privacy"
              className="text-sm text-soft transition-colors hover:text-brand"
            >
              Privacy
            </Link>
            <Link
              href="/terms"
              className="text-sm text-soft transition-colors hover:text-brand"
            >
              Terms
            </Link>
            <a
              href="#"
              aria-label="Back to top"
              className="grid h-9 w-9 place-items-center rounded-full bg-ink/5 text-ink transition hover:bg-ink/10"
            >
              <HugeiconsIcon icon={ArrowUp01Icon} size={16} strokeWidth={2} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
