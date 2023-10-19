import { useCallback, useEffect, useRef } from 'react';
import { useSpring, animated } from '@react-spring/web';
import { useDrag, useGesture, useWheel } from '@use-gesture/react';

export interface ModalBackgroundProps {
  children?: React.ReactNode;
  onClose?: () => void;
  style?: React.CSSProperties;
}

export default function ModalInner(props: ModalBackgroundProps) {
  const divRef = useRef<HTMLDivElement>(null);
  const outerRef = useRef<HTMLDivElement>(null);
  const [{ x, y, scale }, api] = useSpring(() => ({
    x: 0,
    y: 0,
    scale: 1,
  }));
  const dragBind = useDrag(
    ({ offset, down }) => {
      if (down) {
        api.start({
          x: offset[0],
          y: offset[1],
        });
      } else {
        if (scale.get() <= 1) {
          // reset offset when zoom is 1 or less
          api.start({ x: 0, y: 0 });
        }
      }
    },
    { from: () => [x.get(), y.get()] },
  );

  const wheelBind = useWheel(({ event, active }) => {
    if (active) {
      const { deltaY } = event;
      const newZoom = Math.min(10, Math.max(0.5, scale.get() - deltaY / 200));
      api.start({
        scale: newZoom,
      });
      if (newZoom <= 1) {
        api.start({ x: 0, y: 0 });
      }
    }
  });

  useGesture(
    {
      onClick: ({ event }) => {
        event.stopPropagation();
      },
    },
    {
      target: divRef,
    },
  );

  const handleWheel = useCallback((event: WheelEvent) => {
    event.preventDefault();
  }, []);

  useEffect(() => {
    outerRef.current?.addEventListener('wheel', handleWheel, {
      passive: false,
    });

    return () => {
      outerRef.current?.removeEventListener('wheel', handleWheel);
    };
  }, [handleWheel]);

  return (
    <div
      ref={outerRef}
      className="fixed z-30 left-0 top-0 w-full h-screen bg-black/70 p-16"
      style={props.style}
      onClick={() => {
        props.onClose?.();
      }}
    >
      {/* <Close /> */}
      <div className="flex h-full w-full items-center">
        <animated.div
          ref={divRef}
          style={{
            x,
            y,
            scale,
            touchAction: 'none',
          }}
          {...dragBind()}
          {...wheelBind()}
          onDoubleClick={(event) => {
            if (scale.get() > 1) {
              api.start({ x: 0, y: 0, scale: 1 });
            } else {
              api.start({ scale: 2 });
            }
            event.stopPropagation();
          }}
        >
          {props.children}
        </animated.div>
      </div>
    </div>
  );
}
