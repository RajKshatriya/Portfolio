import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import './Navbar.css'

const navLinks = [
    { id: 'hero', label: 'Home' },
    { id: 'about', label: 'About' },
    { id: 'skills', label: 'Skills' },
    { id: 'projects', label: 'Projects' },
    { id: 'contact', label: 'Contact' },
]

export default function Navbar() {
    const [scrolled, setScrolled] = useState(false)
    const [active, setActive] = useState('hero')
    const [menuOpen, setMenuOpen] = useState(false)

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50)

            const sections = navLinks.map(link => document.getElementById(link.id))
            const current = sections.findIndex(sec => {
                if (!sec) return false
                const rect = sec.getBoundingClientRect()
                return rect.top <= 100 && rect.bottom >= 100
            })
            if (current !== -1) setActive(navLinks[current].id)
        }
        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    const scrollTo = (id) => {
        const el = document.getElementById(id)
        if (el) el.scrollIntoView({ behavior: 'smooth' })
        setMenuOpen(false)
    }

    return (
        <motion.nav
            className={`navbar ${scrolled ? 'scrolled' : ''}`}
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
        >
            <div className="nav-inner">
                <motion.div
                    className="nav-logo hoverable"
                    onClick={() => scrollTo('hero')}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                >
                    <span className="logo-bracket">&lt;</span>
                    <span className="logo-text">Raj</span>
                    <span className="logo-accent">.</span>
                    <span className="logo-bracket">/&gt;</span>
                </motion.div>

                <ul className="nav-links">
                    {navLinks.map((link, i) => (
                        <motion.li
                            key={link.id}
                            initial={{ opacity: 0, y: -20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.1 + 0.3 }}
                        >
                            <button
                                className={`nav-link hoverable ${active === link.id ? 'active' : ''}`}
                                onClick={() => scrollTo(link.id)}
                            >
                                {link.label}
                                {active === link.id && (
                                    <motion.span className="nav-indicator" layoutId="nav-indicator" />
                                )}
                            </button>
                        </motion.li>
                    ))}
                </ul>

                <motion.a
                    href="#contact"
                    className="nav-cta btn-primary hoverable"
                    onClick={(e) => { e.preventDefault(); scrollTo('contact') }}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.8 }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                >
                    <span>Hire Me</span>
                </motion.a>

                <button className="hamburger hoverable" onClick={() => setMenuOpen(!menuOpen)}>
                    <span className={menuOpen ? 'open' : ''} />
                    <span className={menuOpen ? 'open' : ''} />
                    <span className={menuOpen ? 'open' : ''} />
                </button>
            </div>

            <AnimatePresence>
                {menuOpen && (
                    <motion.div
                        className="mobile-menu"
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                    >
                        {navLinks.map(link => (
                            <button key={link.id} className="mobile-link hoverable" onClick={() => scrollTo(link.id)}>
                                {link.label}
                            </button>
                        ))}
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.nav>
    )
}
