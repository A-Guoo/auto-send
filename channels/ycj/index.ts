import { BaseItem } from "../../types";
import axios from "axios";
import { formatTime, getHash } from "../../utils";

export class YcjCannel {
  dataUrl = "https://www.yuncaijing.com/news/get_realtime_news/yapi/ajax.html";
  cookie =
    "ycj_wafsid=wafsid_25fcc6b280cdc33f1d00fe18c237d818; ycj_uuid=5faf1fd59b37223103357151cf4cd902; ycj_from_url=aHR0cHM6Ly93d3cuYmFpZHUuY29tL2xpbms%2FdXJsPVN3QVhsZF9nTFdmRlpCV1FoVjVoZ2QxT3lBQU1nNVBSRFJRa2J3alRwcmhZcTYzdlpVVU4teVBfNk5EV09WWkcmd2Q9JmVxaWQ9YzAyMTBkNGQwMDM1ZDQ2NzAwMDAwMDA1NjVkYjNlNzg%3D; ycj_locate=aHR0cHM6Ly93d3cuYmFpZHUuY29tL2xpbms%2FdXJsPVN3QVhsZF9nTFdmRlpCV1FoVjVoZ2QxT3lBQU1nNVBSRFJRa2J3alRwcmhZcTYzdlpVVU4teVBfNk5EV09WWkcmd2Q9JmVxaWQ9YzAyMTBkNGQwMDM1ZDQ2NzAwMDAwMDA1NjVkYjNlNzg%3D; YUNSESSID=32k14sirb1t5922elase7i8ok5; Hm_lvt_b68ec780c488edc31b70f5dadf4e94f8=1708867200; Hm_lpvt_b68ec780c488edc31b70f5dadf4e94f8=1708867221";
  constructor() {}
  async requestData(): Promise<BaseItem[]> {
    try {
      const { data }: any = await axios.get(this.dataUrl, {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
          Cookie: this.cookie,
        },
      });
      return (
        data?.data?.slice(0, 10)?.map((item: any) => {
          return {
            cannel: "云财经",
            hash: getHash(item?.title || ""),
            timeStr: formatTime(item?.inputtime) || "",
            title: item?.title || "",
            content: item?.description || "",
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
