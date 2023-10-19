import { useCallback, useState } from 'react';
import Modal from './Modal';

export interface ImageViewProps
  extends React.ImgHTMLAttributes<HTMLImageElement> {}

export default function ImageView(props: ImageViewProps) {
  const [visible, setVisible] = useState(false);

  const onPreviewImageClickHandler = useCallback(() => {
    setVisible(true);
  }, []);

  const onCloseHandler = useCallback(() => {
    setVisible(false);
  }, []);

  return (
    <>
      <img
        {...props}
        onClick={() => onPreviewImageClickHandler()}
        className="cursor-pointer"
      />
      <Modal visible={visible} onClose={() => onCloseHandler()}>
        <img
          src={props.src}
          alt={props.alt}
          className="w-full h-full object-contain"
          draggable={false}
        />
      </Modal>
    </>
  );
}
