import { BaseItem } from "../../types";
import axios from "axios";
import { formatTime, getHash } from "../../utils";
import redis from "redis";

function getText(text: string) {
  const regex = /【(.*?)】/;
  const match = text.match(regex);

  if (match && match[1]) {
    return match?.[1] || text.slice(0, 20);
  } else {
    return text.slice(0, 20);
  }
}
export class XueqiuCannel {
  dataUrl =
    "https://xueqiu.com/statuses/livenews/list.json?since_id=-1&max_id=-1&count=10";
  xueqiuHeaders = {};

  constructor() {
    this.initXueqiuHeaders();
  }
  async requestData(): Promise<BaseItem[]> {
    try {
      const { data }: any = await axios.get(this.dataUrl, {
        headers: this.xueqiuHeaders,
      });
      if (!data?.items?.length) throw new Error("data empty");
      return (
        data?.items?.map((item: any) => {
          return {
            cannel: "雪球",
            hash: getHash(getText(item?.text) || ""),
            timeStr: formatTime(item?.created_at || 0),
            title: "",
            content: item?.text || "",
            jumpUrl: item?.target || "",
          };
        }) || []
      );
    } catch (error) {
      console.error("雪球获取数据失败", error);
      return [];
    }
  }
  async initXueqiuHeaders() {
    const client = redis.createClient({
      url: "redis://47.116.204.49:6379", // 替换为你的Redis服务器地址和端口
      database: 14,
    });
    client.connect();
    const res = await client.get("xueqiu_headers");
    console.log("XueqiuHeaders", res);
    if (res) this.xueqiuHeaders = JSON.parse(res);
    client.quit();
  }
}
