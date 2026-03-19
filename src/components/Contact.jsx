import { useState, useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Float } from '@react-three/drei'
import { motion } from 'framer-motion'
import './Contact.css'

function ContactOrb() {
    const meshRef = useRef()
    useFrame((state) => {
        meshRef.current.rotation.y = state.clock.elapsedTime * 0.5
        meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.3) * 0.3
    })
    return (
        <Float floatIntensity={1.5} speed={2} rotationIntensity={0.4}>
            <mesh ref={meshRef}>
                <torusGeometry args={[1.5, 0.08, 16, 100]} />
                <meshStandardMaterial color="#6c63ff" emissive="#6c63ff" emissiveIntensity={0.6} />
            </mesh>
            <mesh ref={meshRef}>
                <torusGeometry args={[2.1, 0.05, 16, 100]} />
                <meshStandardMaterial color="#00d4ff" emissive="#00d4ff" emissiveIntensity={0.5} />
            </mesh>
            <mesh>
                <sphereGeometry args={[0.8, 32, 32]} />
                <meshStandardMaterial
                    color="#6c63ff"
                    roughness={0.1}
                    metalness={0.9}
                    emissive="#3a20dd"
                    emissiveIntensity={0.5}
                />
            </mesh>
        </Float>
    )
}

const contactInfo = [
    { icon: '📞', label: 'Phone', value: '+91 9510969818', href: 'tel:+919510969818' },
    { icon: '📧', label: 'Email', value: 'rajkshatriya1960@gmail.com', href: 'mailto:rajkshatriya1960@gmail.com' },
    { icon: '🐙', label: 'GitHub', value: 'github.com/RajKshatriya', href: 'https://github.com/RajKshatriya' },
    { icon: '💼', label: 'LinkedIn', value: 'linkedin.com/in/raj-kshatriya', href: 'https://www.linkedin.com/in/raj-kshatriya/' },
]

export default function Contact() {
    const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' })
    const [status, setStatus] = useState(null)
    const [loading, setLoading] = useState(false)

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value })
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        setLoading(true)
        setTimeout(() => {
            setLoading(false)
            setStatus('success')
            setForm({ name: '', email: '', subject: '', message: '' })
            setTimeout(() => setStatus(null), 4000)
        }, 1500)
    }

    return (
        <section id="contact" className="section contact-section">
            <div className="contact-bg-glow" />
            <div className="section-inner">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                >
                    <p className="section-eyebrow" style={{ textAlign: 'center' }}>Let's Connect</p>
                    <h2 className="section-title">Get In <span className="gradient-text">Touch</span></h2>
                    <p className="section-subtitle">// I'm always open to new opportunities</p>
                </motion.div>

                <div className="contact-layout">
                    <motion.div
                        className="contact-left"
                        initial={{ opacity: 0, x: -40 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.7 }}
                    >
                        <div className="contact-canvas-wrap">
                            <Canvas camera={{ position: [0, 0, 6], fov: 55 }}>
                                <ambientLight intensity={0.4} />
                                <pointLight position={[5, 5, 5]} intensity={2} color="#6c63ff" />
                                <pointLight position={[-5, -5, 5]} intensity={1} color="#00d4ff" />
                                <ContactOrb />
                            </Canvas>
                        </div>

                        <p className="contact-intro">
                            Whether you have a project in mind, want to collaborate, or just want to say hi,
                            my inbox is always open. I'll get back to you as soon as possible!
                        </p>

                        <div className="contact-info-list">
                            {contactInfo.map((info, i) => (
                                <motion.a
                                    key={info.label}
                                    href={info.href}
                                    className="contact-info-item glass-card hoverable"
                                    initial={{ opacity: 0, x: -20 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: i * 0.1 + 0.3, duration: 0.5 }}
                                    whileHover={{ x: 6 }}
                                >
                                    <span className="contact-icon">{info.icon}</span>
                                    <div>
                                        <span className="contact-label">{info.label}</span>
                                        <span className="contact-value">{info.value}</span>
                                    </div>
                                    <span className="contact-arrow">→</span>
                                </motion.a>
                            ))}
                        </div>
                    </motion.div>

                    <motion.div
                        className="contact-right"
                        initial={{ opacity: 0, x: 40 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.7 }}
                    >
                        <form className="contact-form glass-card" onSubmit={handleSubmit}>
                            <h3 className="form-title">Send a Message</h3>

                            <div className="form-row">
                                <div className="form-group">
                                    <label htmlFor="name">Your Name</label>
                                    <input
                                        id="name"
                                        type="text"
                                        name="name"
                                        value={form.name}
                                        onChange={handleChange}
                                        placeholder="John Doe"
                                        required
                                        className="form-input"
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="email">Email Address</label>
                                    <input
                                        id="email"
                                        type="email"
                                        name="email"
                                        value={form.email}
                                        onChange={handleChange}
                                        placeholder="john@example.com"
                                        required
                                        className="form-input"
                                    />
                                </div>
                            </div>

                            <div className="form-group">
                                <label htmlFor="subject">Subject</label>
                                <input
                                    id="subject"
                                    type="text"
                                    name="subject"
                                    value={form.subject}
                                    onChange={handleChange}
                                    placeholder="Project Collaboration"
                                    required
                                    className="form-input"
                                />
                            </div>

                            <div className="form-group">
                                <label htmlFor="message">Message</label>
                                <textarea
                                    id="message"
                                    name="message"
                                    value={form.message}
                                    onChange={handleChange}
                                    placeholder="Tell me about your project or just say hello..."
                                    required
                                    className="form-input form-textarea"
                                    rows={5}
                                />
                            </div>

                            <button type="submit" className="btn-primary submit-btn hoverable" disabled={loading}>
                                <span>{loading ? 'Sending...' : 'Send Message 🚀'}</span>
                            </button>

                            {status === 'success' && (
                                <motion.div
                                    className="form-success"
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                >
                                    ✅ Message sent! I'll get back to you soon.
                                </motion.div>
                            )}
                        </form>
                    </motion.div>
                </div>
            </div>
        </section>
    )
}
