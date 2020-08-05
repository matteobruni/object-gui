var code = document.getElementById("code");

var data = {
    prop1: "pluto",
    prop2: 0,
    group1: {
        prop1: "paperino"
    },
    color1: "#ff0000"
};
var editor = new Editor("sample", "Sample", data);

editor.top().right();
editor.theme("light");

var group1 = editor.root.addGroup("group1", "Group 1", false);

group1.addProperty(
    "group1_prop1",
    "Property 1",
    data.group1.prop1,
    "string",
    (value) => {
        data.group1.prop1 = value;
        code.innerText = JSON.stringify(data, null, 4);

        console.log(data);
    }
);

editor.root.addProperty(
    "prop1",
    "Property 1",
    data.prop1,
    "string",
    (value) => {
        data.prop1 = value;
        code.innerText = JSON.stringify(data, null, 4);

        console.log(data);
    }
);

const prop2Input = editor.root.addProperty(
    "prop2",
    "Property 2",
    data.prop2,
    "number",
    (value) => {
        data.prop2 = value;
        code.innerText = JSON.stringify(data, null, 4);

        console.log(data);
    }
);

prop2Input.min(0).max(10).step(0.5);

editor.root.addProperty(
    "color1",
    "Color 1",
    data.color1,
    "color",
    (value) => {
        data.color1 = value;
        code.innerText = JSON.stringify(data, null, 4);

        console.log(data);
    }
);

editor.root.addButton("alert", "Alert", () => {
    alert(JSON.stringify(data, null, 4));
});

code.innerText = JSON.stringify(data, null, 4);

