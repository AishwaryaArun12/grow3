import axios from 'axios';

export const URL = 'https://grow3server.onrender.com';
const mainUrl = 'https://grow3.vercel.app'

const instance = axios.create({
    baseURL: URL,
});

instance.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    const id = localStorage.getItem('id'); 
    localStorage.setItem('resend',true)

    if (token) {
        config.headers['authorization'] = 'Bearer ' + token;
    }
    if (id) {
        config.headers['id'] = id;
        console.log(config.headers['id'],'config')
    }

    return config;
});

instance.interceptors.response.use(
    (response) => {
        let id;
        if (response.data.id) {
            id = response.data.id || localStorage.getItem('id');
            localStorage.setItem('id', id);
        }

        if (response.data.token) {
            const token = response.data.token || localStorage.getItem('token');
            const refreshToken = response.data.refreshToken || localStorage.getItem('refreshToken');
            localStorage.setItem('token', token);
            localStorage.setItem('refreshToken', refreshToken);

            if (id === 'loginAdmin') {
                localStorage.setItem('loginAdmin', true);
            }else{
                localStorage.setItem('loginUser', true);
            }
        }

        return response;
    },
    async (error) => {
        const originalRequest = error.config;
        
        if((!localStorage.getItem('loginUser') && !localStorage.getItem('loginAdmin')) || error.response.data.message == 'Admin blocked' ){
            
            if(window.location.href == `${mainUrl}/login` || window.location.href == `${mainUrl}/signup` || window.location.href == `${mainUrl}/otp` || window.location.href == `${mainUrl}/changepassword` || window.location.href == `${mainUrl}/forgotpassword` ||  window.location.href.startsWith(`${mainUrl}/selectuser/?id=`) ){
                return error
            }
            localStorage.removeItem('loginUser');
            localStorage.removeItem('token');
            localStorage.removeItem('refreshToken')
            // window.location.href = '/login';
             
            return error;
        }else{
            if (error.response.status === 401 && localStorage.getItem('resend') == 'true') {
                originalRequest._retry = true;
                try {
                    const refreshToken = localStorage.getItem('refreshToken');
    
                    const response = await instance.post('/newAccessToken', { refreshToken });
                    localStorage.setItem('resend',false);
                    localStorage.setItem('token', response.data.accessToken);
                    localStorage.setItem('refreshToken', response.data.refreshToken);
                    localStorage.setItem('id', response.data.id);
                    originalRequest['authorization'] = 'Bearer ' + localStorage.getItem('token');
                    originalRequest.headers['id'] = localStorage.getItem('id');
    
                    return instance(originalRequest); // Retry the original request
    
    
    
                } catch (error) {
                    
                    if(error.response.data.message == 'No token'){
                        localStorage.removeItem('loginAdmin');
            localStorage.removeItem('token');
            localStorage.removeItem('refreshToken')
                        window.location.href = '/login';
                        return
                    }
                   
                    // Handle refresh token errors (e.g., invalid refresh token, refresh request failure)
                    if (error.response.status === 401) {
                        
                        window.location.href = '/login';
                        return
                    }
                    return ;
                }
            } else {
                
                return Promise.reject(error);
            }
        }
    }
);

export default instance;
