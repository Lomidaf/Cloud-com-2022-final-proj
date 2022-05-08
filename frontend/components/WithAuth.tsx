import { observer } from "mobx-react-lite";
import Router from "next/router";
import AuthStore from "../mobx/AuthStore";
import LoginRedirect from "./LoginRedirect";

const withAuth = (Component:any) => {
  const Auth = (props:any) => {
    // Login data added to props via redux-store (or use react context for example)

    // If user is not logged in, return login component
    if (!AuthStore.isLogin) {
      return (
        <LoginRedirect />
      );
    }

    // If user is logged in, return original component
    return (
      <Component {...props} />
    );
  };

  // Copy getInitial props so it will run as well
  if (Component.getInitialProps) {
    Auth.getInitialProps = Component.getInitialProps;
  }

  return Auth;
};

export default withAuth;
