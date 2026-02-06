import { Stars } from '@react-three/drei'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { useMemo, useRef } from 'react'
import * as THREE from 'three'

function BreathingPlane() {
  const mesh = useRef<THREE.Mesh>(null)

  const geometry = useMemo(() => new THREE.PlaneGeometry(12, 12, 64, 64), [])

  const originalPositions = useMemo(() => {
    return geometry.attributes.position.array.slice()
  }, [geometry])

  useFrame((state) => {
    if (!mesh.current)
      return

    const time = state.clock.getElapsedTime()
    const positionAttribute = mesh.current.geometry.attributes.position
    const array = positionAttribute.array as Float32Array

    for (let i = 0; i < originalPositions.length; i += 3) {
      const x = originalPositions[i]
      const y = originalPositions[i + 1]

      const z
        = Math.sin(x * 0.8 + time * 0.4) * 0.3
        + Math.cos(y * 0.5 + time * 0.3) * 0.3
        + Math.sin((x + y) * 0.5 + time * 0.2) * 0.2

      array[i + 2] = z
    }

    positionAttribute.needsUpdate = true

    mesh.current.rotation.z = Math.sin(time * 0.05) * 0.05
    mesh.current.rotation.x = -Math.PI / 2.2 + Math.cos(time * 0.1) * 0.02
  })

  return (
    <mesh ref={mesh} geometry={geometry} position={[0, -1, -2]}>
      <meshPhysicalMaterial
        color="#F7F5F2"
        roughness={0.65}
        metalness={0.1}
        transmission={0.0}
        clearcoat={0.3}
        clearcoatRoughness={0.5}
        side={THREE.DoubleSide}
      />
    </mesh>
  )
}

function FloatingParticles() {
  return (
    <Stars
      radius={50}
      depth={50}
      count={2000}
      factor={4}
      saturation={0}
      fade
      speed={1}
    />
  )
}

function MouseParallax() {
  const { camera } = useThree()

  useFrame((state) => {
    const mouse = state.pointer
    camera.position.x += (mouse.x * 0.5 - camera.position.x) * 0.05
    camera.position.y += (mouse.y * 0.5 - camera.position.y) * 0.05
    camera.lookAt(0, 0, 0)
  })

  return null
}

function Lighting() {
  return (
    <>
      <ambientLight intensity={0.7} color="#ffffff" />
      <directionalLight position={[5, 10, 7]} intensity={1.2} color="#ffffff" />
      <directionalLight position={[-5, 5, 5]} intensity={0.5} color="#E5E0D8" />
      <pointLight position={[0, -5, 2]} intensity={0.3} color="#0047FF" distance={10} />
    </>
  )
}

export default function Scene() {
  return (
    <div className="opacity-60 h-full w-full pointer-events-none inset-0 absolute mix-blend-multiply -z-10">
      <Canvas
        camera={{ position: [0, 0, 6], fov: 45 }}
        dpr={[1, 2]}
        gl={{ antialias: true, alpha: true }}
      >
        <Lighting />
        <BreathingPlane />
        <FloatingParticles />
        <MouseParallax />
        <fog attach="fog" args={['#F7F5F2', 5, 20]} />
      </Canvas>
    </div>
  )
}
