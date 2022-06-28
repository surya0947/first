//import axios from "axios";
import * as constants from "../../../constants";

// export const GetAwsInputConfig = (setGlobalInputData, setLoading, setErrorStr) => {
//   getData(constants.GetAwsInputConfigUrl, setGlobalInputData, setLoading, setErrorStr)
// }

export const GetBlueprintConfig = (setBlueprintConfig, setLoading, setErrorStr) => {
  getData(constants.GetBlueprintConfigUrl, setBlueprintConfig, setLoading, setErrorStr)
}

export const GetAzureWebAppConfig = (setWebConfig, setLoading, setErrorStr) => {
  getData(constants.GetAzureWebAppConfigUrl, setWebConfig, setLoading, setErrorStr)
}

export const GetGCPWebAppConfig = (setWebConfig, setLoading, setErrorStr) => {
  getData(constants.GetGcpWebAppConfigUrl, setWebConfig, setLoading, setErrorStr)
}
export const GetAWSWebAppConfig = (setWebConfig, setLoading, setErrorStr) => {
  getData(constants.GetAwsWebAppConfigUrl, setWebConfig, setLoading, setErrorStr)
}

const getData = (url, setData, setLoading, setErrorStr) => {
  //setLoading(true)
  // console.log(url)
  // axios.get(url).then(response => {
  //   console.log("---", response.data)
  //   setData(response.data);
  //   setLoading(false)
  // }).catch(error => {
  //   setErrorStr({error: "Error getting the inputConfig record. " + error});
  //   setLoading(false)
  // });
}

export const GetReceiver = (env, cluaterName) => {
  if (env === "prod" && cluaterName.startsWith("cloudtrust")) {
    return "ops_team"
  } else if (env === "prod") {
    return "blackhole"
  } else if (env === "qa" && cluaterName.startsWith("cloudtrust")) {
    return "ct_engineering_team"
  } else if (env === "qa") {
    return "blackhole"
  } else if (env === "dev") {
    return "blackhole"
  }
  return ""
}

export const GetInfraReceiver = (env, cluaterName) => {
  if (env === "prod") {
    return "ops_team"
  } else {
    return "ct_engineering_team"
  }
}
