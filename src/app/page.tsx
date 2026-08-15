"use client";

import FeaturesSection from "@/components/FeaturesSection";
import Hero from "@/components/Hero";
import HomeHeader from "@/components/HomeHeader";
import HomeScrollNav from "@/components/HomeScrollNav";
import IntroVideoSection from "@/components/IntroVideoSection";
import PageBackdrop from "@/components/PageBackdrop";
import ProblemSection from "@/components/ProblemSection";
import SiteFooter from "@/components/SiteFooter";
import SolutionsSection from "@/components/SolutionsSection";
import SuiteSection from "@/components/SuiteSection";
import TestimonialsSection from "@/components/TestimonialsSection";

export default function Home() {
  return (
    <main className="relative min-h-screen overflow-x-hidden font-poppins text-ink">
      {/* One picture, header to footer: a single backdrop for the whole page.
          Every section below renders transparent on top of it. */}
      <PageBackdrop />

      <HomeHeader />
      <HomeScrollNav />
      <Hero />
      <IntroVideoSection />
      <FeaturesSection />
      <ProblemSection />
      <SuiteSection />
      <SolutionsSection />
      <TestimonialsSection />
      <SiteFooter />
      {/* <NetworkSection />
      <ChooseRoleSection /> */}

      {/* <div id="how-it-works">
        <HowItWorksSection />
      </div> */}

      {/* <PricingSection />
      <Testimonials />

      <div id="faq">
        <FaqSection />
      </div>

      <ContactSection />
      <CtaSection />
      <Footer /> */}
    </main>
  );
}
