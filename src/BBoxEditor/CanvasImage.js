import React from 'react';
import {imgCode} from "utilities/SAUtils"

export const CanvasImage = (props) => {
  if(props.screen) {
    return (
    <>
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
