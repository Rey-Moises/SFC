import React, { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import CoffeeBean from './CoffeeBean'
import FudgeChunk from './FudgeChunk'
import { EffectComposer, Bloom, Vignette } from '@react-three/postprocessing'

/* ── Easings ── */
function easeOutElastic(t) {
  if (t === 0 || t === 1) return t
  const p = 0.32
  return Math.pow(2, -10 * t) * Math.sin((t - p / 4) * (2 * Math.PI) / p) + 1
}

function easeInQuad(t) {
  return t * t
}

function easeOutBack(t, s = 1.7) {
  return 1 + (s + 1) * Math.pow(t - 1, 3) + s * Math.pow(t - 1, 2)
}

/*
 * ExplodingObject — 4-phase cinematic pop:
 *   Phase 1 ANTICIPATION (0.18s) — pre-coil wind-up
 *   Phase 2 BURST         (0.55s) — explosive elastic blast
 *   Phase 3 SETTLE        (0.45s) — micro-bounce
 *   Phase 4 DRIFT         (cont.) — slow gravity tumble
 */
function ExplodingObject({ targetPosition, targetScale, delay, fallSpeed = 0.15, children }) {
  const ref = useRef()
  const elapsed = useRef(0)
  const phase = useRef('waiting')
  const anticProgress = useRef(0)
  const burstProgress = useRef(0)
  const settleTimer = useRef(0)
  const fallOffset = useRef(0)
  const initialSpin = useRef([
    (Math.random() - 0.5) * 8,
    (Math.random() - 0.5) * 8,
    (Math.random() - 0.5) * 8,
  ])
  const windDir = useRef((Math.random() - 0.5) * 2)

  const anticDuration = 0.18
  const burstDuration = 0.55
  const settleDuration = 0.45

  useFrame((state, delta) => {
    if (!ref.current) return
    elapsed.current += delta

    if (phase.current === 'waiting') {
      if (elapsed.current < delay) return
      phase.current = 'anticipation'
      return
    }

    // Phase 1 — ANTICIPATION: tiny scale + wind-up rotation
    if (phase.current === 'anticipation') {
      anticProgress.current = Math.min(anticProgress.current + delta / anticDuration, 1)
      const t = easeInQuad(anticProgress.current)
      const s = targetScale * 0.25 * t
      ref.current.scale.setScalar(s)
      ref.current.rotation.z = -windDir.current * 0.3 * t
      ref.current.position.set(0, 0, 0)
      if (anticProgress.current >= 1) phase.current = 'burst'
      return
    }

    // Phase 2 — BURST: explosive shoot to target with overshoot + wild spin
    if (phase.current === 'burst') {
      burstProgress.current = Math.min(burstProgress.current + delta / burstDuration, 1)
      const t = burstProgress.current
      const elastic = easeOutElastic(t)
      const back = easeOutBack(Math.min(t * 1.2, 1), 1.4)

      ref.current.position.x = targetPosition[0] * elastic
      ref.current.position.y = targetPosition[1] * elastic
      ref.current.position.z = targetPosition[2] * elastic

      const scaleCurve = back > 1 ? back * (1 + (1 - t) * 0.18) : back
      ref.current.scale.setScalar(targetScale * Math.max(scaleCurve, 0.001))

      const spinIntensity = (1 - t) * 6
      ref.current.rotation.x += delta * initialSpin.current[0] * spinIntensity
      ref.current.rotation.y += delta * initialSpin.current[1] * spinIntensity
      ref.current.rotation.z += delta * initialSpin.current[2] * spinIntensity

      if (burstProgress.current >= 1) {
        phase.current = 'settle'
      }
      return
    }

    // Phase 3 — SETTLE: micro-bounce with damped sine
    if (phase.current === 'settle') {
      settleTimer.current += delta
      const t = Math.min(settleTimer.current / settleDuration, 1)
      const bounce = Math.sin(t * Math.PI * 3) * (1 - t) * 0.04
      ref.current.scale.setScalar(targetScale * (1 + bounce))
      ref.current.position.x = targetPosition[0]
      ref.current.position.y = targetPosition[1]
      ref.current.position.z = targetPosition[2]

      if (settleTimer.current >= settleDuration) {
        phase.current = 'drift'
      }
      return
    }

    // Phase 4 — DRIFT: slow gravity + tumble
    if (phase.current === 'drift') {
      fallOffset.current += delta * fallSpeed * (1 + fallOffset.current * 0.3)
      const maxFall = 3.5
      const currentFall = Math.min(fallOffset.current, maxFall)

      ref.current.position.x = targetPosition[0]
      ref.current.position.y = targetPosition[1] - currentFall
      ref.current.position.z = targetPosition[2]

      ref.current.rotation.x += delta * 0.18
      ref.current.rotation.y += delta * 0.10
      ref.current.rotation.z += delta * 0.06

      const breathe = Math.sin(state.clock.elapsedTime * 1.5) * 0.022
      ref.current.scale.setScalar(targetScale * (1 + breathe))
    }
  })

  return (
    <group ref={ref} position={[0, 0, 0]} scale={0}>
      {children}
    </group>
  )
}

export default function Scene({ mouse, scrollY = 0 }) {
  const groupRef = useRef()
  const sceneClock = useRef(0)

  /*
   * 3-TIER DEPTH SYSTEM:
   * HERO (4 beans) — large, foreground
   * MID   (7 beans) — scattered mid-field
   * FAR   (5 beans) — depth parallax
   */
  const beanData = useMemo(() => {
    const heroBeans = Array.from({ length: 4 }, () => ({
      position: [
        (Math.random() - 0.5) * 16,
        (Math.random() - 0.5) * 10 + 1,
        (Math.random() * 2) + 1,
      ],
      rotation: [Math.random() * Math.PI, Math.random() * Math.PI, Math.random() * Math.PI],
      scale: 0.62 + Math.random() * 0.28,
      fallSpeed: 0.05 + Math.random() * 0.06,
      delay: 0.08 + Math.random() * 0.25,
    }))

    const midBeans = Array.from({ length: 7 }, () => ({
      position: [
        (Math.random() - 0.5) * 20,
        (Math.random() - 0.5) * 12 + 1,
        (Math.random() - 0.5) * 6 - 2,
      ],
      rotation: [Math.random() * Math.PI, Math.random() * Math.PI, Math.random() * Math.PI],
      scale: 0.32 + Math.random() * 0.22,
      fallSpeed: 0.07 + Math.random() * 0.10,
      delay: 0.18 + Math.random() * 0.4,
    }))

    const farBeans = Array.from({ length: 5 }, () => ({
      position: [
        (Math.random() - 0.5) * 22,
        (Math.random() - 0.5) * 14 + 1,
        -(Math.random() * 6) - 4,
      ],
      rotation: [Math.random() * Math.PI, Math.random() * Math.PI, Math.random() * Math.PI],
      scale: 0.16 + Math.random() * 0.14,
      fallSpeed: 0.10 + Math.random() * 0.14,
      delay: 0.32 + Math.random() * 0.5,
    }))

    return [...heroBeans, ...midBeans, ...farBeans]
  }, [])

  // Fudge chunks — tiered, fewer so beans dominate
  const fudgeData = useMemo(() => {
    const heroFudge = Array.from({ length: 2 }, () => ({
      position: [
        (Math.random() - 0.5) * 14,
        (Math.random() - 0.5) * 8 + 1,
        (Math.random() * 2) + 0.5,
      ],
      rotation: [Math.random() * Math.PI, Math.random() * Math.PI, Math.random() * Math.PI],
      scale: 0.65 + Math.random() * 0.30,
      fallSpeed: 0.04 + Math.random() * 0.05,
      delay: 0.12 + Math.random() * 0.3,
      color: ['#6B3A2A', '#8B5E3C'][Math.floor(Math.random() * 2)],
    }))

    const midFudge = Array.from({ length: 3 }, () => ({
      position: [
        (Math.random() - 0.5) * 18,
        (Math.random() - 0.5) * 10 + 1,
        (Math.random() - 0.5) * 6 - 2,
      ],
      rotation: [Math.random() * Math.PI, Math.random() * Math.PI, Math.random() * Math.PI],
      scale: 0.40 + Math.random() * 0.20,
      fallSpeed: 0.06 + Math.random() * 0.08,
      delay: 0.22 + Math.random() * 0.4,
      color: ['#5C2E1A', '#7A4B32', '#9B6F50', '#A67B5B'][Math.floor(Math.random() * 4)],
    }))

    const farFudge = Array.from({ length: 2 }, () => ({
      position: [
        (Math.random() - 0.5) * 20,
        (Math.random() - 0.5) * 12 + 1,
        -(Math.random() * 5) - 4,
      ],
      rotation: [Math.random() * Math.PI, Math.random() * Math.PI, Math.random() * Math.PI],
      scale: 0.22 + Math.random() * 0.15,
      fallSpeed: 0.08 + Math.random() * 0.12,
      delay: 0.3 + Math.random() * 0.5,
      color: ['#4A2010', '#6B3A2A'][Math.floor(Math.random() * 2)],
    }))

    return [...heroFudge, ...midFudge, ...farFudge]
  }, [])

  // Parallax + camera dolly + scroll
  useFrame((state, delta) => {
    if (!groupRef.current) return
    sceneClock.current += delta

    // Gentle auto-rotate
    groupRef.current.rotation.y += delta * 0.0003

    // Mouse parallax
    const targetX = mouse.x * 0.4
    const targetY = mouse.y * 0.3
    groupRef.current.rotation.y = THREE.MathUtils.lerp(
      groupRef.current.rotation.y,
      targetX * 0.10 + state.clock.elapsedTime * 0.004,
      0.018
    )
    groupRef.current.rotation.x = THREE.MathUtils.lerp(
      groupRef.current.rotation.x,
      -targetY * 0.06,
      0.018
    )

    // Scroll-based vertical drift
    const scrollOffset = (scrollY || 0) * 0.0022
    groupRef.current.position.y = THREE.MathUtils.lerp(
      groupRef.current.position.y,
      scrollOffset,
      0.025
    )

    // Cinematic camera dolly
    const { camera } = state
    const t = sceneClock.current
    const dollyT = THREE.MathUtils.smoothstep(t, 0.2, 1.4)
    const camZ = THREE.MathUtils.lerp(8.5, 5, dollyT)
    const camY = THREE.MathUtils.lerp(1.2, 0.5, dollyT)

    const targetPos = new THREE.Vector3(0, camY, camZ)
    camera.position.lerp(targetPos, 0.035)
    camera.lookAt(0, 0, 0)
  })

  return (
    <>
      {/* Cinematic lighting */}
      <ambientLight intensity={0.42} color="#FFF2E4" />
      <directionalLight position={[-6, 4, 6]} intensity={1.55} color="#FFD4A6" />
      <directionalLight position={[5, -2, 3]} intensity={0.28} color="#FFE6CC" />
      <directionalLight position={[0, 0, -6]} intensity={0.20} color="#FFD8B8" />
      <directionalLight position={[0, 6, 2]} intensity={0.45} color="#FFFFFF" />

      <group ref={groupRef}>
        {beanData.map((bean, i) => (
          <ExplodingObject
            key={`bean-${i}`}
            targetPosition={bean.position}
            targetScale={bean.scale}
            delay={bean.delay}
            fallSpeed={bean.fallSpeed}
          >
            <CoffeeBean position={[0, 0, 0]} rotation={bean.rotation} scale={1} />
          </ExplodingObject>
        ))}

        {fudgeData.map((fudge, i) => (
          <ExplodingObject
            key={`fudge-${i}`}
            targetPosition={fudge.position}
            targetScale={fudge.scale}
            delay={fudge.delay}
            fallSpeed={fudge.fallSpeed}
          >
            <FudgeChunk
              position={[0, 0, 0]}
              rotation={fudge.rotation}
              scale={1}
              color={fudge.color}
            />
          </ExplodingObject>
        ))}
      </group>

      {/* Cinematic post-processing */}
      <EffectComposer multisampling={8} autoClear={false}>
        <Bloom luminanceThreshold={0.15} luminanceSmoothing={0.85} intensity={0.32} mipmapBlur />
        <Vignette eskil={false} offset={0.18} darkness={0.55} />
      </EffectComposer>
    </>
  )
}