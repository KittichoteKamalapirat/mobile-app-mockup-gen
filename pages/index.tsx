import { useSpring, animated, config } from "@react-spring/three";
import rgbaToRgb from "rgba-to-rgb";
/* eslint-disable @next/next/no-img-element */
import { ContactShadows, OrbitControls, useTexture } from "@react-three/drei";
import { Canvas, useThree } from "@react-three/fiber";
import { Suspense, useCallback, useRef, useState } from "react";
import { RgbaStringColorPicker } from "react-colorful";
import { useSelector } from "react-redux";
import { Euler, Texture, WebGLCubeRenderTarget } from "three";
import { proxy, useSnapshot } from "valtio";
import useClickOutside from "../functions/src/hooks/useClickOutside";
import { rgbaToHex } from "../functions/src/utils/rgbaToHex";
import IPhone from "../src/components/3d/IPhone";
import Iphone13Concept from "../src/components/3d/Iphone13Concept";
import Button from "../src/components/Buttons/Button";
import DropzoneField, { UploadedFile } from "../src/components/DropzoneField";
import { RootState } from "../src/redux/store";

interface Props {}

const RGB_WHITE_BG = "rgb(255, 255, 255)";

const PhoneScene = () => {
  const upload: UploadedFile = useSelector((state: RootState) => state.upload);

  // useControls({
  //   screenshot: button(() => {
  //     const link = document.createElement("a");
  //     link.setAttribute("download", "canvas.png");
  //     link.setAttribute(
  //       "href",
  //       gl.domElement
  //         .toDataURL("image/png")
  //         .replace("image/png", "image/octet-stream")
  //     );
  //     link.click();
  //   }),
  // });

  return (
    <>
      <OrbitControls enableZoom={false} />
      <ambientLight intensity={0.5} />
      <spotLight intensity={0.3} position={[5, 20, 20]} />
      <directionalLight position={[-2, 5, 2]} intensity={1} />
      <animated.Suspense fallback={null}>
        <IPhone upload={upload} />
        {/* <Environment files="/threejs/royal_esplanade_1k.hdr" /> */}

        <ContactShadows
          position={[1, -2, 0]}
          opacity={1}
          scale={10}
          blur={1}
          far={0.8}
        />
      </animated.Suspense>
    </>
  );
};

export const CAMERA_DEFAULT_ROTATION = [0, 0, 0];
export const OBJECT_DEFAULT_ROTATION = [-Math.PI / 2, 0, Math.PI];

export const state = proxy({
  cameraRotationX: 0,
  cameraRotationY: 0,
  cameraRotationZ: 25,

  objectRotationX: -Math.PI / 2,
  objectRotationY: 0,
  objectRotationZ: Math.PI,
});

