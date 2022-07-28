import { Fragment } from "react"
import "./formInput.scss"

export default function FormInput(props) {
  const { label, onChange, id, errorMessage, ...inputs } = props
  return (
    <Fragment>
      <label>{label}</label>
      <input
        { ...inputs }
        onChange={onChange}
        />
        <span>{errorMessage}</span>
    </Fragment>
  )
}
