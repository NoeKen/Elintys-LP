"use client";

import { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Line, Preload } from "@react-three/drei";
import type { Group, Mesh } from "three";

type Point = [number, number, number];

const points: Point[] = [
  [-1.9, 0.92, 0],
  [-0.88, 1.28, 0.12],
  [0.38, 0.84, -0.08],
  [1.42, 1.16, 0.1],
  [2.02, 0.34, 0],
  [1.12, -0.4, 0.18],
  [0.08, -0.96, 0],
  [-1.08, -0.52, -0.12],
  [-2.08, -0.08, 0.08],
];

const routes: Point[][] = [
  [points[0], points[1], points[2], points[3], points[4]],
  [points[8], points[7], points[6], points[5], points[4]],
  [points[1], points[7], points[2], points[5]],
];

function EventNetwork() {
  const group = useRef<Group>(null);
  const pulse = useRef<Mesh>(null);

  useFrame((state) => {
    if (!group.current) {
      return;
    }

    const t = state.clock.elapsedTime;
    group.current.rotation.y = Math.sin(t * 0.18) * 0.045 + state.pointer.x * 0.025;
    group.current.rotation.x = Math.cos(t * 0.14) * 0.025 - state.pointer.y * 0.012;
    group.current.position.y = Math.sin(t * 0.28) * 0.035;

    if (pulse.current) {
      const scale = 1 + Math.sin(t * 1.2) * 0.08;
      pulse.current.scale.setScalar(scale);
    }
  });

  return (
    <group ref={group} position={[0.54, 0, 0]}>
      <mesh ref={pulse} position={[0.12, -0.08, -0.2]}>
        <circleGeometry args={[1.85, 96]} />
        <meshBasicMaterial color="#2f7a7e" transparent opacity={0.12} depthWrite={false} />
      </mesh>

      <mesh position={[0.12, -0.08, -0.18]}>
        <ringGeometry args={[1.15, 1.18, 96]} />
        <meshBasicMaterial color="#e8965a" transparent opacity={0.38} depthWrite={false} />
      </mesh>

      <mesh position={[0.12, -0.08, -0.16]} rotation={[0, 0, 0.42]}>
        <ringGeometry args={[1.62, 1.64, 128]} />
        <meshBasicMaterial color="#fafaf7" transparent opacity={0.16} depthWrite={false} />
      </mesh>

      {routes.map((route, routeIndex) => (
        <Line
          key={routeIndex}
          points={route}
          color={routeIndex === 0 ? "#fafaf7" : routeIndex === 1 ? "#e8965a" : "#2f7a7e"}
          lineWidth={routeIndex === 2 ? 1.25 : 1.6}
          transparent
          opacity={routeIndex === 0 ? 0.34 : 0.42}
        />
      ))}

      {points.map((point, index) => (
        <mesh key={point.join(":")} position={point}>
          <circleGeometry args={[index === 2 || index === 5 ? 0.07 : 0.045, 32]} />
          <meshBasicMaterial
            color={index % 3 === 0 ? "#e8965a" : index % 3 === 1 ? "#fafaf7" : "#2f7a7e"}
            transparent
            opacity={index % 3 === 1 ? 0.8 : 0.92}
            depthWrite={false}
          />
        </mesh>
      ))}
    </group>
  );
}

export default function HomeHeroScene() {
  return (
    <Canvas
      camera={{ position: [0, 0, 5], fov: 42 }}
      gl={{ alpha: true, antialias: true, powerPreference: "high-performance" }}
      dpr={[1, 1.5]}
      className="h-full w-full"
    >
      <EventNetwork />
      <Preload all />
    </Canvas>
  );
}
