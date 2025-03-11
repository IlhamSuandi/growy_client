import { EmployeeApi } from "@/types/growyApi"
import { commonApiClient } from "@/utils/apiClient"
import { useMutation } from "@tanstack/react-query"

interface Employee {
  email: string
  position: string
  branch_name: string
  company_name: string
}

const addEmployee = async (employee: Employee) => {
  const { configuration, basePath, axiosInstance } = commonApiClient()
  const employeeApi = new EmployeeApi(configuration, basePath, axiosInstance)
  const response = await employeeApi.employeePost(employee)
  return response.data.data
}

export const useAddEmployee = () => {
  const mutation = useMutation({
    mutationKey: ["employee"],
    mutationFn: (employee: Employee) => addEmployee(employee),
    onSuccess: (data) => {
      console.log(data)
    },
    onError: async (error: any) => {
      const errorData = await error.response.json()
      console.error("Error getting user data:", errorData.message)
    },
  })

  return mutation
}
