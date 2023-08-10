import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";

type Input = {
    name: string;
    label: string;
    type: string;
    placeholder: string;
}

type InputBaseType = {
    form: string;
    input: Input;
    value: string;
    showPassword: boolean;
    updateValues: (e: React.ChangeEvent<HTMLInputElement>) => void;
    togglePassword: (showPassword: boolean) => void;
}

const FormInputBase = (props: InputBaseType) => {
    const { form, input, value, showPassword, updateValues, togglePassword } = props;
    const { name, label, type, placeholder } = input;
    const key = `${form}-${name}`;
    const pwType = showPassword ? "text" : "password";

    return (
        <div className={`form-group ${form}`} key={key}>
            <label htmlFor={name}>{label}</label>
            <input
                type={name.includes("password") ? pwType : type}
                name={name}
                placeholder={placeholder}
                value={value}
                onChange={updateValues}
            />
            {name.includes("password") && 
                <button
                  className="pw-btn clear-btn"
                  onClick={(e) => {
                    e.preventDefault();
                    togglePassword(!showPassword);
                  }}
                >
                  {showPassword 
                    ? <AiFillEyeInvisible className="icon hide" /> 
                    : <AiFillEye className="icon show" />
                  }
                </button>
            }
        </div>
    );
}

export default FormInputBase;