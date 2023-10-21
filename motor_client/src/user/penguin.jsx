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
  position={[0, 0, 0]} // Adjust position
  rotation={[0, 0, 0]} // Adjust rotation
/>

  );
};

const Penguin = () => {
  return (
    <section className="absolute  inset-0 flex items-center justify-center  w-full h-[68%]">
      <Canvas shadows frameloop="demand" dpr={[1, 2]}
       className="canvas-container"
       style={{ width: "100%", height: "300px" }} 
      >
        <Suspense fallback={<CanvasLoader />}>
          <ambientLight />
          <pointLight position={[10, 10, 10]} />
          <OrbitControls
            enableZoom={false}
            enablePan={false}
            autoRotate={false}
            maxPolarAngle={Math.PI / 2}
            minPolarAngle={Math.PI / 2}
          />
          <Preload all />
          <Model />
        </Suspense>
      </Canvas>
    </section>
  );
};

export default Penguin;
