import { theme } from "antd";
import { InputField, InputFieldProps } from "components/shared/input";
import { ThemeContext } from "contexts/theme_context";
import { useContext } from "react";

export const CustomInputField = <T extends any>(props: InputFieldProps<T>) => {
  const { label, style, itemProps, ...rest } = props;
  const theme = useContext(ThemeContext);
  return (
    <div>
      {label && (
        <div
          style={{
            marginTop: 24,
            fontWeight: 600,
            color: theme.text,
          }}
        >
          {label}
        </div>
      )}
      <InputField
        {...{
          itemProps: { style: { marginBottom: 0 }, ...itemProps },
          style: { borderRadius: 6, ...style },
          ...rest,
        }}
      />
    </div>
  );
};
