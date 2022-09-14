/* eslint-disable @next/next/no-img-element */
import type { NextPage } from "next";
import { useState } from "react";

import { useSelector } from "react-redux";
import Button from "../src/components/Buttons/Button";
import DropzoneField, { UploadedFile } from "../src/components/DropzoneField";
import Layout from "../src/components/layouts/Layout";
import Navbar from "../src/components/Navbar";
import im from "imagemagick";

// original: https://stackoverflow.com/a/19593950
function roundedImage(ctx, x, y, width, height, radius) {
  ctx.beginPath();
  ctx.moveTo(x + radius, y);
  ctx.lineTo(x + width - radius, y);
  ctx.quadraticCurveTo(x + width, y, x + width, y + radius);
  ctx.lineTo(x + width, y + height - radius);
  ctx.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
  ctx.lineTo(x + radius, y + height);
  ctx.quadraticCurveTo(x, y + height, x, y + height - radius);
  ctx.lineTo(x, y + radius);
  ctx.quadraticCurveTo(x, y, x + radius, y);
  ctx.closePath();
}

const Home: NextPage = () => {
  const posts = useSelector((state) => state.posts);
  const upload: UploadedFile = useSelector((state) => state.upload);

  const [fileUploads, setFileUploads] = useState<UploadedFile[]>([]);

  const width = 10;
  const height = 19;
  const dest = 10;
  const handleDownload = () => {
    console.log("handle download");

    // create image
    // const canva = document.querySelector("#canva");
    // const ctx = canva?.getContext("2d");

    const phoneImg = document.querySelector("#phone");
    const phoneRenW = phoneImg.width;
    const phoneRenH = phoneImg.height;
    const phoneIntrinsicW = phoneImg.naturalWidth;
    const phoneIntrinsiH = phoneImg.naturalHeight;

    const ssImg = document.querySelector("#ss");
    const ssIntrinsicW = ssImg.naturalWidth;
    const ssIntrinsiH = ssImg.naturalHeight;
    const ssRenW = ssImg.width;
    const ssRenH = ssImg.height;

    const phoneThicknessW = 10;
    const phoneThicknessH = 10;

    im.convert(
      [
        ssImg,
        "-size",
        width + "x" + height,
        "xc:none",
        "-fill",
        dest,
        "-draw",
        "circle " + width / 2 + "," + width / 2 + " " + width / 2 + ",1",
        dest,
      ],
      function (err, stdout) {
        if (err) console.log("errorrrrrrrrrr");
        console.log("stdout:", stdout);
      }
    );

    // 1. round ss image
    let canva = document.getElementById("round-corner");
    let ctx = canva.getContext("2d");

    const roundedImg = new Image();

    roundedImg.onload = function () {
      // draw image with round corner
      // ctx.save();
      roundedImage(ctx, 0, 0, phoneRenW, phoneRenH, 20);
      ctx.strokeStyle = "#2465D3";
      ctx.stroke();
      ctx.clip();
      ctx.drawImage(
        roundedImg,
        0,
        0,
        ssIntrinsicW,
        ssIntrinsiH,
        phoneThicknessW,
        phoneThicknessW,
        ssRenW,
        ssRenH
      );

      ctx.drawImage(
        phoneImg,
        0,
        0, // top left corner of the grab
        phoneIntrinsicW,
        phoneIntrinsiH, // bottom right corner of the grab
        0,
        0, // where to place the crop
        phoneRenW,
        phoneRenH // size of the output, could be stretch
      );

      ctx.restore();
    };

    roundedImg.src = upload.presignedUrl;

    const link = document.createElement("a");
    link.download = "filename.png";
    // link.href = img;
    // link.click();
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
                ) : (
                  <p className="text-grey-900 w-60 h-80 mt-40">
                    there is presigned url
                  </p>
                )}
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

          {/* <canvas id="phoneCanva" className="absolute z-30"></canvas> */}
          {/* <canvas id="ssCanva" className="absolute z-20"></canvas> */}

          {/* {posts.map((post: Post) => (
            <div key={post.id}>
              <h2 className="text-xl text-primary">{post.title}</h2>
              <p>{post.body}</p>
            </div>
          ))} */}
        </div>

        <div>
          {/* <canvas
            id="canva"
            className="bg-blue"
            width={1000}
            height={1000}
          ></canvas> */}

          <canvas
            id="round-corner"
            className="canvas "
            width="300"
            height="300"
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
