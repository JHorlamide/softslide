/* React */
import { Fragment } from "react";

/* Libraries */
import { ErrorMessage } from "@hookform/error-message";
import {
  Path,
  DeepMap,
  FieldError,
  FieldValues,
  UseFormRegister,
  RegisterOptions,
} from "react-hook-form";

/* Chakra UI */
import {
  Box,
  Input,
  VStack,
  InputProps,
  FormLabel,
  Textarea,
  InputGroup,
  TextareaProps,
  InputLeftElement,
  InputRightElement,
  InputLeftElementProps,
  InputRightElementProps
} from "@chakra-ui/react";

type FormInputProps<IFormValues extends FieldValues> = {
  inputLeftElement?: InputLeftElementProps;
  inputRightElement?: InputRightElementProps;
  inputType?: string;
  textAreaInputProps?: TextareaProps;
  name: Path<IFormValues>;
  label?: string;
  rules?: RegisterOptions;
  errors?: Partial<DeepMap<IFormValues, FieldError>>;
  register?: UseFormRegister<IFormValues>;
} & Omit<InputProps, "name">;


export const FormInput =
  <IFormValues extends Record<string, unknown>>(props: FormInputProps<IFormValues>) => {
    const {
      name,
      rules,
      label,
      errors,
      inputType,
      inputLeftElement,
      inputRightElement,
      textAreaInputProps,
      register,
      ...inputProps
    } = props;

    return (
      <Fragment>
        {label && <FormLabel htmlFor={name} color="white">{label}</FormLabel>}

        {inputType === "textarea" ? (
          <VStack width="full">
            <InputGroup>
              {inputLeftElement && <InputLeftElement {...inputLeftElement} />}

              {inputRightElement && <InputRightElement {...inputRightElement} />}

              <Textarea
                id={name}
                name={name}
                pl="35px"
                width="100%"
                height="45px"
                border="1px solid white"
                bg="brand_blue.300"
                focusBorderColor="white"
                borderRadius="20px"
                _placeholder={{
                  opacity: "0.6",
                  color: "brand_blue.100",
                  fontSize: "15px",
                }}
                {...textAreaInputProps}
                {...(register && register(name, rules))}
              />
            </InputGroup>

            <Box width="full">
              <ErrorMessage
                errors={errors}
                name={name as any}
                render={({ message }) => (
                  <p style={{ color: "red", paddingLeft: 10 }}>{message}</p>
                )}
              />
            </Box>
          </VStack>
        ) : (
          <VStack width="full">
            <InputGroup>
              {inputLeftElement && <InputLeftElement {...inputLeftElement} />}

              {inputRightElement && <InputRightElement {...inputRightElement} />}

              <Input
                id={name}
                name={name}
                pl="35px"
                width="100%"
                height="45px"
                border="1px solid white"
                bg="brand_blue.300"
                focusBorderColor="white"
                borderRadius="20px"
                _placeholder={{
                  opacity: "0.6",
                  color: "brand_blue.100",
                  fontSize: "15px",
                }}
                {...inputProps}
                {...(register && register(name, rules))}
              />
            </InputGroup>

            <Box width="full">
              <ErrorMessage
                errors={errors}
                name={name as any}
                render={({ message }) => (
                  <p style={{ color: "red", paddingLeft: 10 }}>{message}</p>
                )}
              />
            </Box>
          </VStack >
        )}
      </Fragment >
    );
  }
