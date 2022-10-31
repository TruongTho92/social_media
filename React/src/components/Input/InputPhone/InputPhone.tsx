import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";

type Props = {
  className: string;
  value: string;
  setValue: (value: string) => void;
};

const InputPhone = ({ className, value, setValue }: Props) => {
  const handleChangPhone = (value: string) => {
    if (setValue) {
      setValue(value);
    }
  };
  return (
    <PhoneInput
      placeholder="Enter phone number"
      value={value}
      withCountryCallingCode={true}
      onChange={handleChangPhone}
      className={className}
    />
  );
};

export default InputPhone;
