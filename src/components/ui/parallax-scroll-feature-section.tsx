'use client'

import React, { useRef } from "react"
import { motion, useScroll, useTransform } from 'framer-motion'

interface SectionData {
    id: number;
    title: string;
    description: string;
    imageUrl: string;
    reverse: boolean;
}

const SECTIONS: SectionData[] = [
    {
        id: 1,
        title: "AI-Powered Automation",
        description: "We build powerful AI automation systems that help businesses eliminate repetitive tasks, streamline daily operations, and create smarter workflows that save valuable time while improving overall productivity and customer experience.",
        imageUrl: '/images/section2-1.jpg',
        reverse: false
    },
    {
        id: 2,
        title: "Smart Workflow Systems",
        description: "From intelligent AI chatbots to automated workflows, CRM integrations, and business process automation, we create reliable solutions that connect your tools and make everyday operations faster, simpler, and more efficient.",
        imageUrl: '/images/section2-2.jpg',
        reverse: true
    },
    {
        id: 3,
        title: "Business Process Automation",
        description: "Our AI-powered solutions transform complex business processes into seamless automated workflows, helping teams reduce manual work, improve efficiency, respond to customers faster, and focus more on the tasks that actually drive business growth.",
        imageUrl: '/images/section2-3.jpg',
        reverse: false
    }
];

const FeatureItem = ({ section }: { section: SectionData }) => {
    const ref = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start end", "center start"]
    });

    const opacityContent = useTransform(scrollYProgress, [0, 0.7], [0, 1]);
    const clipProgress = useTransform(scrollYProgress, [0, 0.7], ["inset(0 100% 0 0)", "inset(0 0% 0 0)"]);
    const translateContent = useTransform(scrollYProgress, [0, 1], [-40, 0]);

    return (
        <div 
            ref={ref} 
            className={`w-full max-w-7xl mx-auto py-12 sm:py-16 md:py-24 px-4 sm:px-6 md:px-12 flex flex-col md:flex-row items-center justify-between gap-8 sm:gap-10 md:gap-16 lg:gap-24 ${
                section.reverse ? 'md:flex-row-reverse' : ''
            }`}
        >
            <motion.div style={{ y: translateContent }} className="flex-1 max-w-xl w-full">
                <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold tracking-tight text-gray-900 leading-tight">
                    {section.title}
                </h2>
                <p className="text-gray-600 mt-4 md:mt-6 text-base md:text-lg leading-relaxed">
                    {section.description}
                </p>
            </motion.div>
            <motion.div 
                style={{ 
                    opacity: opacityContent,
                    clipPath: clipProgress,
                }}
                className="flex-1 max-w-md w-full relative overflow-hidden rounded-2xl shadow-xl border border-gray-200 bg-white"
            >
                <img 
                    src={section.imageUrl} 
                    loading="lazy"
                    className="w-full h-64 sm:h-80 md:h-96 object-cover rounded-2xl" 
                    alt={section.title}
                />
            </motion.div>
        </div>
    );
};

export const Component = () => {
    return (
        <div className="bg-[#FAFAFA] text-gray-900 w-full overflow-hidden">
            <div className="flex flex-col w-full divide-y divide-gray-100">
                {SECTIONS.map((section) => (
                    <FeatureItem key={section.id} section={section} />
                ))}
            </div>
        </div>
    );
};

export default Component;
