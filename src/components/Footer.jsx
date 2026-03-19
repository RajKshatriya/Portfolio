import { motion } from 'framer-motion'
import './Footer.css'

const socialLinks = [
    { icon: '🐙', href: 'https://github.com/RajKshatriya', label: 'GitHub' },
    { icon: '💼', href: 'https://www.linkedin.com/in/raj-kshatriya/', label: 'LinkedIn' },
    { icon: '📧', href: 'mailto:rajkshatriya1960@gmail.com', label: 'Email' },
]

const quickLinks = [
    { label: 'About', id: 'about' },
    { label: 'Skills', id: 'skills' },
    { label: 'Projects', id: 'projects' },
    { label: 'Contact', id: 'contact' },
]

export default function Footer() {
    const scrollTo = (id) => {
        document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
    }

    return (
        <footer className="footer">
            <div className="footer-glow" />
            <div className="footer-inner">
                <div className="footer-top">
                    <div className="footer-brand">
                        <div className="footer-logo">
                            <span className="logo-bracket">&lt;</span>
                            <span className="logo-text">Raj</span>
                            <span className="logo-accent">.</span>
                            <span className="logo-bracket">/&gt;</span>
                        </div>
                        <p className="footer-tagline">
                            Building the future, one commit at a time.
                            <br />
                            Open to work & collaboration.
                        </p>
                        <div className="footer-socials">
                            {socialLinks.map(link => (
                                <motion.a
                                    key={link.label}
                                    href={link.href}
                                    className="social-link hoverable"
                                    aria-label={link.label}
                                    whileHover={{ scale: 1.15, y: -3 }}
                                    whileTap={{ scale: 0.9 }}
                                >
                                    {link.icon}
                                </motion.a>
                            ))}
                        </div>
                    </div>

                    <div className="footer-links">
                        <h4 className="footer-links-title">Quick Links</h4>
                        <ul>
                            {quickLinks.map(link => (
                                <li key={link.id}>
                                    <button className="footer-link hoverable" onClick={() => scrollTo(link.id)}>
                                        → {link.label}
                                    </button>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div className="footer-status">
                        <h4 className="footer-links-title">Status</h4>
                        <div className="status-badge">
                            <span className="badge-dot" />
                            <span>Available for hire</span>
                        </div>
                        <div className="footer-info-list">
                            <div className="footer-info">
                                <span className="info-label">Location</span>
                                <span className="info-value">Mumbai, India</span>
                            </div>
                            <div className="footer-info">
                                <span className="info-label">Timezone</span>
                                <span className="info-value">IST (UTC+5:30)</span>
                            </div>
                            <div className="footer-info">
                                <span className="info-label">Email</span>
                                <span className="info-value">rajkshatriya1960@gmail.com</span>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="footer-bottom">
                    <div className="footer-divider" />
                    <div className="footer-bottom-inner">
                        <p className="footer-copy">
                            © 2026 Raj Kshatriya. Crafted with <span className="heart">❤️</span> using React & Three.js
                        </p>
                        <p className="footer-made">
                            <span className="gradient-text">Made with passion & pixels</span>
                        </p>
                    </div>
                </div>
            </div>
        </footer>
    )
}
