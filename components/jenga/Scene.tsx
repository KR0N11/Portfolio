"use client";

import { useCallback, useMemo, useRef, useState } from "react";
import * as THREE from "three";
import { Canvas, useFrame, type ThreeEvent } from "@react-three/fiber";
import { Environment, OrbitControls, RoundedBox, useCursor } from "@react-three/drei";
import { Bloom, EffectComposer, N8AO, Vignette } from "@react-three/postprocessing";
import {
  CuboidCollider,
  Physics,
  RigidBody,
  type RapierRigidBody,
} from "@react-three/rapier";
import type { OrbitControls as OrbitControlsImpl } from "three-stdlib";
import {
  BLOCK,
  FALL_Y,
  GAP,
  LEVELS,
  PER_LEVEL,
  TOPPLE_COUNT,
} from "@/lib/jenga";

/* rapier body types: 0 dynamic, 2 kinematic (position-based) */
const DYNAMIC = 0;
const KINEMATIC = 2;

type BlockSpec = {
  id: string;
  level: number;
  position: [number, number, number];
  rotation: [number, number, number];
  scale: [number, number, number];
  tint: string;
  roughness: number;
};

/*
  Real towers are imperfect: every block gets a hair of size variance,
  a fraction of a degree of twist, and a sub-millimeter offset. This is
  what separates "physics demo" from "object on a table".
*/
function buildTower(): BlockSpec[] {
  const blocks: BlockSpec[] = [];
  const pitch = BLOCK.width + GAP;
  for (let level = 0; level < LEVELS; level++) {
    const rotated = level % 2 === 1;
    for (let slot = 0; slot < PER_LEVEL; slot++) {
      const lateral = (slot - 1) * pitch + (Math.random() - 0.5) * 0.02;
      const y = BLOCK.height / 2 + level * (BLOCK.height + GAP);
      const twist = (Math.random() - 0.5) * 0.03;
      const shade = 176 + Math.floor(Math.random() * 28);
      blocks.push({
        id: `${level}:${slot}`,
        level,
        position: rotated ? [lateral, y, 0] : [0, y, lateral],
        rotation: [0, (rotated ? Math.PI / 2 : 0) + twist, 0],
        scale: [
          0.995 + Math.random() * 0.01,
          0.997 + Math.random() * 0.006,
          0.995 + Math.random() * 0.01,
        ],
        tint: `rgb(${shade},${shade},${shade + 7})`,
        roughness: 0.48 + Math.random() * 0.14,
      });
    }
  }
  return blocks;
}

/* Brushed-metal micro-texture: horizontal streaks used as roughness + bump. */
function makeBrushedTexture() {
  const c = document.createElement("canvas");
  c.width = 512;
  c.height = 512;
  const g = c.getContext("2d")!;
  g.fillStyle = "#8a8a8a";
  g.fillRect(0, 0, 512, 512);
  for (let i = 0; i < 2600; i++) {
    const y = Math.random() * 512;
    const w = 40 + Math.random() * 460;
    const x = Math.random() * 512 - w / 2;
    const lum = Math.random() < 0.5 ? 0 : 255;
    g.strokeStyle = `rgba(${lum},${lum},${lum},${Math.random() * 0.09})`;
    g.lineWidth = 0.5 + Math.random() * 1.2;
    g.beginPath();
    g.moveTo(x, y);
    g.lineTo(x + w, y + (Math.random() - 0.5) * 1.5);
    g.stroke();
  }
  const tex = new THREE.CanvasTexture(c);
  tex.wrapS = tex.wrapT = THREE.RepeatWrapping;
  tex.anisotropy = 8;
  return tex;
}

