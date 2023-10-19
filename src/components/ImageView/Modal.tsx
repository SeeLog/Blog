import Transition from 'react-transition-group/Transition';
import ModalInner from './ModalInner';
import { useRef } from 'react';

export interface ModalProps {
  children?: React.ReactNode;
  onClose?: () => void;
  visible?: boolean;
}

export default function Modal(props: ModalProps) {
  const transRef = useRef<HTMLDivElement>(null);
  const duration = 200;
  const defaultStyle = {
    transition: `opacity ${duration}ms ease-in-out`,
    opacity: 0,
  };
  const transitionStyles: { [key: string]: React.CSSProperties } = {
    entering: { opacity: 0 },
    entered: { opacity: 1 },
    exiting: { opacity: 0 },
    exited: { opacity: 0 },
  };

  return (
    <Transition in={props.visible} timeout={duration}>
      {(state) => {
        return state !== 'exited' ? (
          <ModalInner
            onClose={props.onClose}
            style={{ ...defaultStyle, ...transitionStyles[state] }}
          >
            {props.children}
          </ModalInner>
        ) : undefined;
      }}
    </Transition>
  );
}
