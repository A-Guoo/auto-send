import { BaseItem } from "../../types";
import axios from "axios";
import { formatTime, getHash } from "../../utils";

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
  cookie =
    "cookiesu=931699370536894; device_id=67f19bd980ba435da40e3df71a71e5d6; s=cj11m9fzrv; __utma=1.1545980755.1701444238.1701444238.1701444238.1; __utmz=1.1701444238.1.1.utmcsr=(direct)|utmccn=(direct)|utmcmd=(none); _ga_M96YC1H9CR=GS1.1.1710857985.1.0.1710857985.0.0.0; _ga=GA1.2.1747031271.1710857985; smidV2=2024052209310151e07b5071e82e6f93456db4e4ffdd0200afa9bbbfeaac890; acw_tc=2760827c17164761132305319e3af92654f7824f91d3314c39b50e6f18983e; Hm_lvt_1db88642e346389874251b5a1eded6e3=1716341461,1716476114; remember=1; xq_a_token=2b26239b46bcd3881517f5f411c4cae2e229ee39; xqat=2b26239b46bcd3881517f5f411c4cae2e229ee39; xq_id_token=eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJ1aWQiOjIxNDkwOTM1NDIsImlzcyI6InVjIiwiZXhwIjoxNzE5MDY4MTQzLCJjdG0iOjE3MTY0NzYxNDMwNDQsImNpZCI6ImQ5ZDBuNEFadXAifQ.LuaAoAxNvdzHwVLIm62eESF2dEbTGFF3p2tcF2u2ZU4wfTxmojyEff5-hO7qbJOi6HSqFHRgTZ5YI7diqAqAzdwr5lkerbBtWf2N_scAJbVQqe8p6IB-6v3FcbTkI9hvSA_foqs93FmzsLSPnLO6atDqi54IQtWOR2fF1m3UXH4PepoqlNlL6gl4YqVE6rIK06gEILw1-txpsDNJliqXNElHvjIoI1vWVCVgycS6yuK3Oin-oTegUCC0xf11JC_kOFlfSm7OU_5CM_V3WPVc8yaOIv_vQXqkiRpJxBxzRF7_EceOBkspj_WIFTEg5wntwp86WJ7YgaQ8MsmSx-MGrw; xq_r_token=a1fd7470ffa956b393db17b03cfa49a5627d3bb1; xq_is_login=1; u=2149093542; is_overseas=0; Hm_lpvt_1db88642e346389874251b5a1eded6e3=1716476145; .thumbcache_f24b8bbe5a5934237bbc0eda20c1b6e7=lDlPnJ5UfxGwlxTwIeJbXNW7IIPcReKweHKEQGUIWkfoDEB9WgF9wqlM5TjPQ7BD4s6Pu1w3FLJKwMIRxwvVzg%3D%3D"

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
