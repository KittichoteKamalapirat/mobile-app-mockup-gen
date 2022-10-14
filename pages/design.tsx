/* eslint-disable @next/next/no-img-element */
import { ContactShadows, OrbitControls } from "@react-three/drei";
import { Canvas, useThree } from "@react-three/fiber";
import gsap from "gsap";
import { Suspense, useCallback, useEffect, useRef, useState } from "react";
import { RgbaStringColorPicker } from "react-colorful";
import { GiStripedSun } from "react-icons/gi";
import { HiOutlineDeviceMobile, HiOutlineLightBulb } from "react-icons/hi";
import { BsArrowDownUp } from "react-icons/bs";

import { CgColorPicker } from "react-icons/cg";

import { IoMdDownload } from "react-icons/io";
import { MdOutlineCenterFocusStrong } from "react-icons/md";
import { TbRotate, TbRotate360 } from "react-icons/tb";
import { useSelector } from "react-redux";
import rgbaToRgb from "rgba-to-rgb";
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

import { BiArrowBack, BiCrop } from "react-icons/bi";

import DropdownModal from "../src/components/DropdownModal";
import SmallHeading from "../src/components/typography/SmallHeading";
import {
  DEFAULT_ROTATION_X,
  DEFAULT_ROTATION_Y,
  DEFAULT_ROTATION_Z,
  ICON_SIZE,
  INITIAL_CROP_HEIGHT,
  INITIAL_CROP_TOP_LEFT_X,
  INITIAL_CROP_TOP_LEFT_Y,
  INITIAL_CROP_WIDTH,
  INITIAL_SHADOW_POSITION_Y,
  RGBA_BLACK,
  RGBA_WHITE,
  SHADOW_POSITION_Y_MIN,
  SHADOW_POSITION_Y_MAX,
} from "../src/constants";
import SvgPreset1 from "../src/components/icons/Preset1";
import SvgPreset4 from "../src/components/icons/Preset4";
import SvgPreset3 from "../src/components/icons/Preset3";
import SvgPreset2 from "../src/components/icons/Preset2";
import LinkButton from "../src/components/Buttons/LinkButton";
import Crop from "../src/components/Crop";
import useWindowDimensions from "../functions/src/hooks/useWindowDimensions";

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

  topLeftCropX: number;
  topLeftCropY: number;
  cropWidth: number;
  cropHeight: number;

  cameraIsFrozen: boolean;
  isCropping: boolean;
  shadowIsOn: boolean;
  glareIsOn: boolean;
  bgIsTransparent: boolean;
  camera: null | Camera;
  objectRotationX: number;
  objectRotationY: number;
  objectRotationZ: number;

  shadowPositionY: number;
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

  topLeftCropX: INITIAL_CROP_TOP_LEFT_X,
  topLeftCropY: INITIAL_CROP_TOP_LEFT_Y,
  cropWidth: INITIAL_CROP_WIDTH,
  cropHeight: INITIAL_CROP_HEIGHT,

  shadowIsOn: true,
  isCropping: false,
  bgIsTransparent: false,
  glareIsOn: true,
  camera: null,

  objectRotationX: DEFAULT_ROTATION_X,
  objectRotationY: DEFAULT_ROTATION_Y,
  objectRotationZ: DEFAULT_ROTATION_Z,

  shadowPositionY: INITIAL_SHADOW_POSITION_Y,
});

