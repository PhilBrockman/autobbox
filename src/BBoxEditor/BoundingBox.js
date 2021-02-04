import {Resizer} from "Components/Resizer.js"
import 'Components/resizer.css'
import {humanReadableClassLabel} from 'utilities/SAUtils.js'
import colorChooser from "utilities/Colors.js"
let opacity = .3;

export const BoundingBox =  (props) => {
  // if(!props.digitInfo || !props.canvasDims) {return <>failed bbox</>}
  let bbox = props.digitInfo.bbox
  let width = props.canvasDims.width;
  let height = props.canvasDims.height;

  const style = {
      top: height*(bbox.ycent - bbox.height/2),
      left: width*(bbox.xcent - bbox.width/2),
      width: width*(bbox.width),
      height: height*bbox.height,
      background: colorChooser(props.digitInfo.class_label,opacity),
      onselectstart:"return false"
    };

  return (
      <div
        className='bbox'
        style={style}
        >
        {humanReadableClassLabel(props.digitInfo.class_label)}
        <Resizable {...props} />
      </div>
  )
}

const Resizable = (props) => {
  let resizers = ['top-left', 'top-right', 'bottom-left', 'bottom-right'].map((item, index)=> {
        return(<Resizer
                    {...props}
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
