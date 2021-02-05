import React from 'react'
import {CanvasImage} from "./CanvasImage"
import {BBoxes} from "./BBoxes"
import {SketchNewDigitLayer} from "./SketchNewDigitLayer"
import {canvas} from "utilities/SAUtils"

export const Canvas = (props) => {
  const [tmpDigit, setTmpDigit] = React.useState(null)
  const [loaded, setLoaded] = React.useState(null);

  const updateDigit = (index, updatedDigit) => {
    let updatedDigits = [...props.screen.digits]
    updatedDigits[index] = updatedDigit
    let screen = {...props.screen}
    props.updateDigitBoxes(screen)
  }

  React.useEffect(() => {
    if(loaded === null){
      setLoaded(true);
    } else {
      setLoaded(false);
    }
  }, [props.screenIndex])

  const constructTmpDigit = (history) => {
    let p1 = history.initialPoint
    let p2 = history.secondPoint
    let bbox = {
      xcent: (p1.x+p2.x)/2/canvasDims.width,
      ycent: (p1.y+p2.y)/2/canvasDims.height,
      width: Math.abs(p1.x - p2.x)/canvasDims.width,
      height: Math.abs(p1.y - p2.y)/canvasDims.height
    }
    return {
    key: history.key,
      class_label: 4,
      bbox: bbox,
    }
  }

  const constructDigitFromInteraction = (history) => {
    console.log("creating digit")
    let tmpDigit = constructTmpDigit(history)
    setTmpDigit(tmpDigit)
  }

  const pushTmpDigitToDigits = (history) => {
    console.log("pushing the tmp div to the digit")
    let tmp = constructTmpDigit(history)
    let screen = {...props.screen}
    screen.digits = [...digits, tmp]
    props.setScreenData(screen, props.screenIndex)
    setTmpDigit(null)
  }

  React.useEffect(() => {
    if(props.screen.digits && tmpDigit){
      setAdjustedDigits([...props.screen.digits, tmpDigit])
    } else if(digits){
      setAdjustedDigits([...props.screen.digits])
    } else {
      setAdjustedDigits([])
    }
  }, [props.screen.digits, tmpDigit])

  return <>
    <CanvasImage
      src={props.screen.base64}
      setLoadedTrue={() => setLoaded(true)}>
        <BBoxes
            {...props}
            loaded={loaded} />
    </CanvasImage>
  </>
}


  // <SketchNewDigitLayer
  //   activeCallback={constructDigitFromInteraction}
  //   createDigitCallback={pushTmpDigitToDigits}
  //   >

  //   </CanvasImage>
  // </SketchNewDigitLayer>


//   let box = e.target.parentElement.getBoundingClientRect()
//
//   let newAllScreens = [...allscreens]
//   let newScreen = {...newAllScreens[screenIndex]}
//   let newDigits = [...newScreen.digits];
//   newDigits[index] = tmp;
//   newScreen.digits = newDigits;
//   newAllScreens[screenIndex] = newScreen
//   setScreenData(newAllScreens)
// }
