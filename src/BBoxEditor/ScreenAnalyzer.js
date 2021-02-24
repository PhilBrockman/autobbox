import './styles/thumbnails.css';
import './styles/canvas.css';
import React from 'react';
import {Canvas} from "./Canvas";
import {canvas} from "utilities/SAUtils"

export const ScreenAnalyzer = (props) => {
  let numDigits = props.screen ? `Num digits: ${props.screen.digits.length} `  : null;
    return(
      <Targeter sysOptions={props.sysOptions}>
        <Canvas {...props} />
        {numDigits}
      </Targeter>
    );
}

const Targeter = (props) => {
  let guides = props.sysOptions.options.find(item => item.name==="show-guides").value;

  const guidingLines = (e) => {
    const v = document.querySelector('.vt');
    const h = document.querySelector('.hl');

    if(h && v && canvas()) {
      let height = Math.min(e.pageY, canvas().height)
      let width =  Math.min(e.pageX, canvas().width)
      if(!guides){
        height = 0;
        width = 0;
      }
      h.setAttribute("style", "top: " + height + `px; width: ${canvas().width}px;`)
      v.setAttribute("style", "left: " + width + `px; height: ${canvas().height}px;`)
    }
  }

  React.useEffect(() => {
    document.addEventListener("mousemove", guidingLines)
    return () => {document.removeEventListener("mousemove", guidingLines)}
  })
  return (
    <>
      {props.children}
    </>
  )

}




// import useMousePosition from "utilities/useMousePosition";
// function onlyUnique(value, index, self) {
//   return self.indexOf(value) === index;
// }
// const MetaData = (props) => {
//   let labels =  props.screen.digits.map(digit => digit.class_label)
//   let overview = labels.filter(onlyUnique).map(label => {
//     let subset = props.screen.digits.filter(item => item.class_label === label)
//     let datum = subset.map(d => {
//       return <li key={`MetaData-li-${d.key}`}>{JSON.stringify(d.bbox)}</li>
//     })
//     return <div key={`ul-${subset[0].key}`} style={{background:colorChooser(label,.3)}}>{humanReadableClassLabel(label)}<ul>{datum}</ul></div>
//   })
//   return <>{overview}</>
// }
// <MetaData
//   screen={props.screen}
//   >
// </MetaData>
