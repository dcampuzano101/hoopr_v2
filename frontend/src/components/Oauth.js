import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { googleLogin } from "../actions/userActions";

const Oauth = ({ location, history }) => {
  const userId = location.search.split("=")[1];

  const userLogin = useSelector((state) => state.userLogin);
  const { loading, error, userInfo } = userLogin;

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(googleLogin(userId));
    if (userInfo) {
      history.push("/");
    }
  }, [history, userInfo]);

  return <div></div>;
};

export default Oauth;
