import { Euler, TextureLoader } from "three";
import { useLoader } from "@react-three/fiber";
import * as THREE from "three";
import React, { useEffect, useRef } from "react";
import { useGLTF } from "@react-three/drei";
import { GLTF } from "three-stdlib";
import placeholder from "../../../public/images/placeholder.png";
import { UploadedFile } from "../DropzoneField";
import { useSnapshot } from "valtio";
import { state } from "../../../pages";

interface Props {
  upload: UploadedFile;
}

type GLTFResult = GLTF & {
  nodes: {
    BackCover_Blue_0: THREE.Mesh;
    Screen_Screen_0: THREE.Mesh;
    CameraModuleBlack_BlackGlossy_0: THREE.Mesh;
    CameraModuleBlack_SpeakerAndMiic_0: THREE.Mesh;
    Bezel_BezelAndNotch_0: THREE.Mesh;
    Bezel_SpeakerAndMiic_0: THREE.Mesh;
    Bezel_CameraGray_0: THREE.Mesh;
    Bezel_FrontCameraGlass_0: THREE.Mesh;
    PowerButton_BlueGlossy_0: THREE.Mesh;
    Volume_Button_BlueGlossy_0: THREE.Mesh;
    MuteButton_BlueGlossy_0: THREE.Mesh;
    Sphere_Lens_0: THREE.Mesh;
    Camera1_CameraBlack_0: THREE.Mesh;
    Camera1_CameraMetal_0: THREE.Mesh;
    Camera1_CameraGray_0: THREE.Mesh;
    Sphere002_Lens_0: THREE.Mesh;
    Camera2_CameraBlack_0: THREE.Mesh;
    Camera2_CameraMetal_0: THREE.Mesh;
    Camera2_CameraGray_0: THREE.Mesh;
    Sphere001_Lens_0: THREE.Mesh;
    Camera3_CameraBlack_0: THREE.Mesh;
    Camera3_CameraMetal_0: THREE.Mesh;
    Camera3_CameraGray_0: THREE.Mesh;
    LiDar_LiDar_0: THREE.Mesh;
    Flash_Silver_0: THREE.Mesh;
    Flash_Flash_0: THREE.Mesh;
    CameraModuleGlass_Glass_0: THREE.Mesh;
    FrontCam_Lens_0: THREE.Mesh;
    Apple_Logo_AppleLogo_0: THREE.Mesh;
    IPHONE13_BlueGlossy_0: THREE.Mesh;
    IPHONE13_Red_0: THREE.Mesh;
    IPHONE13_BlueMatte_0: THREE.Mesh;
    IPHONE13_SpeakerAndMiic_0: THREE.Mesh;
    IPHONE13_Silver001_0: THREE.Mesh;
  };
  materials: {
    Blue: THREE.MeshStandardMaterial;
    Screen: THREE.MeshStandardMaterial;
    BlackGlossy: THREE.MeshStandardMaterial;
    SpeakerAndMiic: THREE.MeshStandardMaterial;
    BezelAndNotch: THREE.MeshStandardMaterial;
    CameraGray: THREE.MeshStandardMaterial;
    FrontCameraGlass: THREE.MeshStandardMaterial;
    BlueGlossy: THREE.MeshStandardMaterial;
    Lens: THREE.MeshStandardMaterial;
    CameraBlack: THREE.MeshStandardMaterial;
    CameraMetal: THREE.MeshStandardMaterial;
    LiDar: THREE.MeshStandardMaterial;
    Silver: THREE.MeshStandardMaterial;
    Flash: THREE.MeshStandardMaterial;
    Glass: THREE.MeshStandardMaterial;
    AppleLogo: THREE.MeshStandardMaterial;
    material: THREE.MeshStandardMaterial;
    BlueMatte: THREE.MeshStandardMaterial;
    ["Silver.001"]: THREE.MeshStandardMaterial;
  };
};

