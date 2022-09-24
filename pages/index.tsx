/* eslint-disable @next/next/no-img-element */
import { GiStripedSun } from "react-icons/gi";
import { HiOutlineDeviceMobile, HiOutlineLightBulb } from "react-icons/hi";
import { MdOutlineCenterFocusStrong } from "react-icons/md";
import { TbRotate, TbRotate360 } from "react-icons/tb";
import { IoMdDownload } from "react-icons/io";
import rgbaToRgb from "rgba-to-rgb";
import { ContactShadows, OrbitControls } from "@react-three/drei";
import { Canvas, useThree } from "@react-three/fiber";
import gsap from "gsap";
import { Suspense, useCallback, useEffect, useRef, useState } from "react";
import { RgbaStringColorPicker } from "react-colorful";
import { useSelector } from "react-redux";
import { Camera } from "three";
import { proxy, useSnapshot } from "valtio";
import useClickOutside from "../functions/src/hooks/useClickOutside";
import Iphone13Concept from "../src/components/3d/Iphone13Concept";
import Button, { ButtonTypes } from "../src/components/Buttons/Button";
import DiagonalLine from "../src/components/DiagonalLine";
import DropzoneField, { UploadedFile } from "../src/components/DropzoneField";
import Range from "../src/components/Range";
import { RootState } from "../src/redux/store";
import { debounce } from "../src/utils/debounce";
import { inactiveGrey, primaryColor } from "../theme";

interface Props {}

const RGB_WHITE_BG = "rgb(255, 255, 255)";

export const CAMERA_DEFAULT_ROTATION = [0, 0, 0];
export const OBJECT_DEFAULT_ROTATION = [-Math.PI / 2, 0, Math.PI];

interface ProxyState {
  canvaColor: string;
  cameraRotationX: number;
  cameraRotationY: number;
  cameraRotationZ: number;

  cameraPositionX: number;
  cameraPositionY: number;
  cameraPositionZ: number;

  cameraIsFrozen: boolean;

  shadowIsOn: boolean;
  glareIsOn: boolean;
  bgIsTransparent: boolean;
  camera: null | Camera;
  objectRotationX: number;
  objectRotationY: number;
  objectRotationZ: number;
}
export const state: ProxyState = proxy({
  canvaColor: "rgba(255,255,255,1)",
  cameraRotationX: 0,
  cameraRotationY: 0,
  cameraRotationZ: 0,

  cameraIsFrozen: false,
  cameraPositionX: 0,
  cameraPositionY: 0,
  cameraPositionZ: 5,

  shadowIsOn: true,
  bgIsTransparent: false,
  glareIsOn: true,
  camera: null,

  objectRotationX: -Math.PI / 2,
  objectRotationY: 0,
  objectRotationZ: Math.PI,
});

