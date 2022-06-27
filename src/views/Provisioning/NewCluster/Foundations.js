import React from 'react';
import Rjv from 'react-json-tree-viewer'

const Foundations = (props) => {

  return (
    <section>
      <Rjv hideRoot={true} data={props.foundation}/>
    </section>
  )
}

export default Foundations
