import React from "react";
import Link from "next/link";
import { XCenter } from "./layouts/XCenter";
import { brandName } from "../constants/brand";

interface FooterProps {}

export const Footer: React.FC<FooterProps> = ({}) => {
  return (
    <footer className="bg-slate-800 text-center lg:text-left ">
      {/* <div className="mx-auto max-w-lg">
        <div className="container py-4">

          <XCenter>
            <div className="mb-6 text-white">
              <h5 className="uppercase font-bold mb-2.5 ">Navigate</h5>

              <ul className="list-none mb-0 flex justify-between flex-col md:flex-row  w-96 ">
                <li>
                  <a
                    href="https://storybook.shareculator.com/"
                    target="_blank"
                    rel="noreferrer"
                  >
                    Storybook
                  </a>
                </li>
                <li>
                  <Link href="/guide">User Guide</Link>
                </li>
                <li>
                  <a
                    href="mailto: kittichoteshane@gmail.com"
                    target="_blank"
                    rel="noreferrer"
                  >
                    Contact
                  </a>
                </li>
              </ul>
            </div>
          </XCenter>
        </div>
      </div> */}
      <div className="text-white text-center p-4 bg-slate-700">
        © 2021 Copyright: <a href="https://shareculator.com/">{brandName}</a>
      </div>
    </footer>
  );
};
