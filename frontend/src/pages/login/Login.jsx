import {useState, useContext, Fragment} from 'react'
import { useAuthContext } from '../../hooks/useAuthContext'
import { login, register } from '../../context/authContext/ApiCalls'
import "./login.scss"
import FormInput from '../../components/Form input/FormInput'

export default function Login() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [registerEmail, setRegisterEmail] = useState("")
  const [registerPassword, setRegisterPassword] = useState("")
  const [registerUsername, setRegisterUsername] = useState("")
  const {isFetching, error, dispatch} = useAuthContext()

  const [loginValues, setLoginValues] = useState({
    email: "",
    password: ""
  })

  const [registerValues, setRegisterValues] = useState({
    username: "",
    email: "",
    password: ""
  })

  const loginInputs = [
    {
      id: 1,
      name: "email",
      type: "text",
      placeholder: "Email",
      label: "Email"
    },
    {
      id: 2,
      name: "password",
      type: "password",
      placeholder: "Password",
      label: "Password"
    }
  ]

  const registerInputs = [
    {
      id: 1,
      name: "email",
      type: "text",
      placeholder: "Email",
      label: "Email"
    },
    {
      id: 2,
      name: "password",
      type: "password",
      placeholder: "Password",
      label: "Password"
    },
    {
      id: 3,
      name: "confirmPassword",
      type: "password",
      placeholder: "Confirm Password",
      label: "Confirm Password"
    },
    {
      id: 4,
      name: "username",
      type: "username",
      placeholder: "Username",
      label: "Username"
    }
  ]

  console.log(registerEmail, registerPassword, registerUsername)


  const handleLogin = (e) => {
    e.preventDefault()
    login({email, password}, dispatch)
  }

  const handleRegister = (e) => {
    e.preventDefault()
    register({registerUsername, registerEmail, registerPassword}, dispatch)
  }

  return (
    <Fragment>
      <h2>Login...</h2>
      <div className='login'>
        <form className='loginForm'>
          <input
            type="text"
            placeholder='email'
            className='loginInput'
            onChange={(e) => setEmail(e.target.value)}/>
          <input
            type="password"
            placeholder='password'
            className='loginInput'
            onChange={(e) => setPassword(e.target.value)}/>
          <button
            className='loginButton'
            onClick={handleLogin}
            disabled={isFetching}
            >
              Login
            </button>
        </form>
      </div>
      <h2>... or Sign up!</h2>
      <div className='login'>
        <form className='loginForm'>
          <input
            type="text"
            placeholder='username'
            className='loginInput'
            onChange={(e) => setRegisterUsername(e.target.value)}/>
          <input
            type="text"
            placeholder='email'
            className='loginInput'
            onChange={(e) => setRegisterEmail(e.target.value)}/>
          <input
            type="password"
            placeholder='password'
            className='loginInput'
            onChange={(e) => setRegisterPassword(e.target.value)}/>
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
