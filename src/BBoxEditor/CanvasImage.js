import React from 'react';
import {imgCode} from "utilities/SAUtils"

export const CanvasImage = (props) => {
  let guidingLines = props.opt("show-guides").value ? <div className="cursor">
    <div className="cursor-lines">
      <div className="vt" />
      <div className="hl" />
    </div>
  </div> : null;
  
  if(props.screen) {
    return (
    <>
      {guidingLines}
      <img
        id="screen"
        src={imgCode(props.screen.base64)}
        alt="LCD screen"
        className="canvasImage"
        onLoad={() => {props.setLoadedTrue()}}
        >
      </img>
      {props.children}
    </>);
  } else {
    return (
      <> <b>Press Enter to begin.</b> </>
    );
  }

}
