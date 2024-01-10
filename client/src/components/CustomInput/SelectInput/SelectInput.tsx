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
  Select,
  SelectProps,
  FormLabel,
  Stack,
} from "@chakra-ui/react";


interface SelectOptionType {
  label: string;
  value: string;
};

interface SelectInputProps<IFormValues extends FieldValues> {
  name: Path<IFormValues>;
  label: string;
  rules?: RegisterOptions;
  errors?: Partial<DeepMap<IFormValues, FieldError>>;
  register?: UseFormRegister<IFormValues>;
  selectProps?: SelectProps;
  selectOptions: SelectOptionType[];
}

export const SelectInput = <IFormValues extends Record<string, unknown>>(props: SelectInputProps<IFormValues>) => {
  const {
    name,
    label,
    selectOptions,
    selectProps,
    errors,
    register,
    ...rest
  } = props;

  return (
    <Fragment>
      <Stack width="full">
        <FormLabel>{label}</FormLabel>
        <Select
          border="0.5px solid white"
          _focus={{ border: "none", borderColor: "white" }}
          {...rest}
          {...selectProps}
          {...(register && register(name))}
        >
          {selectOptions.map((option) => (
            <option key={option.label} value={option.value}>
              {option.label}
            </option>
          ))}
        </Select>
      </Stack>

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
