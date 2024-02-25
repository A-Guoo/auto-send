import { BaseItem } from "../../types";
import axios from "axios";
import { getHash } from "../../utils";

// https://www.yicai.com/news/gushi/
export class DycjCannel {
  dataUrl =
    "https://www.yicai.com/api/ajax/getlistbycid?cid=54&page=1&pagesize=10";
  cookie =
    "acw_tc=8ccff79b17088732725206739e0e8be065391aa5749971b92e0900e0c1; connect.sid=s%3Aq19pBQo_NYMymjRYA6zzTKfBKR8_gFAq.%2BNv2mLxQv%2BoYwmVL%2FNkENJAgLU2rXfv4tTZHKGsPehs; _ga=GA1.1.916921047.1708873273; yu_id=da9bee147b6da50d349db350fdf48237; Hm_lvt_80b762a374ca9a39e4434713ecc02488=1708873274; _ga_BW57C8STG3=GS1.1.1708873273.1.1.1708873339.0.0.0; Hm_lpvt_80b762a374ca9a39e4434713ecc02488=1708873340; tfstk=eFDefGZTAppEpcIjT52z_EhTWfyLF-LXYYa7q0muAy4hd9_o_DgEdHhIqzur5PFSO9aI7aoj24iQKYlOUmn-dHeWvJnLe8YXlKarvDeJYlfnDKtXW_BwlE9XCNjtcjYjONE8uit4ri1q3BznYU4l8CNA2CmQ7TXVDkPHCD55FT_YxWU0s7WufArUTrmF48b8jTg-eX7laWqTbrtwbOplJDzNURAGw_FK6lzXvHCRwWqTbrtwb_C89REalHKd.";
  constructor() {}
  async requestData(): Promise<BaseItem[]> {
    try {
      const { data }: any = await axios.get(this.dataUrl, {
        headers: {
          "Content-Type": "application/json;charse",
          Cookie: this.cookie,
        },
      });
      if (!data?.length) throw new Error("data empty");
      return (
        data?.map((item: any) => {
          return {
            cannel: "第一财经",
            hash: getHash(item?.NewsTitle || ""),
            timeStr: item?.EntityPublishDate || "",
            title: item?.NewsTitle,
            content: item?.NewsNotes || "",
            jumpUrl: item?.ShareUrl || "",
          };
        }) || []
      );
    } catch (error) {
      console.error("第一财经获取数据失败", error);
      return [];
    }
  }
}
