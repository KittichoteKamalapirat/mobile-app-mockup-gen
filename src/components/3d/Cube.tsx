import { useLoader } from "@react-three/fiber";
import { TextureLoader } from "three";
import ss from "../../../public/images/ss-390x844-02.png";

// const macbookIphone = require("/images/map.jpg");

interface Props {}

const Cube = ({}: Props) => {
  const colorMap = useLoader(TextureLoader, ss.src);
  return (
    <mesh>
      <boxGeometry attach="geometry" args={[3, 3, 3]} />
      <meshStandardMaterial attach="material" color="#ffffff" map={colorMap} />
    </mesh>
  );
};
export default Cube;
