import { ContactShadows, OrbitControls } from "@react-three/drei";
import { Canvas, useThree } from "@react-three/fiber";
import { Suspense, useRef, useState } from "react";
import { HexColorPicker } from "react-colorful";
import { BiArrowBack } from "react-icons/bi";
import { useSelector } from "react-redux";
import { Euler } from "three";
import IPhone from "../src/components/3d/IPhone";
import Iphone13Concept from "../src/components/3d/Iphone13Concept";
import Button, { ButtonTypes } from "../src/components/Buttons/Button";
import LinkButton from "../src/components/Buttons/LinkButton";
import DropzoneField, { UploadedFile } from "../src/components/DropzoneField";
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
          position={[0, -0.8, 0]}
          opacity={1}
          scale={10}
          blur={1}
          far={0.8}
        />
      </Suspense>
    </>
  );
};

const ThreeDimension = ({}: Props) => {
  const [fileUploads, setFileUploads] = useState<UploadedFile[]>([]);
  const [canvaColor, setCanvaColor] = useState("#aabbcc");
  const initialRotation = new Euler(-Math.PI / 2, 0, Math.PI);
  const [rotation, setRotation] = useState(initialRotation);

  const canvaRef = useRef<HTMLCanvasElement>(null);
  console.log("canvaRef", canvaRef);
  const upload: UploadedFile = useSelector((state: RootState) => state.upload);

  console.log("upload", upload);

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
        style={{ height: "100vh", backgroundColor: canvaColor }}
        gl={{ preserveDrawingBuffer: true }}
        // camera={{ position: [2, 0, 1010], fov: 15 }}
      >
        <OrbitControls enableZoom={false} />
        <ambientLight intensity={0.5} />
        <spotLight intensity={0.3} position={[5, 20, 20]} />
        <directionalLight position={[-2, 5, 2]} intensity={1} />
        <Suspense fallback={null}>
          <Iphone13Concept upload={upload} rotation={rotation} />

          <ContactShadows
            position={[0, -0.8, 0]}
            opacity={1}
            scale={10}
            blur={1}
            far={0.8}
          />
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
      <HexColorPicker color={canvaColor} onChange={setCanvaColor} />

      <Button
        label="reset rotation"
        onClick={() => setRotation(initialRotation)}
      />

      <Button label="Download" onClick={handleDownload} />
    </div>
  );
};

export default ThreeDimension;
