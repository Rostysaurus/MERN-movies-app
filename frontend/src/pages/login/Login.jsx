import {useState, useContext, Fragment} from 'react'
import { useAuthContext } from '../../hooks/useAuthContext'
import { login, register } from '../../context/authContext/ApiCalls'
import "./login.scss"
import FormInput from '../../components/Form input/FormInput'

export default function Login() {

  // States
  const {isFetching, error, dispatch} = useAuthContext()

  const [loginValues, setLoginValues] = useState({
    email: "",
    password: ""
  })

  const [registerValues, setRegisterValues] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: ""
  })

  // Input objects
  const loginInputs = [
    {
      id: 1,
      name: "email",
      type: "text",
      placeholder: "Email",
      errorMessage: "You need to have a valid email address!",
      label: "Email"
    },
    {
      id: 2,
      name: "password",
      type: "password",
      placeholder: "Password",
      errorMessage: "Password should be 8-20 characters and include at least a number, a letter and a special character",
      label: "Password"
    }
  ]

  // Register Objects
  const registerInputs = [
    {
      id: 1,
      name: "username",
      type: "username",
      placeholder: "Username",
      errorMessage: "Username should be 3-16 characters long and not inclue any special characters",
      label: "Username"
    },
    {
      id: 2,
      name: "email",
      type: "text",
      placeholder: "Email",
      errorMessage: "",
      label: "Email"
    },
    {
      id: 3,
      name: "password",
      type: "password",
      placeholder: "Password",
      errorMessage: "Password should be 8-20 characters and include at least a number, a letter and a special character",
      label: "Password"
    },
    {
      id: 4,
      name: "confirmPassword",
      type: "password",
      placeholder: "Confirm Password",
      errorMessage: "Passwords do not match!",
      label: "Confirm Password"
    }
  ]

  console.log(registerValues)

// Login & Register handlers for API
  const handleLogin = (e) => {
    e.preventDefault()
    login(loginValues, dispatch)
  }

  const handleRegister = (e) => {
    e.preventDefault()
    const { username, email, password } = registerValues
    register({username, email, password}, dispatch)
  }

// OnChange handlers
  const handleLoginChange = (e) => {
    setLoginValues({ ...loginValues, [e.target.name]: e.target.value })
  }

  const handleRegisterChange = (e) => {
    setRegisterValues({ ...registerValues, [e.target.name]: e.target.value })
  }

  return (
    <Fragment>
      {/* LOGIN  */}
      <h2>Login</h2>
      <div className='login'>
        <form className='loginForm'>
          {loginInputs.map((input) => (
            <FormInput
              className='loginInput'
              key={input.id}
              { ...input }
              value={loginValues[input.name]}
              onChange={handleLoginChange}
              />
          ))}
          <button
            className='loginButton'
            onClick={handleLogin}
            disabled={isFetching}
            >
              Login
            </button>
        </form>
      </div>
      {/* REGISTER */}
      <h2>Sign up</h2>
      <div className='login'>
        <form className='loginForm'>
            {registerInputs.map((input) => (
              <FormInput
                className='loginInput'
                key={input.id}
                { ...input }
                value={registerValues[input.name]}
                onChange={handleRegisterChange}
                />
            ))}
          <button
            className='loginButton'
            onClick={handleRegister}
            disabled={isFetching}
            >
              Sign up!
            </button>
        </form>
      </div>
    </Fragment>
  )
}
