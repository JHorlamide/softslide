import { Button as ChakraButton, ButtonProps } from "@chakra-ui/react";

interface Props extends ButtonProps {
  light?: boolean;
  isDisabled?: boolean;
  htmlFor?: string
}

const Button = (props: Props) => {
  const { light, isDisabled, children, ...rest } = props;

  return (
    <ChakraButton
      fontWeight="500"
      fontSize={["0.875rem", "1rem"]}
      isDisabled={isDisabled}
      borderRadius="5px"
      {...rest}
    >
      {children}
    </ChakraButton>
  );
};

export default Button;
