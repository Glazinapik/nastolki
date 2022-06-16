import { SIGN_IN_ERROR } from "../types";

export const showError = (error) => ({
  type: SIGN_IN_ERROR,
  payload: error,
})
