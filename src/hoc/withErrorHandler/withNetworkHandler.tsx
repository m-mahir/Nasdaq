import { useEffect, useState } from "react";
import NetInfo from "@react-native-community/netinfo";
import ErrorModal from "../../components/ErrorModal";

interface Props {
  children?: React.ReactNode;
}

export default function withNetworkHandler<Props>(
  WrappedComponent: React.ComponentType<Props>
) {
  return (props: Props) => {
    const [isConnected, setIsConnected] = useState<boolean>(true);

    useEffect(() => {
      const unsubscribe = NetInfo.addEventListener((state) => {
        if (state.isConnected != isConnected)
          setIsConnected(state.isConnected || false);
      });

      return unsubscribe;
    }, []);

    return (
      <>
        {!isConnected ? (
          <ErrorModal
            closeHandler={() => {
              NetInfo.fetch().then((state) => {
                setIsConnected(state.isConnected || false);
              });
            }}
          >
            No internet connection. Please connect and try again.
          </ErrorModal>
        ) : (
          <WrappedComponent {...props} />
        )}
      </>
    );
  };
}
