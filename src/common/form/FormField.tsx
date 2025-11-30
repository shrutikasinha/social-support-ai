import { Form, Input, DatePicker, Select } from "antd";
import {
  Controller,
  type Control,
  type RegisterOptions,
  type FieldValues,
  type Path,
} from "react-hook-form";
import type { FormDataValues } from "../../types/formValues";
import { useTranslation } from "react-i18next";

interface FormFieldProps<T extends FieldValues> {
  name: Path<T>;
  control: Control<T>;
  label?: string;
  placeholder?: string;
  component?: "input" | "datePicker" | "select" | "rangePicker";
  options?: { label: string; value: string | number }[];
  rows?: number;
  // ⭐ Correct type for rules
  rules?: RegisterOptions<T, Path<T>>;
  required?: boolean;
  typeNumber?: "number" | "string";
}

function FormField<T extends FormDataValues>({
  name,
  control,
  label,
  placeholder,
  component = "input",
  options = [],
  rules,
  rows = 0,
  required = true,
  typeNumber = "string",
}: FormFieldProps<T>) {
    const {t} = useTranslation()
  const renderComponent = (field: unknown) => {
    if(field){
    switch (component) {
      case "datePicker":
        return <DatePicker {...field} style={{ width: "100%" }} />;
      case "rangePicker":
        return <DatePicker.RangePicker {...field} style={{ width: "100%" }} />;
      case "select":
        return (
          <Select {...field} placeholder={placeholder} options={options} />
        );
      default:
        return rows === 0 ? (
          <Input
            {...field}
            placeholder={placeholder}
            type={typeNumber}
            min={0}
          />
        ) : (
          <Input.TextArea {...field} placeholder={placeholder} rows={rows} />
        );
    }
}
  };

  return (
    <Controller
      name={name}
      control={control}
      rules={rules}
      render={({ field, fieldState: { error } }) => {
        return (
          <Form.Item
            label={label}
            required={required}
            tooltip={`${label} ${t("formRequired")}`}
            validateStatus={error ? "error" : ""}
            help={error?.message}
          >
            {renderComponent(field)}
          </Form.Item>
        );
      }}
    />
  );
}

export default FormField;
