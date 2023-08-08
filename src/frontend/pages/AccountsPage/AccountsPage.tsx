import { useState } from "react";
import "./AccountsPage.css";
import AccountForm from "../../components/AccountForm";
import { FormValues, FormErrors } from "../../../types";

const initFormStates = {
  join: {
    username: "",
    email: "",
    password: "",
    passwordConfirm: "",
  },
  login: {
    username: "",
    password: "",
  },
};

function AccountsPage() {
  const [accountView, setAccountView] = useState("login");
  const [joinForm, setJoinForm] = useState(initFormStates.join as FormValues);
  const [joinErrors, setJoinErrors] = useState({} as FormErrors);
  const [loginForm, setLoginForm] = useState(
    initFormStates.login as FormValues
  );
  const [loginErrors, setLoginErrors] = useState({} as FormErrors);

  const updateFormValues = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (accountView === "join") {
      setJoinForm({
        ...joinForm,
        [name]: value,
      });
    } else if (accountView === "login") {
      setLoginForm({
        ...loginForm,
        [name]: value,
      });
    }
  };

  return (
    <section className="page accounts">
      <header className="radio-views">
        {["join", "login"].map((view) => (
          <>
            <input
              type="radio"
              value={view}
              name="accountView"
              onChange={(e) => setAccountView(e.target.value)}
              checked={accountView === view}
            />{" "}
            {view}
          </>
        ))}
      </header>

      {accountView === "join" ? (
        <AccountForm
          view={accountView}
          errors={joinErrors}
          formValues={joinForm}
          updateValues={updateFormValues}
        />
      ) : (
        <AccountForm
          view={accountView}
          errors={loginErrors}
          formValues={loginForm}
          updateValues={updateFormValues}
        />
      )}
    </section>
  );
}

export default AccountsPage;
