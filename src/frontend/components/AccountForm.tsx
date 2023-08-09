import { FormInputs, FormErrors, FormValues } from "../../types";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";

type AccountFormProps = {
  view: string;
  errors: FormErrors;
  formValues: FormValues;
  showPW: boolean;
  togglePW: (showPW: boolean) => void;
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
  showPW,
  togglePW,
  updateValues,
}: AccountFormProps) => {
  const formTitle =
    view === "join" ? "Join the site!" : "Login to your account!";
  const errorsArr = Object.values(errors);

  return (
    <form className="form account">
      <h2 className="form-title">{formTitle}</h2>

      <div className="form-input-group">
        {formInputs[view].map((input) => {
          const { name, label, type, placeholder } = input;
          const key = `${view}-${name}`;

          return (
            <div className={`form-group ${view}`} key={key}>
              <label htmlFor={name}>{label}</label>
              <input
                type={type}
                name={name}
                placeholder={placeholder}
                value={formValues[name].toString()}
                onChange={updateValues}
              />
              {name.includes("password") && (
                <button
                  className="pw-btn clear-btn"
                  onClick={() => togglePW(showPW)}
                >
                  {showPW ? (
                    <AiFillEyeInvisible className="icon hide" />
                  ) : (
                    <AiFillEye className="icon show" />
                  )}
                </button>
              )}
            </div>
          );
        })}
      </div>

      {errorsArr.length > 0 && (
        <div className="error-box">
          <ul>
            {" "}
            Uh oh😮! Looks like there were some errors:
            {errorsArr.map((err) => (
              <li className="error">{err}</li>
            ))}
          </ul>
        </div>
      )}

      <button
        className="clear-btn submit-btn"
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
