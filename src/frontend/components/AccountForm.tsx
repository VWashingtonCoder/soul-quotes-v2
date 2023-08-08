import { FormInputs, FormErrors, FormValues } from "../../types";

type AccountProps = {
  view: string;
  errors: FormErrors;
  formValues: FormValues;
  updateValues: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

const formInputs: FormInputs = {
  join: [
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
  ],
  login: [
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
  ],
};

const AccountForm = ({
  view,
  errors,
  formValues,
  updateValues,
}: AccountProps) => {
  const formTitle =
    view === "join" ? "Join the site!" : "Login to your account!";

  return (
    <form>
      <h2 className="form-title">{formTitle}</h2>

      <div className="form-input-group">
        {formInputs[view].map((input) => {
          const { name, label, type, placeholder } = input;
          const key = `${view}-${name}`;

          return (
            <div className="form-group" key={key}>
              <label htmlFor={name}>{label}</label>
              <input
                type={type}
                name={name}
                placeholder={placeholder}
                value={formValues[name].toString()}
                onChange={updateValues}
              />
              {name.includes("password") && (
                <button className="pw-btn">Show PW</button>
              )}
              {errors[name] && <p className="error">{errors[name]}</p>}
            </div>
          );
        })}
      </div>

      <button
        className="submit-btn"
        onClick={(e) => {
          e.preventDefault();
          console.log("Submitted!");
          console.log(formValues);
        }}
      >
        Submit
      </button>
    </form>
  );
};

export default AccountForm;
