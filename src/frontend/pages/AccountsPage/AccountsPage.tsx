import { useState } from "react";
import "./AccountsPage.css";
import AccountForm from "../../components/AccountForm";
import { FormValues, FormErrors } from "../../../types";
import { validateFormValues, checkForExistingUser } from "../../../validators";
import { useUsers } from "../../../backend/context-hooks";

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
  const {  addUser } = useUsers();
  const [accountView, setAccountView] = useState("join");
  const [joinForm, setJoinForm] = useState(initFormStates.join as FormValues);
  const [joinErrors, setJoinErrors] = useState({} as FormErrors);
  const [showJoinPW, setShowJoinPW] = useState(false);
  const [loginForm, setLoginForm] = useState(
    initFormStates.login as FormValues
  );
  const [loginErrors, setLoginErrors] = useState({} as FormErrors); 
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

  const checkJoinForm = () => {
    let errors = validateFormValues(joinForm);

    if(Object.keys(errors).length === 0) {
      const { username, email } = joinForm;
      errors = checkForExistingUser(username, email);
      
      if(Object.keys(errors).length === 0) {
        console.log("No errors");
      }
    }

    setJoinErrors(errors);
  };

  const checkLoginForm = () => {
    const errors = validateFormValues(loginForm);
    setLoginErrors(errors);
  };
  
    
  const submitForm = () => {
    if (accountView === "join") {
      checkJoinForm();
    } else if (accountView === "login") {
      checkLoginForm();
    }
  }
    
    

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
          submitForm={submitForm}
        />
      ) : (
        <AccountForm
          view={accountView}
          errors={loginErrors}
          formValues={loginForm}
          showPW={showLoginPW}
          updateValues={updateFormValues}
          togglePW={toggleShowPassword}
          submitForm={submitForm}
        />
      )}
    </section>
  );
}

export default AccountsPage;
