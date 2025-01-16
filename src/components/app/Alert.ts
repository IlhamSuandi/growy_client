import Swal, { SweetAlertOptions } from "sweetalert2"
import withReactContent from "sweetalert2-react-content"

export function Alert(options: SweetAlertOptions) {
  return withReactContent(Swal).fire(options)
}
