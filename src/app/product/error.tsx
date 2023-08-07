"use client"; // for the error page, "use client"  is required

import React from "react";

type Props = {};

const error = ({ error }: { error: Error }) => {
  return <h1>Oops... {error.message}</h1>;
};

export default error;
