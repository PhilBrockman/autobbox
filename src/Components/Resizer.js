import React, {useRef} from 'react';
require('./resizer.css')

export const Resizer = (props) => {
  let currentResizer = useRef(null)

  let original_mouse_x, original_mouse_y, element, width, height;
  let original_x, original_y, original_width, original_height;

  const handleMouseDown = (e, callback, keyValue) =>  {
    e.stopPropagation()

    element = currentResizer.current
    while(!element.classList.contains("bbox")){
      element = element.parentElement;
    }

    original_width = parseFloat(element.style.width)
    original_height = parseFloat(element.style.height)
    original_x = parseFloat(element.style.left);
    original_y = parseFloat(element.style.top);
    original_mouse_x = e.pageX;
    original_mouse_y = e.pageY;

    window.addEventListener('mousemove',resize)
    window.addEventListener('mouseup', stopResize)
  }


  const resize = (e) => {
    let minSize = 5
    if (currentResizer.current.classList.contains('bottom-right')) {
      width = original_width + (e.pageX - original_mouse_x);
      height = original_height + (e.pageY - original_mouse_y);
      if(width > minSize){
        element.style.width = width + 'px'
      }
      if(height > minSize){
        element.style.height = height + 'px'
      }
    }
    else if (currentResizer.current.classList.contains('bottom-left')) {
      width = original_width - (e.pageX - original_mouse_x)
      height = original_height + (e.pageY - original_mouse_y)
      if(width > minSize){
        element.style.width = width + 'px'
        element.style.left = original_x + (e.pageX - original_mouse_x) + 'px'
      }
      if(height > minSize){
        element.style.height = height + 'px'
      }
    }
    else if (currentResizer.current.classList.contains('top-right')) {
      width = original_width + (e.pageX - original_mouse_x)
      height = original_height - (e.pageY - original_mouse_y)
      if(width > minSize){
        element.style.width = width + 'px'
      }
      if(height > minSize){
        element.style.height = height + 'px'
        element.style.top = original_y + (e.pageY - original_mouse_y) + 'px'
      }
    }
    else {
      width = original_width - (e.pageX - original_mouse_x)
      height = original_height - (e.pageY - original_mouse_y)
      if(width > minSize){
        element.style.width = width + 'px'
        element.style.left = original_x + (e.pageX - original_mouse_x) + 'px'
      }
      if(height > minSize){
        element.style.height = height + 'px'
        element.style.top = original_y + (e.pageY - original_mouse_y) + 'px'
      }
    }
  }

  const stopResize = () => {
    console.log("released", element)
    props.onRelease(element)
    window.removeEventListener('mousemove',resize)
    window.removeEventListener('mouseup', stopResize)
  }
  let className = props.active ? 'resizer-active' : "resizer-inactive";
  return (
    <div
      ref={currentResizer}
      onMouseDown={handleMouseDown}
      className={`resizer ${className} ` + props.placement}
      >

    </div>
  );
}
