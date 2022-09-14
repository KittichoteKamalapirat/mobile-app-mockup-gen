/* eslint-disable @next/next/no-img-element */
import React, { useEffect } from "react";

interface Props {}

const JustCSS = ({}: Props) => {
  return (
    <div>
      <div className="static bg-blue h-96">
        <div className="relative">
          <h1>yo</h1>
          <img
            id="phone"
            src="http://assets.stickpng.com/images/5cb0633d80f2cf201a4c3253.png" // blank phone
            alt="iphone mockup"
            style={{
              zIndex: 10,
              width: 240,
              position: "absolute",
            }}
          />
          <img
            id="ss"
            src="https://www.digitaltrends.com/wp-content/uploads/2020/09/iphone-tap-accessibility.jpg?fit=1125%2C2436&p=1" // blank phone
            alt="ss"
            style={{
              width: 160,
              position: "absolute",
              borderRadius: "1.5rem",
              left: 40,
            }}
          />
        </div>
      </div>

      <div className="static bg-green h-96">
        <h1>hi</h1>
        <div className="relative top-100 ">
          <img
            id="ss"
            src="/images/rotate_no_bg.png" // blank phone
            alt="ss"
            style={{
              zIndex: 10,
              width: 240,
              position: "absolute",
            }}
          />

          <img
            id="ss"
            src="https://www.digitaltrends.com/wp-content/uploads/2020/09/iphone-tap-accessibility.jpg?fit=1125%2C2436&p=1" // blank phone
            alt="ss"
            style={{
              width: 105,
              position: "absolute",
              borderRadius: "10px",
              top: 15,
              left: 30,
              transform: "rotate(-13deg)",
              transformOrigin: "50px 100px",
            }}
          />
        </div>
      </div>

      <div className="static bg-green h-96">
        <h1>hi</h1>
        <div className="relative top-100 perspective">
          <img
            id="ss"
            src="/images/skew.png" // blank phone
            alt="ss"
            style={{
              zIndex: 10,
              width: 240,
              position: "absolute",
              opacity: 0.2,
            }}
          />

          {/* <img
            id="ss"
            src="https://www.digitaltrends.com/wp-content/uploads/2020/09/iphone-tap-accessibility.jpg?fit=1125%2C2436&p=1" // blank phone
            alt="ss"
            style={{
              width: 140,
              position: "absolute",
              borderRadius: "1.5rem",
              top: 34,
              left: 50,
              transform: "rotateX(16deg) rotateY(30deg) rotateZ(-5deg)",
            }}
          /> */}

          <div
            style={{
              backgroundColor: "white",
              width: 125,
              height: 300,
              opacity: 0.9,
              position: "absolute",
              borderRadius: "1.2rem",
              top: 34,
              left: 60,
              transform: "rotateX(28deg) rotateY(28deg) rotateZ(-8deg)",
            }}
          />
        </div>
      </div>
    </div>
  );
};
export default JustCSS;
