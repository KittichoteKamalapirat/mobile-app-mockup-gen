import { ContactShadows, OrbitControls } from "@react-three/drei";
import { Canvas, useThree } from "@react-three/fiber";
import { Suspense, useCallback, useRef, useState } from "react";
import { HexColorPicker, RgbaStringColorPicker } from "react-colorful";
import { BiArrowBack } from "react-icons/bi";
import { useSelector } from "react-redux";
import { Euler } from "three";
import { proxy, useSnapshot } from "valtio";
import useClickOutside from "../functions/src/hooks/useClickOutside";
import IPhone from "../src/components/3d/IPhone";
import Iphone13Concept from "../src/components/3d/Iphone13Concept";
import Button, { ButtonTypes } from "../src/components/Buttons/Button";
import LinkButton from "../src/components/Buttons/LinkButton";
import DropzoneField, { UploadedFile } from "../src/components/DropzoneField";
import Toggle from "../src/components/Toggle";
import { RootState } from "../src/redux/store";

interface Props {}

const PhoneScene = () => {
  const upload: UploadedFile = useSelector((state: RootState) => state.upload);

  const gl = useThree((state) => state.gl);

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
      <Suspense fallback={null}>
        <IPhone upload={upload} />
        {/* <Environment files="/threejs/royal_esplanade_1k.hdr" /> */}

        <ContactShadows
          position={[1, -2, 0]}
          opacity={1}
          scale={10}
          blur={1}
          far={0.8}
        />
      </Suspense>
    </>
  );
};

export const DEFAULT_ROTATION = new Euler(-Math.PI / 2, 0, Math.PI);
export const state = proxy({
  rotation: DEFAULT_ROTATION,
  count: 0,
});

const ThreeDimension = ({}: Props) => {
  const [fileUploads, setFileUploads] = useState<UploadedFile[]>([]);
  const [canvaColor, setCanvaColor] = useState("#aabbcc");

  const snap = useSnapshot(state);
  const [colorPickerIsOpen, setColorPickerIsOpen] = useState(false);

  const close = useCallback(() => setColorPickerIsOpen(false), []);

  console.log("snap", snap);

  const colorPickerRef = useRef<HTMLDivElement>(null);
  const canvaRef = useRef<HTMLCanvasElement>(null);
  console.log("canvaRef", canvaRef);
  const upload: UploadedFile = useSelector((state: RootState) => state.upload);

  useClickOutside(colorPickerRef, close);
  // create img from canvas
  const handleDownload = () => {
    console.log("canvaRef", canvaRef);

    const canvas = canvaRef.current as HTMLCanvasElement;
    console.log("2");

    const url = canvas.toDataURL("image/png");
    const name = upload.name;

    console.log("4");
    const link = document.createElement("a");
    link.download = name;
    link.href = url;
    link.click();

    console.log("5");
  };

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

      <LinkButton
        label="Back Home"
        href="/"
        type={ButtonTypes.TEXT}
        leftIcon={<BiArrowBack size={20} />}
        extraClass="z-10 absolute top-0 left-0 mt-4 ml-4"
      />

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
          backgroundColor: canvaColor,
        }}
        gl={{ preserveDrawingBuffer: true }}
        camera={{
          position: [0, 0, 25], //x,y,z?
          fov: 15,
        }} // x z y
      >
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

            <ContactShadows
              position={[0, -2.5, 0]}
              opacity={1}
              scale={10}
              blur={6}
            />
          </group>
        </Suspense>
      </Canvas>

      <DropzoneField
        ariaLabel="Image"
        inputClass="w-60 h-60"
        maxFiles={1}
        fileUploads={fileUploads}
        setFileUploads={setFileUploads}
        showConfirmationOnDelete={false}
      >
        Upload an image
      </DropzoneField>

      {colorPickerIsOpen && (
        <div ref={colorPickerRef}>
          <RgbaStringColorPicker color={canvaColor} onChange={setCanvaColor} />
        </div>
      )}

      <div
        style={{ backgroundColor: canvaColor, width: 30, height: 30 }}
        onClick={() => setColorPickerIsOpen(true)}
      />

      <Button
        label="reset rotation"
        onClick={() => {
          state.rotation = new Euler(-Math.PI / 2, 0, Math.PI);
        }}
      />
      <button onClick={() => ++state.count}>{snap.count}</button>

      <Button label="Download" onClick={handleDownload} />
    </div>
  );
};

export default ThreeDimension;
