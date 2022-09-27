import { animated, config, useSpring } from "@react-spring/three";
import { useGLTF } from "@react-three/drei";
import { useLoader, useThree } from "@react-three/fiber";
import { useEffect, useMemo, useRef, useState } from "react";
import { ClampToEdgeWrapping, Group, TextureLoader } from "three";

import { useSnapshot } from "valtio";
import { state } from "../../../pages/design";
import placeholder from "../../../public/images/placeholder.png";
import { PHONE_SCREEN_HEIGHT, PHONE_SCREEN_WIDTH } from "../../constants";
import { Iphone13ConceptGLTFResult } from "../../types/Iphone13ConceptGLTFResult";
import { UploadedFile } from "../DropzoneField";

interface Props {
  upload: UploadedFile;
}

const Iphone13Concept = ({ upload }: Props) => {
  const snap = useSnapshot(state);
  const { nodes, materials } = useGLTF(
    "/threejs/iphone-13-pro-concept.gltf"
  ) as Iphone13ConceptGLTFResult;

  const objectRef = useRef<Group>();

  const { rotation: objectRotation } = useSpring({
    rotation: [
      snap.objectRotationX,
      snap.objectRotationY,
      snap.objectRotationZ,
    ],
    config: config.molasses,
  });

  const { camera } = useThree();

  camera.updateProjectionMatrix();

  const texture = useLoader(
    TextureLoader,
    upload.presignedUrl || placeholder.src
  );

  // const texture = useVideoTexture(url)

  const [screenIsHovered, setScreenIsHovered] = useState(false);
  const [pointerIsDown, setPointerIsDown] = useState(false);

  const textureClone = useMemo(() => {
    const clone = texture.clone();
    clone.wrapS = ClampToEdgeWrapping;
    clone.wrapT = ClampToEdgeWrapping;

    return clone;
  }, [texture]);

  // textureClone.wrapT = ClampToEdgeWrapping;

  let imgIntrinsicW = 1; // make 1 to prevent 0/0
  let imgIntrinsicH = 1;

  const img = new Image();
  img.src = upload.presignedUrl || placeholder.src;
  img.crossOrigin = "anonymous";

  img.onload = function () {
    imgIntrinsicW = img.naturalWidth;
    imgIntrinsicH = img.naturalHeight;

    // textureClone.repeat.set(2, 1);
    textureClone.repeat.y = (imgIntrinsicW * 2) / imgIntrinsicH;
    // textureClone.repeat.set(1, );
  };
  useEffect(() => {
    // screenRef?.current?.style?.cursor = screenIsHovered ? "pointer" : "auto";
    document.body.style.cursor = (() => {
      if (screenIsHovered && pointerIsDown) return "grabbing";
      else if (screenIsHovered && !pointerIsDown) return "grab";
      else return "auto";
    })();
  }, [screenIsHovered, pointerIsDown]);

  return (
    <group dispose={null}>
      {/* x z y */}

      <animated.group
        position={[0, 0.5, 0]}
        scale={0.7}
        rotation={objectRotation as any} // TODO it kinda converts num[] automatically
        ref={objectRef as any} // TODO
      >
        <group>
          <mesh
            geometry={nodes.BackCover_Blue_0.geometry}
            material={materials.Blue}
          />
          {/* wall paper */}
          <mesh
            geometry={nodes.Screen_Screen_0.geometry}
            material={materials.Screen}
            material-map={textureClone}
            // scale={useAspect(1, 2)}
            // scale={[1, 1, 2]}
            // className="cursor-pointer"
            onPointerEnter={() => setScreenIsHovered(true)}
            onPointerLeave={() => setScreenIsHovered(false)} // for cursor
            onPointerDown={() => {
              setPointerIsDown(true);
              state.cameraIsFrozen = true; // so camera don't move when adjusting wallpaper
            }}
            onPointerUp={() => {
              setPointerIsDown(false);
              state.cameraIsFrozen = false;
            }}
            onPointerMove={(e: any) => {
              if (pointerIsDown) {
                const SCREEN_HEIGHT_TO_WIDTH =
                  PHONE_SCREEN_HEIGHT / PHONE_SCREEN_WIDTH;

                const imgHeightToWidth = imgIntrinsicH / imgIntrinsicW;

                const pagesNum: number =
                  imgHeightToWidth / SCREEN_HEIGHT_TO_WIDTH;
                const uppperBreakpoint = pagesNum / (pagesNum + 1);

                if (textureClone.offset.y <= 0 && e.movementY < 0) return; // prevent going further down
                if (
                  textureClone.offset.y >= uppperBreakpoint &&
                  e.movementY > 0
                ) {
                  return;
                }

                textureClone.offset.y += e.movementY / 500;
              }
            }}
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
      </animated.group>
    </group>
  );
};

useGLTF.preload("/threejs/iphone-13-pro-concept.gltf");
export default Iphone13Concept;