const ThreeDimension = ({}: Props) => {
  const [fileUploads, setFileUploads] = useState<UploadedFile[]>([]);

  const snap = useSnapshot(state);

  console.log("snap", snap.canvaColor);

  const [colorPickerIsOpen, setColorPickerIsOpen] = useState(false);
  const [objectDropdownIsOpen, setObjectDropdownIsOpen] = useState(false);
  const [shadowDropdownIsOpen, setShadowDropdownIsOpen] = useState(false);

  const closeColorPicker = useCallback(() => setColorPickerIsOpen(false), []);
  const closeRotateObjectDropdown = useCallback(
    () => setObjectDropdownIsOpen(false),
    []
  );

  const toggleShadow = () => (state.shadowIsOn = !state.shadowIsOn);
  const toggleTransparentBg = () =>
    (state.bgIsTransparent = !state.bgIsTransparent);

  const colorPickerRef = useRef<HTMLDivElement>(null);
  const canvaRef = useRef<HTMLCanvasElement>(null);
  const rotateObjectDropdownRef = useRef<HTMLDivElement>(null);

  const upload: UploadedFile = useSelector((state: RootState) => state.upload);

  useClickOutside(colorPickerRef, closeColorPicker);
  useClickOutside(rotateObjectDropdownRef, closeRotateObjectDropdown);

  const resetCameraPosition = (camera: Camera) => {
    gsap.to(camera.position, {
      duration: 1,
      x: 0,
      y: 0,
      z: 5,
    });
  };

  const presetAngle1 = (camera: Camera) => {
    gsap.to(camera.position, {
      duration: 1,
      x: 0,
      y: 0,
      z: 5,
    });

    state.objectRotationX = DEFAULT_ROTATION_X;
    state.objectRotationY = DEFAULT_ROTATION_Y;
    state.objectRotationZ = DEFAULT_ROTATION_Z;
  };

  const presetAngle2 = (camera: Camera) => {
    gsap.to(camera.position, {
      duration: 1,
      x: 0,
      y: 0,
      z: 5,
    });

    state.objectRotationX = DEFAULT_ROTATION_X - 0.3;
    state.objectRotationY = DEFAULT_ROTATION_Y + 0.2;
    state.objectRotationZ = DEFAULT_ROTATION_Z - 0.4;
  };

  const presetAngle3 = (camera: Camera) => {
    gsap.to(camera.position, {
      duration: 1,
      x: -4,
      y: 2,
      z: 7,
    });

    state.objectRotationX = DEFAULT_ROTATION_X;
    state.objectRotationY = DEFAULT_ROTATION_Y;
    state.objectRotationZ = DEFAULT_ROTATION_Z;
  };

  const presetAngle4 = (camera: Camera) => {
    gsap.to(camera.position, {
      duration: 1,
      x: 2.7,
      y: 4.4,
      z: 4,
    });

    state.objectRotationX = DEFAULT_ROTATION_X - Math.PI / 2;
    state.objectRotationY = DEFAULT_ROTATION_Y;
    state.objectRotationZ = DEFAULT_ROTATION_Z;
  };

  // create img from canvas
  const handleDownload = () => {
    // no crop
    // const canvas = canvaRef.current as HTMLCanvasElement;

    // const url = canvas.toDataURL("image/png");
    // const name = upload.name;

    // const link = document.createElement("a");
    // link.download = name;
    // link.href = url;
    // link.click();

    // crop
    // create an image from url (from canvas)
    // draw a croppped iamge

    const designCanvas = canvaRef.current as HTMLCanvasElement;
    const url = designCanvas.toDataURL("image/png");

    const downloadCanvas = document.getElementById(
      "download"
    ) as HTMLCanvasElement;

    const uncroppedImg = new Image();
    uncroppedImg.src = url;
    console.log("url", url);

    downloadCanvas.width = designCanvas.width; // set canva width the same as image
    downloadCanvas.height = designCanvas.height;

    const ctx = downloadCanvas.getContext("2d") as CanvasRenderingContext2D;

    console.log(
      "download",
      snap.topLeftCropX,
      snap.topLeftCropY,
      snap.cropWidth,
      snap.cropHeight
    );

    uncroppedImg.onload = function () {
      console.log("designCanvas.width", designCanvas.width);
      console.log("designCanvas.height", designCanvas.height);
      console.log("snap.topLeftCropX", snap.topLeftCropX);
      console.log("snap.topLeftCropY", snap.topLeftCropY);
      console.log("snap.cropWidth", snap.cropWidth);
      console.log("snap.cropHeight", snap.cropHeight);
      console.log("img width", uncroppedImg.width);
      console.log("img height", uncroppedImg.height);
      console.log("img natural  width", uncroppedImg.naturalWidth);
      console.log("img natural height", uncroppedImg.naturalHeight);

      console.log("loaded");
      // for some reasons, canvas size is 2 times the pixel on pc
      ctx.drawImage(
        uncroppedImg,
        snap.topLeftCropX * 2,
        snap.topLeftCropY * 2, // top left grab
        (snap.topLeftCropX + snap.cropWidth) * 2,
        (snap.topLeftCropY + snap.cropHeight) * 2, // bottom right grab
        0,
        0, // place ลงมาหน่อยเพราะขอบ
        snap.cropWidth * 2,
        snap.cropHeight * 2
      );

      const cropppedUrl = downloadCanvas.toDataURL("image/png");

      const name = upload.name;

      const link = document.createElement("a");
      console.log("download the image");
      link.download = name;
      link.href = cropppedUrl;
      link.click();
    };
  };

  const onCrop = () => {};
  return (
    <div className="h-screen relative ">
      <Crop onCrop={onCrop}>
        <Canvas
          ref={canvaRef}
          style={{
            height: "100vh",
            // width: "100vh",
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
      </Crop>

      <div id="fixed-side-bar" className="absolute top-0 h-screen z-10 ">
        <div
          id="sidebar-section"
          className="flex flex-col justify-between items-center p-2 h-screen bg-grey-0 shadow-xl "
        >
          <div id="upload-section">
            <LinkButton
              label="Back"
              href="/"
              leftIcon={
                <BiArrowBack
                  size={ICON_SIZE - 20} // px
                  color={primaryColor}
                />
              }
              type={ButtonTypes.TEXT}
              extraClass="text-grey-300"
            />

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
                  upload.presignedUrl
                    ? ButtonTypes.OUTLINED
                    : ButtonTypes.PRIMARY
                }
              />
            </DropzoneField>

            {upload.presignedUrl && (
              <div className="w-8 h-8 border-1 border-grey-200 border-solid rounded-sm overflow-scroll">
                <img
                  id="phone"
                  src={upload.presignedUrl}
                  alt="iphone mockup"
                  className=""
                />
              </div>
            )}
          </div>

          <div id="editor-section" className="gap-2 w-full">
            <div
              id="bg-editor-section"
              className="w-full flex flex-col items-center"
            >
              <SmallHeading heading="BG" extraClass="text-left w-full" />
              <hr className="border-1 border-grey-100 border-solid my-1 w-full" />
              <div
                style={{
                  backgroundClip: "content-box",
                  backgroundColor: snap.canvaColor,
                  borderWidth: "1px",
                }}
                className="w-8 h-8 my-2 border-grey-200 border-solid rounded-full box-content"
                onClick={() => setColorPickerIsOpen(true)}
              >
                {colorPickerIsOpen && (
                  <div ref={colorPickerRef} className="my-2 absolute z-50">
                    <RgbaStringColorPicker
                      color={snap.canvaColor}
                      onChange={(newColor) => (state.canvaColor = newColor)}
                    />
                  </div>
                )}

                <div className="flex items-center justify-center cursor-pointer">
                  <CgColorPicker
                    size={ICON_SIZE - 5} // px
                    color={RGBA_WHITE}
                  />
                </div>
              </div>

              <div
                style={{
                  backgroundColor: RGBA_WHITE,
                  borderWidth: "1px",
                }}
                className={`w-8 h-8 my-2 border-2 border-grey-200 border-solid rounded-full cursor-pointer ${
                  snap.canvaColor === RGBA_WHITE && !snap.bgIsTransparent
                    ? "border-primary"
                    : "border-grey-200"
                }`}
                onClick={() => (state.canvaColor = RGBA_WHITE)}
              />

              <div
                style={{
                  backgroundColor: RGBA_BLACK,
                  borderWidth: "1px",
                }}
                className={`w-8 h-8 my-2 border-2 border-grey-200 border-solid rounded-full cursor-pointer ${
                  snap.canvaColor === RGBA_BLACK && !snap.bgIsTransparent
                    ? "border-primary"
                    : "border-grey-200"
                }`}
                onClick={() => (state.canvaColor = RGBA_BLACK)}
              />

              <div
                className={`flex-col items-center cursor-pointer `}
                onClick={toggleTransparentBg}
              >
                <DiagonalLine isActive={snap.bgIsTransparent} />
              </div>
              <div
                id="glare"
                className="flex-col items-center cursor-pointer "
                onClick={() => {
                  state.glareIsOn = !snap.glareIsOn;
                }}
              >
                <HiOutlineLightBulb
                  size={ICON_SIZE} // px
                  color={snap.glareIsOn ? primaryColor : inactiveGrey}
                  className="rotate-180"
                />

                <p className="text-primary text-sm  text-center">Glare</p>
              </div>
              <div
                id="shadow"
                className="flex-col items-center cursor-pointer"
                onClick={toggleShadow}
              >
                <GiStripedSun
                  size={ICON_SIZE} // px
                  color={snap.shadowIsOn ? primaryColor : inactiveGrey}
                />

                <p className="text-primary text-sm  text-center">Shadow</p>
              </div>
            </div>

            <div
              id="object-editor-section"
              className="w-full flex flex-col items-center"
            >
              <SmallHeading heading="Phone" extraClass="text-left w-full" />
              <hr className="border-1 border-grey-100 border-solid my-1 w-full" />

              <div
                className="flex-col items-center cursor-pointer"
                onClick={() => {
                  state.objectRotationX = DEFAULT_ROTATION_X;
                  state.objectRotationY = DEFAULT_ROTATION_Y;
                  state.objectRotationZ = DEFAULT_ROTATION_Z;
                }}
              >
                <HiOutlineDeviceMobile
                  size={ICON_SIZE} // px
                  color={
                    snap.objectRotationX === DEFAULT_ROTATION_X &&
                    snap.objectRotationY === DEFAULT_ROTATION_Y &&
                    snap.objectRotationZ === DEFAULT_ROTATION_Z
                      ? inactiveGrey
                      : primaryColor
                  }
                />

                <p className="text-primary text-sm text-center">Center</p>
              </div>

              {/* x */}

              <div ref={rotateObjectDropdownRef}>
                <DropdownModal
                  isOpen={objectDropdownIsOpen}
                  button={
                    <div
                      className="flex flex-col items-center cursor-pointer"
                      onClick={() =>
                        setObjectDropdownIsOpen(!objectDropdownIsOpen)
                      }
                    >
                      <TbRotate
                        size={ICON_SIZE} // px
                        color={primaryColor}
                      />
                      <p className="text-primary text-sm">Rotate</p>
                    </div>
                  }
                >
                  <Range
                    label={
                      <TbRotate360
                        size={ICON_SIZE} // px
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
                    min={DEFAULT_ROTATION_X - Math.PI}
                    max={DEFAULT_ROTATION_X + Math.PI}
                  />
                  {/* y */}
                  <Range
                    label={
                      <TbRotate
                        size={ICON_SIZE} // px
                        color={primaryColor}
                      />
                    }
                    value={snap.objectRotationY}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                      state.objectRotationY = parseFloat(e.target.value);
                    }}
                    onInput={(e: React.ChangeEvent<HTMLInputElement>) => {
                      state.objectRotationY = parseFloat(e.target.value);
                    }}
                    min={DEFAULT_ROTATION_Y - Math.PI}
                    max={DEFAULT_ROTATION_Y + Math.PI}
                  />

                  {/* z */}
                  <Range
                    label={
                      <TbRotate360
                        size={ICON_SIZE} // px
                        color={primaryColor}
                        className="rotate-45"
                      />
                    }
                    value={snap.objectRotationZ}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                      state.objectRotationZ = parseFloat(e.target.value);
                    }}
                    onInput={(e: React.ChangeEvent<HTMLInputElement>) => {
                      state.objectRotationZ = parseFloat(e.target.value);
                    }}
                    min={DEFAULT_ROTATION_Z - Math.PI}
                    max={DEFAULT_ROTATION_Z + Math.PI}
                  />
                </DropdownModal>
              </div>

              {/* Drop shadow position */}
              <div>
                <DropdownModal
                  isOpen={shadowDropdownIsOpen}
                  button={
                    <div
                      className="flex flex-col items-center cursor-pointer"
                      onClick={() =>
                        setShadowDropdownIsOpen(!shadowDropdownIsOpen)
                      }
                    >
                      <BsArrowDownUp
                        size={ICON_SIZE - 4} // px
                        color={primaryColor}
                      />
                      <p className="text-primary text-sm">Shadow</p>
                    </div>
                  }
                >
                  <Range
                    label={
                      <BsArrowDownUp
                        size={ICON_SIZE - 10} // px
                        color={primaryColor}
                      />
                    }
                    value={snap.shadowPositionY}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                      state.shadowPositionY = parseFloat(e.target.value);
                    }}
                    onInput={(e: React.ChangeEvent<HTMLInputElement>) => {
                      state.shadowPositionY = parseFloat(e.target.value);
                    }}
                    min={SHADOW_POSITION_Y_MIN}
                    max={SHADOW_POSITION_Y_MAX}
                  />
                </DropdownModal>
              </div>
              <div
                id="camera-editor-section"
                className="w-full flex flex-col items-center"
              >
                <SmallHeading heading="Camera" extraClass="text-left w-full" />
                <hr className="border-1 border-grey-100 border-solid my-1 w-full" />

                <div
                  id="camera"
                  className="flex flex-col items-center cursor-pointer"
                  onClick={() => {
                    const camera = snap.camera;
                    if (camera) {
                      resetCameraPosition(camera as Camera);
                    }
                  }}
                >
                  <MdOutlineCenterFocusStrong
                    size={ICON_SIZE} // px
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

                  <p className="text-primary text-sm">Center</p>
                </div>
              </div>

              <div
                id="crop"
                className="flex flex-col items-center cursor-pointer"
                onClick={() => {
                  state.isCropping = !Boolean(snap.isCropping);
                }}
              >
                <BiCrop
                  size={ICON_SIZE} // px
                  color={!snap.isCropping ? inactiveGrey : primaryColor}
                />

                <p className="text-primary text-sm">Crop</p>
              </div>
            </div>
          </div>

          <div id="download-section">
            <div
              className="flex flex-col items-center cursor-pointer"
              onClick={handleDownload}
            >
              <IoMdDownload
                size={ICON_SIZE} // px
                color={primaryColor}
              />

              <p className="text-primary text-sm">Download</p>
            </div>
          </div>
        </div>
      </div>

      <canvas id="download" className="hidden"></canvas>

      <div
        id="fixed-bottom-bar"
        className="flex justify-center absolute bottom-0 right-0 left-0 "
        style={{ zIndex: 9 }}
      >
        {snap.camera && (
          <div className="flex items-center gap-4 shadow-xl p-4 m-2 rounded-xl bg-grey-0">
            <div>
              <div className="text-lg">Presets</div>
            </div>

            <div
              className="flex flex-col items-center cursor-pointer"
              onClick={() => {
                const camera = snap.camera;

                presetAngle1(camera as Camera);
              }}
            >
              <SvgPreset1 />
            </div>

            <div
              className="flex flex-col items-center cursor-pointer"
              onClick={() => {
                const camera = snap.camera;

                presetAngle2(camera as Camera);
              }}
            >
              <SvgPreset2 />
            </div>

            <div
              className="flex flex-col items-center cursor-pointer"
              onClick={() => {
                const camera = snap.camera;

                presetAngle3(camera as Camera);
              }}
            >
              <SvgPreset3 />
            </div>

            <div
              className="flex flex-col items-center cursor-pointer"
              onClick={() => {
                const camera = snap.camera;

                presetAngle4(camera as Camera);
              }}
            >
              <SvgPreset4 />
            </div>
          </div>
        )}
      </div>

      {/* transparent bg */}
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

          console.log("x", camera.position.x);
          console.log("y", camera.position.y);
          console.log("z", camera.position.z);
        }, 200)}
      />
      <ambientLight intensity={1.5} position={[-2, 5, 10]} />

      {snap.glareIsOn && (
        <directionalLight
          position={[-5, 10, 20]} //x,y,z
          intensity={0.4}
        />
      )}

      <Suspense fallback={null}>
        <Iphone13Concept upload={upload} />

        <group position={[0, 0, 0]}>
          {snap.shadowIsOn && (
            <ContactShadows
              position={[0, snap.shadowPositionY, 0]}
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
