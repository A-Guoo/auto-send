import crypto from "crypto";
import dayjs from "dayjs";
import { BaseItem } from "../types";
import axios from "axios";

export function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export function getHash(str: string) {
  const hash = crypto.createHash("md5");
  hash.update(str);
  const result = hash.digest("hex");
  return result;
}

export function formatTime(timestamp: number) {
  // 判断时间戳的位数
  if (timestamp.toString().length === 10) {
    // 如果是10位时间戳，需要将其转换为13位
    timestamp *= 1000;
  }

  // 使用 dayjs 将时间戳转换为日期字符串
  const dateString = dayjs(timestamp).format("YYYY-MM-DD HH:mm:ss");

  return dateString;
}

export function getText(data: BaseItem) {
  let text = `${data.timeStr}--${data.cannel}\n`;
  if (!!data?.title) {
    text += `***${data.title}***\n`;
  }
  text += `${data.content}\n`;
  return text;
}
export async function sendMsgToFeishu(data: BaseItem) {
  try {
    const text = getText(data);
    let content: any[] = [
      {
        tag: "text",
        text: text,
      },
    ];
    if (data?.jumpUrl) {
      content.push({
        tag: "a",
        text: "点击查看",
        href: data.jumpUrl || "",
      });
    }
    await axios.post(
      "https://open.feishu.cn/open-apis/bot/v2/hook/c2fc49e5-c069-4c13-ac52-3aa895bcb5c6",
      {
        msg_type: "post",
        content: {
          post: {
            zh_cn: {
              content: [content],
            },
          },
        },
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  } catch (error) {
    console.log(error);
  }
}

export function isOnTheHour() {
  const minute = dayjs().minute();

  return minute === 0;
}
