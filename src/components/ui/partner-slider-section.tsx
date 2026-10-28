import React from 'react';
import { InfiniteSlider } from '@/components/ui/infinite-slider';
import {
  Bot,
  Zap,
  Cloud,
  Database,
  Layers,
  Sparkles,
  Share2,
  Code2,
  Globe,
  Server,
  Lock,
  Workflow
} from 'lucide-react';

const partners = [
  { name: 'OpenAI', category: 'AI Models', icon: Bot, desc: 'Generative AI & LLMs' },
  { name: 'Zapier', category: 'Automation', icon: Zap, desc: '3000+ App Connections' },
  { name: 'Google Cloud', category: 'Infrastructure', icon: Cloud, desc: 'Scalable Cloud Computing' },
  { name: 'AWS Systems', category: 'Cloud Infrastructure', icon: Server, desc: 'Enterprise Security' },
  { name: 'Salesforce', category: 'CRM & Pipeline', icon: Layers, desc: 'Customer Data Sync' },
  { name: 'Anthropic', category: 'Cognitive AI', icon: Sparkles, desc: 'Safe AI Agents' },
  { name: 'GitHub', category: 'DevOps & CI/CD', icon: Code2, desc: 'Automated Workflows' },
  { name: 'Stripe', category: 'Financial Ops', icon: Lock, desc: 'Payment Gateway API' },
  { name: 'HubSpot', category: 'Growth Engine', icon: Share2, desc: 'Inbound Automation' },
  { name: 'Notion', category: 'Knowledge Base', icon: Database, desc: 'Structured Data Sync' },
  { name: 'Shopify', category: 'E-Commerce', icon: Globe, desc: 'Storefront Automation' },
  { name: 'Automate.io', category: 'Workflow Sync', icon: Workflow, desc: 'Multi-step Pipelines' },
];

const showcaseImages = [
  {
    title: 'AI Analytics Platform',
    subtitle: 'Enterprise Insights',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=400',
  },
  {
    title: 'Neural Automation',
    subtitle: 'Autonomous Workflows',
    image: '/images/neural-automation.png',
  },
  {
    title: 'Secure Cloud Matrix',
    subtitle: 'Zero-Trust Architecture',
    image: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&q=80&w=400',
  },
  {
    title: 'Real-time Metrics',
    subtitle: 'Data Orchestration',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=400',
  },
  {
    title: 'Smart Infrastructure',
    subtitle: 'Global Operations',
    image: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&q=80&w=400',
  },
];

export function PartnerSliderSection() {
  return (
    <section className="relative w-full py-12 sm:py-16 md:py-24 bg-[#FAFAFA] text-gray-900 border-t border-gray-200/60 overflow-hidden">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 mb-8 sm:mb-12 md:mb-16">
        <div className="flex flex-col gap-3 text-center md:text-left">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold tracking-tight text-gray-900">
            Works With the Tools You Already Use
          </h2>
          <p className="text-gray-600 text-base md:text-lg max-w-2xl mt-1 leading-relaxed">
            Our intelligent automation platform integrates effortlessly with your existing stack, enabling continuous data flow and zero-friction automated operations.
          </p>
        </div>
      </div>

      {/* Row 1: Brand & Integration Cards (Infinite Slider Reverse) */}
      <div className="w-full py-3 sm:py-4 mb-2 sm:mb-4">
        <InfiniteSlider gap={16} duration={35} durationOnHover={80} reverse className="py-2">
          {partners.map((partner, index) => {
            const Icon = partner.icon;
            return (
              <div
                key={index}
                className="flex items-center gap-3 sm:gap-4 px-4 sm:px-6 py-3 sm:py-4 rounded-xl border border-gray-200/90 bg-white shadow-sm hover:shadow-md transition-all duration-300 min-w-[200px] sm:min-w-[240px] group cursor-pointer"
              >
                <div className="p-2 sm:p-2.5 rounded-lg bg-gray-50 border border-gray-100 text-gray-800 group-hover:bg-yellow-400 group-hover:text-gray-900 transition-colors">
                  <Icon className="w-5 h-5 sm:w-6 sm:h-6" />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 text-xs sm:text-sm tracking-tight">{partner.name}</h4>
                  <p className="text-[11px] sm:text-xs text-gray-500 font-normal">{partner.desc}</p>
                </div>
              </div>
            );
          })}
        </InfiniteSlider>
      </div>

      {/* Row 2: Visual Showcase Cards (Infinite Slider Forward) */}
      <div className="w-full py-3 sm:py-4">
        <InfiniteSlider gap={20} duration={40} durationOnHover={90} className="py-2">
          {showcaseImages.map((item, index) => (
            <div
              key={index}
              className="relative overflow-hidden rounded-xl border border-gray-200/90 bg-white shadow-sm hover:shadow-md transition-all duration-300 min-w-[230px] sm:min-w-[280px] h-[140px] sm:h-[160px] flex items-end p-4 group cursor-pointer"
            >
              <img
                src={item.image}
                alt={item.title}
                loading="lazy"
                className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
              <div className="relative z-10">
                <span className="text-[10px] font-semibold tracking-wider text-yellow-400 uppercase">
                  {item.subtitle}
                </span>
                <h4 className="text-sm sm:text-base font-bold text-white tracking-tight">{item.title}</h4>
              </div>
            </div>
          ))}
        </InfiniteSlider>
      </div>
    </section>
  );
}

export default PartnerSliderSection;
