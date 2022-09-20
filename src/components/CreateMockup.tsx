import { useCallback, useEffect, useRef, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useDispatch, useSelector } from "react-redux";
import usePremiumStatus from "../../functions/src/stripe/usePremiumStatus";
import { auth } from "../firebase/client";
import { createMockup } from "../redux/slices/mockupReducer";
import { RootState } from "../redux/store";
import Button from "./Buttons/Button";
import DropzoneField, { UploadedFile } from "./DropzoneField";
import Toggle from "./Toggle";

interface Props {}

const CreateMockup = ({}: Props) => {
  const [isTransparent, setIsTransparent] = useState(false);
  const [user, userLoading] = useAuthState(auth);
  const userIsPremium = usePremiumStatus(user);
  const dispatch = useDispatch();

  const posts = useSelector((state) => state.posts);
  const [canvaIsRendered, setCanvaIsRendered] = useState<boolean>(false);
  const [canvaIsLoading, setCanvaIsLoading] = useState<boolean>(false);
  const upload: UploadedFile = useSelector((state: RootState) => state.upload);
  const [downloadLink, setDownloadLink] = useState<HTMLAnchorElement | null>(
    null
  );
  const [fileUploads, setFileUploads] = useState<UploadedFile[]>([]);

  const handleCreateMockup = useCallback(() => {
    setCanvaIsLoading(true);
    setCanvaIsRendered(true);
    console.log("handle download");

    const canvas = document.getElementById("mock-canvas") as HTMLCanvasElement;
    const ctx = canvas?.getContext("2d");

    const phoneImg = document.querySelector("#phone") as HTMLImageElement;
    const phoneIntrinsicW = phoneImg.naturalWidth;
    const phoneIntrinsicH = phoneImg.naturalHeight;
    const phoneThicknessW = 26;
    const phoneThicknessH = 22;

    const ssImg = new Image();
    ssImg.src = upload.presignedUrl;
    ssImg.crossOrigin = "anonymous";

    // draw ss
    ssImg.onload = function () {
      const ssIntrinsicW = ssImg.naturalWidth;
      const ssIntrinsicH = ssImg.naturalHeight;
      console.log("ss", ssIntrinsicW, ssIntrinsicH);

      ctx.drawImage(
        ssImg,
        0,
        0, // top left grab
        ssIntrinsicW,
        ssIntrinsicH, // bottom right grab
        phoneThicknessW,
        phoneThicknessH, // place ลงมาหน่อยเพราะขอบ
        ssIntrinsicW,
        ssIntrinsicH
      );

      const url = canvas.toDataURL("image/png");
      const name = upload.name;
      const link = document.createElement("a");
      link.download = name;

      link.href = url;
      dispatch(createMockup({ name, url }));

      setDownloadLink(link);
      setCanvaIsLoading(false);
      setCanvaIsRendered(true);
    };

    // draw phone

    ctx.drawImage(
      phoneImg,
      0,
      0, // top left corner of the grab
      phoneIntrinsicW,
      phoneIntrinsicH, // bottom right corner of the grab
      0,
      0, // where to place the crop
      phoneIntrinsicW,
      phoneIntrinsicH // size of the output, could be stretch
    );
  }, [upload.presignedUrl]);

  const handleDownload = () => downloadLink && downloadLink.click();

  const handleToggleBg = useCallback((bgIsTransparent: boolean) => {
    const canvas = document.getElementById("mock-canvas") as HTMLCanvasElement;

    if (!canvas) return;

    const ctx = canvas.getContext("2d") as CanvasRenderingContext2D;

    if (bgIsTransparent) {
      ctx.clearRect(0, 0, 443, 893);
    } else {
      ctx.fillStyle = "blue";
      ctx.fillRect(0, 0, 443, 893);
    }
  }, []);

  const phoneContent = (() => {
    if (canvaIsLoading)
      return (
        <div className="relative flex items-center justify-center w-full h-96 mt-20">
          <p className="absolute z-30">Loading...</p>
          <img
            id="phone"
            src="/images/iphone-13-390x844-screen.png" // blank phone
            alt="ss"
            className={`w-1/2 absolute z-20`}
          />
        </div>
      );
    if (canvaIsRendered) return null;
    return (
      <>
        <img
          id="phone"
          src="/images/iphone-13-390x844-screen.png" // blank phone
          alt="ss"
          className={`w-1/2 absolute z-20 `}
        />
        <div className="absolute z-30">
          <DropzoneField
            ariaLabel="Image"
            inputClass="w-60 h-60 "
            maxFiles={1}
            fileUploads={fileUploads}
            setFileUploads={setFileUploads}
            showConfirmationOnDelete={false}
          >
            Drop an image here
          </DropzoneField>
        </div>
      </>
    );
  })();

  useEffect(() => {
    handleToggleBg(isTransparent);
  }, [isTransparent, handleToggleBg]);

  useEffect(() => {
    if (upload.presignedUrl && !canvaIsRendered) handleCreateMockup();
  }, [upload.presignedUrl, canvaIsRendered, handleCreateMockup]);

  return (
    <>
      <div
        id="mockup"
        className="relative flex justify-center h-full items-center "
      >
        {phoneContent}
        <canvas
          id="mock-canvas"
          className={`${
            canvaIsRendered && !canvaIsLoading ? "block" : "hidden"
          } w-1/2`}
          width="443"
          height="890"
        ></canvas>
      </div>

      {canvaIsRendered && !canvaIsLoading ? (
        <div className="text-center">
          <Button label="Download" onClick={handleDownload} />
          <div className="mt-10">
            <Toggle
              onClick={() => {
                console.log("clocked");
                setIsTransparent(!isTransparent);
              }}
              isChecked={isTransparent}
              isDisabled={!userIsPremium}
            />
          </div>
        </div>
      ) : null}
    </>
  );
};
export default CreateMockup;
