export const humanReadableClassLabel = (s) => {
  return (parseInt(s)+1)%10
}

export const canvas = () => {
  return document.querySelector(`#screen`);
}

export const imgCode = (b64) =>{
  return "data:image/png;base64,"+b64;
}

export function showOverlappingBoxes(screen){
  let currScreen = document.getElementById("screen")
  console.log("screen", currScreen)
  if(currScreen){
    let digits = screen.digits.filter((digit, index) => hasOverlappingBuddy(digit, screen.digits, index))
    console.log("digits", digits)
    let overlappers = digits.map((digit,index) =>
      <div key={index}
           style= {{top: digit.bbox.ycent * currScreen.height - 3,
                    left: digit.bbox.xcent * currScreen.width - 3}}
           className = "overlap-indicator">
      </div> );
    return (
      overlappers
    );
  } else {
    return null
  }
}

const hasOverlappingBuddy = (center, digits, index) => {
  let minus = [...digits];
  minus.splice(index, 1);
  let tmp = minus.map(digit => doesOverlap(center.bbox, digit.bbox))
  return (tmp.includes(true));
}

const doesOverlap = (bbox1, bbox2) =>{
  let topleft = {
    x: bbox2.xcent - bbox2.width/2,
    y: bbox2.ycent - bbox2.height/2
  }
  let botRight = {
    x: bbox2.xcent + bbox2.width/2,
    y: bbox2.ycent + bbox2.height/2
  }

  return (
    bbox1.xcent >= topleft.x &&
    bbox1.xcent <= botRight.x &&
    bbox1.ycent >= topleft.y &&
    bbox1.ycent <= botRight.y
  );
}
