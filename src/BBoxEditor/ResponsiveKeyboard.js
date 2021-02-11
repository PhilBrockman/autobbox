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
  const setActiveSelection = props.setActiveSelection;
  const reselectActiveSelection = props.reselectActiveSelection;
  const deleteCurrentScreen = props.deleteCurrentScreen;
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
          removeDigit(matches[0].key);
        }
      } else if(e.key === "Enter"){
        advanceScreen();
      } else if(e.key === "Shift"){
        retreatScreen();
      } else if (e.key === "x") {
        setActiveSelection(null);
      } else if (e.key === "ArrowRight") {
        reselectActiveSelection(1);
      } else if (e.key === "ArrowLeft") {
        reselectActiveSelection(-1);
      } else if (e.key === '\''){
        deleteCurrentScreen();
      } else if(Number.isInteger(parseInt(e.key))){
        let value = yoloLabels.indexOf(parseInt(e.key));
        if(matches.length > 0){
          setKeyToValue(matches[0].key, value);
        } else {
          setActiveSelection(value);
        }
      }
    }

    document.addEventListener("keydown", keyListener);
    return () => {
      document.removeEventListener("keydown", keyListener);
    }
  }, [removeDigit, deleteCurrentScreen, advanceScreen, retreatScreen, setKeyToValue, setActiveSelection, reselectActiveSelection, digits])

  return(
    <>
      {props.children}
    </>
  )
}

function activeRectanglesUnderMouse(a, b){
  return a.filter(item => {
    let el = document.getElementById(item.key)
    if(el){
      let rect = el.getBoundingClientRect();
      return (
        b.x >= rect.left &&
        b.x <= rect.right &&
        b.y >= rect.top &&
        b.y <= rect.bottom
      );
    } else {
      return false;
    }
  });
}
