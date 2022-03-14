import { Avatar, Col, Row } from "antd";
import { currentUser } from "../utils/index";
/**
 * 消息类，抽象父类，支持子类可扩展，子类继承父类需要实现抽象方法。
 */
export abstract class Message {
  sender: string; // 这条消息的发送者
  createTime: number; // 消息发送时间（撤回操作时可以用到，用来判断是否超过了可撤回时间）
  constructor(sender: string) {
    this.sender = sender;
    this.createTime = +new Date();
  }

  // 本方法要强制子类去实现，加上abstract关键词
  abstract renderComp(): JSX.Element;

  // 是否为当前用户发送的消息
  isSender() {
    return this.sender === currentUser;
  }

  render() {
    return (
      <Row
        gutter={2}
        align="middle"
        justify={this.isSender() ? "end" : "start"} // 根据是谁发送的消息来布局
      >
        <Col order={1}> {this.renderComp()} </Col>
        <Col order={this.isSender() ? 2 : 0}>
          <Avatar style={{ color: "#f56a00", backgroundColor: "#fde3cf" }}>
            {this.sender}
          </Avatar>
        </Col>
      </Row>
    );
  }
  /**
   * 模拟消息发送提交接口，返回Promise
   */
  async send() {
    return new Promise<boolean>((resolve, reject) => {
      setTimeout(() => {
        resolve(true);
      }, 300);
    });
  }
}
