export const getTokenExpirationTime = (token?: string): number => {
  if (!token) {
    return 0
  }

  const payload = JSON.parse(atob(token.split(".")[1]))
  return payload.exp * 1000
}

export const getTokenRemainingTime = (accessToken?: string): number => {
  if (!accessToken) {
    return 0
  }

  const expiration = getTokenExpirationTime(accessToken)
  return expiration - new Date().getTime()
}
