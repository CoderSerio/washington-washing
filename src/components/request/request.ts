/**
 * @Description
 */
interface requestPrams {
  api: string;
  method: string;
  data: object;
}
export function request(api: string, method: string, data: object) {
  const useMethod = method === "POST" ? "POST" : "GET";
  const url = api.startsWith("/user")
    ? "http://localhost:8082"
    : "http://localhost:8081";

  return new Promise((resolve, rej) => {
    const config = {
      url: url + api, //仅为示例，并非真实接口地址。
      data: data,
      header: {
        "custom-header": "hello", //自定义请求头信息
      },
      method: useMethod,
      success: (res: any) => {
        resolve(res.data);
        // console.log(res.data);
      },
      fail: (err: any) => {
        rej(err);
      },
    };
    if (JSON.stringify({}) === JSON.stringify(data)) {
      delete config.data;
    }
    uni.request(config);
  });
}
export function getUsers() {
  return new Promise((resolve, rej) => {
    uni.request({
      url: "https://42.202.37.75:63701/user/getUser", //仅为示例，并非真实接口地址。
      header: {
        "custom-header": "hello", //自定义请求头信息
      },
      method: "GET",
      success: (res) => {
        resolve(res.data);
      },
      fail: (err) => {
        rej(err);
      },
    });
  });
}
