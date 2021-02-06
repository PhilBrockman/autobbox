import React from 'react'
import {CanvasImage} from "./CanvasImage"
import {BBoxes} from "./BBoxes"
import {SketchNewDigitLayer} from "./SketchNewDigitLayer"
import {canvas} from "utilities/SAUtils"

export const Canvas = (props) => {
  const [tmpDigit, setTmpDigit] = React.useState(null)

  const constructTmpDigit = (history) => {
    let p1 = history.initialPoint
    let p2 = history.secondPoint
    let bbox = {
      xcent: (p1.x+p2.x)/2/canvas().width,
      ycent: (p1.y+p2.y)/2/canvas().height,
      width: Math.abs(p1.x - p2.x)/canvas().width,
      height: Math.abs(p1.y - p2.y)/canvas().height
    }
    return {
    key: history.key,
      class_label: 4,
      bbox: bbox,
    }
  }

  const constructDigitFromInteraction = (history) => {
    setTmpDigit(constructTmpDigit(history))
  }

  const pushTmpDigitToDigits = (history) => {
    let tmp = constructTmpDigit(history)
    let screen = {...props.screen}
    screen.digits = [...props.screen.digits, tmp]
    props.updateDigitBoxes(screen, props.screenIndex)
    setTmpDigit(null)
  }

  return(
  <>
    <SketchNewDigitLayer
      activeCallback={constructDigitFromInteraction}
      createDigitCallback={pushTmpDigitToDigits}
      >
        <CanvasImage
          screen={props.screen}
          setLoadedTrue={props.setLoadedTrue}
          opt={props.opt}
          >
            <BBoxes
                tmpDigit={tmpDigit}
                {...props} />
        </CanvasImage>
    </SketchNewDigitLayer>
  </>)
}
