import React from 'react';
import {ScreenAnalyzer} from "BBoxEditor/ScreenAnalyzer"
import {addKey, stripToBare, reducer} from "utilities/AppUtils"
import {initialState} from "Controls/initialState"
import {ControlPanel} from "Controls/Panel"
import {Thumbnails} from "./Thumbnails"
import {ResponsiveKeyboard} from "./BBoxEditor/ResponsiveKeyboard"

let json = require( "./json/21-1-29row.json")
// let json = require( "./json/first20lcd2.json")
// let json = require("./json/rawdata1.json")

json = addKey(json)
json = stripToBare(json)

function App() {
  const [screens , setScreenData] = React.useState(json)
  const [screenIndex, setScreenIndex] = React.useState(null);
  const [sysOptions, dispatchOptions] = React.useReducer( reducer, initialState)
  const [loaded, setLoaded] = React.useState(null);

  React.useEffect(() => {
    setLoaded(false)
  }, [screenIndex])

  const dataSetter = (newScreen) => {
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
    // let digit = updatedScreens[screenIndex].digits.filter(item => item.key === key);
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

  return (
    <div className="App">
      <ResponsiveKeyboard
        screen={screens[screenIndex]}
        removeDigit={removeDigit}
        advanceScreen={advanceScreen}
        retreatScreen={retreatScreen}
        setKeyToValue={setKeyToValue}
        >
        <ScreenAnalyzer
          sysOptions={sysOptions}
          screen={screens[screenIndex]}
          updateDigitBoxes={dataSetter}
          screenIndex={screenIndex}
          loaded={loaded}
          setLoadedTrue={() => setLoaded(true)}
          />
      </ResponsiveKeyboard>
      <ControlPanel
        opts={sysOptions}
        onChange={dispatchOptions}
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
