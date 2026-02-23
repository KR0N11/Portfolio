"use client";

import { useRef, useState, useMemo, Suspense } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Text, Float, OrbitControls } from "@react-three/drei";
import * as THREE from "three";
import { useTheme } from "@/context/ThemeContext";
import { skillCategories } from "@/data/portfolio";

interface PlanetProps {
  position: [number, number, number];
  color: string;
  name: string;
  skills: string[];
  radius: number;
  orbitRadius: number;
  orbitSpeed: number;
  index: number;
  selected: number | null;
  onSelect: (index: number | null) => void;
}

function Planet({
  color,
  name,
  skills,
  radius,
  orbitRadius,
  orbitSpeed,
  index,
  selected,
  onSelect,
}: PlanetProps) {
  const groupRef = useRef<THREE.Group>(null);
  const meshRef = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = useState(false);
  const isSelected = selected === index;
  const isVisible = selected === null || isSelected;

  useFrame(({ clock }) => {
    if (!groupRef.current) return;
    const t = clock.getElapsedTime() * orbitSpeed;
    groupRef.current.position.x = Math.cos(t) * orbitRadius;
    groupRef.current.position.z = Math.sin(t) * orbitRadius;
    groupRef.current.position.y = Math.sin(t * 0.5) * 0.3;

    if (meshRef.current) {
      meshRef.current.rotation.y += 0.008;
    }
  });

  const planetColor = useMemo(() => new THREE.Color(color), [color]);

  return (
    <group ref={groupRef} visible={isVisible}>
      <Float speed={2} rotationIntensity={0.2} floatIntensity={0.3}>
        <mesh
          ref={meshRef}
          onClick={(e) => {
            e.stopPropagation();
            onSelect(isSelected ? null : index);
          }}
          onPointerEnter={(e) => {
            e.stopPropagation();
            setHovered(true);
            document.body.style.cursor = "pointer";
          }}
          onPointerLeave={() => {
            setHovered(false);
            document.body.style.cursor = "auto";
          }}
          scale={hovered || isSelected ? 1.2 : 1}
        >
          <sphereGeometry args={[radius, 32, 32]} />
          <meshStandardMaterial
            color={planetColor}
            emissive={planetColor}
            emissiveIntensity={hovered || isSelected ? 0.6 : 0.2}
            roughness={0.4}
            metalness={0.3}
          />
        </mesh>

        {/* Planet label */}
        <Text
          position={[0, radius + 0.35, 0]}
          fontSize={0.22}
          color="white"
          anchorX="center"
          anchorY="bottom"
          font="/fonts/inter.woff"
          outlineWidth={0.02}
          outlineColor="black"
        >
          {name}
        </Text>

        {/* Skill labels when selected */}
        {isSelected &&
          skills.map((skill, si) => {
            const angle = (si / skills.length) * Math.PI * 2;
            const dist = radius + 0.9;
            return (
              <Text
                key={skill}
                position={[
                  Math.cos(angle) * dist,
                  -0.1 + Math.sin(angle) * dist * 0.4,
                  Math.sin(angle) * dist * 0.6,
                ]}
                fontSize={0.14}
                color="white"
                anchorX="center"
                anchorY="middle"
                outlineWidth={0.015}
                outlineColor="black"
              >
                {skill}
              </Text>
            );
          })}
      </Float>

      {/* Orbit ring */}
      <mesh rotation={[Math.PI / 2, 0, 0]} position={[0, 0, 0]} visible={false}>
        <ringGeometry args={[orbitRadius - 0.01, orbitRadius + 0.01, 64]} />
        <meshBasicMaterial
          color={color}
          transparent
          opacity={0.1}
          side={THREE.DoubleSide}
        />
      </mesh>
    </group>
  );
}

function CoreSun() {
  const meshRef = useRef<THREE.Mesh>(null);
  const { theme } = useTheme();

  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.003;
    }
  });

  const coreColor = theme === "dark" ? "#38bdf8" : "#0ea5e9";

  return (
    <Float speed={1.5} rotationIntensity={0.1} floatIntensity={0.2}>
      <mesh ref={meshRef}>
        <sphereGeometry args={[0.5, 32, 32]} />
        <meshStandardMaterial
          color={coreColor}
          emissive={coreColor}
          emissiveIntensity={0.8}
          roughness={0.2}
          metalness={0.5}
        />
      </mesh>
      {/* Glow */}
      <mesh>
        <sphereGeometry args={[0.65, 32, 32]} />
        <meshBasicMaterial
          color={coreColor}
          transparent
          opacity={0.1}
        />
      </mesh>
    </Float>
  );
}

function OrbitRings() {
  const radii = [2, 3.2, 4.4, 5.6];
  return (
    <>
      {radii.map((r, i) => (
        <mesh key={i} rotation={[Math.PI / 2, 0, 0]}>
          <ringGeometry args={[r - 0.005, r + 0.005, 128]} />
          <meshBasicMaterial
            color="#94a3b8"
            transparent
            opacity={0.08}
            side={THREE.DoubleSide}
          />
        </mesh>
      ))}
    </>
  );
}

function Scene() {
  const [selected, setSelected] = useState<number | null>(null);

  const planetConfigs = useMemo(
    () =>
      skillCategories.map((cat, i) => ({
        ...cat,
        orbitRadius: 2 + i * 1.2,
        orbitSpeed: 0.15 - i * 0.025,
        radius: 0.35 + i * 0.05,
      })),
    []
  );

  return (
    <>
      <ambientLight intensity={0.4} />
      <pointLight position={[0, 0, 0]} intensity={2} color="#38bdf8" />
      <pointLight position={[10, 10, 10]} intensity={0.5} />

      <CoreSun />
      <OrbitRings />

      {planetConfigs.map((config, i) => (
        <Planet
          key={config.name}
          position={[0, 0, 0]}
          color={config.color}
          name={config.name}
          skills={config.skills}
          radius={config.radius}
          orbitRadius={config.orbitRadius}
          orbitSpeed={config.orbitSpeed}
          index={i}
          selected={selected}
          onSelect={setSelected}
        />
      ))}

      <OrbitControls
        enableZoom={false}
        enablePan={false}
        minPolarAngle={Math.PI / 4}
        maxPolarAngle={Math.PI / 1.5}
        autoRotate
        autoRotateSpeed={0.3}
      />
    </>
  );
}

export default function SkillsPlanets() {
  return (
    <div className="w-full h-[500px] md:h-[600px]" aria-label="Interactive 3D skills visualization">
      <Suspense
        fallback={
          <div className="w-full h-full flex items-center justify-center text-text-muted">
            Loading 3D scene...
          </div>
        }
      >
        <Canvas
          camera={{ position: [0, 3, 8], fov: 50 }}
          gl={{ antialias: true, alpha: true }}
          style={{ background: "transparent" }}
        >
          <Scene />
        </Canvas>
      </Suspense>
    </div>
  );
}
