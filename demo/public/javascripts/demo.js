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

  document.getElementById("colorPreview").style.backgroundColor = data.color1;

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

document.getElementById("colorPreview").style.backgroundColor = data.color1;
