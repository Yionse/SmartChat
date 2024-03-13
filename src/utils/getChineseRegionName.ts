export function getChineseRegionName(regionName: string): string {
  const regionNameMap: any = {
    Anhui: '安徽',
    Beijing: '北京',
    Chongqing: '重庆',
    Fujian: '福建',
    Gansu: '甘肃',
    Guangdong: '广东',
    Guangxi: '广西',
    Guizhou: '贵州',
    Hainan: '海南',
    Hebei: '河北',
    Heilongjiang: '黑龙江',
    Henan: '河南',
    Hubei: '湖北',
    Hunan: '湖南',
    InnerMongolia: '内蒙古',
    Jiangsu: '江苏',
    Jiangxi: '江西',
    Jilin: '吉林',
    Liaoning: '辽宁',
    Ningxia: '宁夏',
    Qinghai: '青海',
    Shaanxi: '陕西',
    Shandong: '山东',
    Shanghai: '上海',
    Shanxi: '山西',
    Sichuan: '四川',
    Tianjin: '天津',
    Tibet: '西藏',
    Xinjiang: '新疆',
    Yunnan: '云南',
    Zhejiang: '浙江',
  };
  return regionNameMap[regionName] || '未知';
}
