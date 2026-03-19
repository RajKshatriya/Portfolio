import { useState, useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Float, MeshDistortMaterial } from '@react-three/drei'
import { motion, AnimatePresence } from 'framer-motion'
import './Projects.css'

const projects = [
    {
        id: 1,
        title: 'NKT Coding Club',
        description: 'Frontend development for the official club website, fostering a collaborative community of student developers.',
        tech: ['React.js', 'JavaScript', 'CSS', 'Vercel'],
        color: '#6c63ff',
        emoji: '👨‍💻',
        github: '#',
        live: 'https://www.nktcodingclub.live/',
        featured: true,
    },
    {
        id: 2,
        title: 'FitTrack',
        description: 'A comprehensive health and fitness tracking application designed to help users monitor workouts and activity levels.',
        tech: ['JavaScript', 'HTML5/CSS3', 'Backend', 'Onrender'],
        color: '#00d4ff',
        emoji: '🏃‍♂️',
        github: '#',
        live: 'https://fittrack-0rwp.onrender.com/',
        featured: true,
    },
    {
        id: 3,
        title: 'PixelForge',
        description: 'A browser-based pixel art editor with layer support, animation frames, palette management, and export to GIF/PNG.',
        tech: ['Vanilla JS', 'Canvas API', 'WebWorkers', 'IndexedDB'],
        color: '#ff6584',
        emoji: '🎨',
        github: '#',
        live: '#',
        featured: false,
    },
    {
        id: 4,
        title: 'DataVault',
        description: 'A personal finance tracker with beautiful charts, budget forecasting with ML, and automated expense categorization.',
        tech: ['React', 'Python', 'FastAPI', 'PostgreSQL', 'Chart.js'],
        color: '#43e97b',
        emoji: '💰',
        github: '#',
        live: '#',
        featured: false,
    },
    {
        id: 5,
        title: 'StarMap 3D',
        description: 'An interactive 3D star map using Three.js with over 100,000 real stars, constellation overlays, and time travel.',
        tech: ['Three.js', 'React', 'WebGL', 'Astronomy API'],
        color: '#ffd700',
        emoji: '⭐',
        github: '#',
        live: '#',
        featured: false,
    },
    {
        id: 6,
        title: 'DevFlow CLI',
        description: 'A developer productivity CLI tool that automates git workflows, generates boilerplate code, and provides project templates.',
        tech: ['Node.js', 'Commander.js', 'Inquirer', 'Handlebars'],
        color: '#f39c12',
        emoji: '⚡',
        github: '#',
        live: '#',
        featured: false,
    },
]

function ProjectOrb({ color }) {
    const meshRef = useRef()
    useFrame((state) => {
        meshRef.current.rotation.x = state.clock.elapsedTime * 0.4
        meshRef.current.rotation.y = state.clock.elapsedTime * 0.6
    })
    return (
        <Float floatIntensity={2} speed={3}>
            <mesh ref={meshRef}>
                <dodecahedronGeometry args={[1.2, 0]} />
                <MeshDistortMaterial
                    color={color}
                    distort={0.3}
                    speed={3}
                    roughness={0.1}
                    metalness={0.8}
                    emissive={color}
                    emissiveIntensity={0.35}
                />
            </mesh>
        </Float>
    )
}

function ProjectCard({ project, index }) {
    const [flipped, setFlipped] = useState(false)

    return (
        <motion.div
            className="project-card-wrap"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1, duration: 0.5 }}
        >
            <motion.div
                className="project-card-inner"
                animate={{ rotateY: flipped ? 180 : 0 }}
                transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
                style={{ transformStyle: 'preserve-3d' }}
            >
                {/* Front */}
                <div className="project-face project-front glass-card" style={{ '--proj-color': project.color }}>
                    <div className="project-canvas-mini">
                        <Canvas camera={{ position: [0, 0, 4], fov: 50 }}>
                            <ambientLight intensity={0.5} />
                            <pointLight position={[3, 3, 3]} intensity={2} color={project.color} />
                            <ProjectOrb color={project.color} />
                        </Canvas>
                    </div>
                    <div className="project-emoji">{project.emoji}</div>
                    <h3 className="project-title">{project.title}</h3>
                    <p className="project-desc">{project.description}</p>
                    <div className="project-tags">
                        {project.tech.slice(0, 3).map(t => (
                            <span key={t} className="project-tag" style={{ borderColor: `${project.color}50`, color: project.color }}>
                                {t}
                            </span>
                        ))}
                        {project.tech.length > 3 && (
                            <span className="project-tag" style={{ color: 'var(--text-secondary)' }}>+{project.tech.length - 3}</span>
                        )}
                    </div>
                    <button className="flip-btn hoverable" onClick={() => setFlipped(true)} style={{ color: project.color }}>
                        View Details →
                    </button>
                </div>

                {/* Back */}
                <div className="project-face project-back glass-card" style={{ '--proj-color': project.color, transform: 'rotateY(180deg)' }}>
                    <div className="back-accent" style={{ background: project.color }} />
                    <h3 className="project-title">{project.title}</h3>
                    <p className="project-desc-full">{project.description}</p>
                    <div className="project-tech-full">
                        <span className="tech-label">Tech Stack:</span>
                        <div className="project-tags">
                            {project.tech.map(t => (
                                <span key={t} className="project-tag" style={{ borderColor: `${project.color}50`, color: project.color }}>{t}</span>
                            ))}
                        </div>
                    </div>
                    <div className="project-links">
                        <a href={project.github} className="btn-outline hoverable" style={{ borderColor: project.color, color: project.color }}>
                            GitHub
                        </a>
                        <a href={project.live} className="btn-primary hoverable">
                            <span>Live Demo</span>
                        </a>
                    </div>
                    <button className="flip-btn hoverable" onClick={() => setFlipped(false)} style={{ color: 'var(--text-secondary)' }}>
                        ← Back
                    </button>
                </div>
            </motion.div>
        </motion.div>
    )
}

export default function Projects() {
    return (
        <section id="projects" className="section projects-section">
            <div className="projects-bg-glow" />
            <div className="section-inner">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                >
                    <p className="section-eyebrow" style={{ textAlign: 'center' }}>What I've Built</p>
                    <h2 className="section-title">Featured <span className="gradient-text">Projects</span></h2>
                    <p className="section-subtitle">// hover over cards to flip & explore</p>
                </motion.div>

                <div className="projects-grid">
                    {projects.map((project, i) => (
                        <ProjectCard key={project.id} project={project} index={i} />
                    ))}
                </div>
            </div>
        </section>
    )
}
