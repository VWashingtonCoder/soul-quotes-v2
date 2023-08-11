import { useState } from "react";
import { FormValues, FormErrors } from "../../types";
import { useUsers } from "../../backend/context-hooks";
import { validateFormValues } from "../../validators";
import FormInputBase from "./FormInputBase";
import FormErrorsBox from "./FormErrorsBox";

const initLoginForm = {
  username: "",
  password: "",
};

const loginInputs = [
  {
    name: "username",
    label: "Username",
    type: "text",
    placeholder: "Enter your username",
  },
  {
    name: "password",
    label: "Password",
    type: "password",
    placeholder: "Enter your password",
  },
];

const testErrors = {
  username: "Username is required",
  password: "Password is required",
};

const LoginForm = ({ goHome }: { goHome: () => void }) => {
  const { loginUserFromDB } = useUsers();
  const [formValues, setFormValues] = useState(initLoginForm as FormValues);
  const [formErrors, setFormErrors] = useState({} as FormErrors);
  const [showPassword, setShowPassword] = useState(false);

  const updateValues = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const submitForm = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const formErrors = validateFormValues(formValues);

    if (Object.keys(formErrors).length === 0) {
      const { username, password } = formValues;
      loginUserFromDB(username, password).then((validLogin) => {
        if (validLogin) goHome();
        else setFormErrors({ login: "Invalid username or password" });
      });
    } else setFormErrors(formErrors);
  };

  return (
    <form className="form login">
      <h2 className="form-title">Login To Your Account</h2>

      <div className="form-input-group">
        {loginInputs.map((input) => (
          <FormInputBase
            key={`login-${input.name}`}
            form="login"
            input={input}
            value={formValues[input.name]}
            showPassword={showPassword}
            updateValues={updateValues}
            togglePassword={setShowPassword}
          />
        ))}
      </div>

      <FormErrorsBox errors={formErrors} />

      <button
        className="clear-btn submit-btn"
        onClick={(e) => submitForm(e)}
        // disabled={formValuesArr.includes("")}
      >
        Submit
      </button>
    </form>
  );
};

export default LoginForm;
