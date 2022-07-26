// Login

export const loginStart = () => ({
  type: "LOGIN_START"
})

export const loginSuccess = (user) => ({
  type: "LOGIN_SUCCESS",
  payload: user,
})

export const loginFailure = () => ({
  type: "LOGIN_FAILURE"
})

// Logout

export const logout = () => ({
  type: "LOGOUT"
})

// Register

export const registerStart = () => ({
  type: "REGISTER_START"
})

export const registerSuccess = (user) => ({
  type: "REGISTER_SUCCESS",
  payload: user,
})

export const registerFailure = () => ({
  type: "REGISTER_FAILURE"
})
