import {useLocation} from "react-router-dom";
import React, {useEffect, useState} from "react";
//import axios from "axios";
import Rjv from "react-json-tree-viewer";

const SubmitNewCluster = (props) => {
  const [input, setInput] = useState({})
  const [error, setError] = useState("Record Generated")
  const location = useLocation();

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    let requestId = queryParams.get("requestId")
    let name = queryParams.get("name")
    let env = queryParams.get("env")
    let region = queryParams.get("region")
    let cloud = queryParams.get("cloud")
    let subscription = queryParams.get("subscription")
    let gcpProjectId = queryParams.get("gcpProjectId")

    let url = ""
    if (requestId !== null && requestId !== "") {
      url = `${process.env.REACT_APP_API_URL}/kubeyard/api/v1/getFoundationBlueprint?requestId=${requestId}`
      setError("Blueprint added")
    } else {
      if (cloud === "gcp") {
        url = `${process.env.REACT_APP_API_URL}/kubeyard/api/v1/getCluster?name=${name}&env=${env}&region=${region}&cloud=${cloud}&gcpProjectId=${gcpProjectId}`
        setError(`GIR PR Generated for cluster [name=${name}&env=${env}&region=${region}&cloud=${cloud}&gcpProjectId=${gcpProjectId}]`)
      } else if (cloud === "azure") {
        url = `${process.env.REACT_APP_API_URL}/kubeyard/api/v1/getCluster?name=${name}&env=${env}&region=${region}&cloud=${cloud}&subscription=${subscription}`
        setError(`GIR PR Generated for cluster [name=${name}&env=${env}&region=${region}&cloud=${cloud}&subscription=${subscription}]`)
      } else if (cloud === "aws") {
        //No need to send any account details incase of AWS. Account id will be retrieved based on env
        url = `${process.env.REACT_APP_API_URL}/kubeyard/api/v1/getCluster?name=${name}&env=${env}&region=${region}&cloud=${cloud}`
        setError(`GIR PR Generated for cluster [name=${name}&env=${env}&region=${region}&cloud=${cloud}]`)
      }
    }

  //   axios.get(url).then(response => {
  //     setInput(response.data)
  //   }).catch(error => {
  //     setInput({error: error})
  //   });
  // }, [location]);

  const errorFunc = () => {
    if (input && input.error && input.error !== "") {
      return "Error creating cluster or Pull request:" + input.error
    } else {
      return error
    }
  }

  const getColor = () => {
    if (input && input.error && input.error !== "") {
      return "red"
    } else {
      return "green"
    }
  }

  return (
    <div>
      <h5 style={{color: getColor()}}><i>{errorFunc()}</i></h5>
      <Rjv data={input} hideRoot={true}/>
    </div>
  );
}

export default SubmitNewCluster
