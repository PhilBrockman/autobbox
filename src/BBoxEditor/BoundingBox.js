import {canvas} from 'utilities/SAUtils.js'
import {yoloLabels} from 'utilities/AppUtils'
import colorChooser from "utilities/Colors.js"

export const BoundingBox =  (props) => {
  let digit = props.digit;
  let bbox = digit.bbox;
  let width = canvas().width;
  let height = canvas().height;
  let display = true;

  let backgroundOpacity = props.opt("box-opacity").value/100;
  let textOpacity = props.opt("text-opacity").value/100

  if(!props.opt("show-text-labels").value){
    textOpacity = 0;
  }

  if(!props.opt("show-bboxes").value){
    backgroundOpacity = 0;
    display = false;
  }

  if(!props.opt("show-all").value && parseInt(digit.class_label) !== parseInt(props.activeClass)) {
    backgroundOpacity = 0;
    textOpacity = 0;
    display = false;
  }

  const style = {
      top: height*(bbox.ycent - bbox.height/2),
      left: width*(bbox.xcent - bbox.width/2),
      width: width*(bbox.width),
      height: height*bbox.height,
      background: colorChooser(digit.class_label, backgroundOpacity),
      onselectstart:"return false"
    };

  if(display){
    return (
      <div
        className='bbox'
        style={style}
        id={digit.key}
        >
        <div>{digit.confidence}</div>
        <div style={{bottom:`${props.opt('text-bottom').value}%`, left:`${props.opt('text-left').value}%`, position:"absolute", opacity: textOpacity, color:"#FFF"}}>
          {yoloLabels[digit.class_label]}
        </div>
        {props.children}
      </div>
    )
  } else {
    return <></>;
  }
}
