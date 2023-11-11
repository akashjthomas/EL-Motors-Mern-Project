import React, { useRef, Suspense, useEffect } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Preload, useGLTF } from "@react-three/drei";
import { LOD } from "three";

import CanvasLoader from "./Loader";

const Model = () => {
  const gltf = useGLTF("./model/scene.gltf");
  const modelRef = useRef();

  const lod = new LOD();
  const lowDetail = gltf.scene.clone();
  const mediumDetail = gltf.scene.clone();
  const highDetail = gltf.scene.clone();
  const ultraDetail = gltf.scene.clone();

  useEffect(() => {
    lod.addLevel(lowDetail, 0);
    lod.addLevel(mediumDetail, 20);
    lod.addLevel(highDetail, 40);
    lod.addLevel(ultraDetail, 60);
    modelRef.current.add(lod);
  }, [gltf.scene]);

  return (
    <primitive
      object={gltf.scene}
      ref={modelRef}
      scale={1.0}
      position={[0, 0, 0]}
      rotation={[0, Math.PI, 0]}
    />
  );
};

const Penguin = () => {
  return (
    <Canvas
      dpr={[1, 2]}
      shadows
      camera={{ fov: 25 }}
      style={{ position: "absolute", top: 0, left: 0, right: 0, bottom: 0}}
    >
      <Suspense fallback={<CanvasLoader />}>
      <ambientLight intensity={1.5} />
        <pointLight position={[10, 10, 10]} />
        <OrbitControls
          enableZoom={true}
          enablePan={true}
          autoRotate={false} // Enable auto rotation
          maxPolarAngle={Math.PI / 2}
          minPolarAngle={Math.PI / 2}
        />
        <Preload all />
        <Model />
      </Suspense>
    </Canvas>
  );
};

export default Penguin;
