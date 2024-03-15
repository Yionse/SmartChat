import Config from 'react-native-config';
import CryptoJs from 'crypto-js';

function truncate(q: string): string {
  var len = q.length;
  if (len <= 20) return q;
  return q.substring(0, 10) + len + q.substring(len - 10, len);
}

export async function transform({
  query,
  isTranslateEnglish = true,
  isNotLocation = true,
}: {
  query: string;
  isTranslateEnglish?: boolean;
  isNotLocation?: boolean;
}): Promise<string> {
  const salt = new Date().getTime();
  const curTime = Math.round(new Date().getTime() / 1000);
  const from = isTranslateEnglish ? 'zh-CHS' : 'en';
  const to = isTranslateEnglish ? 'en' : 'zh-CHS';
  const str1 =
    Config.TRANSFORM_APPID +
    truncate(query) +
    salt +
    curTime +
    Config.TRANSFORM_APPSECRET;
  const sign = CryptoJs.SHA256(str1).toString(CryptoJs.enc.Hex);

  const url = 'https://openapi.youdao.com/api';
  const params = {
    q: query,
    appKey: Config.TRANSFORM_APPID,
    salt: salt,
    from: from,
    to: to,
    sign: sign,
    signType: 'v3',
    curtime: curTime,
  } as any;

  const jsonpUrl = `${url}?${new URLSearchParams(params).toString()}`;

  return await fetch(jsonpUrl)
    .then(response => response.text())
    .then(responseText => {
      const data = JSON.parse(responseText);
      return isNotLocation
        ? data?.translation[0]
        : data?.translation[0]?.replace('。', '');
    });
}
