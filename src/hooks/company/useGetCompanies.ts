import { CompanyApi } from "@/types/growyApi"
import { useMutation } from "@tanstack/react-query"
import { useNavigate } from "react-router"
import { commonApiClient } from "@/utils/apiClient"
import { useTokenState } from "@/states/token"

const getCompanies = async () => {
  const { configuration, basePath, axiosInstance } = commonApiClient()
  const companyApi = new CompanyApi(configuration, basePath, axiosInstance)
  const response = await companyApi.companyGet()
  return response.data
}

export const useGetCompanies = () => {
  const navigate = useNavigate()

  const { setFinishedSetup } = useTokenState()

  const query = useMutation({
    mutationKey: ["company"],
    mutationFn: getCompanies,
    onSuccess: (data) => {
      if (data.data?.company?.length === 0) {
        setFinishedSetup(false)
        return navigate("/account/setup")
      }
      setFinishedSetup(true)
      return navigate("/")
    },
    onError: () => {
      setFinishedSetup(false)
      return navigate("/account/setup")
    },
  })


  return query
}
