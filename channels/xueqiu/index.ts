import { BaseItem } from "../../types";
import axios from "axios";
import { formatTime, getHash } from "../../utils";

function getText(text: string) {
  const regex = /【(.*?)】/;
  const match = text.match(regex);

  if (match && match[1]) {
    return match?.[1] || text.slice(0, 20);
  } else {
    console.log("未匹配到内容");
    return text.slice(0, 20);
  }
}
export class XueqiuCannel {
  dataUrl =
    "https://xueqiu.com/statuses/livenews/list.json?since_id=-1&max_id=-1&count=10";
  cookie =
    "cookiesu=931699370536894; device_id=67f19bd980ba435da40e3df71a71e5d6; s=cj11m9fzrv; __utma=1.1545980755.1701444238.1701444238.1701444238.1; __utmz=1.1701444238.1.1.utmcsr=(direct)|utmccn=(direct)|utmcmd=(none); acw_tc=2760827817088630121065782ece8a12daf7172d275e541a0bfdbb66ceb7dc; Hm_lvt_1db88642e346389874251b5a1eded6e3=1708264272,1708863013; remember=1; xq_a_token=7022ac9a1312f308a8eb5c417bff30beb918e5f6; xqat=7022ac9a1312f308a8eb5c417bff30beb918e5f6; xq_id_token=eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJ1aWQiOjIxNDkwOTM1NDIsImlzcyI6InVjIiwiZXhwIjoxNzExNDU1MTkzLCJjdG0iOjE3MDg4NjMxOTMyMjUsImNpZCI6ImQ5ZDBuNEFadXAifQ.neQH8RZD2FVTftxwb38PjCqfNz9aNZjMb9awauocs6mxtvT3MEKHLGPap4ONi4zcwKptPeQZLdyU_WgchU0YEwn3odignGBHoYRHVxAEkxrDUhTGtrqCpZtzYrAgBYdsYyuWRexBRqH5Iqh9i61NFH6c_HLbGoF1t4AU8q-5LBqMSq6nGNwRmQhZr6G3trUe5QcRdoNf-zk5hWFGNaoS6hiv4ZL3dlOo0CxSL8yHYYuls2lr0CxoazDQ82Ic1ZjCgfC1MOvQlZ7j7O6RKPR29hdEtpM5QI9wknAJL1cmLGfb-ITeQu-C8ZeBtDF7ZH1PN4mqI3Hw2pSNHGxvsgSUaA; xq_r_token=33e32a2748d44fda78663cbc617381ec5596ac77; xq_is_login=1; u=2149093542; is_overseas=0; acw_sc__v2=65db2f1a8b1876675dcd405c7a54b3f67ef9665f; Hm_lpvt_1db88642e346389874251b5a1eded6e3=1708863264";

  constructor() {}
  async requestData(): Promise<BaseItem[]> {
    try {
      const { data }: any = await axios.get(this.dataUrl, {
        headers: {
          "Content-Type": "application/json;charse",
          Cookie: this.cookie,
        },
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
}
