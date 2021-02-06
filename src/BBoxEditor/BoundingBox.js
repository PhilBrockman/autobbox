import {canvas} from 'utilities/SAUtils.js'
import {yoloLabels} from 'utilities/AppUtils'
import colorChooser from "utilities/Colors.js"



export const BoundingBox =  (props) => {
  // console.log("control panel options", props.sysOptions.options.find(item => item.name==="show-all").value)
  let digit = props.digit;
  let bbox = digit.bbox;
  let width = canvas().width;
  let height = canvas().height;

  let backgroundOpacity = props.sysOptions.options.find(item => item.name==="box-opacity").value/100;
  let textOpacity = props.sysOptions.options.find(item => item.name==="text-opacity").value/100

  const opt = (name) => {
    return props.sysOptions.options.find(item => item.name===name);
  }

  if(!opt("show-text-labels").value){
    textOpacity = 0;
  }

  if(!opt("show-bboxes").value){
    backgroundOpacity = 0;
  }

  if(!opt("show-all").value) {
    backgroundOpacity = 0;
    textOpacity = 0;
  }

  const style = {
      top: height*(bbox.ycent - bbox.height/2),
      left: width*(bbox.xcent - bbox.width/2),
      width: width*(bbox.width),
      height: height*bbox.height,
      background: colorChooser(digit.class_label, backgroundOpacity),
      onselectstart:"return false"
    };


  return (
    <div
      className='bbox'
      style={style}
      id={digit.key}
      >
      <div style={{bottom:0, left:0, position:"absolute", opacity: textOpacity, color:"#FFF"}}>
        {yoloLabels[digit.class_label]}
      </div>
      {props.children}
    </div>
  )
}
