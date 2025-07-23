"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import { Menu, X, Phone, Calendar, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"

const navItems = [
  { name: "Home", href: "/" },
  { name: "Services", href: "/services" },
  { name: "About", href: "/about" },
  { name: "Team", href: "/team" },
  { name: "Reviews", href: "/reviews" },
  { name: "Contact", href: "/contact" },
]

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Close mobile menu when route changes
  useEffect(() => {
    setIsOpen(false)
  }, [pathname])

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = "unset"
    }
    return () => {
      document.body.style.overflow = "unset"
    }
  }, [isOpen])

  return (
    <>
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? "bg-white/95 dark:bg-slate-900/95 backdrop-blur-xl shadow-lg border-b border-white/10"
            : "bg-transparent"
        }`}
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16 sm:h-20">
            {/* Logo */}
            <Link
              href="/"
              className="flex items-center space-x-2 sm:space-x-3 group focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded-lg"
              aria-label="PhysioHeal Clinic Home"
            >
              <motion.div
                className="relative w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12"
                whileHover={{ scale: 1.05, rotate: 5 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-primary to-secondary rounded-lg sm:rounded-xl blur-sm opacity-50 group-hover:opacity-70 transition-opacity" />
                <div className="relative w-full h-full bg-gradient-to-r from-primary to-secondary rounded-lg sm:rounded-xl flex items-center justify-center shadow-lg">
                  <span className="text-white font-bold text-sm sm:text-lg lg:text-xl">P</span>
                </div>
                <motion.div
                  className="absolute -top-0.5 -right-0.5 sm:-top-1 sm:-right-1"
                  animate={{
                    scale: [1, 1.2, 1],
                    rotate: [0, 180, 360],
                  }}
                  transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY }}
                >
                  <Sparkles className="w-3 h-3 sm:w-4 sm:h-4 text-primary" />
                </motion.div>
              </motion.div>
              <div className="font-heading font-bold text-lg sm:text-xl lg:text-2xl gradient-text">PhysioHeal</div>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center space-x-6 xl:space-x-8" role="navigation">
              {navItems.map((item, index) => (
                <motion.div
                  key={item.name}
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 + 0.3 }}
                >
                  <Link
                    href={item.href}
                    className={`relative font-medium text-sm xl:text-base transition-all duration-300 hover:text-primary group focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded px-2 py-1 ${
                      pathname === item.href ? "text-primary" : "text-gray-700 dark:text-gray-300"
                    }`}
                    aria-current={pathname === item.href ? "page" : undefined}
                  >
                    {item.name}
                    {pathname === item.href && (
                      <motion.div
                        layoutId="navbar-indicator"
                        className="absolute -bottom-1 left-0 right-0 h-0.5 bg-gradient-to-r from-primary to-secondary rounded-full"
                      />
                    )}
                    <motion.div
                      className="absolute -bottom-1 left-0 right-0 h-0.5 bg-gradient-to-r from-primary to-secondary rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                      initial={false}
                    />
                  </Link>
                </motion.div>
              ))}
            </nav>

            {/* Action Buttons */}
            <div className="flex items-center space-x-2 sm:space-x-3 lg:space-x-4">
              {/* Call Button - Hidden on mobile */}
              <Button
                variant="outline"
                size="sm"
                className="hidden sm:inline-flex btn-3d text-xs lg:text-sm min-w-[48px] h-10 focus:ring-2 focus:ring-primary focus:ring-offset-2"
                asChild
              >
                <Link href="tel:+917979855427" aria-label="Call PhysioHeal Clinic">
                  <Phone className="w-3 h-3 lg:w-4 lg:h-4 mr-1 lg:mr-2" />
                  <span className="hidden md:inline">Call</span>
                </Link>
              </Button>

              {/* Book Appointment Button */}
              <Button
                size="sm"
                className="btn-3d pulse-glow-3d text-xs lg:text-sm min-w-[48px] h-10 focus:ring-2 focus:ring-primary focus:ring-offset-2"
                asChild
              >
                <Link href="/book-appointment" aria-label="Book appointment at PhysioHeal Clinic">
                  <Calendar className="w-3 h-3 lg:w-4 lg:h-4 mr-1 lg:mr-2" />
                  <span className="hidden sm:inline">Book</span>
                </Link>
              </Button>

              {/* Mobile Menu Button */}
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsOpen(!isOpen)}
                className="lg:hidden w-10 h-10 focus:ring-2 focus:ring-primary focus:ring-offset-2"
                aria-label={isOpen ? "Close menu" : "Open menu"}
                aria-expanded={isOpen}
                aria-controls="mobile-menu"
              >
                <AnimatePresence mode="wait">
                  {isOpen ? (
                    <motion.div
                      key="close"
                      initial={{ rotate: -90, opacity: 0 }}
                      animate={{ rotate: 0, opacity: 1 }}
                      exit={{ rotate: 90, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <X className="h-5 w-5" />
                    </motion.div>
                  ) : (
                    <motion.div
                      key="menu"
                      initial={{ rotate: 90, opacity: 0 }}
                      animate={{ rotate: 0, opacity: 1 }}
                      exit={{ rotate: -90, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <Menu className="h-5 w-5" />
                    </motion.div>
                  )}
                </AnimatePresence>
              </Button>
            </div>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Navigation Overlay */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 lg:hidden"
              onClick={() => setIsOpen(false)}
            />

            {/* Mobile Menu */}
            <motion.div
              id="mobile-menu"
              initial={{ x: "100%", opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: "100%", opacity: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="fixed top-0 right-0 h-full w-80 max-w-[85vw] bg-white dark:bg-slate-900 shadow-2xl z-50 lg:hidden overflow-y-auto"
            >
              <div className="p-6 pt-20">
                {/* Mobile Navigation Links */}
                <nav className="space-y-4 mb-8" role="navigation">
                  {navItems.map((item, index) => (
                    <motion.div
                      key={item.name}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <Link
                        href={item.href}
                        className={`block py-3 px-4 font-medium text-lg transition-all duration-300 rounded-lg hover:bg-primary/10 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 min-h-[48px] flex items-center ${
                          pathname === item.href ? "text-primary bg-primary/10" : "text-gray-700 dark:text-gray-300"
                        }`}
                        aria-current={pathname === item.href ? "page" : undefined}
                      >
                        {item.name}
                      </Link>
                    </motion.div>
                  ))}
                </nav>

                {/* Mobile Action Buttons */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 }}
                  className="space-y-4 pt-6 border-t border-gray-200/20 dark:border-gray-700/20"
                >
                  <Button
                    variant="outline"
                    size="lg"
                    className="w-full btn-3d min-h-[48px] text-base focus:ring-2 focus:ring-primary focus:ring-offset-2"
                    asChild
                  >
                    <Link href="tel:+917979855427" aria-label="Call PhysioHeal Clinic">
                      <Phone className="w-5 h-5 mr-3" />
                      Call Now
                    </Link>
                  </Button>
                  <Button
                    size="lg"
                    className="w-full btn-3d pulse-glow-3d min-h-[48px] text-base focus:ring-2 focus:ring-primary focus:ring-offset-2"
                    asChild
                  >
                    <Link href="/book-appointment" aria-label="Book appointment at PhysioHeal Clinic">
                      <Calendar className="w-5 h-5 mr-3" />
                      Book Appointment
                    </Link>
                  </Button>
                </motion.div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}