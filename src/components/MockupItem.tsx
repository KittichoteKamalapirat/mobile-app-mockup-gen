import { User } from "firebase/auth";
import { useCallback, useEffect, useRef, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import usePremiumStatus from "../hooks/usePremiumStatus";
import { brandName } from "../constants/brand";
import { auth } from "../firebase/client";
import { Mockup } from "../redux/slices/mockupReducer";
import Button from "./Buttons/Button";
import { Loading } from "./Loading";
import Toggle from "./Toggle";

// what's going on here

// On the screen is canva which was drawn by mockup.url (this is done so users can't download in <img/>)

// if transparent is off (default)
//    - add white bg in canvas
//    - download what's on the screen (intrinsic height and width so no worry the quality is lower)
// if transparent is toggled on
//    - remove white bg in canvas
//    - downnload the mockup.url directly (what's in the canvas is not used to download, just for display purpose)

interface Props {
  mockup: Mockup;
}

const MockupItem = ({ mockup }: Props) => {
  console.log("mockup", mockup.name);

  const [user, userLoading] = useAuthState(auth);
  const [isTransparent, setIsTransparent] = useState(false);
  const [canvaIsRendered, setCanvaIsRendered] = useState<boolean>(false);
  const [canvaIsLoading, setCanvaIsLoading] = useState<boolean>(false);
  const userIsPremium = usePremiumStatus(user as User);

  const handleDrawMockupFromImg = useCallback(
    (bgIsTransparent: boolean) => {
      const canvas = document.getElementById(
        `mockup-canva-${mockup.id}`
      ) as HTMLCanvasElement; // surely it exists

      if (!canvas) return;

      const ctx = canvas.getContext("2d") as CanvasRenderingContext2D;

      const mockupImg = new Image();
      mockupImg.src = mockup.url;
      mockupImg.crossOrigin = "anonymous";

      // draw mockup
      mockupImg.onload = function () {
        const intrinsicW = mockupImg.naturalWidth;
        const intrinsicH = mockupImg.naturalHeight;
        console.log("ss", intrinsicW, intrinsicH);

        ctx.drawImage(
          mockupImg,
          0,
          0, // top left grab
          intrinsicW,
          intrinsicH, // bottom right grab
          0,
          0, // place ลงมาหน่อยเพราะขอบ
          intrinsicW,
          intrinsicH
        );

        setCanvaIsLoading(false);
        setCanvaIsRendered(true);
      };
    },
    [isTransparent]
  );

  const handleToggleBg = useCallback(
    (bgIsTransparent: boolean) => {
      const canvas = document.getElementById(
        `mockup-canva-${mockup.id}`
      ) as HTMLCanvasElement; // surely it exists
      if (!canvas) return;

      const ctx = canvas.getContext("2d") as CanvasRenderingContext2D;

      if (bgIsTransparent) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
      } else {
        ctx.fillStyle = "white";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
      }
    },
    [isTransparent]
  );

  const handleDownloadTransprent = () => {
    console.log("istran", isTransparent);
    // transprent
    if (!isTransparent) return;

    const link = document.createElement("a");
    link.download = brandName + "_transparent_bg_mockup_" + mockup.name;

    link.href = mockup.url;
    link.click();
  };

  const handleDownloadBg = () => {
    const canvas = document.getElementById(
      `mockup-canva-${mockup.id}`
    ) as HTMLCanvasElement; // surely it exists

    if (!canvas) return;

    const urlWhiteBg = canvas.toDataURL("image/png");

    const link = document.createElement("a");
    link.download = brandName + "_white_bg_mockup_" + mockup.name;

    link.href = urlWhiteBg;
    link.click();
  };

  useEffect(() => {
    handleToggleBg(isTransparent);
  }, [isTransparent, handleToggleBg]);

  useEffect(() => {
    handleDrawMockupFromImg(isTransparent);
  }, [canvaIsLoading, handleDrawMockupFromImg]);

  if (canvaIsLoading) return <Loading />;

  return (
    <div className="md:p-14 lg-p-18 m-2 shadow-md">
      <div>
        <canvas
          id={`mockup-canva-${mockup.id}`}
          className="w-full h-full"
          width={443}
          height={900}
        ></canvas>

        <canvas
          id={`download-canva-${mockup.id}`}
          width={0}
          height={0}
        ></canvas>
      </div>

      <div className="text-center mt-10">
        <Button
          label="Download"
          onClick={() => {
            isTransparent ? handleDownloadTransprent() : handleDownloadBg();
          }}
        />
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
    </div>
  );
};
export default MockupItem;
