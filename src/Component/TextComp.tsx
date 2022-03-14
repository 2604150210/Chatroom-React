import { useState } from "react";
import { Button, Input, message, Row } from "antd";
import { TextMessage } from "../model/text";
import { currentUser } from "../utils";

interface TextCompProps {
  update: (data: TextMessage) => void;
}
export default function TextComp(props: TextCompProps) {
  const [content, setContent] = useState("");
  /**
   * 提交输入的消息。往消息列表中加入一条消息，并且更新消息面板
   */
  const submitContent = async () => {
    console.log(content);
    const text = new TextMessage(content, currentUser);
    const res = await text.send();
    if (res) {
      setContent("");
      props.update(text);
    } else {
      message.error("发送失败，请稍后重试");
    }
  };
  return (
    <Row justify="end">
      <Input.TextArea
        onKeyPress={submitContent}
        value={content}
        placeholder="您可以输入一些文字..."
        onChange={(e) => setContent(e.target.value)}
      ></Input.TextArea>
      <Button type="primary" onClick={submitContent} disabled={!content}>
        发送
      </Button>
    </Row>
  );
}
