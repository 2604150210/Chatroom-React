import { Row } from "antd";
import { Message } from ".";

/**
 * 系统消息类
 */
export class SystemMessage extends Message {
  content: string;
  constructor(content: string, sender: string) {
    super(sender);
    this.content = content;
  }
  renderComp(): JSX.Element {
    return (
      <div
        style={{
          color: "gray"
        }}
      >
        {this.content}
      </div>
    );
  }
  // 重写父类的render方法，因为父类的默认布局是含有用户头像的，系统消息没有用户头像
  render() {
    return (
      <Row justify="center" align="middle">
        {this.renderComp()}
      </Row>
    );
  }
}
