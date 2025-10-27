import axios, { AxiosInstance } from 'axios';
import camelcaseKeys from 'camelcase-keys';
import snakecaseKeys from 'snakecase-keys';
import { Configuration } from '../client/configuration';
import {
  AuctionApi,
  AuctionProductApi,
  BidApi,
  MessageApi,
  IdentityApi,
  ContactApi,
  UserApi,
} from '../client/api';

export class ApiService {
  private axiosInstance: AxiosInstance;
  private configuration: Configuration;
  private basePath: string;

  public auctionApi: AuctionApi;
  public auctionProductApi: AuctionProductApi;
  public bidApi: BidApi;
  public messageApi: MessageApi;
  public identityApi: IdentityApi;
  public contactApi: ContactApi;
  public userApi: UserApi;

  constructor() {
    this.basePath =
      import.meta.env.VITE_API_BASE_URL ||
      'https://4e3b-2804-14d-ba4c-83d2-d07a-ec98-675f-be87.ngrok-free.app';

    this.configuration = new Configuration({
      accessToken: () => localStorage.getItem('accessToken') || '',
    });

    this.axiosInstance = axios.create({
      baseURL: this.basePath,
    });

    this.setupInterceptors();

    this.auctionApi = new AuctionApi(
      this.configuration,
      this.basePath,
      this.axiosInstance
    );
    this.auctionProductApi = new AuctionProductApi(
      this.configuration,
      this.basePath,
      this.axiosInstance
    );
    this.bidApi = new BidApi(
      this.configuration,
      this.basePath,
      this.axiosInstance
    );
    this.messageApi = new MessageApi(
      this.configuration,
      this.basePath,
      this.axiosInstance
    );
    this.identityApi = new IdentityApi(
      this.configuration,
      this.basePath,
      this.axiosInstance
    );
    this.contactApi = new ContactApi(
      this.configuration,
      this.basePath,
      this.axiosInstance
    );
    this.userApi = new UserApi(
      this.configuration,
      this.basePath,
      this.axiosInstance
    );
  }

  private setupInterceptors() {
    this.axiosInstance.interceptors.request.use((config) => {
      const token = localStorage.getItem('accessToken');

      config.headers['ngrok-skip-browser-warning'] = 'true';

      if (token && config.headers) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    });

    const refreshClient = axios.create({ baseURL: this.basePath });

    this.axiosInstance.interceptors.response.use(
      (response) => response,
      async (error) => {
        const originalRequest = error.config as any;

        if (originalRequest?.url?.includes('/identity/refresh')) {
          return Promise.reject(error);
        }

        const refreshToken = localStorage.getItem('refreshToken');

        if (
          error.response?.status === 401 &&
          refreshToken &&
          !originalRequest._retry
        ) {
          originalRequest._retry = true;
          try {
            const { data } = await refreshClient.post('/identity/refresh', {
              refreshToken,
            });

            const {
              accessToken: newAccessToken,
              refreshToken: newRefreshToken,
            } = data;

            localStorage.setItem('accessToken', newAccessToken);
            localStorage.setItem('refreshToken', newRefreshToken);

            originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
            return this.axiosInstance(originalRequest);
          } catch (refreshError) {
            localStorage.removeItem('accessToken');
            localStorage.removeItem('refreshToken');
            window.location.href = '/';
            return Promise.reject(refreshError);
          }
        }

        return Promise.reject(error);
      }
    );
  }

  public get axios() {
    return this.axiosInstance;
  }
}

export const apiService = new ApiService();
