import { useEffect } from "react";
import { useDispatch } from "react-redux";

import { setAppConfig } from "../store/app";

const useInitPage = (appConfig) => {
  const dispatch = useDispatch();
  const { headerText = false, showMenu = false } = appConfig;

  useEffect(() => {
    dispatch(setAppConfig({ headerText, showMenu }));
  }, [appConfig]);
};

export default useInitPage;
