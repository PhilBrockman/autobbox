export const humanReadableClassLabel = (s) => {
  return (parseInt(s)+1)%10
}

export const canvas = () => {
  return document.querySelector(`#screen`);
}

export const imgCode = (b64) =>{
  return "data:image/png;base64,"+b64;
}
