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
  const [screenIndex, setScreenIndex] = React.useState(0);
  const [sysOptions, dispatchOptions] = React.useReducer( reducer, initialState)

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

  return (
    <div className="App">

      <ResponsiveKeyboard
        digits={screens[screenIndex].digits}
        removeDigit={removeDigit}
        >
        <ScreenAnalyzer
            screen={screens[screenIndex]}
            updateDigitBoxes={dataSetter}
            screenIndex={screenIndex}
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
