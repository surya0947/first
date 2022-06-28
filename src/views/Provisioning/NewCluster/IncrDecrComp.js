import React, {useEffect, useState} from "react";
import {CButton, CButtonGroup, CFormInput} from '@coreui/react'

const GroupedButtons = (props) => {
  const [counter, setConunter] = useState(1)
  const handleIncrement = () => {
    setConunter(counter + 1);
  };

  const handleDecrement = () => {
    setConunter(counter > 1 ? counter - 1 : counter);
  };

  useEffect(() => {
    if (props.initValue) {
      setConunter(props.initValue)
    }
  }, [props.initValue]);


  return (
    <div>
      <CButtonGroup aria-label="small outlined button group">
        <CButton size="sm" shape="pill" color="info" onClick={handleDecrement}><b>-</b></CButton>
        <CButton>{counter}</CButton>
        <CButton size="sm" shape="pill" color="info" onClick={handleIncrement}><b>+</b></CButton>
      </CButtonGroup>
      <CFormInput type="hidden" id={"WorkerDetails." + props.name} name={"WorkerDetails." + props.name}
              innerRef={props.register} value={counter}/>
    </div>
  );
}

export default GroupedButtons;
