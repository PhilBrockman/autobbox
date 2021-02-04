import {BoundingBox} from "./BoundingBox"
import Draggable from "Components/draggable"

const updateBBox = (el, index, template, updater, dims) => {
  let height = parseFloat(el.style.height);
  let width = parseFloat(el.style.width);
  let top = parseFloat(el.style.top);
  let left = parseFloat(el.style.left);

  let updatedDigit = {
    ...template,
    bbox: {
      height: (height)/dims.height,
      width: (width)/dims.width,
      ycent: (((height + top + top))/2)/dims.height,
      xcent: (((width  +left + left))/2)/dims.width
    },
  }

  updater(index, updatedDigit)
}

export const BBoxes = (props) => {
  console.log("bboxes")
  if(props.canvasDims){
    return props.digits.map((digit, index) => {
      const bboxUpdater = (el) => {
        console.log("updating bbox")
        updateBBox(el, index, digit, props.updateDigit, props.canvasDims)
      }
      return (
        <Draggable
          key={digit.key}
          clickBack={(e) => console.log("click function", e, digit)}
          releaseDrag={(el) => bboxUpdater(el)}
          >
          <BoundingBox
            canvasDims={props.canvasDims}
            digitInfo={digit}
            digitIndex={index}
            updateBBox={(el) => bboxUpdater(el)}
            >
          </BoundingBox>
        </Draggable>
      )}
    )
  } else {
    return <>loading...</>
  }
}
