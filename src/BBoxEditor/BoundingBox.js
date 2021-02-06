import {humanReadableClassLabel, canvas} from 'utilities/SAUtils.js'
import colorChooser from "utilities/Colors.js"
let opacity = .3;

export const BoundingBox =  (props) => {
  let digit = props.digit;
  let bbox = digit.bbox;
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
      id={digit.key}
      >
      <div style={{bottom:0, right:0, position:"absolute"}}>
        {humanReadableClassLabel(digit.class_label)}
      </div>
      {props.children}
    </div>
  )
}
