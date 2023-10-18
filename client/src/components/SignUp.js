import { useContext, useState } from "react";
import { useMutation } from "@apollo/react-hooks";
import { gql } from "graphql-tag";
import { useNavigate } from "react-router-dom";

import { AuthContext } from "../contexts/authContext";
import { useForm } from "../customHooks/form";

const REGISTER_USER = gql`
  mutation Mutation($registerInput: RegisterInput) {
    registerUser(registerInput: $registerInput) {
      email
      fullName
      token
      theme
    }
  }
`;

function Signup() {
  const [errors, setErrors] = useState([]);
  const context = useContext(AuthContext);
  const navigate = useNavigate();

  const registerUserCallback = () => {
    registerUser();
  };

  const { onChange, onSubmit, values } = useForm(registerUserCallback, {
    fullName: "",
    email: "",
    password: "",
  });

  const [registerUser] = useMutation(REGISTER_USER, {
    update(proxy, { data: { registerUser: userData } }) {
      context.login(userData);
      navigate("/");
    },
    onError({ graphQLErrors }) {
      setErrors(graphQLErrors);
    },
    variables: { registerInput: values },
  });

  return (
    <div className="form-container">
      <h2>Sign Up</h2>
      <form>
        <input
          type="text"
          name="fullName"
          placeholder="Full name"
          onChange={onChange}
        />
        <input
          type="email"
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
        <button onClick={onSubmit}>Sign Up</button>
      </form>
    </div>
  );
}

export default Signup;
