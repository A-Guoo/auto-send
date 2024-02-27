import { DfcfCannel } from "./channels/dfcf";
import { DycjCannel } from "./channels/dycj";
import { FtnnCannel } from "./channels/ftnn";
import { ThsCannel } from "./channels/ths";
import { XueqiuCannel } from "./channels/xueqiu";
import { YcjCannel } from "./channels/ycj";
import { BaseItem } from "./types";
import { getText, isTraderTime, isZero, sendMsgToFeishu, sleep } from "./utils";

let hashList: string[] = [];
let isFirst = true;
const XueQiu = new XueqiuCannel();
const THS = new ThsCannel();
const DFCF = new DfcfCannel();
const YCJ = new YcjCannel();
const DYCJ = new DycjCannel();
const FTNN = new FtnnCannel();

async function handleData(data: BaseItem[]) {
  for (let i = 0; i < data.length; i++) {
    if (hashList.includes(data[i].hash)) {
      continue;
    } else {
      hashList.push(data[i].hash);
      if (!isFirst) await sendMsgToFeishu(data[i]);
      console.log(getText(data[i]));
    }
  }
}
function resetHashList() {
  hashList = [];
  isFirst = true;
}
async function main() {
  console.log("Start");
  while (1) {
    if (isZero()) {
      resetHashList();
      continue;
    }
    const xueqiuRes = await XueQiu.requestData();
    handleData(xueqiuRes);
    const thsRes = await THS.requestData();
    handleData(thsRes);
    const dfcfRes = await DFCF.requestData();
    handleData(dfcfRes);
    // const ycjRes = await YCJ.requestData();
    // handleData(ycjRes);
    const dycjRes = await DYCJ.requestData();
    handleData(dycjRes);
    const ftnnRes = await FTNN.requestData();
    handleData(ftnnRes);
    console.log("hadRequest\n");
    isFirst = false;
    if (isTraderTime()) {
      await sleep(2000);
    } else {
      await sleep(10000);
    }
  }
  console.log("End");
}

main();
