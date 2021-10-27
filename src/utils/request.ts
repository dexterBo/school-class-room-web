import axios from 'axios';
import {filterXSS } from './xss';

const service = axios.create({
    timeout: 30000
});

service.interceptors.request.use(
    config => {
        if (config.method == 'post') {
            config.headers['Content-Type'] = 'application/json';
        }
        return config;
    },
    error => {
        return Promise.reject(error);
    }
);
const showError = (url = '', info ='', title = '网络开小差了') => {
    let urlName = getLastUrlSub(url);
    Vue.prototype.$Notice.error({
        title: title,
        desc: `${urlName} ${info}`
    });
}

service.interceptors.response.use(
    response => {
        const res = response.data;
        res.env = response.headers.env;
        if (res.code === 0 ) {
            res.ErrorCode = 'OK';
        }
        if (res.code !== undefined && res.code.length === 6 || res.code == 12050) {
            res.ErrorCode = 'OK';
        }
        if (res.ErrorCode !== 'OK') {
            let RequestId = response.headers.requestid || '';
            res.env = response.headers.env;
            res.error = true;
            return res;
        } else {
            return res;
        }
    },
    error => {
        showError(error.config.url);
        // Vue.prototype.$Message.error({
        //     content: error.message
        // });
        return Promise.reject(error).catch(err => {
            window.aegis.report(err.config);
        });
    }
);

export default service;
