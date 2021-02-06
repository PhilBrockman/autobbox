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
      label: "show non-active (b)orders",
      name: "show-non-active-borders",
      type: "checkbox",
      value: false,
      keyshortcut: "b"
    },
    {
      label: "show (a)ll",
      name: "show-all",
      type: "checkbox",
      value: true,
      keyshortcut: "a"
    },
    {
      label: "show all (r)esizers",
      name: "show-all-resizers",
      type:"checkbox",
      value: false,
      keyshortcut: "r"
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
      label: "active opacity",
      name: "active-opacity",
      type: "range",
      value: 30,
      min: 0,
      max: 100
    },
    {
      label: "inactive opacity",
      name: "inactive-opacity",
      type: "range",
      value: 70,
      min: 0,
      max: 100
    }
  ]
}
