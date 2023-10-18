import { useContext, useState } from "react";
import { useMutation } from "@apollo/react-hooks";
import { gql } from "graphql-tag";
import { useNavigate } from "react-router-dom";

import { AuthContext } from "../contexts/authContext";
import { useForm } from "../customHooks/form";

const LOGIN_USER = gql`
  mutation loginUser($loginInput: LoginInput) {
    loginUser(loginInput: $loginInput) {
      email
      password
      token
      theme
    }
  }
`;

function Login() {
  const [errors, setErrors] = useState([]);
  const context = useContext(AuthContext);
  const navigate = useNavigate();

  const loginUserCallback = () => {
    console.log("callback hit");
    loginUser();
  };

  const { onChange, onSubmit, values } = useForm(loginUserCallback, {
    email: "",
    password: "",
  });

  const [loginUser] = useMutation(LOGIN_USER, {
    update(proxy, { data: { loginUser: userData } }) {
      context.login(userData);
      navigate("/");
    },
    onError({ graphQLErrors }) {
      setErrors(graphQLErrors);
    },
    variables: { loginInput: values },
  });
  return (
    <div className="form-container">
      <h2>Login</h2>
      <form>
        <input
          type="text"
          name="email"
          placeholder="Email"
          onChange={onChange}
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          onChange={onChange}
        />
        {errors.map((error) => (
          <p>{error.message}</p>
        ))}
        <button onClick={onSubmit}>Login</button>
      </form>
    </div>
  );
}

export default Login;