function Block({
  spec,
  brushed,
  bodies,
  onDragToggle,
}: {
  spec: BlockSpec;
  brushed: THREE.CanvasTexture;
  bodies: Map<string, RapierRigidBody>;
  onDragToggle: (dragging: boolean) => void;
}) {
  const body = useRef<RapierRigidBody | null>(null);
  const [hovered, setHovered] = useState(false);
  const drag = useRef<{ y: number; dx: number; dz: number } | null>(null);
  useCursor(hovered, "grab");

  const registerBody = useCallback(
    (b: RapierRigidBody | null) => {
      body.current = b;
      if (b) bodies.set(spec.id, b);
      else bodies.delete(spec.id);
    },
    [bodies, spec.id]
  );

  function planePoint(e: ThreeEvent<PointerEvent>, y: number) {
    const t = (y - e.ray.origin.y) / e.ray.direction.y;
    return {
      x: e.ray.origin.x + e.ray.direction.x * t,
      z: e.ray.origin.z + e.ray.direction.z * t,
    };
  }

  function onDown(e: ThreeEvent<PointerEvent>) {
    if (!body.current) return;
    e.stopPropagation();
    (e.target as Element).setPointerCapture(e.pointerId);
    const pos = body.current.translation();
    const p = planePoint(e, pos.y);
    drag.current = { y: pos.y, dx: pos.x - p.x, dz: pos.z - p.z };
    body.current.setBodyType(KINEMATIC, true);
    onDragToggle(true);
  }

  function onMove(e: ThreeEvent<PointerEvent>) {
    if (!drag.current || !body.current) return;
    e.stopPropagation();
    const { y, dx, dz } = drag.current;
    const p = planePoint(e, y);
    body.current.setNextKinematicTranslation({ x: p.x + dx, y, z: p.z + dz });
  }

  function onUp(e: ThreeEvent<PointerEvent>) {
    if (!drag.current || !body.current) return;
    e.stopPropagation();
    (e.target as Element).releasePointerCapture(e.pointerId);
    drag.current = null;
    body.current.setBodyType(DYNAMIC, true);
    body.current.wakeUp();
    onDragToggle(false);
  }

  return (
    <RigidBody
      ref={registerBody}
      colliders="cuboid"
      friction={0.72}
      restitution={0.03}
      position={spec.position}
      rotation={spec.rotation}
    >
      <RoundedBox
        args={[
          BLOCK.length * spec.scale[0],
          BLOCK.height * spec.scale[1],
          BLOCK.width * spec.scale[2],
        ]}
        radius={0.045}
        smoothness={4}
        castShadow
        receiveShadow
        onPointerDown={onDown}
        onPointerMove={onMove}
        onPointerUp={onUp}
        onPointerOver={(e) => {
          e.stopPropagation();
          setHovered(true);
        }}
        onPointerOut={() => setHovered(false)}
      >
        <meshPhysicalMaterial
          color={spec.tint}
          metalness={0.92}
          roughness={spec.roughness}
          roughnessMap={brushed}
          bumpMap={brushed}
          bumpScale={0.012}
          anisotropy={0.5}
          envMapIntensity={0.95}
          emissive={hovered ? "#9aa" : "#000"}
          emissiveIntensity={hovered ? 0.08 : 0}
        />
      </RoundedBox>
    </RigidBody>
  );
}

function Tower({
  bodies,
  onTopple,
  onDragToggle,
  brushed,
}: {
  bodies: Map<string, RapierRigidBody>;
  onTopple: () => void;
  onDragToggle: (dragging: boolean) => void;
  brushed: THREE.CanvasTexture;
}) {
  const blocks = useMemo(buildTower, []);
  const toppled = useRef(false);
  const frame = useRef(0);

  useFrame(() => {
    frame.current = (frame.current + 1) % 12;
    if (frame.current !== 0 || toppled.current) return;
    let fallen = 0;
    for (const spec of blocks) {
      if (spec.level < 3) continue;
      const b = bodies.get(spec.id);
      if (b && b.translation().y < FALL_Y) fallen++;
    }
    if (fallen >= TOPPLE_COUNT) {
      toppled.current = true;
      onTopple();
    }
  });

  return (
    <>
      {blocks.map((spec) => (
        <Block
          key={spec.id}
          spec={spec}
          brushed={brushed}
          bodies={bodies}
          onDragToggle={onDragToggle}
        />
      ))}
    </>
  );
}

