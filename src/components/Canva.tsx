import React, { useEffect } from "react";

interface Props {}

const Canva = ({}: Props) => {
  useEffect(() => {
    // create 2 canvas
    const phoneCanva = document.querySelector(
      "#phoneCanva"
    ) as HTMLCanvasElement;
    const phoneCtx = phoneCanva?.getContext("2d") as CanvasRenderingContext2D;
    const phoneImg = document.querySelector("#phone") as HTMLImageElement;
    const phoneWidth = phoneImg?.width;
    const phoneHeight = phoneImg?.height;
    phoneCanva.width = phoneWidth; // set canva width the same as image
    phoneCanva.height = phoneHeight;
    // phoneCtx.clip();
    phoneCtx.drawImage(phoneImg, 0, 0, phoneWidth, phoneHeight);

    const ssCanva = document.querySelector("#ssCanva") as HTMLCanvasElement;
    const ssCtx = ssCanva?.getContext("2d") as CanvasRenderingContext2D;
    const ssImg = document.createElement("img") as HTMLImageElement;
    const ssWidth = 120;
    const ssHeight = 200;
    ssImg.style.width = ssWidth.toString();
    ssImg.style.borderRadius = "20em";
    ssImg.style.borderCollapse = "separate";
    ssImg.style.webkitBorderRadius = "20em";
    ssImg.style.perspective = "1";
    ssImg.style.overflow = "hidden";
    // ssImg.style.MozBorderRadius = "20em";
    ssImg.style.borderImage = "";

    ssImg.style.height = ssHeight.toString();

    ssImg.onload = function () {
      ssCtx.drawImage(ssImg, 20, 10, ssWidth, ssHeight);
    };

    ssImg.src =
      "https://www.digitaltrends.com/wp-content/uploads/2020/09/iphone-tap-accessibility.jpg?fit=1125%2C2436&p=1";

    ssCanva.width = phoneWidth;
    ssCanva.height = phoneHeight;
    // ssCtx.drawImage(ssImg, 74, 10, ssWidth, ssHeight);

    // ssCtx.translate(10, 10);
    // ssCtx.rotate(100);
    // ssCtx.setTransform(1, Math.tan(10), 0, 1, 0, 0);
  });
  return (
    <div>
      <img
        id="phone"
        src="http://assets.stickpng.com/images/5cb0633d80f2cf201a4c3253.png" // blank phone
        alt="iphone mockup"
        className="w-40 "
      />

      <div className="relative">
        <canvas id="phoneCanva" className="absolute z-30"></canvas>
        <canvas id="ssCanva" className="absolute z-20"></canvas>
      </div>
    </div>
  );
};
export default Canva;
