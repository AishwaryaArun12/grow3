import axios from 'axios';

export const URL = 'http://localhost:3000';

const instance = axios.create({
    baseURL: URL,
});

instance.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    const id = localStorage.getItem('id');
    console.log(id,'iddddddddddddd')
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
            } 
        }

        return response;
    },
    async (error) => {
        const originalRequest = error.config;
    console.log(error.response.status , localStorage.getItem('resend')=== 'true' ,'object')
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
                console.log('objecttttttttttt')
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
);

export default instance;
