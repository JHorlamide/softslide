import { Spinner, Center, SpinnerProps } from "@chakra-ui/react";

interface Props {
  spinnerProps?: SpinnerProps
}

const AppLoader = ({ spinnerProps, ...rest }: Props) => {
  return (
    <Center justifyContent="center" alignItems="center">
      <Spinner
        mt={100}
        size="xl"
        speed="0.65s"
        color="blue"
        thickness="4px"
        emptyColor="white"
        {...spinnerProps}
        {...rest}
      />
    </Center>
  );
};

export default AppLoader;
