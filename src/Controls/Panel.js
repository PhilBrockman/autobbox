import React from 'react'
import {cpName} from "utilities/ControlPanelUtils.js"
import {yoloLabels} from "utilities/AppUtils"

const Input = (props) => {
  const { value, label, ...others} = props
  let tmp

  others.id = cpName(props)

  if(props.type === "text") {
    tmp = <input {...others} value={props.value} />
  }
  if(props.type === "range") {
    tmp = <><input {...others} value={props.value} /> {props.value}</>
  }
  if(props.type === "checkbox") {
    tmp = <input {...others} checked={props.value} />
  }
  if(props.type === "button") {
    tmp = <input {...others} value={props.text} />
  }

  return (<div>{label} {tmp}</div>);
}

export const ControlPanel = (props) => {
  React.useEffect(() => {
    const keyListener = (e) => {
      let option = props.opts.options.find(item => item.keyshortcut === e.key) ;
      if(option){
        document.getElementById(cpName(option)).click();
      }
    };

    document.addEventListener("keydown",keyListener)
    return () => {
      document.removeEventListener("keydown", keyListener)
    }
  }, [props.opts.options]);

  let panel = props.opts.options.map(item => {
    return <Input
              {...item}
              onChange={(e) => props.onChange({...e, action: "click"})}
              key={"input-"+item.name}
              />
  })
  return(
    <>
    <SelectorDisplay
      choices={yoloLabels}
      activeClass={props.activeClass}
      setActiveClass={props.setActiveClass}
    />
    <fieldset>
      <legend>Control Panel</legend>
      {panel}
    </fieldset>
    </>
  );
}

const SelectorDisplay = (props) => {
  let tmp = (
    Object.keys(props.choices).map(function(key) {
      let className = (a, b) => {
        if(parseInt(a) === parseInt(b)){
          return "active"
        } else {
          return ""
        }
      }

      return (<input
              type = "button"
              value={props.choices[key]}
              key={`selector-${key}`}
              onClick={()=>props.setActiveClass(key)}
              className={className(props.activeClass, key)}
              />)
    })
  );

  return (
    <>{tmp} </>
  );
}



//
// <input type="text" name="chx" value={props.opts.chx} onChange={props.onChange} />
// <input type="text" name="other" value={props.opts.other} onChange={props.onChange} />
// <input type="checkbox" name="box" value={props.opts.box} onChange={props.onChange} />
