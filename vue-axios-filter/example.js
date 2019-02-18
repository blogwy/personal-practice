

// 在需要用到的页面导入，下面只是一个简单的demo，请根据具体的业务进行修改


import axios from 'axios'

let request = axios.create();
request.interceptors.request.use(config => {
	// 请求拦截
  if (config.method === 'post'){
    console.log('post请求拦截器返回值');
    console.log(config.data);
    config.data = {
      "token": "111111",
        ...config.data
    }
  }
  if (config.method === 'get'){
    console.log('get请求拦截器返回值');
    console.log(config.params);
    config.params = {
      "token": "111111",
      ...config.params
    }
  }
  // 必须要有一个return config
  return config
},error => {
  return Promise.reject(error);
});
request.interceptors.response.use(config => {
  console.log('响应拦截器返回值');
  // 这里可以进行响应拦截
  
  
  // 必须要有一个return config
  return config;
},error => {
  return Promise.reject(error);
});
export default request;