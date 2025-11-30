import { Input } from "antd";

type InputProps = {
  value: string;
  name: string;
  placeholder: string;
};

const StyledInput = ({ value, name, placeholder }: InputProps) => {
  return <Input placeholder={placeholder} value={value} name={name} />;
};

export default StyledInput;
