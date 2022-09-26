import dynamic from "next/dynamic";
import Link from "next/link";
import { Suspense } from "react";
import { brandName } from "../constants/brand";
import { Loading } from "./Loading";

interface Props {}

const Navbar = ({}: Props) => {
  const DynamicAuthDisplay = dynamic(() => import("./AuthDisplay"));

  return (
    <div className="flex justify-center py-2 px-10 w-full top-0 fixed bg-grey-900 text-grey-0 z-50">
      <div className="flex justify-between items-center md:max-w-7xl w-full ">
        <div className="flex">
          {/* <div className="mr-4">logo image</div> */}
          <Link className="text-xl" href="/">
            {brandName}
          </Link>
        </div>
        <div>
          <ul className="flex gap-4">
            {/* <Link>Contact</Link> */}
            {/* <Link href="/">About</Link> */}

            <Suspense fallback={<Loading />}>
              <DynamicAuthDisplay />
            </Suspense>
          </ul>
        </div>
      </div>
    </div>
  );
};
export default Navbar;
