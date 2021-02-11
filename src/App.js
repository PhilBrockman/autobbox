import React from 'react';
import {ScreenAnalyzer} from "BBoxEditor/ScreenAnalyzer"
import {addKey, stripToBare, reducer, yoloLabels} from "utilities/AppUtils"
import {initialState} from "Controls/initialState"
import {ControlPanel} from "Controls/Panel"
import {Thumbnails} from "./Thumbnails"
import {ResponsiveKeyboard} from "./BBoxEditor/ResponsiveKeyboard"
import {toJSON} from "utilities/Downloader"

let fname = "21-2-6 svhn"
fname = "21-1-29row-2"
fname = "21-2-7 lcds"
fname = "21-2-10 (1)lcds"
fname = "21-2-10 (2) lcds"
// let json = require( "./json/21-1-29row.json")
// let json = require( "./json/first20lcd2.json")
// let json = require("./json/rawdata1.json")
let json = require(`./json/${fname}.json`)

json = addKey(json)
json = stripToBare(json)
// json = json.slice(0, 50)

function useStickyState(defaultValue, key) {
  const [value, setValue] = React.useState(() => {
    const stickyValue = window.localStorage.getItem(key);
    return stickyValue !== null
      ? JSON.parse(stickyValue)
      : defaultValue;
  });
  React.useEffect(() => {
    window.localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);
  return [value, setValue];
}

function App() {
  const [screens , setScreenData] = React.useState(json)//useStickyState(json, `${fname}`);
  const [screenIndex, setScreenIndex] = React.useState(null);
  const [sysOptions, dispatchOptions] = React.useReducer( reducer, initialState)
  const [loaded, setLoaded] = React.useState(null);
  const [activeClass, setActiveClass] = React.useState(null);

  const opt = (name) => {
    return sysOptions.options.find(item => item.name===name);
  }
  React.useEffect(() => {
    setLoaded(false)
  }, [screenIndex])

  const dataSetter = (newScreen) => {
    console.log("setting new data")
    let updatedScreens = [...screens]
    updatedScreens[screenIndex] = {...newScreen}
    setScreenData(updatedScreens)
  }

  const removeDigit = (key) => {
    let updatedScreens = [...screens]
    let newDigits = updatedScreens[screenIndex].digits
    newDigits = newDigits.filter(item => item.key !== key)
    updatedScreens[screenIndex].digits = newDigits
    setScreenData(updatedScreens)
  }

  const advanceScreen = () => {
    if(screenIndex === null){
      setScreenIndex(0)
    } else if(screenIndex+1 < json.length){
      setScreenIndex(screenIndex + 1)
    } else {
      console.log("end of the line")
    }
  }

  const retreatScreen = () => {
    if(screenIndex === 0){
      setScreenIndex(null)
    } else if(screenIndex > 0){
      setScreenIndex(screenIndex - 1)
    } else {
      console.log("can't retreat")
    }
  }

  const setKeyToValue = (key, value) => {
    let updatedScreens = [...screens];
    updatedScreens[screenIndex].digits = updatedScreens[screenIndex].digits.map(item => {
      if(item.key === key){
        item.class_label = value
        return item
      } else {
        return item
      }
    })
    setScreenData(updatedScreens)
  }

  const setActiveSelection = (value) => {
    console.log("setting the active to ", value)
    setActiveClass(value)
  }

  const reselectActiveSelection = (adjustment) => {
    let newActiveClass = (activeClass + adjustment + yoloLabels.length) % yoloLabels.length;
    setActiveClass(newActiveClass);
  }

  const deleteCurrentScreen = () => {
      let newScreens = [...screens];
      newScreens.splice(screenIndex, 1);
      setScreenData(newScreens);
      retreatScreen();
  }

  return (
    <div className="App">
      <ResponsiveKeyboard
        screen={screens[screenIndex]}
        removeDigit={removeDigit}
        advanceScreen={advanceScreen}
        retreatScreen={retreatScreen}
        setKeyToValue={setKeyToValue}
        setActiveSelection={setActiveSelection}
        reselectActiveSelection={reselectActiveSelection}
        deleteCurrentScreen={deleteCurrentScreen}
        >
        <ScreenAnalyzer
          opt={opt}
          sysOptions={sysOptions}
          screen={screens[screenIndex]}
          updateDigitBoxes={dataSetter}
          screenIndex={screenIndex}
          loaded={loaded}
          setLoadedTrue={() => setLoaded(true)}
          activeClass={activeClass}
          />
      </ResponsiveKeyboard>
      <input type="button" onClick={() => toJSON(screens)} value="save results"></input>
      <ControlPanel
        opts={sysOptions}
        onChange={dispatchOptions}
        activeClass={activeClass}
        setActiveClass={setActiveClass}
        >
      </ControlPanel>
      <Thumbnails
        activeScreen={screenIndex}
        screens={screens}
        setScreenIndex={setScreenIndex}
        >
      </Thumbnails>
    </div>
  );
}

// <Inspector activeClass={activeClass}/>
/*
Array.from(document.querySelectorAll('*'))
  .reduce(function(pre, dom){
    var evtObj = getEventListeners(dom)
    Object.keys(evtObj).forEach(function (evt) {
      if (typeof pre[evt] === 'undefined') {
        pre[evt] = 0
      }
      pre[evt] += evtObj[evt].length
    })
    return pre
  }, {})
*/
// <Thumbnails
//   screens={screens}
//   activeScreen={screenIndex}
//   setScreenIndex={setScreenIndex}/>

// <ControlPanel
//   opts={sysOptions}
//   onChange={dispatchOptions}
//   >
// </ControlPanel>


export default App;
