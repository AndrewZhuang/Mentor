import React, { useEffect } from "react";
import { signInWithGoogle } from "../../utilities/firebase";
// import { useProfile } from "../../utils/userProfile";
import { useAuthState } from "../../utilities/firebase";

const Login = ({nextStep, setUser}) => {
//   const [user] = useProfile();

  const [user] = useAuthState();

  const Continue = (e) => {
    nextStep();
  }

  useEffect(() => {
    if (user) {
      setUser(user);
      Continue();
    }
  }, [user]);

  const SignInButton = () => (
    <button
      className="ml-5 p-2 w-75 btn btn-light login-button"
      onClick={signInWithGoogle}
    >
      SIGN IN
    </button>
  );

  return (
    <div className="login-container">
      <div className="login-info-container">
        <div>
          <h1 className="login-title" data-cy="login-title">
            Welcome to Mentor
          </h1>

          <SignInButton />
        </div>
      </div>
    </div>
  );
};

export default Login;
