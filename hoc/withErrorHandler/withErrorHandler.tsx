import useHttpErrorHandler from "../../hooks/http-error-handler";
import ErrorModal from '../../components/ErrorModal';

interface Props {
  children?: React.ReactNode;
}

export default function withErrorHandler<Props>(
  WrappedComponent: React.ComponentType<Props>
) {
  return (props: Props) => {
    const [error, clearError] = useHttpErrorHandler();

    const closeHandler = () => {
      if (clearError) clearError();
    };

    return (
      <>
        <ErrorModal closeHandler={closeHandler}>{error}</ErrorModal>
        <WrappedComponent {...props} />
      </>
    );
  };
}