const ThreeDimension = ({}: Props) => {
  const [fileUploads, setFileUploads] = useState<UploadedFile[]>([]);
  const [canvaColor, setCanvaColor] = useState("rgba(255,255,255,1)");

  const snap = useSnapshot(state);

  console.log(
    "--------",
    snap.cameraRotationX,
    snap.cameraRotationY,
    snap.cameraRotationZ
  );

  const [colorPickerIsOpen, setColorPickerIsOpen] = useState(false);
  const [shadowIsOn, setShadowIsOn] = useState(true);
  const [bgIsTransparent, setBgIsTransparent] = useState(false);

  const close = useCallback(() => setColorPickerIsOpen(false), []);

  const toggleShadow = () => setShadowIsOn(!shadowIsOn);
  const toggleTransparentBg = () => setBgIsTransparent(!bgIsTransparent);

  const colorPickerRef = useRef<HTMLDivElement>(null);
  const canvaRef = useRef<HTMLCanvasElement>(null);

  const upload: UploadedFile = useSelector((state: RootState) => state.upload);

  useClickOutside(colorPickerRef, close);

  // create img from canvas

  const handleDownload = () => {
    const canvas = canvaRef.current as HTMLCanvasElement;

    // const ctx = canvas.getContext("2d");
    // console.log("ctx", ctx);

    const url = canvas.toDataURL("image/png");
    const name = upload.name;

    // create the phone image
    // const ssImg = new Image();
    // ssImg.src = upload.presignedUrl;

    const link = document.createElement("a");
    link.download = name;
    link.href = url;
    link.click();
  };

  const rgb = rgbaToRgb(RGB_WHITE_BG, canvaColor);

  console.log("canvaRef", canvaRef);

  return (
    <div className="h-screen relative ">
      {/* <Canvas className="h-screen">
        <OrbitControls enableZoom={false} />
        <ambientLight intensity={0.5} />
        <directionalLight position={[-2, 5, 2]} intensity={1} />
        <Suspense fallback={null}>
          <Cube />
          <Environment files="/threejs/royal_esplanade_1k.hdr" />
          <ContactShadows
            // rotation-x={Math.PI / 2}
            // position={[0, 0, 0]}
            opacity={0.9}
            width={10}
            height={10}
            blur={2}
            far={0.1}
          />
        </Suspense>
      </Canvas> */}

      {/* <LinkButton
        label="Back Home"
        href="/"
        type={ButtonTypes.TEXT}
        leftIcon={<BiArrowBack size={20} />}
        extraClass="z-10 absolute top-0 left-0 mt-4 ml-4"
      /> */}

      {/* <Canvas
        style={{ height: "100vh", backgroundColor: canvaColor }}
        gl={{ preserveDrawingBuffer: true }}
        ref={canvaRef}
        // camera={{ position: [2, 0, 12.25], fov: 15 }}
      >
        <OrbitControls enableZoom={false} />
        <ambientLight intensity={0.5} />
        <spotLight intensity={0.3} position={[5, 20, 20]} />
        <directionalLight position={[-2, 5, 2]} intensity={1} />
        <Suspense fallback={null}>
          <IPhone upload={upload} />
          <Environment files="/threejs/royal_esplanade_1k.hdr" />

          <ContactShadows
            position={[0, -0.8, 0]}
            opacity={1}
            scale={10}
            blur={1}
            far={0.8}
          />
        </Suspense>
      </Canvas> */}

      <Canvas
        style={{
          height: "100vh",
          zIndex: 1,
        }}
        ref={canvaRef}
        gl={{ preserveDrawingBuffer: true }}
        camera={{
          // position: [0, 0, 25], //x,y,z?

          position: [
            snap.cameraRotationX,
            snap.cameraRotationY,
            snap.cameraRotationZ,
          ], //x,y,z?
          fov: 15,
        }} // x z y
      >
        {!bgIsTransparent && <color attach="background" args={[rgb]} />}
        <OrbitControls enableZoom={false} />
        <ambientLight intensity={0.5} />
        <spotLight intensity={0.3} position={[5, 0, -10]} />
        <directionalLight
          position={[-2, 5, 2]} //x,y,z
          intensity={1}
        />
        <Suspense fallback={null}>
          <Iphone13Concept upload={upload} />

          {/* Floor */}
          <group position={[0, 0, 0]}>
            {/* <ContactShadows
              // position={[0, -0.8, 0]} // x z y
              // rotation-x={Math.PI / 2}
              position={[0, -0.8, 0]} // x z y
              opacity={1}
              scale={10} // more => kinda more gradient and blue
              blur={3}
              far={0.8} // darkness: more => darker
              // width={10}
              // height={10}
            />
            <ContactShadows
              position={[0, -1, 0]}
              opacity={1}
              scale={10}
              blur={3}
            />

            <ContactShadows
              position={[0, -2, 0]}
              opacity={1}
              scale={10}
              blur={3}
            /> */}

            {shadowIsOn && (
              <ContactShadows
                position={[0, -1.66, 0]}
                opacity={1}
                scale={10}
                blur={4}
              />
            )}
          </group>
        </Suspense>
      </Canvas>

      <div
        id="menu"
        className="flex-col p-2 absolute top-1/4 bg-grey-0 shadow-xl z-10"
      >
        <DropzoneField
          ariaLabel="Image"
          inputClass="my-2"
          maxFiles={1}
          fileUploads={fileUploads}
          setFileUploads={setFileUploads}
          showConfirmationOnDelete={false}
          isDroppable={false}
        >
          <Button label="Upload" />
        </DropzoneField>

        {upload.presignedUrl && (
          <img
            id="phone"
            src={upload.presignedUrl}
            alt="iphone mockup"
            className="w-10 h-10"
          />
        )}

        {colorPickerIsOpen && (
          <div ref={colorPickerRef} className="my-2">
            <RgbaStringColorPicker
              color={canvaColor}
              onChange={setCanvaColor}
            />
          </div>
        )}

        <div
          style={{
            backgroundClip: "content-box",
            backgroundColor: canvaColor,
            borderWidth: "1px",
          }}
          className="w-10 h-10 p-1 m-2  border-grey-300 border-solid rounded-sm bg-green box-content"
          onClick={() => setColorPickerIsOpen(true)}
        />

        <div>
          <Button
            label="reset camera rotation"
            onClick={() => {
              state.cameraRotationIsReset = !state.cameraRotationIsReset;
            }}
          />
        </div>

        <div>
          <Button
            label="reset object rotation"
            onClick={() => {
              state.objectRotationX = -Math.PI / 2;
              state.objectRotationY = 0;
              state.objectRotationZ = Math.PI;
            }}
          />
        </div>

        <div>
          <div>
            <Button
              label="x++"
              onClick={() => {
                state.objectRotationX = state.objectRotationX + 1;
              }}
            />
            <Button
              label="x--"
              onClick={() => {
                state.objectRotationX = state.objectRotationX - 1;
              }}
            />
          </div>

          <div>
            <Button
              label="y++"
              onClick={() => {
                state.objectRotationY = state.objectRotationY + 1;
              }}
            />

            <Button
              label="y--"
              onClick={() => {
                state.objectRotationY = state.objectRotationY - 1;
              }}
            />
          </div>

          <div>
            <Button
              label="z++"
              onClick={() => {
                state.objectRotationZ = state.objectRotationZ + 1;
              }}
            />
            <Button
              label="z--"
              onClick={() => {
                state.objectRotationZ = state.objectRotationZ - 1;
              }}
            />
          </div>
        </div>

        <div>
          <div>
            <Button
              label="cam x++"
              onClick={() => {
                state.cameraRotationX = state.cameraRotationX + 1;
              }}
            />
            <Button
              label="x--"
              onClick={() => {
                state.cameraRotationX = state.cameraRotationX - 1;
              }}
            />
          </div>

          <div>
            <Button
              label="y++"
              onClick={() => {
                state.cameraRotationY = state.cameraRotationY + 1;
              }}
            />

            <Button
              label="y--"
              onClick={() => {
                state.cameraRotationY = state.cameraRotationY - 1;
              }}
            />
          </div>

          <div>
            <Button
              label="z++"
              onClick={() => {
                state.cameraRotationZ = state.cameraRotationZ + 1;
              }}
            />
            <Button
              label="z--"
              onClick={() => {
                state.cameraRotationZ = state.cameraRotationZ - 1;
              }}
            />
          </div>
        </div>

        <div className="my-2">
          <Button label="Transparent" onClick={toggleTransparentBg} />
        </div>
        <div className="my-2">
          <Button label="Shadow" onClick={toggleShadow} />
        </div>

        <div>
          <Button label="Download" onClick={handleDownload} />
        </div>
      </div>

      <img
        id="transparent-bg"
        src="/images/transparent-background.png"
        alt="transparent bg"
        className="h-screen w-screen absolute top-0 z-0 "
      />
    </div>
  );
};

// const Background = () => {
//   const { gl } = useThree();

//   const texture = useTexture(transparentBg.src);
//   const formatted = new WebGLCubeRenderTarget(
//     texture.image.height
//   ).fromEquirectangularTexture(gl, texture);
//   return <primitive attach="background" object={formatted.texture} />;
// };

export default ThreeDimension;