const ThreeDimension = ({}: Props) => {
  const [fileUploads, setFileUploads] = useState<UploadedFile[]>([]);

  const snap = useSnapshot(state);

  const [colorPickerIsOpen, setColorPickerIsOpen] = useState(false);

  const close = useCallback(() => setColorPickerIsOpen(false), []);

  const toggleShadow = () => (state.shadowIsOn = !state.shadowIsOn);
  const toggleTransparentBg = () =>
    (state.bgIsTransparent = !state.bgIsTransparent);

  const colorPickerRef = useRef<HTMLDivElement>(null);
  const canvaRef = useRef<HTMLCanvasElement>(null);

  const upload: UploadedFile = useSelector((state: RootState) => state.upload);

  useClickOutside(colorPickerRef, close);

  const handleCameraRotation = (camera: Camera) => {
    // camera.position.set(0, 0, 5);

    gsap.to(camera.position, {
      duration: 1,
      x: 0,
      y: 0,
      z: 5,
    });
  };

  // create img from canvas
  const handleDownload = () => {
    const canvas = canvaRef.current as HTMLCanvasElement;

    const url = canvas.toDataURL("image/png");
    const name = upload.name;

    const link = document.createElement("a");
    link.download = name;
    link.href = url;
    link.click();
  };

  return (
    <div className="h-screen relative ">
      <Canvas
        ref={canvaRef}
        style={{
          height: "100vh",
          zIndex: 1,
        }}
        gl={{ preserveDrawingBuffer: true }}
        camera={{
          rotation: [
            snap.cameraRotationX,
            snap.cameraRotationY,
            snap.cameraRotationZ,
          ],
          position: [
            snap.cameraPositionX,
            snap.cameraPositionY,
            snap.cameraPositionZ,
          ],
        }}
      >
        <Scene upload={upload} />
      </Canvas>

      <div
        id="menu"
        className="flex-col p-2 absolute top-10 bg-grey-0 shadow-xl z-10"
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
          <Button
            label={upload.presignedUrl ? "Replace" : "Upload"}
            type={
              upload.presignedUrl ? ButtonTypes.OUTLINED : ButtonTypes.PRIMARY
            }
          />
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
              color={snap.canvaColor}
              onChange={(newColor) => (state.canvaColor = newColor)}
            />
          </div>
        )}

        <hr className="border-1 border-grey-100 border-solid my-2" />
        <div
          style={{
            backgroundClip: "content-box",
            backgroundColor: snap.canvaColor,
            borderWidth: "1px",
          }}
          className="w-10 h-10 my-2 border-grey-200 border-solid rounded-full bg-green box-content"
          onClick={() => setColorPickerIsOpen(true)}
        />

        <div
          className="flex-col items-center cursor-pointer"
          onClick={toggleTransparentBg}
        >
          <DiagonalLine />
        </div>

        <hr className="border-1 border-grey-100 border-solid my-2" />

        <div
          className="flex-col items-center cursor-pointer"
          onClick={() => {
            state.objectRotationX = -Math.PI / 2;
            state.objectRotationY = 0;
            state.objectRotationZ = Math.PI;
          }}
        >
          <HiOutlineDeviceMobile
            size={40} // px
            color={
              snap.objectRotationX === -Math.PI / 2 &&
              snap.objectRotationY === 0 &&
              snap.objectRotationZ === Math.PI
                ? inactiveGrey
                : primaryColor
            }
          />

          <p className="text-primary">Center Phone</p>
        </div>

        <div
          className="flex-col items-center cursor-pointer "
          onClick={() => {
            state.glareIsOn = !snap.glareIsOn;
          }}
        >
          <HiOutlineLightBulb
            size={40} // px
            color={snap.glareIsOn ? primaryColor : inactiveGrey}
            className="rotate-180"
          />

          <p className="text-primary">Glare</p>
        </div>

        <div
          className="flex-col items-center cursor-pointer"
          onClick={() => {
            const camera = snap.camera;
            if (camera) {
              handleCameraRotation(camera as Camera);
            }
          }}
        >
          <MdOutlineCenterFocusStrong
            size={40} // px
            color={
              -0.1 < snap.cameraPositionX &&
              snap.cameraPositionX < 0.1 &&
              -2.9 < snap.cameraPositionY &&
              snap.cameraPositionY < 3.1 &&
              4.9 < snap.cameraPositionZ &&
              snap.cameraPositionZ < 5.1
                ? inactiveGrey
                : primaryColor
            }
          />

          <p className="text-primary">Center Camera</p>
        </div>

        <Range
          label={
            <TbRotate360
              size={40} // px
              color={primaryColor}
              className="-rotate-45"
            />
          }
          value={snap.objectRotationX}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            state.objectRotationX = parseFloat(e.target.value);
          }}
          onInput={(e: React.ChangeEvent<HTMLInputElement>) => {
            state.objectRotationX = parseFloat(e.target.value);
          }}
          min={0}
          max={Math.PI * 2}
        />
        <Range
          label={
            <TbRotate360
              size={40} // px
              color={primaryColor}
              className="rotate-45"
            />
          }
          value={snap.objectRotationY}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            state.objectRotationY = parseFloat(e.target.value);
          }}
          onInput={(e: React.ChangeEvent<HTMLInputElement>) => {
            state.objectRotationY = parseFloat(e.target.value);
          }}
          min={0}
          max={Math.PI * 2}
        />
        <Range
          label={
            <TbRotate
              size={40} // px
              color={primaryColor}
            />
          }
          value={snap.objectRotationZ}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            state.objectRotationZ = parseFloat(e.target.value);
          }}
          onInput={(e: React.ChangeEvent<HTMLInputElement>) => {
            state.objectRotationZ = parseFloat(e.target.value);
          }}
          min={0}
          max={Math.PI * 2}
        />

        <hr className="border-1 border-grey-100 border-solid my-2" />

        <div
          className="flex-col items-center cursor-pointer"
          onClick={toggleShadow}
        >
          <GiStripedSun
            size={40} // px
            color={snap.shadowIsOn ? primaryColor : inactiveGrey}
          />

          <p className="text-primary">Shadow</p>
        </div>

        <div
          className="flex-col items-center cursor-pointer"
          onClick={handleDownload}
        >
          <IoMdDownload
            size={40} // px
            color={primaryColor}
          />

          <p className="text-primary">Download</p>
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

export default ThreeDimension;

const deg2rad = (degrees: number) => degrees * (Math.PI / 180);

interface SceneProps {
  upload: UploadedFile;
}
const Scene = ({ upload }: SceneProps) => {
  const snap = useSnapshot(state);
  const rgb = rgbaToRgb(RGB_WHITE_BG, snap.canvaColor);

  const { camera } = useThree();

  useEffect(() => {
    if (camera) state.camera = camera;
  }, [camera]);

  return (
    <>
      {!snap.bgIsTransparent && <color attach="background" args={[rgb]} />}
      <OrbitControls
        enableZoom={true}
        enableRotate={snap.cameraIsFrozen ? false : true}
        onChange={debounce(() => {
          state.cameraPositionX = camera.position.x;
          state.cameraPositionY = camera.position.y;
          state.cameraPositionZ = camera.position.z;
        }, 200)}
      />
      <ambientLight intensity={1.5} position={[-2, 5, 10]} />

      {snap.glareIsOn && (
        <directionalLight
          position={[-5, 10, 20]} //x,y,z
          intensity={0.6}
        />
      )}

      <Suspense fallback={null}>
        <Iphone13Concept upload={upload} />

        <group position={[0, 0, 0]}>
          {snap.shadowIsOn && (
            <ContactShadows
              position={[0, -1.66, 0]}
              opacity={1}
              scale={10}
              blur={4}
            />
          )}
        </group>
      </Suspense>
    </>
  );
};
