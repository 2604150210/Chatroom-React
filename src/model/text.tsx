import { Message } from ".";

/**
 * 文本信息类， 实现了父类的渲染组件方法
 */
export class TextMessage extends Message {
  value: string;
  constructor(value: string, sender: string) {
    super(sender);
    this.value = value;
  }

  renderComp() {
    return (
      <div
        style={{
          borderRadius: 4,
          padding: 4,
          backgroundColor: "lightGreen"
        }}
      >
        {this.value}
      </div>
    );
  }
}
