
export const getUserFullName = (userTemp) => {
  const logUser = userTemp;
  if (logUser?.primerApellido || logUser?.primerNombre || "") {
    return `${logUser?.primerNombre || ""} ${logUser?.segundoNombre || ""} ${
      logUser?.primerApellido || ""
    } ${logUser?.segundoApellido || ""}`;
  } else {
    return `${logUser?.name || ""} ${logUser?.lastname || ""}`;
  }
};
