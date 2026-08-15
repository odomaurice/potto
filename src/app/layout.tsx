import type { Metadata } from "next";
import { Geist_Mono, Poppins } from "next/font/google";
import "./globals.css";

const poppins = Poppins({
  weight: ["400", "600", "700"],
  variable: "--font-poppins-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Potto | Home",
  description: "Secured School Communities",
  // Declared here rather than as an `icon.*` file: Next's icon file convention
  // accepts .ico/.jpg/.jpeg/.png/.svg only, so a .webp mark cannot be dropped
  // into app/ and picked up automatically.
  icons: {
    icon: [{ url: "/Potto-logo-only_iebxw7.webp", type: "image/webp" }],
    shortcut: "/Potto-logo-only_iebxw7.webp",
    apple: "/Potto-logo-only_iebxw7.webp",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${poppins.variable} ${geistMono.variable} h-full antialiased`}
    >
      {/* suppressHydrationWarning: extensions (Grammarly, password managers)
          inject attributes onto <body> before React hydrates — e.g.
          `data-gr-ext-installed` — which reads as a server/client mismatch. The
          flag applies to this element only and does not cascade, so genuine
          mismatches inside the tree are still reported. */}
      <body suppressHydrationWarning className="min-h-full flex flex-col">
        {children}
      </body>
    </html>
  );
}
