import React from 'react';
import {imgCode} from "utilities/SAUtils"

export const CanvasImage = (props) => {

  return (
  <>
    <img
      id="screen"
      src={imgCode(props.src)}
      alt="LCD screen"
      className="canvasImage"
      onLoad={() => {props.setLoadedTrue()}}
      >
    </img>
    {props.children}
  </>);
}
