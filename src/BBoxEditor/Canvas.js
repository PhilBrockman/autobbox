import React from 'react'
import {CanvasImage} from "./CanvasImage"
import {BBoxes} from "./BBoxes"
import {canvas} from "utilities/SAUtils"
// import {SketchNewDigitLayer} from "./SketchNewDigitLayer"


export const Canvas = (props) => {
  // console.log("canvas props", props)
  const [canvasDims, setCanvasDims] = React.useState(null)
  // const [digits, setDigits] = React.useState(null)
  const [tmpDigit, setTmpDigit] = React.useState(null)
  // const [adjustedDigits, setAdjustedDigits] = React.useState(digits)
  //
  // React.useEffect(() => {
  //   setDigits(props.screen.digits)
  // }, [props.screen.digits])
  //
  React.useEffect(() => {
    const updateCanvasDims = () => { setCanvasDims({width: canvas().width, height: canvas().height}); }
    updateCanvasDims()
    window.addEventListener("resize", () => updateCanvasDims());
    return () => {
      window.removeEventListener("resize", updateCanvasDims);
    }
  }, [])
  //
  const updateDigit = (index, updatedDigit) => {
    let updatedDigits = [...props.screen.digits]
    updatedDigits[index] = updatedDigit
    let screen = {...props.screen}
    props.updateDigitBoxes(screen)
  }
  //
  // const constructTmpDigit = (history) => {
  //   let p1 = history.initialPoint
  //   let p2 = history.secondPoint
  //   let bbox = {
  //     xcent: (p1.x+p2.x)/2/canvasDims.width,
  //     ycent: (p1.y+p2.y)/2/canvasDims.height,
  //     width: Math.abs(p1.x - p2.x)/canvasDims.width,
  //     height: Math.abs(p1.y - p2.y)/canvasDims.height
  //   }
  //   return {
  //   key: history.key,
  //     class_label: 4,
  //     bbox: bbox,
  //   }
  // }
  //
  // const constructDigitFromInteraction = (history) => {
  //   console.log("creating digit")
  //   let tmpDigit = constructTmpDigit(history)
  //   setTmpDigit(tmpDigit)
  // }
  //
  // const pushTmpDigitToDigits = (history) => {
  //   console.log("pushing the tmp div to the digit")
  //   let tmp = constructTmpDigit(history)
  //   let screen = {...props.screen}
  //   screen.digits = [...digits, tmp]
  //   props.setScreenData(screen, props.screenIndex)
  //   setTmpDigit(null)
  // }
  //
  // React.useEffect(() => {
  //   if(digits && tmpDigit){
  //     setAdjustedDigits([...digits, tmpDigit])
  //   } else if(digits){
  //     setAdjustedDigits([...digits])
  //   } else {
  //     setAdjustedDigits([])
  //   }
  // }, [digits, tmpDigit])

  return <>
    <CanvasImage
      src={props.screen.base64}>
        <BBoxes
          digits={props.screen.digits}
          canvasDims={canvasDims}
          updateDigit={() => console.log("update bbox")}
          >
        </BBoxes>
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
