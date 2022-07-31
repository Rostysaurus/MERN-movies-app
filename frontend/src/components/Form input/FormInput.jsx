import { Fragment, useState } from "react"
import "./formInput.scss"

export default function FormInput(props) {
  const { label, onChange, id, errorMessage, ...inputs } = props
  const [focused, setFocused] = useState(false )

  const handleFocus = () => {
    setFocused(true)
  }

  console.log(focused)
  return (
    <Fragment>
      <label>{label}</label>
      <input
        className="loginInput"
        { ...inputs }
        onChange={onChange}
        onFocus={()=> inputs.name === "confirmPassword" && setFocused(true)}
        onBlur={handleFocus}
        focused={focused.toString()}
        />
        <span>{errorMessage}</span>
    </Fragment>
  )
}
