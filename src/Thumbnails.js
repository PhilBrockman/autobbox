import React from 'react';
import {imgCode} from "utilities/SAUtils"

export const Thumbnails = (props) => {
  let thumbnails = props.screens.map((img, index) => {
    let classes = ["thumbnail"]
    if(index === props.activeScreen){
      classes.push("active-thumbnail")
    }
    return(
        <img
          className={classes.join(" ")}
          key={index}
          position="absolute"
          src={imgCode(img.base64)}
          alt={img.alt}
          id={`thumbnail-${index}`}
          onClick={(e) => props.setScreenIndex(index)}
          >
          </img>
      );
  })

  return <>{thumbnails}</>
}
