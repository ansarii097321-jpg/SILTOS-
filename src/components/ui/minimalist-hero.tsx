import React from 'react';
import { motion } from 'framer-motion';
import { LucideIcon, ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Cursor } from '@/components/ui/inverted-cursor';

// Define the props interface for type safety and reusability
interface MinimalistHeroProps {
  logoText?: string;
  navLinks?: { label: string; href: string }[];
  mainText: string;
  readMoreLink?: string;
  imageSrc: string;
  imageAlt: string;
  overlayText: {
    part1: string;
    part2: string;
  };
  socialLinks?: { icon: LucideIcon; href: string }[];
  locationText?: string;
  className?: string;
}

// Helper component for navigation links
const NavLink = ({ href, children }: { href: string; children: React.ReactNode }) => (
  <a
    href={href}
    className="text-sm font-medium tracking-widest text-foreground/60 transition-colors hover:text-foreground"
  >
    {children}
  </a>
);

// Helper component for social media icons
const SocialIcon = ({ href, icon: Icon }: { href: string; icon: LucideIcon }) => (
  <a href={href} target="_blank" rel="noopener noreferrer" className="text-foreground/60 transition-colors hover:text-foreground">
    <Icon className="h-5 w-5" />
  </a>
);

// The main reusable Hero Section component
export const MinimalistHero = ({
  logoText = "SILTOS",
  navLinks,
  mainText,
  readMoreLink,
  imageSrc,
  imageAlt,
  overlayText,
  socialLinks,
  locationText,
  className,
}: MinimalistHeroProps) => {
  return (
    <div
      className={cn(
        'relative flex min-h-[100dvh] sm:min-h-[90vh] w-full max-w-full flex-col items-center justify-between overflow-hidden bg-background p-4 sm:p-6 md:p-8 lg:p-12 pb-4 md:pb-6',
        className
      )}
    >
      <Cursor size={90} />
      {/* Header */}
      <header className="z-30 flex w-full max-w-7xl items-center justify-center relative pt-2 md:pt-4 px-2">
        <motion.div
          data-cursor-zone
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-[0.25em] text-foreground uppercase select-none cursor-none px-4 py-2"
        >
          {logoText}
        </motion.div>
        {navLinks && navLinks.length > 0 && (
          <div className="absolute right-0 flex items-center space-x-8">
            <div className="hidden items-center space-x-8 md:flex">
              {navLinks.map((link) => (
                <NavLink key={link.label} href={link.href}>
                  {link.label}
                </NavLink>
              ))}
            </div>
            <motion.button
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="flex flex-col space-y-1.5 md:hidden min-w-[44px] min-h-[44px] items-center justify-center"
              aria-label="Open menu"
            >
              <span className="block h-0.5 w-6 bg-foreground"></span>
              <span className="block h-0.5 w-6 bg-foreground"></span>
              <span className="block h-0.5 w-5 bg-foreground"></span>
            </motion.button>
          </div>
        )}
      </header>

      {/* Main Content Area */}
      <div className="relative grid w-full max-w-7xl flex-grow grid-cols-1 items-center gap-6 py-6 lg:grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)] lg:gap-4 xl:gap-6 lg:py-8 px-4 sm:px-6 lg:px-12">
        
        {/* Center Image with Circle: order-1 on mobile/tablet (<1024px), order-2 on desktop (lg:) */}
        <div className="relative order-1 flex items-center justify-center min-w-0 my-4 lg:my-0 lg:order-2 px-2">
            <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
                className="absolute z-0 h-[220px] w-[220px] sm:h-[280px] sm:w-[280px] md:h-[320px] md:w-[320px] lg:h-[340px] lg:w-[340px] xl:h-[400px] xl:w-[400px] 2xl:h-[440px] 2xl:w-[440px] rounded-full bg-yellow-400/90"
            ></motion.div>
            <motion.img
                src={imageSrc}
                alt={imageAlt}
                className="relative z-10 h-auto w-36 sm:w-44 md:w-48 lg:w-50 xl:w-56 2xl:w-60 object-cover scale-110 sm:scale-125"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, ease: [0.22, 1, 0.36, 1], delay: 0.4 }}
                onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.onerror = null;
                target.src = `https://cdn.21st.dev/assets/mirror/69/69f133c713200aa29789f9f07a83f105cc28793926179eb4a224b0454a743a00.svg`;
                }}
            />
        </div>

        {/* Right Column (Headline): order-2 on mobile/tablet, order-3 on desktop (lg:) */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.2 }}
          className="z-20 order-2 min-w-0 flex flex-col items-center justify-center text-center lg:order-3 lg:items-start lg:justify-start lg:text-left xl:-ml-12 2xl:-ml-16"
        >
          <h1
            className="font-extrabold text-foreground leading-[0.95] tracking-tight relative z-10 max-w-full break-words text-center lg:text-left [font-size:clamp(2.75rem,5.5vw,8.5rem)]"
          >
            {overlayText.part1}
            <br />
            {overlayText.part2}
          </h1>
        </motion.div>

        {/* Left Column (Paragraph & Button): order-3 & order-4 on mobile/tablet, order-1 on desktop (lg:) */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1 }}
          className="z-20 order-3 min-w-0 flex flex-col items-center text-center lg:order-1 lg:items-start lg:text-left px-2 lg:px-0"
        >
          <p className="mx-auto max-w-sm text-base leading-relaxed text-foreground/80 lg:mx-0 lg:max-w-xs">{mainText}</p>
          {readMoreLink && (
            <a href={readMoreLink} className="mt-3 inline-flex items-center min-h-[44px] text-sm font-medium text-foreground underline decoration-from-font">
              Read More
            </a>
          )}
          <motion.button
            onClick={() => {
              document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' });
            }}
            className="mt-6 inline-flex items-center justify-center min-h-[48px] px-7 py-3 rounded-full bg-[#111827] text-white font-bold text-base hover:bg-[#FAD02C] hover:text-[#111827] transition-colors duration-200 shadow-md hover:shadow-lg group cursor-pointer"
          >
            Get Started
            <ArrowRight className="w-4 h-4 ml-2 transition-transform duration-200 group-hover:translate-x-1" />
          </motion.button>
        </motion.div>

      </div>

      {/* Footer Elements (Only rendered if footer content exists) */}
      {(socialLinks?.length || locationText) ? (
        <footer className="z-30 flex w-full max-w-7xl items-center justify-between">
          {socialLinks && socialLinks.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 1.2 }}
              className="flex items-center space-x-4"
            >
              {socialLinks.map((link, index) => (
                <SocialIcon key={index} href={link.href} icon={link.icon} />
              ))}
            </motion.div>
          )}
          {locationText && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 1.3 }}
              className="text-sm font-medium text-foreground/80"
            >
              {locationText}
            </motion.div>
          )}
        </footer>
      ) : null}
    </div>
  );
};
