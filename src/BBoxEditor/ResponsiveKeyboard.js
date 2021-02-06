import React from 'react';

let mouse = {
  x: -1,
  y: -1
}

export const ResponsiveKeyboard = (props) => {
  const updateMousePosition = (e) => {
    mouse.x = e.clientX
    mouse.y = e.clientY
  }

  React.useEffect(() => {
    document.addEventListener("mousemove", updateMousePosition)
    return () => {
      document.removeEventListener("mousemove", updateMousePosition)
    }
  }, [])

  const removeDigit = props.removeDigit

  React.useEffect(() => {
    const keyListener = (e) => {
      // console.log("responsive", e.key)
      if(e.key === "\\") {
        let matches = activeRectanglesUnderMouse(props.digits, mouse)
        if(matches.length > 0){
          matches = matches.sort((a, b) => (document.getElementById(a.key).style.zIndex <
                                            document.getElementById(b.key).style.zIndex) ? 1 : -1)
          removeDigit(matches[0].key)
        }
      }
    }

    document.addEventListener("keydown", keyListener)
    return () => {
      document.removeEventListener("keydown", keyListener)
    }
  }, [removeDigit, props.digits])

  return(
    <>
      {props.children}
    </>
  )
}

function activeRectanglesUnderMouse(a, b){
  return a.filter(item => {
                    let rect = document.getElementById(item.key).getBoundingClientRect();
                    // console.log(rect)
                    return (
                      b.x >= rect.left &&
                      b.x <= rect.right &&
                      b.y >= rect.top &&
                      b.y <= rect.bottom
                    );
                  });
}
