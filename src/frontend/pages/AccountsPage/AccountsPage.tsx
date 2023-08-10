import "./AccountsPage.css";
import { useState } from "react";
import JoinForm from "../../components/JoinForm";

function AccountsPage({ changePage }: { changePage: (page: string) => void }) {
  const [formView, setFormView] = useState("join");

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
        <p>Login form</p>
      )}
    </section>
  );
}

export default AccountsPage;
