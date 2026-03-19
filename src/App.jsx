import { useState, useEffect, useRef } from 'react'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import About from './components/About'
import Skills from './components/Skills'
import Projects from './components/Projects'
import Contact from './components/Contact'
import Footer from './components/Footer'
import './App.css'

function App() {
  const cursorRef = useRef(null)
  const trailRef = useRef(null)

  useEffect(() => {
    const cursor = cursorRef.current
    const trail = trailRef.current
    let mouseX = 0, mouseY = 0
    let trailX = 0, trailY = 0

    const onMouseMove = (e) => {
      mouseX = e.clientX
      mouseY = e.clientY
      if (cursor) {
        cursor.style.left = mouseX + 'px'
        cursor.style.top = mouseY + 'px'
      }
    }

    const animateTrail = () => {
      trailX += (mouseX - trailX) * 0.12
      trailY += (mouseY - trailY) * 0.12
      if (trail) {
        trail.style.left = trailX + 'px'
        trail.style.top = trailY + 'px'
      }
      requestAnimationFrame(animateTrail)
    }

    const onMouseEnterButton = () => {
      if (cursor) {
        cursor.style.width = '20px'
        cursor.style.height = '20px'
        cursor.style.background = 'var(--accent-2)'
      }
    }

    const onMouseLeaveButton = () => {
      if (cursor) {
        cursor.style.width = '12px'
        cursor.style.height = '12px'
        cursor.style.background = 'var(--accent-1)'
      }
    }

    window.addEventListener('mousemove', onMouseMove)
    animateTrail()

    const buttons = document.querySelectorAll('button, a, .hoverable')
    buttons.forEach(b => {
      b.addEventListener('mouseenter', onMouseEnterButton)
      b.addEventListener('mouseleave', onMouseLeaveButton)
    })

    return () => {
      window.removeEventListener('mousemove', onMouseMove)
    }
  }, [])

  return (
    <>
      <div className="noise" />
      <div className="cursor" ref={cursorRef} />
      <div className="cursor-trail" ref={trailRef} />
      <Navbar />
      <main>
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Contact />
      </main>
      <Footer />
    </>
  )
}

export default App
