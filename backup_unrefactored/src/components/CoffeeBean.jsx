import React, { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { useGLTF } from '@react-three/drei'

/*
 * CoffeeBean — loads the custom GLB coffee bean model
 * from public/models/coffee-bean.glb via drei's useGLTF hook.
 * Applies a rich espresso-brown material and gentle rotation drift.
 */
export default function CoffeeBean({ position, rotation, scale = 0.3 }) {
  const meshRef = useRef()
  const { scene } = useGLTF('/models/coffee-bean.glb')

  // Slow drift rotation
  useFrame((state, delta) => {
    if (!meshRef.current) return
    meshRef.current.rotation.y += delta * 0.06
    meshRef.current.rotation.x += delta * 0.04
  })

  return (
    <group
      ref={meshRef}
      position={position}
      rotation={rotation}
      scale={scale}
    >
      <primitive object={scene.clone()} />
    </group>
  )
}

// Preload the model for instant availability
useGLTF.preload('/models/coffee-bean.glb')
