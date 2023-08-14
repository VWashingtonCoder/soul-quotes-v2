import { FormErrors } from "../../types";

const purposeMessages: FormErrors = {
  favorites: "Log in to view all your beloved quotes",
  create:
    "Log in to create fresh quotes for contribution to the community and your personal collection.",
};

const LoginNotification = ({ page }: { page: string }) => {
  return (
    <div className="login-notification">
      <p className="message">{purposeMessages[page]}</p>
    </div>
  );
};

export default LoginNotification;
