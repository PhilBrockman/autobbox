import {canvas} from 'utilities/SAUtils.js'
import {yoloLabels} from 'utilities/AppUtils'
import colorChooser from "utilities/Colors.js"

export const BoundingBox =  (props) => {
  let opacity = .3;
  // console.log("control panel options", props.sysOptions.options.find(item => item.name==="show-all").value)
  let digit = props.digit;
  let bbox = digit.bbox;
  let width = canvas().width;
  let height = canvas().height;

  if(props.sysOptions.options.find(item => item.name==="show-all").value) {
    console.log("show-all is false")
    opacity = 0
  }

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
      <div style={{bottom:0, left:0, position:"absolute", opacity: opacity, color:"#FFF"}}>
        {yoloLabels[digit.class_label]}
      </div>
      {props.children}
    </div>
  )
}
