import { useGLTF } from "@react-three/drei";
import { useLoader } from "@react-three/fiber";
import { useRef } from "react";
import { TextureLoader } from "three";
import { proxy, useSnapshot } from "valtio";
import placeholder from "../../../public/images/placeholder.png";
import { UploadedFile } from "../DropzoneField";

interface Props {
  upload: UploadedFile;
}

const initialState = proxy({
  current: null,
  items: {
    Body_Mic_0: "#ffffff",
    Bezel: "#ffffff",
    Body_Body_0: "#ffffff",
    Wallpaper: "#ffffff",
    Body_Camera_Glass_0: "#ffffff",
    Body_Lens_0: "#ffffff",
    Material: "#ffffff",
    Camera_Body_0: "#ffffff",
    Glass: "#ffffff",
    Camera_Frame001: "#ffffff",
    Camera_Mic_0: "#ffffff",
    Screen_Glass: "#ffffff",
    Button_Frame_0: "#ffffff",
    Circle003_Frame_0: "#ffffff",
    Logo: "#ffffff",
    Camera001_Body_0: "#ffffff",
    Gray_Glass: "#ffffff",
    Flash: "#ffffff",
    Camera001_Port_0: "#ffffff",
    Camera_Frame: "#ffffff",
    Camera001_Camera_Glass_0: "#ffffff",
    Camera001_Lens_0: "#ffffff",
    Black_Glass: "#ffffff",
    Material002: "#ffffff",
    Frame_Frame_0: "#ffffff",
    Frame2: "#ffffff",
    Frame_Port_0: "#ffffff",
    Antenna: "#ffffff",
    Frame_Mic_0: "#ffffff",
  },
});

