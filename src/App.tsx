import "./styles.css";
import "antd/dist/antd.css";
import { useState } from "react";

import MessageContainer from "./Component/MessageContainer";
import TextComp from "./Component/TextComp";
import ImageComp from "./Component/ImageComp";

import { Message } from "./model";
import { SystemMessage } from "./model/system";
import { Button, Modal, Row } from "antd";
import { currentUser } from "./utils";
import { TextMessage } from "./model/text";

export default function App() {
  const [dataSource, setDataSource] = useState<Array<Message>>([]);
  const update = (data: Message) => {
    setDataSource([...dataSource, data]);
  };
  const [curData, setData] = useState<Message>();
  const [visible, setVisible] = useState(false);
  const now = +new Date();
  const onClickItem = (data: Message) => {
    console.log("data", data);
    setData(data);
    setVisible(true);
  };
  /**
   * 撤回消息
   */
  const withdraw = (data: Message) => {
    // 移除这条消息
    const newDataSource = dataSource.filter((item) => item !== data);
    // 添加一条系统提示
    const system = new SystemMessage(
      `${currentUser}撤回了一条消息`,
      currentUser
    );
    setDataSource([...newDataSource, system]);
    setVisible(false);
  };
  /**
   * 邀请加入群聊
   */
  const invite = () => {
    const system = new SystemMessage(
      `${currentUser}邀请yuqiang加入了群聊`,
      currentUser
    );
    setDataSource([...dataSource, system]);
  };
  /**
   * 接受消息
   */
  const receive = () => {
    const text = new TextMessage("你好", "yuqiang");
    setDataSource([...dataSource, text]);
  };
  return (
    <div className="App">
      {/* 消息界面 */}
      <MessageContainer dataSource={dataSource} onClickItem={onClickItem} />
      {/* 消息输入框 */}
      <TextComp update={update} />
      <Row justify="end">
        <Button type="link" onClick={invite}>
          模拟邀请好友
        </Button>
        <Button type="link" onClick={receive}>
          模拟收到消息
        </Button>
        <ImageComp update={update} />
      </Row>
      {/* 模态框，用来扩展某条消息被点击后的操作面板 */}
      <Modal
        title={null}
        footer={null}
        width={200}
        visible={visible}
        onCancel={() => {
          setVisible(false);
        }}
      >
        {/* 两分钟内可以撤回 */}
        {now - Number(curData?.createTime) < 1000 * 60 * 2 && curData && (
          <Row justify="center">
            <Button onClick={() => withdraw(curData)} type="primary">
              撤回消息
            </Button>
          </Row>
        )}
      </Modal>
    </div>
  );
}
