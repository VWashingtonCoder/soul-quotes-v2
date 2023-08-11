import "./AccountsPage.css";
import { useState } from "react";
import JoinForm from "../../components/JoinForm";
import LoginForm from "../../components/LoginForm";

function AccountsPage({ changePage }: { changePage: (page: string) => void }) {
  const [formView, setFormView] = useState("login");

  const goToHomePage = () => changePage("home");

  return (
    <section className="page accounts">
      <header className="form-controls">
        {["join", "login"].map((form) => (
          <button
            key={`${form}-btn`}
            className={`clear-btn view-btn ${
              formView === form ? "active" : ""
            }`}
            onClick={() => setFormView(form)}
          >
            {form}
          </button>
        ))}
      </header>

      {formView === "join" ? (
        <JoinForm goHome={goToHomePage} />
      ) : (
        <LoginForm goHome={goToHomePage} />
      )}
    </section>
  );
}

export default AccountsPage;
