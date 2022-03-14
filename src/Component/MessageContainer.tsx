import { createRef, useEffect } from "react";
import { Message } from "../model";

interface MessageContainerProps {
  dataSource: Array<Message>;
  onClickItem: (data: Message) => void;
}

/**
 * 聊天界面消息展示面板
 */
export default function MessageContainer(props: MessageContainerProps) {
  const { dataSource } = props;
  const ref = createRef<HTMLDivElement>();
  useEffect(() => {
    // 来新消息了滚动到最底部
    if (ref.current) {
      let div = ref.current;
      if (div.scrollHeight || 0 > (div.clientHeight || 0)) {
        // 需要滚动到最底部
        div.scrollTop = div.scrollHeight || 0;
      }
    }
  }, [dataSource]);
  return (
    <div ref={ref} style={{ height: 300, overflowY: "auto" }}>
      {dataSource.map((data, index) => (
        <div
          key={index}
          style={{
            margin: 10
          }}
          onClick={() => props.onClickItem(data)}
        >
          {/* 调用对象的render方法 */}
          {data.render()}
        </div>
      ))}
    </div>
  );
}
