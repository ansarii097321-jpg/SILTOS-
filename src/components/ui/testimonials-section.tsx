import React from 'react';
import { motion } from 'framer-motion';
import { GridPattern } from '@/components/ui/grid-pattern';

type Testimonial = {
	name: string;
	role: string;
	image: string;
	company: string;
	quote: string;
};

const testimonials: Testimonial[] = [
	{
		quote:
			'SILTOS transformed the way we manage our operations. Their AI workflow automation is reliable, scalable, and eliminated hours of repetitive tasks.',
		name: 'Ali Khan',
		role: 'HR Manager',
		company: 'Pak Mission Society',
		image: 'https://cdn.21st.dev/assets/mirror/35/3560ff7cbc9e86c333fccefe248e3ea5cdade4e46f6b2fc85d84755896cb2e5a.jpg',
	},
	{
		quote:
			'Their AI automation platform streamlined our customer support and internal workflows. What impressed me most is their dedication to client success.',
		name: 'Sara Ahmed',
		role: 'CEO',
		company: 'Galaxy Five Home',
		image: 'https://cdn.21st.dev/assets/mirror/aa/aa4787be04406deac036c92ff766754aa511214f00a4ee181ada4fc2c6622b6f.jpg',
	},
	{
		quote:
			'SILTOS took time to understand our unique operational challenges and delivered intelligent chatbots and automated workflows that fit seamlessly.',
		name: 'Imran Hussain',
		role: 'Manager',
		company: 'Al-Tayyab Foods',
		image: 'https://cdn.21st.dev/assets/mirror/ca/ca627d33f20754d25814a1d622a9f4837d56d5809c6fa7c14f2f2be7e3f36a05.jpg',
	},
	{
		quote:
			'From onboarding to ongoing optimization, the SILTOS team has provided exceptional AI solutions that keep our processing lines efficient.',
		name: 'Fatima Noor',
		role: 'Director',
		company: 'Shafiqe Foods',
		image: 'https://cdn.21st.dev/assets/mirror/aa/aaab4a0fbd8e2ad7a7ec4ccaa827918df0d6af1732227caa84d309cb49b45c21.jpg',
	},
	{
		quote:
			'Their collaborative approach to AI integration makes us feel like true partners. Every strategy session brings game-changing workflow automation.',
		name: 'Usman Raza',
		role: 'CTO',
		company: 'NextGen Solutions',
		image: 'https://cdn.21st.dev/assets/mirror/f6/f61f4b3793465be0aa4c3b577a6ccb95ae48ccfb751e7aaa6b5477aadc5255a8.jpg',
	},
	{
		quote:
			'We rely on SILTOS AI agents to manage complex data tasks. The platform is intuitive, highly responsive, and significantly reduces manual work.',
		name: 'Ayesha Siddiqui',
		role: 'Product Lead',
		company: 'Bright Future Tech',
		image: 'https://cdn.21st.dev/assets/mirror/f9/f90a38d15ecefa1704387dfba523d1c3e78b6344bcee586e0378e6af5e5f7cd0.jpg',
	},
	{
		quote:
			'SILTOS gave us real-time automated tracking and workflow visibility across departments. The efficiency gains have been game-changing.',
		name: 'Bilal Sheikh',
		role: 'Operations Head',
		company: 'Metro Logistics',
		image: 'https://cdn.21st.dev/assets/mirror/09/0939e4e89294f566a05be48754bd62dab535e01a85e1f96b6bcc7b26a968f294.jpg',
	},
	{
		quote:
			'The automated processing workflows from SILTOS brought speed and precision to our financial reporting. It is user-friendly and perfectly tailored.',
		name: 'Nadia Karim',
		role: 'Finance Manager',
		company: 'Alpha Traders',
		image: 'https://cdn.21st.dev/assets/mirror/5b/5bd4960f310603d603fb4643b0b5042bc8ed664dc75c2403c1fda586f1eca17c.jpg',
	},
	{
		quote:
			'Dependable, efficient, and forward-thinking. SILTOS has become a trusted partner in helping us scale our automated AI infrastructure worldwide.',
		name: 'Omar Farooq',
		role: 'Managing Director',
		company: 'VisionX Global',
		image: 'https://cdn.21st.dev/assets/mirror/ee/ee463534f5237559e041e9525c2c8475402585f4c4dbb469d3d89df4da3665bf.jpg',
	},
	{
		quote:
			'Their AI chatbots and process automation keep our team ahead of the curve. Working with SILTOS has rendered our daily operations effortless.',
		name: 'Sana Iqbal',
		role: 'Head of Strategy',
		company: 'BlueWave Consulting',
		image: 'https://cdn.21st.dev/assets/mirror/8d/8d0417f0910586650f889adf5f72fb8ad336f07247cbfd9da9dd6db02546dd00.jpg',
	},
	{
		quote:
			'We tested other automation tools, but nothing matched SILTOS’s level of custom AI workflows and proactive support. Highly recommended.',
		name: 'Hamza Tariq',
		role: 'Operations Manager',
		company: 'Green Valley Farms',
		image: 'https://cdn.21st.dev/assets/mirror/85/858ff02a00279d25f120a1b6bf7c56a18bd1e0130a5745a6d109de0cade1a26c.jpg',
	},
	{
		quote:
			'SILTOS’s AI platform made our business operations smarter and faster. The partnership has been invaluable for driving sustainable growth.',
		name: 'Mehwish Zafar',
		role: 'COO',
		company: 'Skyline Apparel',
		image: 'https://cdn.21st.dev/assets/mirror/55/55cf6231499bcdc496f15ff1d28d4170ac9b99e9279495caa44fca70886d8b2e.jpg',
	},
];

