import { BaseItem } from "../../types";
import axios from "axios";
import { getHash } from "../../utils";
import dayjs from "dayjs";

export class DfcfCannel {
  dataUrl = `https://np-weblist.eastmoney.com/comm/web/getFastNewsList?client=web&biz=web_724&fastColumn=102&sortEnd=&pageSize=10&req_trace=1708866548661&_=${dayjs().unix()}`;

  cookie =
    "qgqp_b_id=97d721134b158aff25bf5a121fe770ec; emshistory=%5B%22881142%22%5D; HAList=ty-1-600000-%u6D66%u53D1%u94F6%u884C%2Cty-0-002292-%u5965%u98DE%u5A31%u4E50%2Cty-1-603106-%u6052%u94F6%u79D1%u6280; websitepoptg_api_time=1708866527665; st_si=98184335299117; st_asi=delete; st_pvi=99917680104947; st_sp=2023-11-07%2000%3A27%3A11; st_inirUrl=https%3A%2F%2Fwww.baidu.com%2Flink; st_sn=2; st_psi=20240225210900218-113103303721-8202620539";
  constructor() {}
  async requestData(): Promise<BaseItem[]> {
    try {
      const { data }: any = await axios.get(this.dataUrl, {
        headers: {
          "Content-Type": "application/json;charse",
          Cookie: this.cookie,
        },
      });
      return (
        data?.data?.fastNewsList?.map((item: any) => {
          return {
            cannel: "东方财富",
            hash: getHash(item?.title || ""),
            timeStr: item?.showTime || "",
            title: item?.title || "",
            content:
              item?.summary?.replace(`【${item?.title || ""}】`, "") || "",
            jumpUrl: "",
          };
        }) || []
      );
    } catch (error) {
      console.error("同花顺获取数据失败", error);
      return [];
    }
  }
}
