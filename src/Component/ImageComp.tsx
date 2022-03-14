import { Button, Row } from "antd";
import { useState } from "react";
import { ImageMessage } from "../model/image";
import { currentUser } from "../utils";

const imageSrcList = [
  "https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png",
  "https://gw.alipayobjects.com/zos/antfincdn/aPkFc8Sj7n/method-draw-image.svg"
];

interface ImageCompProps {
  update: (data: ImageMessage) => void;
}
export default function ImageComp(props: ImageCompProps) {
  const [showImage, setShowImage] = useState(false);
  const handleClick = (src: string) => {
    const image = new ImageMessage(src, currentUser);
    image.send();
    props.update(image);
  };
  return (
    <div>
      <Button type="link" onClick={() => setShowImage(!showImage)}>
        表情包
      </Button>
      {showImage && (
        <Row justify="start" gutter={2}>
          {imageSrcList.map((item, index) => (
            <img
              key={index}
              alt="表情包"
              width={40}
              src={item}
              onClick={() => handleClick(item)}
            />
          ))}
        </Row>
      )}
    </div>
  );
}
