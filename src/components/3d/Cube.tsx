import { meshBounds } from "@react-three/drei";
import { useLoader } from "@react-three/fiber";
import React from "react";
import texture from "/images/map.jpg";
// import texture from "../../../public/images/map.jpg";
import { TextureLoader } from "three/src/loaders/TextureLoader";

// const macbookIphone = require("/images/map.jpg");
import Image from "next/image";

interface Props {}

const Cube = ({}: Props) => {
  //   const colorMap = useLoader(TextureLoader, macbookIphone);
  return (
    <mesh>
      <boxBufferGeometry attach="geometry" args={[3, 3, 3]} />
      <meshStandardMaterial attach="material" color="blue" />
    </mesh>
  );
};
export default Cube;
