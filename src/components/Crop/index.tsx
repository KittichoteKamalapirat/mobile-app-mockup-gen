import { animated, useSpring } from "@react-spring/web";
import { useDrag } from "@use-gesture/react";
import { ReactNode, useCallback, useEffect, useRef } from "react";
import { useSnapshot } from "valtio";
import useWindowDimensions from "../../hooks/useWindowDimensions";
import { state } from "../../../pages/design";
import Button from "../Buttons/Button";
import styles from "./index.module.css";

interface Props {
  children: ReactNode;
  onCrop: (
    displayedVideoSize: Dimensions,
    selector: CoordinateAndDimensions
  ) => void;
}

export interface Dimensions {
  width: number;
  height: number;
}

export type CoordinateAndDimensions = {
  x: number;
  y: number;
} & Dimensions;

const Crop = ({ children, onCrop }: Props) => {
  // const [isCropping, setIsCropping] = useState(true);
  const snap = useSnapshot(state);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const { height: windowH, width: windowW } = useWindowDimensions() || {};

  const [{ x, y, width, height }, api] = useSpring(() => ({
    x: snap.topLeftCropX,
    y: snap.topLeftCropY,
    width: snap.cropWidth,
    height: snap.cropHeight,
  }));

  console.log("container ref", containerRef.current?.clientWidth);

  const bottomRightResizerRef = useRef<HTMLDivElement | null>(null);

  const bind = useDrag(
    (state) => {
      const isResizing = state?.event.target === bottomRightResizerRef.current;

      if (isResizing) {
        api.set({
          width: state.offset[0],
          height: state.offset[1],
        });
      } else {
        api.set({
          x: state.offset[0],
          y: state.offset[1],
        });
      }
    },
    {
      // so it doesn't go back to 0,0 default position
      from: (event) => {
        const isResizing = event.target === bottomRightResizerRef.current;
        if (isResizing) {
          return [width.get(), height.get()];
        } else {
          return [x.get(), y.get()];
        }
      },
      bounds: (state) => {
        const isResizing =
          state?.event.target === bottomRightResizerRef.current;
        const containerWidth = containerRef.current?.clientWidth ?? 0;
        const containerHeight = containerRef.current?.clientHeight ?? 0;
        if (isResizing) {
          return {
            top: 50,
            left: 50,
            right: containerWidth - x.get(),
            bottom: containerHeight - y.get(),
          };
        } else {
          return {
            top: 0,
            left: 0,
            right: containerWidth - width.get(),
            bottom: containerHeight - height.get(),
          };
        }
      },
    }
  );

  // const onCancel = useCallback(() => {
  //   // setIsCropping(false);
  //   state.isCropping = false;
  // }, []);

  const onDone = useCallback(() => {
    // setIsCropping(false);
    state.isCropping = false;
    const containerWidth = containerRef.current?.clientWidth ?? 0;
    const containerHeight = containerRef.current?.clientHeight ?? 0;
    const displayedVideoSize: Dimensions = {
      width: containerWidth,
      height: containerHeight,
    };
    const selector: CoordinateAndDimensions = {
      x: x.get(),
      y: y.get(),
      width: width.get(),
      height: height.get(),
    };
    onCrop(displayedVideoSize, selector);

    // update so global state can use this when downloading the image
    state.topLeftCropX = x.get();
    state.topLeftCropY = y.get();
    state.cropWidth = width.get();
    state.cropHeight = height.get();
  }, [onCrop]);

  // resize to fit different monitor size
  useEffect(() => {
    // TODO download popup triggers this too, so remove windowH from dependency for now
    if (!windowW || !windowH) return;

    api.set({
      x: 0.1 * windowW,
      y: 0.05 * windowH,
      width: 0.8 * windowW,
      height: 0.8 * windowH,
    });
  }, [windowW]);

  return (
    <div className={styles.container} ref={containerRef}>
      <div>
        {Boolean(snap.isCropping) ? (
          <animated.div
            className={styles.croppingArea}
            style={{ x, y, width, height }}
            {...bind()}
          >
            <div
              className={styles.resizerBottomRight}
              ref={bottomRightResizerRef}
            />
          </animated.div>
        ) : (
          <animated.div
            className={styles.croppedArea}
            style={{ x, y, width, height }}
          ></animated.div>
        )}
        {children}
      </div>
      <div className={styles.overlayControls}>
        {Boolean(snap.isCropping) && (
          <>
            {/* <Button
              label="Cancel"
              onClick={onCancel}
              type={ButtonTypes.OUTLINED}
              extraClass="mx-2"
            /> */}
            <Button label="Save" onClick={onDone} />
          </>
        )}
      </div>
    </div>
  );
};
export default Crop;
