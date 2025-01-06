import axios from "axios"
import { useTokenState } from "@/states/token"
import { AuthApi, Configuration } from "@/types/growyApi"

const apiClient = axios.create({
  withCredentials: true,
})

// Axios request interceptor
apiClient.interceptors.request.use(
  (config) => {
    const { token } = useTokenState.getState() // Access token from your state
    if (token) {
      config.headers.Authorization = `Bearer ${token.access_token}`
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

// Axios response interceptor
apiClient.interceptors.response.use(
  (response) => response, // Pass through successful responses
  async (error) => {
    const originalRequest = error.config
    const { setToken, setAuthenticated } = useTokenState.getState()
    // const navigate = useNavigate()

    if (error.response.status === 401) {
      originalRequest._retry = true

      const renewToken = async () => {
        const { configuration, basePath, axiosInstance } = commonApiClient()
        const authApi = new AuthApi(configuration, basePath, axiosInstance)
        const response = await authApi.authTokenRenewGet()
        return response.data
      }

      try {
        const response = await renewToken()
        if (response.status === 200 && response.data) {
          setToken(response.data)
          setAuthenticated(true)
          originalRequest.headers.Authorization = `Bearer ${response.data.access_token}`
          return apiClient(originalRequest)
        }
      } catch (renewError) {
        setToken(undefined)
        setAuthenticated(false)
        window.location.href = "/auth/login"
        return Promise.reject(renewError)
      }
    }
    return Promise.reject(error)
  }
)

export function commonApiClient() {
  const defaultConfig = new Configuration()

  return {
    configuration: defaultConfig,
    basePath: import.meta.env.VITE_API_URL || "http://localhost:5000/api/v1",
    axiosInstance: apiClient
  }
}
