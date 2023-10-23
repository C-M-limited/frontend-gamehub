import { styled } from "@mui/system";
import React, { ChangeEvent } from "react";
import { Path, useForm, UseFormRegister, SubmitHandler } from "react-hook-form";

const Label = styled("label")({
  color: "#000000",
  fontSize: 14,
  fontWeight: 600,
});

const Input = styled("input")<{ error?: boolean }>(({ error }) => ({
  width: "100%",
  height: 32,
  backgroundColor: "transparent",
  color: "var(--white)",
  border: `solid 2px ${error ? "var(--ns)" : "var(--mainDarkerGrey)"}`,
  borderRadius: 8,
  paddingLeft: "20px",
}));

const HelperText = styled("label")({
  color: "var(--ns)",
  fontSize: 14,
});
interface StyledInputProps {
  label: Path<any>;
  name: string;
  placeholder: string;
  register: UseFormRegister<any>;
  required: boolean;
  error: boolean;
  helperText: string;
  type: string;
}

const StyledInput = ({
  label,
  name,
  register,
  required,
  error,
  helperText,
  placeholder,
  type,
}: StyledInputProps) => {
  return (
    <div style={{ position: "relative" }}>
      <Label>{label}</Label>
      <Input
        type={type}
        placeholder={placeholder}
        error={error}
        {...register(name, { required })}
      />
      {error && <HelperText>{helperText}</HelperText>}
    </div>
  );
};

export default StyledInput;
