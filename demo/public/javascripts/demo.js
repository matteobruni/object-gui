const code = document.getElementById("code");

const data = {
  enable: true,
  prop1: "pluto",
  prop2: 3,
  group1: {
    prop1: "paperino",
    prop2: 0.3,
  },
  color1: "#ff0000",
  color2: {
    r: 255,
    g: 0,
    b: 0
  },
  color3: {
    h: 0,
    s: 100,
    l: 50
  },
  color4: {
    h: 0,
    s: 100,
    v: 100
  },
  select1: "Item 2",
  alert: function () {
    alert(JSON.stringify(data, null, 4));
  },
};

const editor = new Editor("sample", "Sample", data);

editor.top().right().theme("neu-dark");

const group1 = editor.root.addGroup("group1", "Group 1", true);

group1.addProperty("prop1", "Property 1", "string").change(() => {
  code.innerText = JSON.stringify(data, null, 4);

  console.log(data);
});

group1
  .addProperty("prop2", "Property 2", "number")
  .min(0)
  .max(1)
  .step(0.01)
  .change(() => {
    code.innerText = JSON.stringify(data, null, 4);

    console.log(data);
  });

editor.root.addProperty("enable", "Enable", "boolean").change(() => {
  code.innerText = JSON.stringify(data, null, 4);

  console.log(data);
});

editor.root.addProperty("prop1", "Property 1", "string").change(() => {
  code.innerText = JSON.stringify(data, null, 4);

  console.log(data);
});

editor.root
  .addProperty("prop2", "Property 2", "number")
  .min(0)
  .max(10)
  .step(0.5)
  .change(() => {
    code.innerText = JSON.stringify(data, null, 4);

    console.log(data);
  });

editor.root.addProperty("color1", "Color 1", "color").change(() => {
  code.innerText = JSON.stringify(data, null, 4);

  document.getElementById("colorPreview1").style.backgroundColor = data.color1;

  console.log(data);
});

editor.root.addProperty("color2", "Color 2", "color").change(() => {
  code.innerText = JSON.stringify(data, null, 4);

  document.getElementById("colorPreview2").style.backgroundColor = data.color2;

  console.log(data);
});

editor.root.addProperty("color3", "Color 3", "color").change(() => {
  code.innerText = JSON.stringify(data, null, 4);

  document.getElementById("colorPreview3").style.backgroundColor = data.color3;

  console.log(data);
});

editor.root.addProperty("color4", "Color 4", "color").change(() => {
  code.innerText = JSON.stringify(data, null, 4);

  document.getElementById("colorPreview4").style.backgroundColor = data.color4;

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

document.getElementById("colorPreview1").style.backgroundColor = data.color1;
document.getElementById("colorPreview2").style.backgroundColor = data.color2;
document.getElementById("colorPreview3").style.backgroundColor = data.color3;
document.getElementById("colorPreview4").style.backgroundColor = data.color4;
