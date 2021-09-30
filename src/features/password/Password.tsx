import React from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import {
  checkPasswordStrength,
  cleanUp,
  selectPassword,
} from "./passwordSlice";

interface PasswordCriteria {
  strength: number;
  message: string;
}

const Password = () => {
  const dispatch = useAppDispatch();
  const { score, guessTimeString, suggestions, warning } =
    useAppSelector(selectPassword);
  const [password, setPassword] = React.useState<string>("");
  const [passwordTyping, setPasswordTyping] = React.useState<string>("");
  const [inputType, setInputType] = React.useState<"text" | "password">(
    "password"
  );

  React.useEffect(() => {
    if (password) {
      dispatch(checkPasswordStrength(password));
    } else {
      dispatch(cleanUp());
    }
  }, [password, dispatch]);

  React.useEffect(() => {
    const delayFn = setTimeout(() => setPassword(passwordTyping), 500);
    return () => clearTimeout(delayFn);
  }, [passwordTyping]);

  const passwordStrengthCriteria: PasswordCriteria[] = [
    {
      strength: 0,
      message: "Your password is too weak!",
    },
    {
      strength: 1,
      message: "Your password is weak!",
    },
    {
      strength: 2,
      message: "Your password is medium!",
    },
    {
      strength: 3,
      message: "Your password is strong!",
    },
    {
      strength: 4,
      message: "Your password is very strong!",
    },
  ];

  const colorCheck = (num: number) => {
    switch (true) {
      case num >= 0 && num < 2:
        return "bg-red-500";
      case num === 2:
        return "bg-yellow-500";
      case num >= 3:
        return "bg-green-500";
      default:
        return "bg-gray-500";
    }
  };

  const onPasswordInputTypeChange = () => {
    if (inputType === "password") {
      setInputType("text");
    } else {
      setInputType("password");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <div className="w-56 mb-8">
        <h1 className="text-2xl text-center">
          Is your password strong enough?
        </h1>
      </div>
      <div className="mb-10">
        <div className="flex mb-1 overflow-hidden bg-white border border-black rounded-md border-1">
          <input
            className="px-4 py-3 text-center w-96"
            type={inputType}
            onChange={(e) => setPasswordTyping(e.target.value)}
            placeholder="Type a password"
          />
          <button
            className="w-12 mx-2"
            onClick={() => onPasswordInputTypeChange()}
          >
            {inputType === "password" ? "Show" : "Hide"}
          </button>
        </div>
        <div className="flex">
          {passwordStrengthCriteria.map(
            (criteria: PasswordCriteria, index: number) => {
              return (
                <div
                  className={`flex-1 h-2 bg-gray-500 rounded-md ${
                    index !== passwordStrengthCriteria.length - 1 && "mr-1"
                  } ${score >= criteria.strength && colorCheck(score)}`}
                />
              );
            }
          )}
        </div>
      </div>
      {score >= 0 && (
        <div className="mb-10">
          <p className="text-lg">
            {passwordStrengthCriteria.find(
              (criteria) => criteria.strength === score
            )?.message || ""}
          </p>
        </div>
      )}
      {guessTimeString && (
        <div className="mb-4">
          <p className="text-sm text-center">
            {`It will take ${guessTimeString} to guess your password. ${
              warning ? warning : ""
            }
            `}
          </p>
        </div>
      )}
      {suggestions && (
        <div>
          <ul className="text-center">
            {suggestions.map((suggestion) => (
              <li className="mb-1 text-sm font-semibold">{suggestion}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Password;
