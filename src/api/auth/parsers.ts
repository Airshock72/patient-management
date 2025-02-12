import { LoginFormValue } from 'src/modules/auth/login/types'
import { AuthenticatedUser, TokenData } from 'api/auth/types.ts'

export const parseAuth = (response: LoginFormValue): TokenData => {
  const randomString = Math.random().toString(36).substring(2, 18) // Random string with a length of 16 characters
  const timestamp = Date.now().toString(36) // Timestamp in base 36

  return {
    data: {
      accessToken: `${randomString}-${timestamp}`,
      refreshToken: `${randomString}-${timestamp}`,
      username: response.username,
      id: Date.now() + '-' + Math.floor(Math.random() * 10000),
      roles: response.roles
    }
  }
}

export const parseAuthUser = (): AuthenticatedUser | null => {
  const userData = localStorage.getItem('userData')
  if (userData === null) return null
  const parsedUserData = JSON.parse(userData)
  return {
    id: parsedUserData.id,
    username: parsedUserData.username,
    roles: parsedUserData.roles
  }
}
