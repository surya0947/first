import React, {useEffect, useState} from 'react'
import {CBadge, CButton, CFormInput, CListGroup, CListGroupItem} from "@coreui/react";

export default function TagsInput(props) {
  const [tags, setTags] = useState(props.tags);
  const [TAG, setTAG] = useState("");

  useEffect(() => {
    if (props.tags && props.tags.length > 0) {
      setTags([...props.tags])
    }
  }, [props.tags])

  const removeTags = indexToRemove => {
    setTags([...tags.filter((_, index) => index !== indexToRemove)]);
  };

  const addTags = event => {
    if (event.target.value !== "") {
      validateAndAdd();
    }
  };

  const validateAndAdd = () => {
    let found = false
    if (TAG.includes(" ") || TAG.includes("\t") || TAG.includes("\n")) {
      found = true
      alert("String [" + TAG + "] should not contain spaces, tabs and newlines")
      return false
    }
    if (props.keyValue === true) {
      let index = TAG.indexOf(":")
      let len = TAG.length
      if (index <= 0 || index >= len - 1) {
        found = true
        alert("String [" + TAG + "] should contain \":\" for key:value")
        return false
      }
    }

    tags.length > 0 && tags.forEach(function (item, i) {
      if (item === TAG) {
        found = true
        alert("Value [" + TAG + "] already present in the list")
        return false
      }
    })
    if (found === false) {
      setTags([...tags, TAG]);
      setTAG("")
    }
  }
  const addTags1 = () => {
    if (TAG !== "") {
      validateAndAdd();
    }
  };

  const handleFirstNameChange = ({target}) => {
    setTAG(target.value);
  };

  const onKeyUp = (event) => {
    if (event.key === "Enter") {
      addTags(event)
    }
  }

  return (
    <>
      <input type="hidden" name={props.name} value={tags} ref={props.register}/>
      <CListGroup>
        {tags && tags.map((tag, index) => (
          <CListGroupItem key={index} accent="dark">
            {tag}
            <CBadge className="float-right" color="danger" onClick={() => removeTags(index)}>X</CBadge>
          </CListGroupItem>
        ))}
      </CListGroup>

      <div className="input-group">
        <CFormInput type="text" name={props.name + "-1"} onKeyUp={onKeyUp}
                placeholder={props.placeholder} value={TAG} onChange={handleFirstNameChange}/>
        <CButton disabled={false} size="sm" color="info" onClick={addTags1}><b>Add+</b></CButton>
      </div>
    </>
  );
};


