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

const testJoinErrors = {
  username: "Username is required",
  email: "Email is required",
  password: "Password is required",
  passwordConfirm: "Password confirmation is required",
};

const testLoginErrors = {
  username: "Username is required",
  password: "Password is required",
};

function AccountsPage() {
  const [accountView, setAccountView] = useState("join");
  const [joinForm, setJoinForm] = useState(initFormStates.join as FormValues);
  const [joinErrors, setJoinErrors] = useState(testJoinErrors as FormErrors); // init: {}
  const [showJoinPW, setShowJoinPW] = useState(false);
  const [loginForm, setLoginForm] = useState(
    initFormStates.login as FormValues
  );
  const [loginErrors, setLoginErrors] = useState(testLoginErrors as FormErrors); // init: {}
  const [showLoginPW, setShowLoginPW] = useState(false);

  const toggleShowPassword = (showPW: boolean) => {
    if (accountView === "join") setShowJoinPW(!showPW);
    else if (accountView === "login") setShowLoginPW(!showPW);
  };

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
      <header className="view-controls">
        {["join", "login"].map((view) => (
          <button
            key={`${view}-btn`}
            className={`clear-btn view-btn ${
              accountView === view ? "active" : ""
            }`}
            onClick={() => setAccountView(view)}
          >
            {view}
          </button>
        ))}
      </header>

      {accountView === "join" ? (
        <AccountForm
          view={accountView}
          errors={joinErrors}
          formValues={joinForm}
          showPW={showJoinPW}
          updateValues={updateFormValues}
          togglePW={toggleShowPassword}
        />
      ) : (
        <AccountForm
          view={accountView}
          errors={loginErrors}
          formValues={loginForm}
          showPW={showLoginPW}
          updateValues={updateFormValues}
          togglePW={toggleShowPassword}
        />
      )}
    </section>
  );
}

export default AccountsPage;
