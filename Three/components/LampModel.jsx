import React, { useRef } from "react";
import { useGLTF } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";

export function LampModel({ rotation = [0, 0, 0], scale = 1, ...props }) {
  const groupRef = useRef();
  const { nodes, materials } = useGLTF("models/street_lamp__latarnia.glb");

  // Make materials receive and cast shadows
  Object.values(materials).forEach((material) => {
    material.castShadow = true;
    material.receiveShadow = true;
  });

  // Apply rotation and scale to the group based on props
  useFrame(() => {
    if (groupRef.current) {
      groupRef.current.rotation.x = rotation[0];
      groupRef.current.rotation.y = rotation[1];
      groupRef.current.rotation.z = rotation[2];
      groupRef.current.scale.set(scale, scale, scale);
    }
  });

  return (
    <group ref={groupRef} {...props} dispose={null}>
      <group rotation={[-Math.PI / 2, 0, 0]} scale={[2, 2, 2.289]}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes["latarnia_01_-_Default_0"].geometry}
          material={materials["01_-_Default"]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes["linia1_01_-_Default_0"].geometry}
          material={materials["01_-_Default"]}
          position={[-7.921, 0.001, 56.095]}
          rotation={[-Math.PI, 0, -Math.PI]}
          scale={[1, 1, 0.025]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes["linia2_01_-_Default_0"].geometry}
          material={materials["01_-_Default"]}
          position={[8.008, 0.001, 56.095]}
          rotation={[-Math.PI, 0, -Math.PI]}
          scale={[1, 1, 0.025]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes["pret_01_-_Default_0"].geometry}
          material={materials["01_-_Default"]}
          position={[13.531, 0.001, 56.026]}
          rotation={[0, -Math.PI / 2, 0]}
          scale={[0.776, 1, 1.043]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes["zawijas1_01_-_Default_0"].geometry}
          material={materials["01_-_Default"]}
          position={[5.098, 0, 54.381]}
          rotation={[Math.PI / 2, 0, 0]}
          scale={[0.973, 0.776, 1]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes["zawijas2_01_-_Default_0"].geometry}
          material={materials["01_-_Default"]}
          position={[-5.059, 0, 54.381]}
          rotation={[Math.PI / 2, 0, 0]}
          scale={[0.973, 0.776, 1]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes["kolko001_01_-_Default_0"].geometry}
          material={materials["01_-_Default"]}
          position={[-8.603, -0.005, 53.764]}
          rotation={[0, -Math.PI / 2, 0]}
          scale={[0.039, 0.05, 0.05]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes["kolko_01_-_Default_0"].geometry}
          material={materials["01_-_Default"]}
          position={[8.647, -0.005, 53.764]}
          rotation={[0, -Math.PI / 2, 0]}
          scale={[0.039, 0.05, 0.05]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes["lampa1_02_-_Default_0"].geometry}
          material={materials["02_-_Default"]}
          position={[8.672, -1.417, 47.687]}
          rotation={[Math.PI / 2, 0, 0]}
          scale={[1, 0.776, 1]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes["czapka1_01_-_Default_0"].geometry}
          material={materials["01_-_Default"]}
          position={[8.652, 3.261, 49.334]}
          scale={[1, 1, 0.14]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes["czapka002_01_-_Default_0"].geometry}
          material={materials["01_-_Default"]}
          position={[-8.595, 3.261, 49.334]}
          scale={[1, 1, 0.14]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes["lampa002_02_-_Default_0"].geometry}
          material={materials["02_-_Default"]}
          position={[-8.575, -1.417, 47.687]}
          rotation={[Math.PI / 2, 0, 0]}
          scale={[1, 0.776, 1]}
        />
      </group>
      {/* <mesh
        castShadow
        receiveShadow
        geometry={nodes['Box001_01_-_Default_0'].geometry}
        material={materials['01_-_Default']}
        position={[8.715, 21.634, 0]}
        rotation={[Math.PI / 2, 0, 0]}
        scale={0.648}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes['Box002_01_-_Default_0'].geometry}
        material={materials['01_-_Default']}
        position={[-8.735, 21.634, 0]}
        rotation={[Math.PI / 2, 0, 0]}
        scale={0.648}
      /> */}
    </group>
  );
}

useGLTF.preload("models/street_lamp__latarnia.glb");
