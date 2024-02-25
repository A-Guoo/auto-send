import { BaseItem } from "../../types";
import axios from "axios";
import { formatTime, getHash } from "../../utils";

export class ThsCannel {
  dataUrl =
    "https://news.10jqka.com.cn/tapp/news/push/stock/?page=1&tag=&track=website&pagesize=10";
  cookie =
    "Hm_lvt_722143063e4892925903024537075d0d=1708865736; Hm_lpvt_722143063e4892925903024537075d0d=1708865736; log=; Hm_lvt_929f8b362150b1f77b477230541dbbc2=1708865736; Hm_lpvt_929f8b362150b1f77b477230541dbbc2=1708865736; Hm_lvt_78c58f01938e4d85eaf619eae71b4ed1=1708865736; Hm_lpvt_78c58f01938e4d85eaf619eae71b4ed1=1708865736; v=A07kLn-Dp2JhvBNGkRKG7s8Nny8VzxLJJJPGrXiXutEM2-CR4F9i2fQjFrhL";
  constructor() {}
  async requestData(): Promise<BaseItem[]> {
    try {
      const { data }: any = await axios.get(this.dataUrl, {
        headers: {
          "Content-Type": "application/json;charse",
          Cookie: this.cookie,
        },
      });
      if (!data?.data?.list?.length) throw new Error("data empty");
      return (
        data?.data?.list?.map((item: any) => {
          return {
            cannel: "同花顺",
            hash: getHash(item?.title || ""),
            timeStr: formatTime(item?.ctime || 0),
            title: item?.title,
            content: item?.short || "",
            jumpUrl: item?.appUrl || "",
          };
        }) || []
      );
    } catch (error) {
      console.error("同花顺获取数据失败", error);
      return [];
    }
  }
}
