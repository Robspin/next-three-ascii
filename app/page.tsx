"use client"
import React, { Suspense } from 'react'
import { Canvas } from '@react-three/fiber'
import { EffectComposer } from '@react-three/postprocessing'
import { ASCIIEffect } from '@/utils/shaders'
import { OrbitControls } from '@react-three/drei'
import { useControls } from 'leva'
import { Labrador } from '@/components/models/labrador'

export default function Page() {
    const { asciiEffectEnabled, autoRotate, lightIntensity, cellSize } = useControls({
        asciiEffectEnabled: true,
        autoRotate: true,
        lightIntensity: {
            value: 8,
            min: 0,
            max: 10,
            step: 0.1
        },
        cellSize: {
            value: 15,
            min: 0,
            max: 30,
            step: 0.1
        }
    })

    const asciiEffect = React.useMemo(() => new ASCIIEffect({
        cellSize
    }), [cellSize]);


    return (
        <Canvas className="h-screen w-screen">
            <Suspense fallback={null}>
                <color attach="background" args={["black"]}/>
                <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} decay={0} intensity={lightIntensity}/>
                <pointLight position={[-10, -10, -10]} decay={0} intensity={lightIntensity}/>
                <Labrador position={[0, -2, 0]} scale={1} autoRotate={autoRotate} />
            </Suspense>
            <OrbitControls/>
            {asciiEffectEnabled && <EffectComposer>
                <primitive object={asciiEffect}/>
            </EffectComposer>}
        </Canvas>
    )
}
