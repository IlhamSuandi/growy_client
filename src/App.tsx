import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { Suspense } from "react"
import { useRoutes } from "react-router"
import routes from "~react-pages"
import AuthProvider from "./components/AuthProvider"
import Loading from "@/components/app/Loading"
import CheckUserProvider from "./components/CheckUserProvider"
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs"
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider"

const queryClient = new QueryClient()
function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <CheckUserProvider>
            <Suspense fallback={<Loading />}>
              {useRoutes(routes)}
            </Suspense>
          </CheckUserProvider>
        </LocalizationProvider>
      </AuthProvider>
    </QueryClientProvider>
  )
}

export default App
