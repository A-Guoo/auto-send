import { BaseItem } from "../../types";
import axios from "axios";
import { formatTime, getHash } from "../../utils";

// https://news.futunn.com/main/live?lang=zh-cn
export class FtnnCannel {
  dataUrl = `https://news.futunn.com/news-site-api/main/get-flash-list?pageSize=10`;

  cookie =
    "news-locale=zh-cn; locale=zh-cn; cipher_device_id=1708873750464602; futu-offline-csrf-v2=%2BVqUlsQwr0M7nY8NmHHPnw%3D%3D; ftreport-jssdk%40new_user=1; device_id=1708873750464602; _ga=GA1.3.417996315.1708873752; _gid=GA1.3.744948496.1708873752; _gat_UA-71722593-3=1; _gid=GA1.2.135019001.1708873755; _gat_gtag_UA_71722593_3=1; _gcl_au=1.1.483626719.1708873755; _gat_UA-71722593-2=1; _clck=bktdj1%7C2%7Cfjk%7C0%7C1516; _fbp=fb.1.1708873755768.1220085527; passport_dp_data=9org4dMMkAuGYrWBrKc6cbyaBS8pXXctXjSQHktETkiqzyOWZ%2F61ZkppjS43Dmnziyl6Uyp8ZxV%2Btnr1DmwSeIA4Y6ApmFb5OQt%2BD5bz2Zs%3D; _ga_FZ1PVH4G8R=GS1.1.1708873754.1.1.1708873769.0.0.0; _ga_370Q8HQYD7=GS1.1.1708873754.1.1.1708873769.45.0.0; _ga=GA1.1.417996315.1708873752; _ga_K1RSSMGBHL=GS1.1.1708873755.1.1.1708873770.0.0.0; _ga_NTZDYESDX1=GS1.2.1708873755.1.1.1708873770.45.0.0; _uetsid=d764f1b0d3ef11eea7d2ebafbaf48ed4; _uetvid=d764e5c0d3ef11ee8661a3d1f088e7e6; _clsk=bv3dw9%7C1708873772540%7C2%7C1%7Cq.clarity.ms%2Fcollect; ftreport-jssdk%40session={%22distinctId%22:%22ftv1PaegWEll0pn06DEKiiLOaDPrlZHOhIwt+oOqpJdLcy7NQpYQknteRPz+53g8rNRJ%22%2C%22firstId%22:%22ftv1PaegWEll0pn06DEKiiLOaCtvHauk6qzWzYjlhib0RgvNQpYQknteRPz+53g8rNRJ%22%2C%22latestReferrer%22:%22https://news.futunn.com/%22}; _ga_EJJJZFNPTW=GS1.1.1708873751.1.1.1708873807.0.0.0; _ga_XECT8CPR37=GS1.1.1708873751.1.1.1708873807.0.0.0; _ga_370Q8HQYD7=GS1.3.1708873754.1.1.1708873807.7.0.0";
  constructor() {}
  async requestData(): Promise<BaseItem[]> {
    try {
      const { data }: any = await axios.get(this.dataUrl, {
        headers: {
          "Content-Type": "application/json;charse",
          Cookie: this.cookie,
        },
      });
      const res = data?.data?.data?.news || [];
      if (!res?.length) throw new Error("data empty");
      return (
        res?.map((item: any) => {
          return {
            cannel: "富途牛牛",
            hash: getHash(item?.title || ""),
            timeStr: formatTime(item?.time) || "",
            title: item?.title || "",
            content: item?.content || "",
            jumpUrl: item?.detailUrl || "",
          };
        }) || []
      );
    } catch (error) {
      console.error("富途牛牛获取数据失败", error);
      return [];
    }
  }
}
