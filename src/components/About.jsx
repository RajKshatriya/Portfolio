import { useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Float, RoundedBox, MeshDistortMaterial } from '@react-three/drei'
import { motion } from 'framer-motion'
import './About.css'

function FloatingCube() {
    const meshRef = useRef()
    useFrame((state) => {
        meshRef.current.rotation.x = state.clock.elapsedTime * 0.15
        meshRef.current.rotation.y = state.clock.elapsedTime * 0.2
    })
    return (
        <Float floatIntensity={1.5} rotationIntensity={0.5}>
            <mesh ref={meshRef}>
                <torusKnotGeometry args={[1, 0.35, 128, 16]} />
                <MeshDistortMaterial
                    color="#6c63ff"
                    distort={0.25}
                    speed={2}
                    roughness={0.1}
                    metalness={0.9}
                    emissive="#3330aa"
                    emissiveIntensity={0.4}
                />
            </mesh>
        </Float>
    )
}

const fadeIn = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } }
}

const timelineItems = [
    {
        year: '2025',
        title: 'B.Sc. in AI&ML @ Sheth N.K.T.T. College',
        desc: 'Pursuing degree in Artificial Intelligence and Machine Learning (2025 - 2028).',
        color: '#6c63ff',
    },
    {
        year: '2025',
        title: 'Frontend Developer @ NKT CODING CLUB',
        desc: 'Frontend development for multiple club projects.',
        color: '#00d4ff',
    },
    {
        year: '2025',
        title: 'Maharashtra HSC Boards',
        desc: 'Completed Higher Secondary with 62.20%.',
        color: '#ff6584',
    },
    {
        year: '2023',
        title: 'Maharashtra SSC Boards',
        desc: 'Completed Secondary School with 76.60%.',
        color: '#43e97b',
    },
]

export default function About() {
    return (
        <section id="about" className="section about-section">
            <div className="about-bg-glow" />
            <div className="section-inner about-inner">
                <motion.div
                    className="about-text"
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: '-100px' }}
                    variants={{
                        visible: { transition: { staggerChildren: 0.15 } }
                    }}
                >
                    <motion.p variants={fadeIn} className="section-eyebrow">Get to Know Me</motion.p>
                    <motion.h2 variants={fadeIn} className="section-title" style={{ textAlign: 'left' }}>
                        About <span className="gradient-text">Me</span>
                    </motion.h2>
                    <motion.p variants={fadeIn} className="about-bio">
                        Hey there! I'm <strong>Raj Kshatriya</strong>, a continuous learner and passionate frontend developer based in Mumbai, India.
                        I thrive on building interactive web applications using <span className="gradient-text">React.js and Three.js</span>, bringing digital architectures to life.
                    </motion.p>
                    <motion.p variants={fadeIn} className="about-bio">
                        As a member of the NKT Coding Club, I enjoy collaborating on projects and constantly growing my skill set. I believe in fast learning, effective team management, and writing code that makes an impact.
                    </motion.p>

                    <motion.div variants={fadeIn} className="about-timeline">
                        {timelineItems.map((item, i) => (
                            <div key={i} className="timeline-item glass-card" style={{ '--accent-color': item.color }}>
                                <span className="timeline-year" style={{ color: item.color }}>{item.year}</span>
                                <div>
                                    <h4 className="timeline-title">{item.title}</h4>
                                    <p className="timeline-desc">{item.desc}</p>
                                </div>
                            </div>
                        ))}
                    </motion.div>

                    <motion.div variants={fadeIn} className="about-chips">
                        {['JavaScript', 'React.js', 'Three.js', 'SQL', 'Fast Learner', 'Leadership'].map(chip => (
                            <span key={chip} className="chip hoverable">{chip}</span>
                        ))}
                    </motion.div>
                </motion.div>

                <motion.div
                    className="about-3d"
                    initial={{ opacity: 0, x: 60 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: '-100px' }}
                    transition={{ duration: 0.8, ease: 'easeOut' }}
                >
                    <div className="about-canvas-wrap">
                        <Canvas camera={{ position: [0, 0, 5], fov: 50 }}>
                            <ambientLight intensity={0.6} />
                            <pointLight position={[5, 5, 5]} intensity={2} color="#6c63ff" />
                            <pointLight position={[-5, -5, -5]} intensity={1} color="#00d4ff" />
                            <FloatingCube />
                        </Canvas>
                    </div>
                    <div className="about-card-grid">
                        {[
                            { icon: '🎓', label: 'CS Student' },
                            { icon: '💻', label: 'Developer' },
                            { icon: '🎨', label: 'Designer' },
                            { icon: '🚀', label: 'Builder' },
                        ].map((c, i) => (
                            <div key={i} className="about-mini-card glass-card hoverable">
                                <span className="mini-icon">{c.icon}</span>
                                <span className="mini-label">{c.label}</span>
                            </div>
                        ))}
                    </div>
                </motion.div>
            </div>
        </section>
    )
}