export function TestimonialsSection() {
	return (
		<section className="relative w-full py-12 sm:py-16 md:py-24 px-4 sm:px-6 lg:px-8 bg-[#FAFAFA] text-gray-900 overflow-hidden">
			<div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden z-0">
				<div className="bg-[radial-gradient(68.54%_68.72%_at_55.02%_31.46%,rgba(0,0,0,0.04)_0,rgba(0,0,0,0.01)_50%,transparent_80%)] absolute top-0 left-0 h-96 w-96 -rotate-45 rounded-full" />
			</div>
			<div className="mx-auto max-w-6xl space-y-8 sm:space-y-12 relative z-10">
				<div className="flex flex-col gap-3 text-center md:text-left">
					<h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold tracking-tight text-gray-900">
						Built for Better Business
					</h2>
					<p className="text-gray-600 text-base md:text-lg max-w-2xl leading-relaxed">
						See how AI automation helps businesses streamline operations, reduce manual work, and create more efficient customer experiences.
					</p>
				</div>
				<div className="relative grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
					{testimonials.map(({ name, role, company, quote, image }, index) => (
						<motion.div
							initial={{ filter: 'blur(4px)', translateY: 8, opacity: 0 }}
							whileInView={{
								filter: 'blur(0px)',
								translateY: 0,
								opacity: 1,
							}}
							viewport={{ once: true }}
							transition={{ delay: 0.05 * (index % 3) + 0.1, duration: 0.5 }}
							key={index}
							className="border-gray-300/80 relative flex flex-col justify-between overflow-hidden border border-dashed bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow min-h-[180px]"
						>
							<div className="pointer-events-none absolute top-0 left-1/2 -mt-2 -ml-20 h-full w-full [mask-image:linear-gradient(white,transparent)]">
								<div className="from-gray-900/5 to-gray-900/2 absolute inset-0 bg-gradient-to-r [mask-image:radial-gradient(farthest-side_at_top,white,transparent)]">
									<GridPattern
										width={25}
										height={25}
										x={-12}
										y={4}
										strokeDasharray="3"
										className="stroke-gray-300/40 absolute inset-0 h-full w-full mix-blend-overlay"
									/>
								</div>
							</div>
							<div className="relative z-10 flex items-start gap-4">
								<img
									alt={name}
									src={image}
									loading="lazy"
									className="size-10 rounded-full object-cover border border-gray-200 flex-shrink-0"
									onError={(e) => {
										const target = e.target as HTMLImageElement;
										target.onerror = null;
										target.src = `https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200`;
									}}
								/>
								<div>
									<p className="text-sm font-semibold text-gray-900 md:text-base">{name}</p>
									<span className="text-gray-500 block text-xs font-normal tracking-tight">
										{role} at <span className="font-medium text-gray-700">{company}</span>
									</span>
								</div>
							</div>
							<blockquote className="mt-4 relative z-10">
								<p className="text-gray-700 text-xs md:text-sm font-light leading-relaxed">
									"{quote}"
								</p>
							</blockquote>
						</motion.div>
					))}
				</div>
			</div>
		</section>
	);
}

export default TestimonialsSection;
