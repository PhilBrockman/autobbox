import './styles/thumbnails.css';
import './styles/canvas.css'
import colorChooser from "utilities/Colors.js"
import {humanReadableClassLabel} from 'utilities/BBoxEditor.js'
import React from 'react'
import {Canvas} from "./Canvas"

// import useMousePosition from "utilities/useMousePosition";

function onlyUnique(value, index, self) {
  return self.indexOf(value) === index;
}

const MetaData = (props) => {
  let labels =  props.screen.digits.map(digit => digit.class_label)
  let overview = labels.filter(onlyUnique).map(label => {
    let subset = props.screen.digits.filter(item => item.class_label === label)
    let datum = subset.map(d => {
      return <li key={`MetaData-li-${d.key}`}>{JSON.stringify(d.bbox)}</li>
    })
    return <div key={`ul-${subset[0].key}`} style={{background:colorChooser(label,.3)}}>{humanReadableClassLabel(label)}<ul>{datum}</ul></div>
  })
  return <>{overview}</>
}

export const ScreenAnalyzer = (props) => {
    return(
      <Canvas {...props} />
    );
}



// <MetaData
//   screen={props.screen}
//   >
// </MetaData>
