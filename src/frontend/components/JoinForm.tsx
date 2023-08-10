import { useState } from "react";
import { FormValues, FormErrors } from "../../types";
import { validateFormValues, checkForExistingUser } from "../../validators";
import { useUsers } from "../../backend/context-hooks";
import FormInputBase from "./FormInputBase";
import FormErrorsBox from "./FormErrorsBox";

const initJoinForm = {
  username: "",
  email: "",
  password: "",
  passwordConfirm: "",
};
const joinInputs = [
  {
    name: "username",
    label: "Username",
    type: "text",
    placeholder: "Enter your username",
  },
  {
    name: "email",
    label: "Email",
    type: "email",
    placeholder: "Enter your email",
  },
  {
    name: "password",
    label: "Password",
    type: "password",
    placeholder: "Enter your password",
  },
  {
    name: "passwordConfirm",
    label: "Confirm Password",
    type: "password",
    placeholder: "Confirm your password",
  },
];

const JoinForm = ({ goHome }: { goHome: () => void }) => {
  const { addNewUser, checkActiveUser } = useUsers();
  const [formValues, setFormValues] = useState(initJoinForm as FormValues);
  const [formErrors, setFormErrors] = useState({} as FormErrors);
  const [showPassword, setShowPassword] = useState(false);

  const updateValues = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const submitForm = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    let errors = validateFormValues(formValues);

    if (Object.keys(errors).length === 0) {
      const { username, email, password } = formValues;
      const userErrors = await checkForExistingUser(username, email);

      if (Object.keys(userErrors).length === 0) {
        const newUserInfo = { username, email, password };
        addNewUser(newUserInfo);
        const existingUser = await checkForExistingUser(username, email);
        if (Object.keys(existingUser).length > 0) {
          setFormValues(initJoinForm);
          setShowPassword(false);
          goHome();
        } else errors = { general: "Something went wrong. Please try again." };
      } else errors = userErrors;
    }

    setFormErrors(errors);
  };

  return (
    <form className="form join">
      <h2 className="form-title">Join Our Community!</h2>

      <div className="form-input-group">
        {joinInputs.map((input) => (
          <FormInputBase
            key={`join-${input.name}`}
            form="join"
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

export default JoinForm;
