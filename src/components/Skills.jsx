import { useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Float } from '@react-three/drei'
import { motion } from 'framer-motion'
import './Skills.css'

const skills = [
    { name: 'JavaScript', level: 85, color: '#f7df1e', icon: '📜', category: 'Frontend' },
    { name: 'React.js', level: 75, color: '#61dafb', icon: '⚛️', category: 'Frontend' },
    { name: 'Three.js', level: 60, color: '#6c63ff', icon: '🌐', category: 'Frontend' },
    { name: 'HTML5 & CSS3', level: 90, color: '#e34c26', icon: '🎨', category: 'Frontend' },
    { name: 'C / C++', level: 80, color: '#00599C', icon: '⚙️', category: 'Backend' },
    { name: 'Python', level: 70, color: '#3776ab', icon: '🐍', category: 'Backend' },
    { name: 'MySQL', level: 65, color: '#4479A1', icon: '🐬', category: 'Backend' },
    { name: 'Git & GitHub', level: 80, color: '#f34f29', icon: '🐙', category: 'Tools' },
    { name: 'Deployment (Vercel/Render)', level: 75, color: '#ffffff', icon: '☁️', category: 'Tools' },
]

function SkillSphere({ position, color, scale = 1 }) {
    const meshRef = useRef()
    useFrame((state) => {
        const t = state.clock.elapsedTime
        meshRef.current.rotation.x = t * 0.3
        meshRef.current.rotation.y = t * 0.5
    })
    return (
        <Float floatIntensity={1} speed={2} rotationIntensity={0.3}>
            <mesh ref={meshRef} position={position} scale={scale}>
                <octahedronGeometry args={[1, 0]} />
                <meshStandardMaterial
                    color={color}
                    roughness={0.2}
                    metalness={0.9}
                    emissive={color}
                    emissiveIntensity={0.3}
                    wireframe={false}
                />
            </mesh>
        </Float>
    )
}

function SkillsScene() {
    return (
        <>
            <ambientLight intensity={0.5} />
            <pointLight position={[5, 5, 5]} intensity={2} color="#6c63ff" />
            <pointLight position={[-5, -5, 5]} intensity={1.5} color="#00d4ff" />
            <SkillSphere position={[-2.5, 1, 0]} color="#61dafb" scale={0.5} />
            <SkillSphere position={[2, -1, 0]} color="#f7df1e" scale={0.6} />
            <SkillSphere position={[0, 0, 0]} color="#6c63ff" scale={1} />
            <SkillSphere position={[-1.5, -2, 0]} color="#68a063" scale={0.45} />
            <SkillSphere position={[2.5, 2, 0]} color="#ff6584" scale={0.4} />
        </>
    )
}

const categories = ['All', 'Frontend', 'Backend', 'Tools']

export default function Skills() {
    return (
        <section id="skills" className="section skills-section">
            <div className="skills-bg-glow" />
            <div className="section-inner">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                >
                    <p className="section-eyebrow" style={{ textAlign: 'center' }}>What I Work With</p>
                    <h2 className="section-title">My <span className="gradient-text">Tech Stack</span></h2>
                    <p className="section-subtitle">// tools & technologies I use every day</p>
                </motion.div>

                <div className="skills-layout">
                    <div className="skills-canvas-wrap">
                        <Canvas camera={{ position: [0, 0, 6], fov: 55 }}>
                            <SkillsScene />
                        </Canvas>
                        <div className="canvas-label">Interactive 3D</div>
                    </div>

                    <div className="skills-grid">
                        {skills.map((skill, i) => (
                            <motion.div
                                key={skill.name}
                                className="skill-card glass-card hoverable"
                                initial={{ opacity: 0, scale: 0.8 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.05, duration: 0.4 }}
                                whileHover={{ scale: 1.04 }}
                            >
                                <div className="skill-header">
                                    <span className="skill-icon">{skill.icon}</span>
                                    <div>
                                        <span className="skill-name">{skill.name}</span>
                                        <span className="skill-category">{skill.category}</span>
                                    </div>
                                    <span className="skill-pct" style={{ color: skill.color }}>{skill.level}%</span>
                                </div>
                                <div className="skill-bar-bg">
                                    <motion.div
                                        className="skill-bar-fill"
                                        style={{ background: `linear-gradient(90deg, ${skill.color}88, ${skill.color})` }}
                                        initial={{ width: 0 }}
                                        whileInView={{ width: `${skill.level}%` }}
                                        viewport={{ once: true }}
                                        transition={{ delay: i * 0.05 + 0.3, duration: 0.8, ease: 'easeOut' }}
                                    />
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    )
}
