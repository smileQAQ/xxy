export const request = (options) => {
  const {
    url = "https://www.xiaoyy.net.cn/txcenter",
    data, 
    header = {
      'content-type': 'application/json'
    },
    method = 'GET', 
    dataType = 'json', 
    responseType = 'text', 
  } = options;

  return new Promise((resolve, reject) => {
    if (!url) resolve('请求URL错误');
    wx.request({
      timeout:10000,
      url,
      data,
      header,
      method,
      dataType,
      responseType,
      success(res) {

        if (res.data) resolve(res.data);
        else resolve(res);
      },
      fail(error) {
        console.error(`wx.request Error`);
        console.error(error);
        reject(error);
      }
    })
  });
}