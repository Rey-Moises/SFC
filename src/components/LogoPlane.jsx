import React from 'react'
import { useLoader } from '@react-three/fiber'
import { TextureLoader, DoubleSide } from 'three'

/**
 * A simple plane that displays the brand logo as a texture.
 * It is placed behind the 3D beans and centered in the scene.
 *
 * Props:
 *   - position: [x, y, z] coordinates for the plane (default [0,0,-0.4])
 *   - scale: uniform scale factor (default 2.4)
 */
export default function LogoPlane({ position = [0, 0, -0.4], scale = 2.4 }) {
  // Load the logo image placed in /public/images/logo.png
  const texture = useLoader(TextureLoader, '/images/logo.png')

  return (
    <mesh position={position} scale={scale} renderOrder={-1}>
      {/* Plane geometry – square; adjust size via scale prop */}
      <planeGeometry args={[1, 1]} />
      <meshBasicMaterial map={texture} transparent side={DoubleSide} />
    </mesh>
  )
}