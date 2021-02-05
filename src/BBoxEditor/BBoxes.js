import {BoundingBox} from "./BoundingBox"
import Draggable from "Components/draggable"
import {canvas, updateBBox} from "utilities/SAUtils"

export const BBoxes = (props) => {
  if(props.loaded && props.screen.digits){
    return props.screen.digits.map((digit, index) => {
      return (
        <Draggable
          key={digit.key}
          clickBack={(e) => console.log("click function", e, digit)}
          releaseDrag={(e) => updateBBox(e, index, props.screen, props.updateDigitBoxes)}
          >
          <BoundingBox
            {...props}
            digitIndex={index}
            >
          </BoundingBox>
        </Draggable>
      )}
    )
  } else {
    return <>loading...</>
  }
}
