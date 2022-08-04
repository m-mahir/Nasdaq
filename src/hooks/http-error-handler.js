import axios from "axios";
import { useState, useEffect } from "react";
import { useNetInfo } from "@react-native-community/netinfo";

export default () => {
  const [error, setError] = useState(null);
  const netInfo = useNetInfo();
  const connected = netInfo.isConnected;

  const reqInterceptor = axios.interceptors.request.use((req) => {
    if (connected === false) {
      let message = "No internet connection. Please connect and try again.";
      setError(message);
      return Promise.reject(message);
    }
    return req;
  });
  const resInterceptor = axios.interceptors.response.use(
    (res) => res,
    (err) => {
      setError(err.response?.data?.error);
    }
  );

  useEffect(() => {
    return () => {
      axios.interceptors.request.eject(reqInterceptor);
      axios.interceptors.response.eject(resInterceptor);
    };
  }, [reqInterceptor, resInterceptor]);

  const errorConfirmedHandler = () => {
    setError(null);
  };

  return { error, errorConfirmedHandler, connected };
};
