const signupErrors = (error: string) =>  {
    switch (error) {
    case 'EMAIL_EXISTS':
        return 'Email Already exist.'

    case 'OPERATION_NOT_ALLOWED':
        return 'Password sign-in is disabled for this project.'

    case 'TOO_MANY_ATTEMPTS_TRY_LATER':
        return 'We have blocked all requests from this device due to unusual activity. Try again later.'
    }
}
  
const loginErrors = (error: string) =>  {
    switch (error) {
    case 'EMAIL_NOT_FOUND':
        return 'Email not found.'

    case 'INVALID_PASSWORD':
        return 'The password is invalid.'

    case 'USER_DISABLED':
        return 'The user account has been disabled by an administrator.'

    case 'INVALID_LOGIN_CREDENTIALS':
        return 'one or both credentials are wrong'
    }
}

export {signupErrors, loginErrors}
  