const Iphone13Concept = ({ upload }: Props) => {
  const snap = useSnapshot(state);
  const { nodes, materials } = useGLTF(
    "/threejs/iphone-13-pro-concept.gltf"
  ) as GLTFResult;

  console.log("in phone", snap.count);
  console.log("in phone", snap.rotation);
  const texture = useLoader(
    TextureLoader,
    upload.presignedUrl || placeholder.src
  );

  useEffect(() => {
    console.log("hi");
  }, [snap.rotation]);

  return (
    <group dispose={null}>
      {/* x z y */}

      <group
        position={[0, 0.5, 0]}
        rotation={[-Math.PI / 2, 0, Math.PI - 0.5]}
        scale={0.7}
      >
        {/* <group position={[0, 0, -0.01]} rotation={[0, 0, 0]}>
        <group rotation={[0, 0, 0]} scale={0.01}>
          <group rotation={[-Math.PI / 2, 0, Math.PI]} scale={80}> */}
        <mesh
          geometry={nodes.BackCover_Blue_0.geometry}
          material={materials.Blue}
        />
        {/* wall paper */}
        <mesh
          geometry={nodes.Screen_Screen_0.geometry}
          material={materials.Screen}
          material-map={texture}
        />
        <mesh
          geometry={nodes.CameraModuleBlack_BlackGlossy_0.geometry}
          material={materials.BlackGlossy}
        />
        <mesh
          geometry={nodes.CameraModuleBlack_SpeakerAndMiic_0.geometry}
          material={materials.SpeakerAndMiic}
        />
        <mesh
          geometry={nodes.Bezel_BezelAndNotch_0.geometry}
          material={materials.BezelAndNotch}
        />
        <mesh
          geometry={nodes.Bezel_SpeakerAndMiic_0.geometry}
          material={materials.SpeakerAndMiic}
        />
        <mesh
          geometry={nodes.Bezel_CameraGray_0.geometry}
          material={materials.CameraGray}
        />
        <mesh
          geometry={nodes.Bezel_FrontCameraGlass_0.geometry}
          material={materials.FrontCameraGlass}
        />
        <mesh
          geometry={nodes.PowerButton_BlueGlossy_0.geometry}
          material={materials.BlueGlossy}
        />
        <mesh
          geometry={nodes.Volume_Button_BlueGlossy_0.geometry}
          material={materials.BlueGlossy}
        />
        <mesh
          geometry={nodes.MuteButton_BlueGlossy_0.geometry}
          material={materials.BlueGlossy}
        />
        <mesh
          geometry={nodes.Sphere_Lens_0.geometry}
          material={materials.Lens}
        />
        <mesh
          geometry={nodes.Camera1_CameraBlack_0.geometry}
          material={materials.CameraBlack}
        />
        <mesh
          geometry={nodes.Camera1_CameraMetal_0.geometry}
          material={materials.CameraMetal}
        />
        <mesh
          geometry={nodes.Camera1_CameraGray_0.geometry}
          material={materials.CameraGray}
        />
        <mesh
          geometry={nodes.Sphere002_Lens_0.geometry}
          material={materials.Lens}
        />
        <mesh
          geometry={nodes.Camera2_CameraBlack_0.geometry}
          material={materials.CameraBlack}
        />
        <mesh
          geometry={nodes.Camera2_CameraMetal_0.geometry}
          material={materials.CameraMetal}
        />
        <mesh
          geometry={nodes.Camera2_CameraGray_0.geometry}
          material={materials.CameraGray}
        />
        <mesh
          geometry={nodes.Sphere001_Lens_0.geometry}
          material={materials.Lens}
        />
        <mesh
          geometry={nodes.Camera3_CameraBlack_0.geometry}
          material={materials.CameraBlack}
        />
        <mesh
          geometry={nodes.Camera3_CameraMetal_0.geometry}
          material={materials.CameraMetal}
        />
        <mesh
          geometry={nodes.Camera3_CameraGray_0.geometry}
          material={materials.CameraGray}
        />
        <mesh
          geometry={nodes.LiDar_LiDar_0.geometry}
          material={materials.LiDar}
        />
        <mesh
          geometry={nodes.Flash_Silver_0.geometry}
          material={materials.Silver}
        />
        <mesh
          geometry={nodes.Flash_Flash_0.geometry}
          material={materials.Flash}
        />
        <mesh
          geometry={nodes.CameraModuleGlass_Glass_0.geometry}
          material={materials.Glass}
        />
        <mesh
          geometry={nodes.FrontCam_Lens_0.geometry}
          material={materials.Lens}
        />
        <mesh
          geometry={nodes.Apple_Logo_AppleLogo_0.geometry}
          material={materials.AppleLogo}
        />
        <mesh
          geometry={nodes.IPHONE13_BlueGlossy_0.geometry}
          material={materials.BlueGlossy}
        />
        <mesh
          geometry={nodes.IPHONE13_Red_0.geometry}
          material={materials.material}
        />
        <mesh
          geometry={nodes.IPHONE13_BlueMatte_0.geometry}
          material={materials.BlueMatte}
        />
        <mesh
          geometry={nodes.IPHONE13_SpeakerAndMiic_0.geometry}
          material={materials.SpeakerAndMiic}
        />
        <mesh
          geometry={nodes.IPHONE13_Silver001_0.geometry}
          material={materials["Silver.001"]}
        />
      </group>
    </group>
  );
};

useGLTF.preload("/threejs/iphone-13-pro-concept.gltf");
export default Iphone13Concept;
