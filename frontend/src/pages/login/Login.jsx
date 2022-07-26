import {useState, useContext, Fragment} from 'react'
import { useAuthContext } from '../../hooks/useAuthContext'
import { login, register } from '../../context/authContext/ApiCalls'
import "./login.scss"

export default function Login() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [registerEmail, setRegisterEmail] = useState("")
  const [registerPassword, setRegisterPassword] = useState("")
  const [registerUsername, setRegisterUsername] = useState("")
  const {isFetching, error, dispatch} = useAuthContext()

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
