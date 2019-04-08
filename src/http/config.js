//axios的默认配置
import { JSEncrypt } from 'jsencrypt'
import axios from 'axios'
import { Message } from 'element-ui'; 

function getRandom() {//随机数方法
    let num = ""
    for (let i = 0; i < 7; i++) {
        num += Math.floor(Math.random() * 10);
    }
    return num;
}
const stamp = (new Date()).getTime();
const random = getRandom();
const publicKey = 'MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQCyNlyO8uIfhwFTY3q8/Dp2/L0OiZjJL9cuox6q0520rZFMuC9O8GJw5bWpzVBafxbFmklf0AUORY/FHTw9ce8zQDf5JR7bgmfRCRedNdloKB4sEbMwvoyK3t8uAQzLD73OQBlztekRfj+3n2Sl+mKzwXOybsBLAgOz8YVp/27q/QIDAQAB'
const encryptor = new JSEncrypt()  // 新建JSEncrypt对象
encryptor.setPublicKey(publicKey)  // 设置公钥 encryptor.encrypt(XXXXXXXXX)
//创建axios实例
var service = axios.create({
    baseURL: 'http://47.99.100.88:81/api',  //公共api
    timeout: 50000,
    headers: {
        'content-type': 'application/json',
        'stamp': stamp,
        'random': random,
        "token": encryptor.encrypt(stamp + random),
        //'auth': localStorage.getItem("dataToken")?localStorage.getItem("dataToken"):'' // 登录接口的返回值
    }
})
export default {
    post(url, param) {
        return new Promise((cback, reject) => {
            service({
                method: 'post',
                url: url,
                data: param,
            }).then(res => {
                var res_code = res.status.toString();
                if (res_code.charAt(0) == 2) {
                    cback(res);
                } else {
                    console.log(res, '异常1')
                }
            }).catch(err => {
                if (!err.response) {
                    console.log('请求错误')
                } else {
                    reject(err.response);
                    console.log(err.response, '异常2')
                }
            })

        })
    },
	
	
	get(url, param) {
	    return new Promise((cback, reject) => {
	        service({
	            method: 'get',
	            url: url,
	            params: param,
	        }).then(res => {
	            //axios返回的是一个promise对象 
	            var res_code = res.status.toString();
	            if (res_code.charAt(0) == 2) {
	                cback(res);   //cback在promise执行器内部
	            } else {
	                console.log(res, '异常1')
	            }
	        }).catch(err => {
	            if (!err.response) {
	                console.log('请求错误')
	                //Message是element库的组件，可以去掉
	                Message({
	                    showClose: true,
	                    message: '请求错误',
	                    type: 'error'
	                });
	            } else {
	                reject(err.response);
	                console.log(err.response, '异常2')
	            }
	        })
	
	    })
	},
	
	
} 