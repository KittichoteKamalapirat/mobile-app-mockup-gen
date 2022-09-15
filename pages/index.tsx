/* eslint-disable @next/next/no-img-element */
import type { NextPage } from "next";
import { useState } from "react";

import { useSelector } from "react-redux";
import Button from "../src/components/Buttons/Button";
import DropzoneField, { UploadedFile } from "../src/components/DropzoneField";
import Layout from "../src/components/layouts/Layout";
import Navbar from "../src/components/Navbar";

const Home: NextPage = () => {
  const posts = useSelector((state) => state.posts);
  const upload: UploadedFile = useSelector((state) => state.upload);

  const [fileUploads, setFileUploads] = useState<UploadedFile[]>([]);

  const handleDownload = () => {
    console.log("handle download");

    // create image
    // const canva = document.querySelector("#canva");
    // const ctx = canva?.getContext("2d");

    const canvas = document.getElementById("round-corner");
    const ctx = canvas?.getContext("2d");

    const phoneImg = document.querySelector("#phone");
    // const phoneRenW = phoneImg.width;
    // const phoneRenH = phoneImg.height;
    const phoneIntrinsicW = phoneImg.naturalWidth;
    const phoneIntrinsicH = phoneImg.naturalHeight;

    const ssImg = document.querySelector("#ss");
    const ssIntrinsicW = ssImg.naturalWidth;
    const ssIntrinsicH = ssImg.naturalHeight;
    // const ssRenW = ssImg.width;
    // const ssRenH = ssImg.height;

    const phoneThicknessW = 26;
    const phoneThicknessH = 22;

    console.log("phone", phoneIntrinsicW, phoneIntrinsicH);
    console.log("phone", ssIntrinsicW, ssIntrinsicH);

    // draw ss
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

    const url = canvas.toDataURL("image/png");
    const link = document.createElement("a");
    link.download = "filename.png";
    link.href = url;
    link.click();
  };

  // useEffect(() => {
  //   handleDownload();
  // }, []);

  return (
    <Layout>
      <Navbar />
      <main className="flex-col items-center justify-center ">
        <div id="container" className="flex min-h-screen">
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

          <div id="right" className="mx-auto flex-1">
            <div className="h-90 ">
              <div id="mockup" className="relative mx-auto flex justify-center">
                <img
                  id="phone"
                  src="/images/iphone-13-390x844-screen.png" // blank phone
                  alt="ss"
                  className="w-60 absolute z-20"
                />

                {upload.presignedUrl ? (
                  <img
                    id="ss"
                    src={upload.presignedUrl}
                    crossOrigin="anonymous"
                    alt="screenshot"
                    style={{
                      marginTop: 10,
                      marginLeft: 4,
                      width: 220,
                      borderRadius: 30,
                      zIndex: 10,
                    }}
                  />
                ) : null}

                {!upload.presignedUrl ? (
                  <div className="absolute z-30">
                    <DropzoneField
                      ariaLabel="Image"
                      inputClass="w-60 h-60 mt-40 "
                      maxFiles={1}
                      fileUploads={fileUploads}
                      setFileUploads={setFileUploads}
                      showConfirmationOnDelete={false}
                    >
                      Drop an image here
                    </DropzoneField>
                  </div>
                ) : null}
              </div>
            </div>

            <div className=" text-center">
              {upload.presignedUrl ? (
                <Button
                  label="Download"
                  extraClass="my-10 "
                  onClick={handleDownload}
                />
              ) : (
                <p className="text-grey-900">No presigned url</p>
              )}
            </div>
          </div>
        </div>

        <div>
          <canvas
            id="round-corner"
            className="canvas "
            width="443"
            height="890"
          ></canvas>
        </div>

        {/* <CreatePost /> */}

        {/* <Canva /> */}

        {/* hero */}

        {/* <JustCSS /> */}
      </main>
    </Layout>
  );
};

export default Home;
