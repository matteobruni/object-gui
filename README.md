# Object GUI - Javascript Object Editor

Object GUI is your fully customizable Javascript Object GUI Editor

## Usage

You can see a working sample here: <https://codepen.io/matteobruni/pen/oNxNvja>

### Installation

#### HTML / Vanilla JS

You need to include these files:

*CSS*

<https://cdn.jsdelivr.net/npm/object-gui@1.0.0-alpha.1/dist/css/object-gui.css>

*Javascript*

<https://cdn.jsdelivr.net/npm/object-gui@1.0.0-alpha.1/dist/js/object-gui.min.js>

#### ES 6 Imports

``` javascript
import {
    Editor
} from "object-gui"
```

#### CommonJS / Node.js

``` javascript
const Editor = require("object-gui");
```

### Usage

``` javascript
var data = {
    prop1: "pluto",
    group1: {
        prop1: "paperino"
    }
};

var editor = new Editor("sample", "Sample", data);

editor.theme("light");

var group1 = editor.container.addContainer("group1", "Group 1", false);

group1.addProperty(
    "group1_prop1",
    "Property 1",
    data.group1.prop1,
    "string",
    (value) => {
        data.group1.prop1 = value;

        console.log(data);
    }
);

editor.container.addProperty(
    "prop1",
    "Property 1",
    data.prop1,
    "string",
    (value) => {
        data.prop1 = value;

        console.log(data);
    }
);

editor.container.addButton("alert", "Alert", () => {
    alert(JSON.stringify(data));
});
```
