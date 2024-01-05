import logo from "../images/logo.svg";
import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { client } from "../data/Client";

function AuthForm({ isLogin, setAuthenticated }) {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [confirmPassword, setConfirmPassowrd] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [rememberMe, setRememberMe] = useState(false);

  useEffect(() => {
    if (isLogin) {
      const rememberedEmail = localStorage.getItem("rememberMe");
      if (rememberedEmail) {
        setEmail(rememberedEmail);
        setRememberMe(true);
      }
    }
  }, []);

  const signup = async () => {
    if (password !== confirmPassword) {
      toast.error("Passwords do not match.", {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 3000,
      });
      return;
    }
    client.post('/User/Create', {
      "name": displayName,
      "email": email,
      "password": password,
      "phoneNumber": phone
    })
    .then((authenticatedUser) => {
      const user = authenticatedUser;
      if (user != null) {
        setAuthenticated(true);
        navigate("/home");
        localStorage.setItem("user", JSON.stringify(user.data));
      }
    })
    .catch((e) => {
      toast.error("Error while creating the account!", {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 3000,
      });
    });
  };

  const login = async () => {
    if (rememberMe) {
      localStorage.setItem("rememberMe", email);
    } else {
      localStorage.removeItem("rememberMe");
    }
    client.post('/User/SignIn', {
      "email": email,
      "password": password
    })
    .then((authenticatedUser) => {
      const user = authenticatedUser;
      if (user != null) {
        setAuthenticated(true);
        localStorage.setItem("user", JSON.stringify(user.data));
        navigate("/home");
      }
    })
    .catch((e) => {
      toast.error("Error during login!", {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 3000,
      });
    });
  };

  const fields = {
    title: isLogin ? "Login" : "Sign Up",
    subTitle: isLogin
      ? "Login to your account to continue with Lost&Found."
      : "Create an account to get started with Lost&Found.",
    inputFields: [
      {
        label: isLogin ? "Email" : "Full Name",
        type: isLogin ? "email" : "text",
        value: isLogin ? email : displayName,
        placeholder: isLogin ? "name@example.com" : "Enter your full name",
        name: isLogin ? "email" : "displayName",
        error: isLogin ? "Invalid email" : "Invalid full name",
        onChange: (e) => {
          isLogin ? setEmail(e.target.value) : setDisplayName(e.target.value);
        },
      },
      {
        label: isLogin ? "Password" : "Email",
        type: isLogin ? "password" : "email",
        placeholder: isLogin ? "min. 8 characters" : "Enter your email",
        name: isLogin ? "password" : "email",
        error: isLogin ? "Invalid password" : "Invalid email",
        onChange: (e) => {
          isLogin ? setPassword(e.target.value) : setEmail(e.target.value);
          // if (isLogin) {
          //   // do something
          // } else {
          // setPassword(e.target.value);
          // // do something
          // }
        },
      },
      {
        render: !isLogin, // if isLogin is false, render this field
        label: "Telephone",
        type: "phone",
        placeholder: "Enter your phone number",
        name: "phone",
        error: "Invalid telephone",
        onChange: (e) => {
          !isLogin && setPhone(e.target.value);
        },
      },
      {
        render: !isLogin, // if isLogin is false, render this field
        label: "Password",
        type: "password",
        placeholder: "Enter your password",
        name: "password",
        error: "Invalid password",
        onChange: (e) => {
          !isLogin && setPassword(e.target.value);
        },
      },
      {
        render: !isLogin, // if isLogin is false, render this field
        label: "Confirm Password",
        type: "password",
        placeholder: "Confirm your password",
        name: "confirmPassword",
        error: "Invalid password",
        onChange: (e) => {
          !isLogin && setConfirmPassowrd(e.target.value);
        },
      },
    ],
    checkBox: {
      render: isLogin,
      label: "Remember me",
      name: "rememberMe",
      onChange: () => {
        setRememberMe(!rememberMe);
      },
    },
    button: {
      label: isLogin ? "Login" : "Sign Up",
      onClick: () => {
        isLogin ? login() : signup();
      },
    },
    forgotPassword: {
      render: isLogin,
      label: "Forgot Password?",
      onClick: () => {},
    },
    footer: {
      label: isLogin ? "Don't have an account?" : "Already have an account?",
      buttonLabel: isLogin ? "Sign Up" : "Login",
      onClick: () => {},
    },
  };
  return (
    <div className="md:mx-[165px] mx-20 md:mt-20 mt-8">
      <img src={logo} alt="Logo" className="md:mb-[190px] mb-20" />
      <h1 className="text-6xl font-bold">{fields.title}</h1>
      <h2 className="text-sm font-light mt-4">{fields.subTitle}</h2>
      <div className="mt-8">
        {fields.inputFields.map((field) => {
          if (field.render === false) {
            return null;
          }
          return (
            <div className="mb-4">
              <label className="text-sm font-light block mb-2">
                {field.label}
              </label>
              <input
                type={field.type}
                placeholder={field.placeholder}
                name={field.name}
                onChange={field.onChange}
                value={field.value}
                className="w-[350px] h-[44px] px-3 py-3 border border-lightGray rounded-[8px] text-sm placeholder-lightGray"
              />
            </div>
          );
        })}
        <div className="w-[350px] h-[44px] flex items-center justify-between mt-4">
          {fields.checkBox.render && (
            <div className="flex items-center">
              <input
                type="checkbox"
                name={fields.checkBox.name}
                onChange={fields.checkBox.onChange}
                className="mr-2"
              />
              <label className="text-sm">{fields.checkBox.label}</label>
            </div>
          )}
          <button
            onClick={fields.button.onClick}
            className={`bg-foundColor ${
              isLogin ? "w-[190px]" : "w-[350px]"
            } h-[44px] rounded-[8px] text-white font-bold text-sm`}
          >
            {fields.button.label}
          </button>
        </div>
        {fields.forgotPassword.render && (
          <button
            onClick={fields.forgotPassword.onClick}
            className="w-[350px] h-[44px] mt-4 text-foundColor font-bold text-sm"
          >
            {fields.forgotPassword.label}
          </button>
        )}
        <div className="flex justify-center items-center md:mt-[112px] mt-20 w-[350px] h-[44px]">
          <p className="text-sm font-normal inline mr-2">
            {fields.footer.label}
          </p>
          <Link
            onClick={fields.footer.onClick}
            className="text-sm font-semibold text-foundColor"
            to={isLogin ? "/signup" : "/login"}
          >
            {fields.footer.buttonLabel}
          </Link>
        </div>
      </div>
    </div>
  );
}

export default AuthForm;
