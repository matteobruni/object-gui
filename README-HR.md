README na: [Indonezijskom](./README-ID.md)
README na: [Njemačkom](./README-DE.md)
README na: [Hebrejskom](./README-IL.md)
README na: [Španjolskom](./README-ES.md)
README na: [Portugalskom](./README-BR.md)
README na: [Nizozemskom](./README-NL.md)

# Object GUI - Javascript Object Editor

Object GUI je vaš potpuno prilagodljiv Javascript Object GUI Editor

[![Gitpod Ready-to-Code](https://img.shields.io/badge/Gitpod-ready--to--code-blue?logo=gitpod)](https://gitpod.io/#https://github.com/matteobruni/object-gui)

## Korištenje

Ovdje možete vidjeti primjer: <https://codepen.io/matteobruni/pen/oNxNvja>

### Instalacija

#### HTML / Vanilla JS

Morate uključiti ove datoteke:

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

### Korištenje

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
