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
  FormErrorMessage,
  Textarea,
  TextareaProps,
  FormLabel,
} from "@chakra-ui/react";

type FormInputProps<IFormValues extends FieldValues> = {
  label?: string;
  disable?: boolean;
  name: Path<IFormValues>;
  rules?: RegisterOptions;
  errors?: Partial<DeepMap<IFormValues, FieldError>>;
  register?: UseFormRegister<IFormValues>;
} & Omit<TextareaProps, "name">;

export const TextAreaInput =
  <IFormValues extends Record<string, unknown>>(props: FormInputProps<IFormValues>) => {
    const { name, rules, label, errors, disable, register, } = props;

    return (
      <Fragment>
        {label && <FormLabel htmlFor={name} color="white">{label}</FormLabel>}

        <Textarea
          id={name}
          name={name}
          border="1px solid white"
          bg="brand_blue.300"
          focusBorderColor="white"
          borderRadius="10px"
          disabled={disable}
          _placeholder={{
            opacity: "0.6",
            color: "brand_blue.100",
            fontSize: "15px",
          }}
          {...(register && register(name, rules))}
        />

        <ErrorMessage
          errors={errors}
          name={name as any}
          render={({ message }) => (
            <FormErrorMessage pt={2} pl={2} color="red.500">
              {message}
            </FormErrorMessage>
          )}
        />
      </Fragment>
    );
  }
