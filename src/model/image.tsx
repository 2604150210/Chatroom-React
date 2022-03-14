import { Message } from ".";

/**
 * 图片消息类，继承自父类，实现了父类的组件渲染方法
 */
export class ImageMessage extends Message {
  src: string;
  constructor(src: string, sender: string) {
    super(sender);
    this.src = src;
  }

  renderComp(): JSX.Element {
    return <img alt="" src={this.src} width={80} />;
  }
}
