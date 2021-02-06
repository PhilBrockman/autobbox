import React from 'react';
import {ScreenAnalyzer} from "BBoxEditor/ScreenAnalyzer"
// import {ControlPanel} from "ControlPanel/ControlPanel"
import {addKey, stripToBare} from "utilities/AppUtils"
// import {initialState} from "ControlPanel/initialState"
// import {reducer} from "utilities/AppUtils"
import {Thumbnails} from "./Thumbnails"

let json = require( "./json/21-1-29row.json")
// let json = require( "./json/first20lcd2.json")
// let json = require("./json/rawdata1.json")

json = addKey(json)
json = stripToBare(json)

function App() {
  const [screens , setScreenData] = React.useState(json)
  const [screenIndex, setScreenIndex] = React.useState(0);
  // const [sysOptions, dispatchOptions] = React.useReducer( reducer, initialState)

  const dataSetter = (newScreen) => {
    let updatedScreens = [...screens]
    updatedScreens[screenIndex] = {...newScreen}
    setScreenData(updatedScreens)
  }

  return (
    <div className="App">
      <ScreenAnalyzer
          screen={screens[screenIndex]}
          updateDigitBoxes={dataSetter}
          screenIndex={screenIndex}
        >
      </ScreenAnalyzer>
      <Thumbnails
        activeScreen={screenIndex}
        screens={screens}
        setScreenIndex={setScreenIndex}
        >
      </Thumbnails>
    </div>
  );
}


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