export default function Scene({
  resetKey,
  onTopple,
}: {
  resetKey: number;
  onTopple: () => void;
}) {
  const controls = useRef<OrbitControlsImpl>(null);
  const bodies = useMemo(() => new Map<string, RapierRigidBody>(), []);
  const [brushed] = useState(makeBrushedTexture);
  const [reduced] = useState(
    () => window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );

  const onDragToggle = useCallback((dragging: boolean) => {
    if (controls.current) {
      controls.current.enabled = !dragging;
      controls.current.autoRotate = !dragging;
    }
  }, []);

  return (
    <Canvas
      shadows="soft"
      camera={{ position: [10, 7, 12.5], fov: 35 }}
      dpr={[1, 2]}
      className="touch-none"
      onCreated={({ gl }) => {
        gl.toneMappingExposure = 0.95;
      }}
    >
      <color attach="background" args={["#0a0a0b"]} />
      <fog attach="fog" args={["#0a0a0b", 28, 48]} />

      {/* key light with real shadows; the HDR carries the reflections */}
      <ambientLight intensity={0.15} />
      <directionalLight
        position={[7, 14, 6]}
        intensity={1.5}
        castShadow
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
        shadow-camera-left={-12}
        shadow-camera-right={12}
        shadow-camera-top={12}
        shadow-camera-bottom={-12}
        shadow-camera-near={1}
        shadow-camera-far={40}
        shadow-bias={-0.0002}
        shadow-normalBias={0.02}
      />
      <directionalLight position={[-8, 5, -6]} intensity={0.35} />

      {/* self-hosted studio HDR: this is what makes the metal read as metal */}
      <Environment files="/hdr/studio.hdr" />

      <Physics key={resetKey} gravity={[0, -9.81, 0]}>
        <RigidBody type="fixed">
          <CuboidCollider args={[24, 0.5, 24]} position={[0, -0.5, 0]} />
        </RigidBody>
        <Tower
          key={resetKey}
          bodies={bodies}
          brushed={brushed}
          onTopple={onTopple}
          onDragToggle={onDragToggle}
        />
      </Physics>

      {/* turntable pedestal, echoing the hero's ring motif */}
      <mesh position={[0, -0.31, 0]} receiveShadow>
        <cylinderGeometry args={[5.4, 5.7, 0.62, 96]} />
        <meshPhysicalMaterial
          color="#141417"
          metalness={0.8}
          roughness={0.5}
          roughnessMap={brushed}
          envMapIntensity={0.7}
        />
      </mesh>
      <mesh position={[0, 0.004, 0]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <circleGeometry args={[5.4, 96]} />
        <meshPhysicalMaterial
          color="#1a1a1e"
          metalness={0.75}
          roughness={0.42}
          roughnessMap={brushed}
          envMapIntensity={0.8}
        />
      </mesh>
      <mesh position={[0, 0.012, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[4.7, 4.75, 128]} />
        <meshBasicMaterial color="#45454d" />
      </mesh>

      <EffectComposer>
        <N8AO
          aoRadius={0.5}
          intensity={2.2}
          distanceFalloff={0.6}
          quality="performance"
          halfRes
        />
        <Bloom mipmapBlur intensity={0.12} luminanceThreshold={1.2} />
        <Vignette eskil={false} offset={0.22} darkness={0.6} />
      </EffectComposer>

      <OrbitControls
        ref={controls}
        enableDamping
        dampingFactor={0.08}
        enablePan={false}
        autoRotate={!reduced}
        autoRotateSpeed={0.45}
        minDistance={7}
        maxDistance={26}
        maxPolarAngle={Math.PI / 2.05}
        target={[0, 3.1, 0]}
      />
    </Canvas>
  );
}
