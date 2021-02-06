export const yoloLabels = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0]

let usedIds = []
export const addKey = (data) => {
  for(var i = 0; i < data.length; i++){
    for(var j = 0; j < data[i].digits.length; j++){
      let tmp = data[i].digits[j]
      tmp.key = ID()
      data[i][j] = tmp
    }
    data[i].key = ID()
    data[i].filename = data[i].filename.replace("/", "")
  }
  return data
}

export var ID = function () {
  let tmpId;
  do {
    tmpId = '_' + Math.random().toString(36).substr(2, 9);
  } while(usedIds.includes(tmpId))
  usedIds.push(tmpId)
  return tmpId
};

export const stripToBare = (data) => {
  for(var i = 0; i < data.length; i++){
    let tmp = {}
    tmp.filename = data[i].filename;
    tmp.digits = data[i].digits;
    tmp.key = data[i].key;
    tmp.base64 = data[i].base64;
    data[i] = tmp;
  }
  return data
};

export const reducer = (state, e) => {
  if(e.action === "click"){
    let options = [...state.options]

    let item = options.find(item => item.name === e.target.name)
    let index = options.indexOf(item)
    item = {...item}

    switch(item.type){
      case "checkbox":
        item.value = e.target.checked
        break;
      case "text":
        item.value = e.target.value
        break;
      case "range":
        item.value = e.target.value
        break;
      default:
        console.log("failed to reduce")
    }

    options[index] = item
    state.options = options
    return {...state};
  }
}
