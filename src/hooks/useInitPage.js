import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { setAppConfig } from "../store/app";

const useInitPage = (appConfig) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { token } = useSelector((state) => state.auth);
  const {
    headerText = false,
    showMenu = false,
    logoutRequered = false,
  } = appConfig;

  useEffect(() => {
    if (logoutRequered && token) {
      navigate("/");
    }
    dispatch(setAppConfig({ headerText, showMenu }));
  }, [appConfig]);
};

export default useInitPage;
