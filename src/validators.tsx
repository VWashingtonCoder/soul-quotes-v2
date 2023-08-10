import { FormValues, FormErrors } from "./types";
import { getUserByEmail, getUserByUsername } from "./backend/db-actions";

function validateAlphaNumeric(value: string) {
  if (!value.match(/^[a-zA-Z0-9]*$/)) return false;
  else return true;
}

function validateEmail(value: string) {
  if (!value.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i)) return false;
  else return true;
}

function validatePassword(value: string) {
  if (!value.match(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,15}$/))
    return false;
  else return true;
}

export function validateFormValues(form: FormValues) {
  const formArray = Object.entries(form);
  const errors: FormErrors = {};

  formArray.forEach(([name, value]) => {
    const key =
      name === "passwordConfirm"
        ? "Confirm Password"
        : name[0].toUpperCase() + name.slice(1);

    if (!value) errors[name] = `${key} is required`;
    else if (name === "username") {
      if (!validateAlphaNumeric(value))
        errors[name] = `${key} can only contain letters and numbers`;
      else if (value.length < 3 || value.length > 15)
        errors[name] = `${key} must be between 3 and 15 characters`;
    } else if (name === "email") {
      if (!validateEmail(value)) errors[name] = `${key} is invalid`;
    } else if (name === "password") {
      if (!validatePassword(value))
        errors[
          name
        ] = `${key} must be between 8 and 15 characters and contain at least one uppercase letter, one lowercase letter, and one number`;
    } else if (name === "passwordConfirm") {
      if (value !== form.password) errors[name] = `${key} does not match`;
    }
  });

  return errors;
}

export async function checkForExistingUser(username: string, email: string) {
  const errors: FormErrors = {};
  const userByUsername = await getUserByUsername(username);
  const userByEmail = await getUserByEmail(email);

  if (userByUsername.length > 0) errors.username = "Username already exists";
  if (userByEmail.length > 0) errors.email = "Email already exists";

  return errors;
}
