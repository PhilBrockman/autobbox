import React from 'react';
import {ID} from "utilities/AppUtils"


export const SketchNewDigitLayer = (props) => {
  const [mousePosition, setMousePosition] = React.useState()
  const [history, setHistory] = React.useState({})
  const [lastMousePosition, setLastMousePosition] = React.useState()

  const activeCallback = props.activeCallback;
  const createDigitCallback = props.createDigitCallback;

  const updateMousePosition = ev => {
    setMousePosition({ x: ev.clientX, y: ev.clientY });
  };

  const canvasKeyListener = React.useCallback((e) => {
    console.log("calling back key press",history)
    let newHistory = {...history}
    if(e.key === "n"){ //make new bounding box
      e.preventDefault()
      newHistory.key = ID();
      if(history.initialPoint){ //this is the second click
        newHistory.secondPoint = mousePosition
      } else { // this is the first click
        console.log("setting history")
        newHistory.initialPoint = mousePosition
      }
    }
    if(e.key === "Escape"){
      newHistory = {}
    }
    setHistory({...newHistory, lastPress: e.key })
  }, [mousePosition, history])

  React.useEffect(() => {
    if(history && history.initialPoint && history.secondPoint){
      console.log("both points are labeled")
      createDigitCallback(history)
      setHistory({})
    }
  }, [history, createDigitCallback])

  React.useEffect(() => {
    if(history.initialPoint){
      if(!lastMousePosition || (
        lastMousePosition.x !== mousePosition.x &&
        lastMousePosition.y !== mousePosition.y
          )){
        console.log("callllling")
        let tmp = {...history}
        tmp.secondPoint = mousePosition
        activeCallback(tmp);
        setLastMousePosition(mousePosition)
      }
    }
  }, [history,mousePosition, activeCallback])

  React.useEffect(() => {
    window.addEventListener("mousemove", updateMousePosition);
    return () => window.removeEventListener("mousemove", updateMousePosition);
  }, []);

  React.useEffect(() => {
    document.addEventListener("keyup",  canvasKeyListener)
      return () => {
        document.removeEventListener("keyup", canvasKeyListener)
      }
  }, [canvasKeyListener]);

  return (
    <>{props.children}</>
  )
}
