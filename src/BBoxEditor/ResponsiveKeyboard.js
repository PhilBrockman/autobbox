import React from 'react';
import {yoloLabels} from 'utilities/AppUtils'

let mouse = {
  x: -1,
  y: -1
}

export const ResponsiveKeyboard = (props) => {
  const updateMousePosition = (e) => {
    mouse.x = e.clientX
    mouse.y = e.clientY
  }

  React.useEffect(() => {
    document.addEventListener("mousemove", updateMousePosition)
    return () => {
      document.removeEventListener("mousemove", updateMousePosition)
    }
  }, [])

  const removeDigit = props.removeDigit;
  const advanceScreen = props.advanceScreen;
  const retreatScreen = props.retreatScreen;
  const setKeyToValue = props.setKeyToValue;
  let digits = props.screen ? props.screen.digits : null;

  React.useEffect(() => {
    const keyListener = (e) => {
      let matches = [];
      if(digits){
        matches = activeRectanglesUnderMouse(digits, mouse)
        if(matches.length > 0){
          matches = matches.sort((a, b) => (document.getElementById(a.key).style.zIndex <
                                            document.getElementById(b.key).style.zIndex) ? 1 : -1)
        }
      }

      if(e.key === "\\") {
        if(matches.length > 0) {
          removeDigit(matches[0].key)
        }
      } else if(e.key === "Enter"){
        advanceScreen()
      } else if(e.key === "Shift"){
        retreatScreen()
      } else if(Number.isInteger(parseInt(e.key))){
        if(matches.length > 0){
          setKeyToValue(matches[0].key, yoloLabels.indexOf(parseInt(e.key)))
        }
      }
    }

    document.addEventListener("keydown", keyListener)
    return () => {
      document.removeEventListener("keydown", keyListener)
    }
  }, [removeDigit, advanceScreen, retreatScreen, setKeyToValue, digits])

  return(
    <>
      {props.children}
    </>
  )
}

function activeRectanglesUnderMouse(a, b){
  return a.filter(item => {
                    let rect = document.getElementById(item.key).getBoundingClientRect();
                    // console.log(rect)
                    return (
                      b.x >= rect.left &&
                      b.x <= rect.right &&
                      b.y >= rect.top &&
                      b.y <= rect.bottom
                    );
                  });
}
