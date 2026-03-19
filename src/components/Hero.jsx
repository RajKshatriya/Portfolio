import { useRef, useMemo } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Float, Stars, Sphere, MeshDistortMaterial, Environment, Text3D, Center } from '@react-three/drei'
import * as THREE from 'three'
import { motion } from 'framer-motion'
import './Hero.css'

// Floating glowing orb
function GlowOrb({ position, color, size = 1, speed = 1 }) {
    const meshRef = useRef()
    useFrame((state) => {
        const t = state.clock.elapsedTime * speed
        meshRef.current.position.y = position[1] + Math.sin(t) * 0.3
        meshRef.current.rotation.x = Math.sin(t * 0.5) * 0.2
        meshRef.current.rotation.z = Math.cos(t * 0.3) * 0.2
    })
    return (
        <mesh ref={meshRef} position={position}>
            <sphereGeometry args={[size, 32, 32]} />
            <MeshDistortMaterial
                color={color}
                distort={0.4}
                speed={2}
                roughness={0}
                metalness={0.8}
                emissive={color}
                emissiveIntensity={0.4}
            />
        </mesh>
    )
}

// Rotating geometric shape
function RotatingIcosahedron() {
    const meshRef = useRef()
    useFrame((state) => {
        meshRef.current.rotation.x = state.clock.elapsedTime * 0.2
        meshRef.current.rotation.y = state.clock.elapsedTime * 0.3
    })
    return (
        <mesh ref={meshRef} position={[0, 0, 0]} scale={1.8}>
            <icosahedronGeometry args={[1, 1]} />
            <meshStandardMaterial
                color="#6c63ff"
                wireframe={false}
                roughness={0.2}
                metalness={0.9}
                emissive="#3a33cc"
                emissiveIntensity={0.3}
            />
        </mesh>
    )
}

// Wireframe ring
function Ring({ radius, color, rotationSpeed }) {
    const ref = useRef()
    useFrame((state) => {
        ref.current.rotation.x = state.clock.elapsedTime * rotationSpeed
        ref.current.rotation.y = state.clock.elapsedTime * rotationSpeed * 0.7
    })
    return (
        <mesh ref={ref}>
            <torusGeometry args={[radius, 0.015, 16, 100]} />
            <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.8} />
        </mesh>
    )
}

// Particle cloud
function Particles({ count = 200 }) {
    const points = useRef()
    const positions = useMemo(() => {
        const pos = new Float32Array(count * 3)
        for (let i = 0; i < count; i++) {
            pos[i * 3] = (Math.random() - 0.5) * 20
            pos[i * 3 + 1] = (Math.random() - 0.5) * 20
            pos[i * 3 + 2] = (Math.random() - 0.5) * 20
        }
        return pos
    }, [count])

    useFrame((state) => {
        points.current.rotation.y = state.clock.elapsedTime * 0.03
        points.current.rotation.x = state.clock.elapsedTime * 0.01
    })

    return (
        <points ref={points}>
            <bufferGeometry>
                <bufferAttribute attach="attributes-position" array={positions} count={count} itemSize={3} />
            </bufferGeometry>
            <pointsMaterial size={0.05} color="#6c63ff" transparent opacity={0.8} sizeAttenuation />
        </points>
    )
}

function HeroScene() {
    return (
        <>
            <ambientLight intensity={0.5} />
            <pointLight position={[10, 10, 10]} intensity={1.5} color="#6c63ff" />
            <pointLight position={[-10, -10, -10]} intensity={1} color="#00d4ff" />
            <pointLight position={[0, 10, -10]} intensity={0.8} color="#ff6584" />

            <Stars radius={80} depth={50} count={3000} factor={4} saturation={0} fade speed={1} />
            <Particles />

            <Float floatIntensity={1} rotationIntensity={0.5}>
                <RotatingIcosahedron />
            </Float>

            <Ring radius={2.5} color="#6c63ff" rotationSpeed={0.3} />
            <Ring radius={3.2} color="#00d4ff" rotationSpeed={-0.2} />
            <Ring radius={4} color="#ff6584" rotationSpeed={0.15} />

            <GlowOrb position={[-5, 2, -3]} color="#6c63ff" size={0.4} speed={0.8} />
            <GlowOrb position={[5, -2, -2]} color="#00d4ff" size={0.3} speed={1.2} />
            <GlowOrb position={[3, 3, -4]} color="#ff6584" size={0.25} speed={0.6} />
            <GlowOrb position={[-4, -3, -1]} color="#43e97b" size={0.35} speed={1} />
        </>
    )
}

const heroText = {
    hidden: { opacity: 0, y: 40 },
    visible: (i) => ({
        opacity: 1,
        y: 0,
        transition: { delay: i * 0.15, duration: 0.7, ease: [0.4, 0, 0.2, 1] }
    })
}

export default function Hero() {
    return (
        <section id="hero" className="hero-section">
            <div className="hero-canvas">
                <Canvas camera={{ position: [0, 0, 8], fov: 60 }}>
                    <HeroScene />
                </Canvas>
            </div>

            <div className="hero-content">
                <motion.div
                    className="hero-badge"
                    custom={0}
                    initial="hidden"
                    animate="visible"
                    variants={heroText}
                >
                    <span className="badge-dot" />
                    <span>Available for opportunities</span>
                </motion.div>

                <motion.p className="hero-greeting" custom={1} initial="hidden" animate="visible" variants={heroText}>
                    Hello, I'm
                </motion.p>

                <motion.h1 className="hero-name" custom={2} initial="hidden" animate="visible" variants={heroText}>
                    Raj <span className="gradient-text">Kshatriya</span>
                </motion.h1>

                <motion.div className="hero-role" custom={3} initial="hidden" animate="visible" variants={heroText}>
                    <span className="role-bracket">&lt;</span>
                    <span className="role-text" id="typed-text">Frontend Developer</span>
                    <span className="role-cursor">_</span>
                    <span className="role-bracket">/&gt;</span>
                </motion.div>

                <motion.p className="hero-description" custom={4} initial="hidden" animate="visible" variants={heroText}>
                    Seeking a software development internship to leverage expertise in JavaScript, React.js, Three.js and SQL. Aiming to contribute to real-world projects and accelerate professional growth.
                </motion.p>

                <motion.div className="hero-actions" custom={5} initial="hidden" animate="visible" variants={heroText}>
                    <button
                        className="btn-primary hoverable"
                        onClick={() => document.getElementById('projects').scrollIntoView({ behavior: 'smooth' })}
                    >
                        <span>View My Work</span>
                    </button>
                    <button
                        className="btn-outline hoverable"
                        onClick={() => document.getElementById('contact').scrollIntoView({ behavior: 'smooth' })}
                    >
                        Get In Touch
                    </button>
                </motion.div>

                <motion.div className="hero-stats" custom={6} initial="hidden" animate="visible" variants={heroText}>
                    {[
                        { value: 'NKT', label: 'Coding Club' },
                        { value: '10+', label: 'Skills Mastered' },
                        { value: '3+', label: 'Years Coding' },
                    ].map((stat, i) => (
                        <div key={i} className="stat-item">
                            <span className="stat-value gradient-text">{stat.value}</span>
                            <span className="stat-label">{stat.label}</span>
                        </div>
                    ))}
                </motion.div>
            </div>

            <motion.div
                className="scroll-indicator"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 2, duration: 1 }}
            >
                <div className="scroll-mouse">
                    <div className="scroll-wheel" />
                </div>
                <span>Scroll to explore</span>
            </motion.div>
        </section>
    )
}