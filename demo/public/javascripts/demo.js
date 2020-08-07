var code = document.getElementById("code");

var data = {
  prop1: "pluto",
  prop2: 3,
  group1: {
    prop1: "paperino",
    prop2: 0.3
  },
  color1: "#ff0000",
  select1: "Item 1",
  alert: function () {
    alert(JSON.stringify(data, null, 4));
  }
};
var editor = new Editor("sample", "Sample", data);

editor.top().right();
editor.theme("light");

var group1 = editor.root.addGroup("group1", "Group 1", true);

group1.addProperty(
  "prop1",
  "Property 1",
  data.group1.prop1,
  "string",
  (value) => {
    code.innerText = JSON.stringify(data, null, 4);

    console.log(data);
  }
);

const group1prop2Input = group1.addProperty(
  "prop2",
  "Property 2",
  data.group1.prop2,
  "number",
  (value) => {
    code.innerText = JSON.stringify(data, null, 4);

    console.log(data);
  }
);

group1prop2Input.min(0).max(1).step(0.01);

editor.root.addProperty(
  "prop1",
  "Property 1",
  data.prop1,
  "string",
  (value) => {
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
    code.innerText = JSON.stringify(data, null, 4);

    console.log(data);
  }
);

prop2Input.min(0).max(10).step(0.5);

editor.root.addProperty("color1", "Color 1", data.color1, "color", (value) => {
  data.color1 = value;
  code.innerText = JSON.stringify(data, null, 4);

  console.log(data);
});

const select1Input = editor.root.addProperty("select1", "Select 1", data.select1, "select", (value) => {
  data.select1 = value;
  code.innerText = JSON.stringify(data, null, 4);

  console.log(data);
});

select1Input.addItem("Item 1");
select1Input.addItem("Item 2");
select1Input.addItem("Item 3");

editor.root.addButton("alert", "Alert", () => {

});

code.innerText = JSON.stringify(data, null, 4);

