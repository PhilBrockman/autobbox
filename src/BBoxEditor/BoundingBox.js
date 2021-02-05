import {Resizer} from "Components/Resizer.js"
import 'Components/resizer.css'
import {humanReadableClassLabel, canvas, updateBBox} from 'utilities/SAUtils.js'
import colorChooser from "utilities/Colors.js"
let opacity = .3;

export const BoundingBox =  (props) => {
  let digit = props.screen.digits[props.digitIndex]
  let bbox = digit.bbox
  let width = canvas().width;
  let height = canvas().height;

  const style = {
      top: height*(bbox.ycent - bbox.height/2),
      left: width*(bbox.xcent - bbox.width/2),
      width: width*(bbox.width),
      height: height*bbox.height,
      background: colorChooser(digit.class_label,opacity),
      onselectstart:"return false"
    };

  return (
    <div
      className='bbox'
      style={style}
      >
      <div style={{bottom:0, right:0, position:"absolute"}}>
        {humanReadableClassLabel(digit.class_label)}
      </div>
      <Resizable {...props} />
    </div>
  )
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
