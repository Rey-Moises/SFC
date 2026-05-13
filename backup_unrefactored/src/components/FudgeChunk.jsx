import React, { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import { RoundedBox, Outlines } from '@react-three/drei'

export default function FudgeChunk({ position, rotation, scale, color = '#6B3A2A' }) {
  const meshRef = useRef()

  // Slow individual rotation for dust-mote drift effect
  useFrame((state, delta) => {
    if (!meshRef.current) return
    meshRef.current.rotation.x += delta * 0.08
    meshRef.current.rotation.z += delta * 0.05
  })

  // Slightly varied proportions for each chunk
  const dims = useMemo(() => {
    return [
      0.8 + Math.random() * 0.6,
      0.6 + Math.random() * 0.5,
      0.7 + Math.random() * 0.5,
    ]
  }, [])

  return (
    <mesh ref={meshRef} position={position} rotation={rotation} scale={scale}>
      <RoundedBox args={dims} radius={0.12} smoothness={4}>
        <meshStandardMaterial
          color={color}
          roughness={0.92}
          metalness={0}
        />
        <Outlines thickness={1} color="#3B2416" />
      </RoundedBox>
    </mesh>
  )
}