type GLTFResult = any & {
  // todo change any to GLTF
  nodes: {
    Pyramid: THREE.Mesh;
  };
  materials: {
    ["default"]: THREE.MeshStandardMaterial;
  };
};
const IPhone = ({ upload }: Props) => {
  const group = useRef(null);
  const { nodes, materials } = useGLTF("/iphone.gltf") as GLTFResult;
  const snap = useSnapshot(initialState);

  console.log("upadload", upload);
  const texture = useLoader(
    TextureLoader,
    upload.presignedUrl || placeholder.src
  );
  // const texture = useLoader(TextureLoader, ss.src);

  return (
    <group ref={group} dispose={null}>
      <group position={[0, 0, -0.01]} rotation={[-Math.PI / 2, 0, 0]}>
        <group rotation={[Math.PI / 2, 0.5, 0]} scale={0.01}>
          <group scale={500}>
            <mesh
              geometry={nodes.Body_Mic_0.geometry}
              material={nodes.Body_Mic_0.material}
              material-color={snap.items.Body_Mic_0}
            />
            <mesh
              geometry={nodes.Body_Bezel_0.geometry}
              material={materials.Bezel}
              material-color={snap.items.Bezel}
            />
            <mesh
              geometry={nodes.Body_Body_0.geometry}
              material={nodes.Body_Body_0.material}
              material-color={snap.items.Bezel}
            />
            {/* Wallpaper */}
            <mesh
              geometry={nodes.Body_Wallpaper_0.geometry}
              material={materials.Wallpaper}
              material-color={snap.items.Wallpaper}
              material-map={texture}
            />

            <mesh
              geometry={nodes.Body001_Screen_Glass_0.geometry}
              material={materials.Screen_Glass}
              material-color={snap.items.Screen_Glass}
            />

            <mesh
              geometry={nodes.Body_Camera_Glass_0.geometry}
              material={nodes.Body_Camera_Glass_0.material}
              material-color={snap.items.Body_Camera_Glass_0}
            />
            <mesh
              geometry={nodes.Body_Lens_0.geometry}
              material={nodes.Body_Lens_0.material}
              material-color={snap.items.Body_Lens_0}
            />

            {/* three dots */}
            <mesh
              geometry={nodes.Body_Material_0.geometry}
              material={materials.Material}
              material-color={snap.items.Material}
            />
            <mesh
              geometry={nodes.Camera_Body_0.geometry}
              material={nodes.Camera_Body_0.material}
              material-color={snap.items.Camera_Body_0}
            />
            <mesh
              geometry={nodes.Camera_Glass_0.geometry}
              material={materials.Glass}
              material-color={snap.items.Glass}
            />
            <mesh
              geometry={nodes.Camera_Camera_Frame001_0.geometry}
              material={materials["Camera_Frame.001"]}
              material-color={snap.items.Camera_Frame001}
            />
            <mesh
              geometry={nodes.Camera_Mic_0.geometry}
              material={nodes.Camera_Mic_0.material}
              material-color={snap.items.Camera_Mic_0}
            />

            <mesh
              geometry={nodes.Button_Frame_0.geometry}
              material={nodes.Button_Frame_0.material}
              material-color={snap.items.Button_Frame_0}
            />
            <mesh
              geometry={nodes.Circle003_Frame_0.geometry}
              material={nodes.Circle003_Frame_0.material}
              material-color={snap.items.Circle003_Frame_0}
            />
            <mesh
              geometry={nodes.Apple_Logo_Logo_0.geometry}
              material={materials.Logo}
              material-color={snap.items.Logo}
            />
            <mesh
              geometry={nodes.Camera001_Body_0.geometry}
              material={nodes.Camera001_Body_0.material}
              material-color={snap.items.Camera001_Body_0}
            />
            <mesh
              geometry={nodes.Camera001_Gray_Glass_0.geometry}
              material={materials.Gray_Glass}
              material-color={snap.items.Gray_Glass}
            />
            <mesh
              geometry={nodes.Camera001_Flash_0.geometry}
              material={materials.Flash}
              material-color={snap.items.Flash}
            />
            <mesh
              geometry={nodes.Camera001_Port_0.geometry}
              material={nodes.Camera001_Port_0.material}
              material-color={snap.items.Camera001_Port_0}
            />
            <mesh
              geometry={nodes.Camera001_Camera_Frame_0.geometry}
              material={materials.Camera_Frame}
              material-color={snap.items.Camera_Frame}
            />
            <mesh
              geometry={nodes.Camera001_Camera_Glass_0.geometry}
              material={nodes.Camera001_Camera_Glass_0.material}
              material-color={snap.items.Camera001_Camera_Glass_0}
            />
            <mesh
              geometry={nodes.Camera001_Lens_0.geometry}
              material={nodes.Camera001_Lens_0.material}
              material-color={snap.items.Camera001_Lens_0}
            />
            <mesh
              geometry={nodes.Camera001_Black_Glass_0.geometry}
              material={materials.Black_Glass}
              material-color={snap.items.Black_Glass}
            />
            <mesh
              geometry={nodes.Camera003_Material002_0.geometry}
              material={materials["Material.002"]}
              material-color={snap.items.Material002}
            />
            <mesh
              geometry={nodes.Frame_Frame_0.geometry}
              material={nodes.Frame_Frame_0.material}
              material-color={snap.items.Frame_Frame_0}
            />
            <mesh
              geometry={nodes.Frame_Frame2_0.geometry}
              material={materials.Frame2}
              material-color={snap.items.Frame2}
            />
            <mesh
              geometry={nodes.Frame_Port_0.geometry}
              material={nodes.Frame_Port_0.material}
              material-color={snap.items.Frame_Port_0}
            />
            <mesh
              geometry={nodes.Frame_Antenna_0.geometry}
              material={materials.Antenna}
              material-color={snap.items.Antenna}
            />
            <mesh
              geometry={nodes.Frame_Mic_0.geometry}
              material={nodes.Frame_Mic_0.material}
              material-color={snap.items.Frame_Mic_0}
            />
          </group>
        </group>
      </group>
    </group>
  );
};

useGLTF.preload("/iphone.gltf");

export default IPhone;
