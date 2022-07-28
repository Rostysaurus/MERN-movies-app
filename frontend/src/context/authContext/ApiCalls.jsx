import axios from "axios"
import { loginStart, loginFailure, loginSuccess, registerStart, registerFailure, registerSuccess } from "./AuthActions"

// Login

export const login = async (user, dispatch) => {
  dispatch(loginStart())

  try {
    const res = await axios.post("api/auth/login", user)
    dispatch(loginSuccess(res.data))
  } catch (error) {
    dispatch(loginFailure())
  }
}

// Register

export const register = async (user, dispatch) => {
  dispatch(registerStart())

  try {
    const res = await axios.post("api/auth/register", {
      username: user.username,
      email: user.email,
      password: user.password
    })
    dispatch(registerSuccess(res.data))
  } catch (error) {
    dispatch(registerFailure)
  }
}
