import React, { useRef, Suspense, useEffect } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Preload, useGLTF } from "@react-three/drei";
import { LOD } from "three";

import CanvasLoader from "./Loader";

const Model = () => {
  const gltf = useGLTF("./model2/scene.gltf");
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

    // Adjust the initial position and scale of the model
    modelRef.current.position.set(0, 0, 0); // Set the position
    modelRef.current.scale.set(0.1, 0.1, 0.1); // Adjust the scale
  }, [gltf.scene]);

  return (
    <primitive
      object={gltf.scene}
      ref={modelRef}
      scale={1.0}
      position={[0, 0, 0]}
      rotation={[0, Math.PI, 0]} // Adjust the rotation here
    />
  );
};

const Bronco = () => {
  return (
    <Canvas
      dpr={[1, 2]}
      shadows
      camera={{ fov:95}} // Adjust the camera position
      style={{ position: "absolute", top: 0, left: 0, right: 0, bottom: 0 }}
    >
      <Suspense fallback={<CanvasLoader />}>
        <ambientLight intensity={3.5} /> {/* Adjust ambient light intensity */}
        <pointLight position={[10, 10, 10]} intensity={2.0} /> {/* Adjust point light intensity */}
        <OrbitControls
          enableZoom={true}
          enablePan={true}
          autoRotate={false}
          maxPolarAngle={Math.PI / 2}
          minPolarAngle={Math.PI / 2}
        />
        <Preload all />
        <Model />
      </Suspense>
    </Canvas>
  );
};

export default Bronco;
