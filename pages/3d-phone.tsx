import React, { Suspense } from "react";
import Layout from "../src/components/layouts/Layout";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import Cube from "../src/components/3d/Cube";
import Iphone from "../src/components/3d/Iphone";

interface Props {}

const ThreeDimension = ({}: Props) => {
  console.log("hi");
  return (
    <Layout>
      <Canvas className="h-screen">
        <OrbitControls enableZoom={false} />
        <ambientLight intensity={0.5} />
        <directionalLight position={[-2, 5, 2]} intensity={1} />
        <Suspense fallback={null}>
          <Cube />
        </Suspense>
      </Canvas>
      <Canvas style={{ height: "100vh" }}>
        <OrbitControls enableZoom={false} />
        <ambientLight intensity={0.5} />
        <directionalLight position={[-2, 5, 2]} intensity={1} />
        <Suspense fallback={null}>
          <Iphone />
        </Suspense>
      </Canvas>
    </Layout>
  );
};

export default ThreeDimension;
