import React from "react";

import { IAddress } from "../models/address";

export const useValidation = () => {
  const [addressValidation, setAddressValidation] = React.useState<IAddress>({
    firstName: "",
    secondName: "",
    mobileNumber: "",
    city: "",
    postCode: "",
    fullAddress: "",
  });

  // ---- validation order ----

  const isNullOrWhitespace = (value: string | undefined): boolean => {
    return value === undefined || value.trim() === "";
  };

  const checkForEmptyFields = (address: IAddress) => {
    for (const key in address) {
      if (address.hasOwnProperty(key)) {
        const fieldValue = address[key as keyof IAddress];
        if (isNullOrWhitespace(fieldValue) && key !== "secondName") {
          return true; // If at least one non-empty field (except secondName) is empty, return true
        }
      }
    }

    return false; // All fields are filled
  };

  // ---- handle change ----

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const field = e.target.name; // Get the field name
    const newValue: string = e.target.value;
    setAddressValidation((prevAddress) => ({
      ...prevAddress,
      [field]: newValue, // Update the corresponding field
    }));
  };

  // -----

  return {
    handleOnChange,
    addressValidation,
    setAddressValidation,
    checkForEmptyFields,
  };
};
