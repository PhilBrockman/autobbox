export const humanReadableClassLabel = (s) => {
  return (parseInt(s)+1)%10
}

export const canvas = () => {
  return document.querySelector(`#screen`);
}

export const imgCode = (b64) =>{
  return "data:image/png;base64,"+b64;
}

export const updateBBox = (el, index, screen, updater) => {
  let height = parseFloat(el.style.height);
  let width = parseFloat(el.style.width);
  let top = parseFloat(el.style.top);
  let left = parseFloat(el.style.left);

  let newScreen = {...screen}
  newScreen.digits[index] = {
    ...screen.digits[index],
    bbox: {
      height: (height)/canvas().height,
      width: (width)/canvas().width,
      ycent: (((height + top + top))/2)/canvas().height,
      xcent: (((width  +left + left))/2)/canvas().width
    },
  }

  updater(newScreen)
}
