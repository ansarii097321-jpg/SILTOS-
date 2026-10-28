"use client";

import React from 'react';
import { MinimalistHero } from '@/components/ui/minimalist-hero';
import { Component as ParallaxFeatureSection } from "@/components/ui/parallax-scroll-feature-section";
import { TestimonialsSection } from "@/components/ui/testimonials-section";
import { PartnerSliderSection } from "@/components/ui/partner-slider-section";
import { Footerdemo } from "@/components/ui/footer-section";
import { ChatBot } from "@/components/ui/chatbot";

export default function DemoOne() {
  return (
    <main className="relative w-full bg-[#FAFAFA] text-gray-900">
      {/* Hero Section */}
      <section className="w-full relative">
        <MinimalistHero
          logoText="SILTOS"
          mainText="Transform your business with intelligent AI automation that simplifies workflows, saves time, and drives growth."
          imageSrc="https://cdn.21st.dev/assets/mirror/21/2172cd84238bbee1a57a87b64322655b09c2ffa4ea89acaef7e9989c3abd272d.png"
          imageAlt="A portrait of a person in a black turtleneck, in profile."
          overlayText={{
            part1: 'AI that',
            part2: 'works.',
          }}
        />
      </section>

      {/* Features Section */}
      <section id="features" className="w-full relative z-10">
        <ParallaxFeatureSection />
      </section>

      {/* Testimonials Section */}
      <section className="w-full relative z-10 bg-[#FAFAFA]">
        <TestimonialsSection />
      </section>

      {/* Ecosystem & Integrations Section (Infinite Slider) */}
      <section className="w-full relative z-10 bg-[#FAFAFA]">
        <PartnerSliderSection />
      </section>

      {/* Footer Section */}
      <Footerdemo />

      {/* Floating Siltos AI Chatbot */}
      <ChatBot />
    </main>
  );
}


