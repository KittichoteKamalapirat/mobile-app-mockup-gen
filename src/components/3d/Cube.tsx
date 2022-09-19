// import texture from "../../../public/images/map.jpg";

// const macbookIphone = require("/images/map.jpg");

interface Props {}

const Cube = ({}: Props) => {
  //   const colorMap = useLoader(TextureLoader, macbookIphone);
  return (
    <mesh>
      <boxGeometry attach="geometry" args={[3, 3, 3]} />
      <meshStandardMaterial attach="material" color="blue" />
    </mesh>
  );
};
export default Cube;
