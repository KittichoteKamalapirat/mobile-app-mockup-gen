/* eslint-disable @next/next/no-img-element */
import type { NextPage } from "next";
import { useCallback, useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";

import { useSelector } from "react-redux";
import usePremiumStatus from "../functions/src/stripe/usePremiumStatus";
import Button from "../src/components/Buttons/Button";
import DropzoneField, { UploadedFile } from "../src/components/DropzoneField";
import Layout from "../src/components/layouts/Layout";
import Toggle from "../src/components/Toggle";
import { auth } from "../src/firebase/client";

const Home: NextPage = () => {
  const [isTransparent, setIsTransparent] = useState(false);
  const [user, userLoading] = useAuthState(auth);
  const userIsPremium = usePremiumStatus(user);

  const posts = useSelector((state) => state.posts);
  const [canvaIsRendered, setCanvaIsRendered] = useState<boolean>(false);
  const [canvaIsLoading, setCanvaIsLoading] = useState<boolean>(false);
  const upload: UploadedFile = useSelector((state) => state.upload);
  const [downloadLink, setDownloadLink] = useState<HTMLAnchorElement | null>(
    null
  );
  const [fileUploads, setFileUploads] = useState<UploadedFile[]>([]);

  const createMockup = useCallback(() => {
    setCanvaIsLoading(true);
    setCanvaIsRendered(true);
    console.log("handle download");

    const canvas = document.getElementById("mock-canvas");
    const ctx = canvas?.getContext("2d");

    const phoneImg = document.querySelector("#phone");
    // const phoneRenW = phoneImg.width;
    // const phoneRenH = phoneImg.height;
    const phoneIntrinsicW = phoneImg.naturalWidth;
    const phoneIntrinsicH = phoneImg.naturalHeight;
    const phoneThicknessW = 26;
    const phoneThicknessH = 22;

    // const ssImg = document.querySelector("#ss");

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
      const link = document.createElement("a");
      link.download = "iphone_13_mock_up_443x890.png";

      link.href = url;
      setDownloadLink(link);
      setCanvaIsLoading(false);
      setCanvaIsRendered(true);
    };

    console.log("phone", phoneIntrinsicW, phoneIntrinsicH);

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

  useEffect(() => {
    if (upload.presignedUrl && !canvaIsRendered) createMockup();
  }, [upload.presignedUrl, canvaIsRendered, createMockup]);

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

  return (
    <Layout>
      <main className="flex-col items-center justify-center h-screen">
        <div id="container" className="flex h-5/6">
          <div id="left" className="my-auto flex-1">
            <div>
              <h1 className="text-3xl font-bold">
                Create beautiful mobile mockups <br /> in seconds.
              </h1>
              <h2 className="text-xl">
                Showcase your app with our iPhone mockups and get more
                customers.
              </h2>
            </div>
          </div>

          <div id="right" className="flex-1">
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
          </div>
        </div>
      </main>
    </Layout>
  );
};

export default Home;
