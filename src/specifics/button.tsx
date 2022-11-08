import { Button, ButtonProps } from "antd";

export const CustomButton = (props: ButtonProps) => {
  const { style, ...rest } = props;
  return (
    <Button
      style={{
        borderRadius: 6,
        height: 38,
        fontWeight: 600,
        ...style,
      }}
      {...rest}
    />
  );
};
