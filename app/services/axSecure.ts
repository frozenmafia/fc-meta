import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from "axios";
import { TOKEN, REFRESH_TOKEN } from "../constants/names";

export  class AxSecure {
    instance;
    constructor(url:string) {
      const baseUrl = url
  
      this.instance = axios.create({
        baseURL: baseUrl,
        // timeout: 5000,
        headers: {
          "Content-Type": "application/json",
        },
      });
  
      this.setupInterceptors();
    }
  

    setupInterceptors() {
      this.instance.interceptors.request.use(
        async (config) => {
          if (typeof window !== 'undefined' && window.localStorage) {
            const token = localStorage.getItem(TOKEN);
            if (token) {
              config.headers.Authorization = `Bearer ${token}`;
            } else {
              await this.refreshToken(config);
            }
          }
          return config;
        },
        (error) => {
          return Promise.reject(error);
        }
      );
  
      this.instance.interceptors.response.use(
        (response) => {
          return response;
        },
        async (error: AxiosError) => {
          console.log("found some error")
          if (error.response && error.response.status === 401) {
              // Refresh token and retry request
              try {
                  const refreshedConfig = await this.refreshToken(error.config);
                  if (refreshedConfig) {
                      return this.instance(refreshedConfig); // Retry the request with the refreshed token
                  }
              } catch (error) {
                  console.error("Error refreshing token and retrying request:", error);
              }
          }
          return Promise.reject(error);
      }
      );
    }
  

    async refreshToken(config?: AxiosRequestConfig): Promise<AxiosRequestConfig | undefined> {
      const refreshToken = localStorage.getItem(REFRESH_TOKEN);

      if (!refreshToken) {
          console.log("Refresh token not found in localStorage. Unable to refresh.");
          return undefined; // Indicate failure or throw an error if critical
      }

      console.log("Refreshing token...");

      try {
          const refreshConf: AxiosRequestConfig = {
              headers: {
                  Authorization: `Bearer ${refreshToken}`,
              },
          };

          const response = await axios.post("http://localhost:8001/refresh_token", {}, refreshConf);

          const { token, refresh_token } = response.data;
          localStorage.setItem(TOKEN, token);
          localStorage.setItem(REFRESH_TOKEN, refresh_token);

          if (config && config.headers) {
              config.headers.Authorization = `Bearer ${token}`;
              return config;
          }

          return undefined; // Return undefined to indicate that the original request should not be retried
      } catch (error) {
          console.error("Error refreshing token:", error);
          return undefined; // Indicate refresh failure (consider retry or notify user)
      }
  }

    
  
    get(url: string, config?: AxiosRequestConfig<any> | undefined) {
      return this.instance.get(url, config);
    }
  
    post(url: string, data: any, config?: { headers: any; }) {
      const contentType =
        data instanceof FormData ? "multipart/form-data" : "application/json";
      const headers = {
        ...(config?.headers || {}),
        "Content-Type": contentType,
      };
      const updatedConfig = { ...config, headers };
      
      return this.instance.post(url, data, updatedConfig);
    }

    put(url:string, data?:any, config?:{headers:any;}){
      const contentType = 
        data instanceof FormData ? "multipart/form-data":"application/json";
        const headers = {
          ...(config?.headers || {}),
          "Content-Type":contentType,

        };
        const updatedConfig = {...config, headers};
        return this.instance.put(url, data, updatedConfig);
    }

    delete(url:string, data?:any, config?:{headers:any;}){
      const contentType = 
        data instanceof FormData ? "multipart/form-data":"application/json";
        const headers = {
          ...(config?.headers || {}),
          "Content-Type":contentType,

        };
        const updatedConfig = {...config, headers};
        return this.instance.delete(url, updatedConfig);
    }
}
  