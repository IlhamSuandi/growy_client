import { CompanyApi } from "@/types/growyApi"
import { useMutation } from "@tanstack/react-query"
import { commonApiClient } from "@/utils/apiClient"
import { useCompanyState } from "@/states/company"

interface CreateCompanyProps {
  name: string;
  address: string;
}

const createCompany = async ({ name, address }: CreateCompanyProps) => {
  const { configuration, basePath, axiosInstance } = commonApiClient()
  const companyApi = new CompanyApi(configuration, basePath, axiosInstance)
  const response = await companyApi.companyPost({
    name,
    address,
  })
  return response.data.data
}

export const useCreateCompany = () => {
  const { companies, setCompanies } = useCompanyState()

  const query = useMutation({
    mutationKey: ["createCompany"],
    mutationFn: (company: CreateCompanyProps) => createCompany(company),
    onSuccess: (data) => {
      if (data) {
        const newCompanies = [...companies, data]
        setCompanies(newCompanies)
      }
    },
  })


  return query
}
