import axios from 'axios';
import { AsyncStorage } from 'react-native';
import qs from 'qs';
import { storage } from "../store/deviceStorage";
import { CHANNEL, APP_ID } from "./urlconfig";

const instance = axios.create({
  timeout: 30000,
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json;charset=UTF-8',
  },
});

// 添加请求拦截器
instance.interceptors.request.use(
  async (config) => {
    let data = {};
    storage.load('loginInfo', (dataInfo) => {
      if (dataInfo) {
        data.mid = dataInfo.uid;
        data.timestamp = new Date().getTime();  //时间戳
        data.version = '1.0.0';                 //app版本号(1.0.0)
        data.channelCode = CHANNEL;             //渠道号
        data.appId = APP_ID;                    //应用ID
        data.uid = dataInfo.uid;                //用户id
      }
    });
    return Object.assign(config, data);
  },
  // 对请求错误做些什么
  error => Promise.reject(error),
);

// 添加响应拦截器
instance.interceptors.response.use(
  // 对响应数据做点什么
  (response) => {
    return response.data;
  },
  // 对响应错误做点什么
  (error) => {
    return error;
  },
);

export default instance;
