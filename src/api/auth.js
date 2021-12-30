// import defaultUser from '../utils/default-user';

import  Axios  from "axios";
import Constants from "../core/serverurl";
export async function signIn(email, password) {
  // try {
    // Send request
    const response = await Axios.post(`${Constants.serverlink}login`, {
      username : email,
      password
})
         if (response.data.user) {
          return {
            isOk: true,
            data: email,password,
            token : response.data.token
        } 
        } else {
          return {
          isOk: false,
          message: "Authentication failed"
          }
        }
}

export async function getUser() {
  try {
    return {
      // isOk: true,
      data: ''
    };
  }
  catch {
    return {
      isOk: false
    };
  }
}

export async function createAccount(email, password) {
  try {
    // Send request

    return {
      isOk: true
    };
  }
  catch {
    return {
      isOk: false,
      message: "Failed to create account"
    };
  }
}

export async function changePassword(email, recoveryCode) {
  try {
    // Send request

    return {
      isOk: true
    };
  }
  catch {
    return {
      isOk: false,
      message: "Failed to change password"
    }
  }
}

export async function resetPassword(email) {
  try {
    // Send request

    return {
      isOk: true
    };
  }
  catch {
    return {
      isOk: false,
      message: "Failed to reset password"
    };
  }
}
