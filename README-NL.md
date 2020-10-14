README in: [Indonesisch](./README-ID.md)
README in: [Duits](./README-DE.md)
README in: [Hebreeuws](./README-IL.md)
README in: [Spaans](./README-ES.md)
README in: [Portugees](./README-BR.md)


# Object GUI - Javascript Object bewerker

Object GUI is een volledig aanpasbare Javascript Object GUI bewerker.

[![Gitpod Ready-to-Code](https://img.shields.io/badge/Gitpod-ready--to--code-blue?logo=gitpod)](https://gitpod.io/#https://github.com/matteobruni/object-gui)

## Gebruik

Een werkend voorbeeld kan hier gevonden worden: <https://codepen.io/matteobruni/pen/oNxNvja>

### Installatie

#### HTML / Vanilla JS

Deze files moeten zeker aanwezig zijn:

_CSS_

<https://cdn.jsdelivr.net/npm/object-gui@1.0.0-alpha.1/dist/css/object-gui.css>

_Javascript_

<https://cdn.jsdelivr.net/npm/object-gui@1.0.0-alpha.1/dist/js/object-gui.min.js>

#### ES 6 Imports

```javascript
import { Editor } from "object-gui";
```

#### CommonJS / Node.js

```javascript
const Editor = require("object-gui");
```

### Gebruik

```javascript
const code = document.getElementById("code");

const data = {
  prop1: "pluto",
  prop2: 3,
  group1: {
    prop1: "paperino",
    prop2: 0.3,
  },
  color1: "#ff0000",
  select1: "Item 2",
  alert: function () {
    alert(JSON.stringify(data, null, 4));
  },
};

const editor = new Editor("sample", "Sample", data);

editor.top().right();
editor.theme("light");

const group1 = editor.root.addGroup("group1", "Group 1", true);

group1.addProperty("prop1", "Property 1", "string").change(() => {
  console.log(data);
});

group1
  .addProperty("prop2", "Property 2", "number")
  .min(0)
  .max(1)
  .step(0.01)
  .change(() => {
    console.log(data);
  });

editor.root.addProperty("prop1", "Property 1", "string").change(() => {
  console.log(data);
});

editor.root
  .addProperty("prop2", "Property 2", "number")
  .min(0)
  .max(10)
  .step(0.5)
  .change(() => {
    console.log(data);
  });

editor.root.addProperty("color1", "Color 1", "color").change(() => {
  console.log(data);
});

const select1Input = editor.root.addProperty("select1", "Select 1", "select").change(() => {
  code.innerText = JSON.stringify(data, null, 4);

  console.log(data);
});

select1Input.addItem("Item 1");
select1Input.addItem("Item 2");
select1Input.addItem("Item 3");

editor.root.addButton("alert", "Alert");

code.innerText = JSON.stringify(data, null, 4);
```
