export const GetBlueprintConfigUrl = `${process.env.REACT_APP_API_URL}/kubeyard/api/v1/getBlueprintConfig`

export const GetGcpWebAppConfigUrl = `${process.env.REACT_APP_API_URL}/kubeyard/api/v1/getGCPWebAppConfig`
export const GetAwsWebAppConfigUrl = `${process.env.REACT_APP_API_URL}/kubeyard/api/v1/getAWSWebAppConfig`
export const GetAzureWebAppConfigUrl = `${process.env.REACT_APP_API_URL}/kubeyard/api/v1/getAzureWebAppConfig`

export const NAME_Validation = {
  required: "Required field",
  pattern: {
    value: /^[A-Z0-9._-]{2,}$/i,
    message: "Entered value does not match format. Only [A-Z0-9._-] are allowed. Mininum 2 characters."
  }
}

export const NAME_Validation_NotRequired = {
  //required: "",
  pattern: {
    value: /^[A-Z0-9._-]{2,}$/i,
    message: "Entered value does not match format. Only [A-Z0-9._-] are allowed. Mininum 2 characters."
  }
}

export const Integer_Validation = {
  required: "Required field",
  pattern: {
    value: /^[0-9]{1,}$/i,
    message: "Entered value is not a integer."
  }
}

export const SearchString_Validation = {
  required: "Required field",
  pattern: {
    value: /^[A-Z0-9._*-]{4,}$/i,
    message: "Entered value does not match format. Only [A-Z0-9._*-] are allowed. Mininum 2 characters."
  }
}

export const Email_Validation = {
  required: "Required field",
  pattern: {
    value: /\S+@\S+\.\S+/,
    message: "Entered value does not match email format"
  }
}

export const CIDR_Validation = {
  required: "Required field",
  pattern: {
    value: /^(([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])\.){3}([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])(\/(\d|[1-2]\d|3[0-2]))$/,
    message: "Entered value does not match CIDR format"
  }
}
