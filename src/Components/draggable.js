
class Config {
  constructor(){
    this.default = {
      x: "NAN",
      y: "NAN"
    }
    this.dragging = false
    this.starting = {
        x: this.default.x,
        y: this.default.y
    }
  }

  initialPosition(pageX, pageY) {
    if(this.starting.x === this.default.x){
      this.starting.x = pageX
    }
    if(this.starting.y === this.default.y){
      this.starting.y = pageY
    }
  }
}

const mouseDown = (event, clickBack, releaseDrag) => {
  // event.stopPropagation()

  let config = new Config();
  let el = event.target;

  let shiftX = event.clientX - el.getBoundingClientRect().left;
  let shiftY = event.clientY - el.getBoundingClientRect().top;

  function stopDragging() {
    config.dragging = false
    document.removeEventListener('mousemove', onMouseMove);
    document.removeEventListener('keydown', escapeToQuit);


    if(Math.abs(config.starting.x - parseFloat(el.style.left )) > 3 ||
       Math.abs(config.starting.y - parseFloat(el.style.top)) > 3){
        if(releaseDrag){
          releaseDrag(el)
        }

    } else {
      console.log("click registered");
      if(clickBack){
        clickBack(el)
      }
    }
  }

  function escapeToQuit(evt){
    if (evt.key === "Escape" || evt.key === "Esc") {
        stopDragging();
    }
  }

  function onMouseMove(event) {
    if(config.dragging){
      moveAt(event.pageX, event.pageY);
    }
  }


  function moveAt(pageX, pageY) {
    el.style.left = pageX - shiftX + 'px';
    el.style.top = pageY - shiftY + 'px';
    config.initialPosition(pageX - shiftX , pageY - shiftY)
  }

  if(config.dragging){
    stopDragging();
  } else {
    config.dragging = true;
    el.style.position = 'absolute';

    moveAt(event.pageX, event.pageY);

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('keydown', escapeToQuit);

    el.onmouseup = function(e){
      stopDragging();
  };
  }
};


export default function Draggable(props){
  return <div
            className="draggable-box"
            onMouseDown={(e) => mouseDown(e,
                                          props.clickBack,
                                          props.releaseDrag)}>
            {props.children}
          </div>
}
