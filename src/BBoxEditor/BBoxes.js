import {BoundingBox} from "./BoundingBox"
import Draggable from "Components/draggable"
import {updateBBox} from "utilities/SAUtils"
import {Resizer} from "Components/Resizer.js"
import 'Components/resizer.css'
import {showOverlappingBoxes} from "utilities/BBoxEditorUtils"

let lastZ = 0;

export const BBoxes = (props) => {
  if(props.loaded && props.screen.digits){
    let definedDigits = props.screen.digits.map((digit, index) => {
      return (
        <Draggable
          key={digit.key}
          clickBack={(e) => e.style.zIndex = ++lastZ}
          releaseDrag={(e) => updateBBox(e, index, props.screen, props.updateDigitBoxes)}
          >
          <BoundingBox
            {...props}
            digit={digit}
            >
            <Resizable {...props} />
          </BoundingBox>
        </Draggable>
      )}
    )
    let tmpDigit;
    if(props.tmpDigit){
      tmpDigit = <>
        <BoundingBox
          {...props}
          digit={props.tmpDigit}
          >
        </BoundingBox>
      </>
    } else {
      tmpDigit = null;
    }
    return (<>
      {definedDigits}
      {showOverlappingBoxes(props.screen)}
      {tmpDigit}
    </>);
  } else {
    return <>loading...</>
  }
}

const Resizable = (props) => {
  let resizers = ['top-left', 'top-right', 'bottom-left', 'bottom-right'].map((item, index)=> {
        return(<Resizer
                    {...props}
                    onRelease={(e) => updateBBox(e, props.digitIndex, props.screen, props.updateDigitBoxes)}
                    placement={item}
                    key={item}
                  >
                  *
                </Resizer>);
      });
  return (
    <>
      <div className='resizable'>
        {props.children}
        <div className='resizers'>
          {resizers}
        </div>
      </div>
    </>
  );
}
