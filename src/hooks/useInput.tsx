import React, { useState } from "react";
import { IAddress } from "@/src/models/address"; // Замените на ваш путь к интерфейсу

type InputValues = IAddress;

interface InputProps {
  name: keyof InputValues;
  value: string | undefined;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const useInput = (initialValues: InputValues) => {
  const [values, setValues] = useState<InputValues>(initialValues);

  //   console.log(values);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const field = e.target.name as keyof InputValues;
    const newValue = e.target.value;
    setValues((prevValues) => ({
      ...prevValues,
      [field]: newValue,
    }));
  };

  const inputProps = (fieldName: keyof InputValues): InputProps => ({
    name: fieldName,
    value: values[fieldName],
    onChange: handleChange,
  });

  return React.useMemo(
    () => ({
      values,
      inputProps,
      handleChange,
    }),
    [values, inputProps, handleChange],
  );
};
