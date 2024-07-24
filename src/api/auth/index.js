import axios from "axios";
import { loginErrors } from "../../validation/signupValidations";

const loginFirebase = async (payload) => {
  const payloadData = {
    email: payload.email,
    password: payload.password,
    returnSecureToken: true,
  };

  try {
    const response = await axios.post(
      'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDNzvthLu-nQWlFVv1AdV6t315YJ1C7Jfs',
      payloadData
    );

    console.log(response)

    return response.data;
  } catch (error) {
    console.error('Login error:', error);
    const errorMessage = loginErrors(error.response?.data?.error?.message || 'UNKNOWN_ERROR');
    throw new Error(errorMessage);
  }
};

export { loginFirebase };