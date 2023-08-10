import { FormErrors } from "../../types";

type FormErrorsBoxProps = {
  errors: FormErrors;
};

const FormErrorsBox = ({ errors }: FormErrorsBoxProps) => {
  const errorsArr = Object.values(errors);

  return (
    <div className="form-errors">
      {errorsArr.length > 0 && (
        <div className="error-box">
          <ul>
            {" "}
            Uh oh😮! Looks like there were some errors:
            {errorsArr.map((err, idx) => (
              <li key={`error-${idx}`} className="error">
                {err}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default FormErrorsBox;
