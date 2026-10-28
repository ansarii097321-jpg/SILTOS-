"use client"

import * as React from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { Facebook, Instagram, Linkedin, Send } from "lucide-react"

function TikTokIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      fill="currentColor"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64c.29 0 .56.04.82.1v-3.5a6.37 6.37 0 0 0-.82-.05A6.34 6.34 0 0 0 3.15 15.6a6.34 6.34 0 0 0 10.86 4.47V10.5a8.28 8.28 0 0 0 4.83 1.54V8.59a4.82 4.82 0 0 1-2.06-.47 4.85 4.85 0 0 1-1.19-1.43z" />
    </svg>
  )
}

function Footerdemo() {
  return (
    <footer className="relative w-full border-t border-white/10 bg-[#0a0a0a] text-white">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 md:px-8 lg:px-12">
        <div className="grid gap-10 sm:grid-cols-2 md:grid-cols-3 lg:gap-12">
          <div className="relative">
            <h2 className="mb-4 text-2xl md:text-3xl font-bold tracking-tight text-white">Stay Connected</h2>
            <p className="mb-6 text-zinc-400 text-base leading-relaxed">
              Join our newsletter for the latest AI automation insights, updates, and exclusive offers.
            </p>
            <form className="relative flex items-center w-full max-w-md" onSubmit={(e) => e.preventDefault()}>
              <Input
                type="email"
                placeholder="Enter your email"
                className="w-full pr-12 h-11 bg-[#18181b] border-zinc-800 text-white placeholder:text-zinc-500 text-base focus:border-zinc-700"
              />
              <Button
                type="submit"
                size="icon"
                className="absolute right-1 top-1 h-9 w-9 min-w-[36px] min-h-[36px] rounded-full bg-white text-zinc-900 hover:bg-zinc-200 transition-transform hover:scale-105"
              >
                <Send className="h-4 w-4 text-zinc-900" />
                <span className="sr-only">Subscribe</span>
              </Button>
            </form>
            <div className="absolute -right-4 top-0 h-24 w-24 rounded-full bg-yellow-400/10 blur-2xl pointer-events-none" />
          </div>
          <div>
            <h3 className="mb-4 text-lg font-semibold text-white">Contact Us</h3>
            <address className="space-y-3 text-base not-italic text-zinc-400">
              <p>Shah Faisal Colony, Karachi, Sindh, Pakistan</p>
              <p>Phone: <a href="tel:03293945293" className="hover:text-white transition-colors">03293945293</a></p>
              <p>Email: <a href="mailto:zakiransari0973@gmail.com" className="hover:text-white transition-colors">zakiransari0973@gmail.com</a></p>
            </address>
          </div>
          <div className="relative sm:col-span-2 md:col-span-1">
            <h3 className="mb-4 text-lg font-semibold text-white">Follow Us</h3>
            <div className="mb-6 flex space-x-4">
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <a
                      href="#"
                      className="flex items-center justify-center w-11 h-11 rounded-full bg-[#18181b] border border-zinc-800 text-zinc-300 hover:bg-zinc-800 hover:text-white transition-colors"
                    >
                      <Facebook className="h-5 w-5" />
                      <span className="sr-only">Facebook</span>
                    </a>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Follow us on Facebook</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <a
                      href="https://www.tiktok.com/@siltos1223?lang=en"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center w-11 h-11 rounded-full bg-[#18181b] border border-zinc-800 text-zinc-300 hover:bg-zinc-800 hover:text-white transition-colors"
                    >
                      <TikTokIcon className="h-5 w-5" />
                      <span className="sr-only">TikTok</span>
                    </a>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Follow us on TikTok</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <a
                      href="https://www.instagram.com/siltos1223/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center w-11 h-11 rounded-full bg-[#18181b] border border-zinc-800 text-zinc-300 hover:bg-zinc-800 hover:text-white transition-colors"
                    >
                      <Instagram className="h-5 w-5" />
                      <span className="sr-only">Instagram</span>
                    </a>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Follow us on Instagram</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <a
                      href="https://www.linkedin.com/in/zakir-ansari-12811642b/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center w-11 h-11 rounded-full bg-[#18181b] border border-zinc-800 text-zinc-300 hover:bg-zinc-800 hover:text-white transition-colors"
                    >
                      <Linkedin className="h-5 w-5" />
                      <span className="sr-only">LinkedIn</span>
                    </a>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Connect with us on LinkedIn</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
          </div>
        </div>
        <div className="mt-12 border-t border-white/10 pt-8 flex items-center justify-between">
          <p className="text-sm text-zinc-500">
            © 2026 SILTOS. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}

export { Footerdemo }

