/**
 * @Description 
 */
interface requestPrams{
  api:string
  method:string
  data:object
}
export default function request(api:string,method:string,data:object){
  const useMethod = method === 'POST'?'POST': 'GET';
  const url = api.startsWith("/user")?"https://42.202.37.75:63701":"https://42.202.37.75:17255"
  console.log(url)
  return new Promise((resolve,rej) => {
    const config = {
      url: url+api, //仅为示例，并非真实接口地址。
      data: data,
      header: {
        'custom-header': 'hello' //自定义请求头信息
      },
      method: useMethod,
      success: (res) => {
        resolve(res.data)
        console.log(res.data);
      },
      fail:(err) =>{
        rej(err)
      }
    }
  if(JSON.stringify({}) === JSON.stringify(data)) {
    delete config.data;
  }
    uni.request(config);
  })

}
