export const initialState = {
  scale: 140,

  options : [
    // {
    //   label: "show (n)on-active",
    //   name: "show-non-active",
    //   type: "checkbox",
    //   value: false,
    //   keyshortcut: "n"
    // },
    {
      label: "show (a)ll",
      name: "show-all",
      type: "checkbox",
      value: true,
      keyshortcut: "a"
    },
    {
      label: "(c)onfidence values",
      name: "confidence",
      type: "checkbox",
      value: false,
      keyshortcut: "c"
    },
    {
      label: "show text (l)abels",
      name: "show-text-labels",
      type: "checkbox",
      value: true,
      keyshortcut: "l"
    },
    {
      label: "show (b)ounding boxes",
      name: "show-bboxes",
      type:"checkbox",
      value: true,
      keyshortcut: "b"
    },
    {
      label: "show (o)verlapping rects",
      name: "show-overlapping",
      type:"checkbox",
      value: true,
      keyshortcut: "o"
    },
    {
      label: "show (g)uiding lines",
      name: "show-guides",
      type:"checkbox",
      value: false,
      keyshortcut: "g"
    },
    {
      label: "clear active selections",
      name: "clear-active-selection",
      text: "(x)",
      type: "button",
      value: false,
      keyshortcut: "x"
    },
    {
      label: "label left padding",
      name: "text-left",
      type: "range",
      value: 30,
      min: 0,
      max: 100
    },
    {
      label: "label bottom padding",
      name: "text-bottom",
      type: "range",
      value: 30,
      min: 0,
      max: 100
    },
    {
      label: "box opacity",
      name: "box-opacity",
      type: "range",
      value: 30,
      min: 0,
      max: 100
    },
    {
      label: "text label opacity",
      name: "text-opacity",
      type: "range",
      value: 70,
      min: 0,
      max: 100
    }
  ]
}
