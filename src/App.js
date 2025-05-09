import logo from "./logo.svg";
import "./App.css";
import { useState } from "react";
// Parent 1
// Child 1-1
// Child 1-2
// Child 1-3
// Grandchild 1-3-1
// Grandchild 1-3-2
// Parent 2
// Child 2-1
// Child 2-2

const fieldsConfig = [
  {
    name: "Parent 1",
    id: "p1",
    markedFieldCount: 0,
    checked: false,
  },
  {
    name: "Child 1-1",
    id: "c11",
    markedFieldCount: 0,
    checked: false,
    parentId: "p1",
  },
  {
    name: "Child 1-2",
    id: "c12",
    markedFieldCount: 0,
    checked: false,
    parentId: "p1",
  },
  {
    name: "Child 1-3",
    id: "c13",
    markedFieldCount: 0,
    checked: false,
    parentId: "p1",
  },
  {
    name: "Grandchild 1-3-1",
    id: "g111",
    markedFieldCount: 0,
    checked: false,
    parentId: "c13",
  },
  {
    name: "Grandchild 1-3-2",
    id: "g112",
    markedFieldCount: 0,
    checked: false,
    parentId: "c13",
  },
  {
    name: "Parent 2",
    id: "p2",
    markedFieldCount: 0,
    checked: false,
  },
  {
    name: "Child 2-1",
    id: "c21",
    markedFieldCount: 0,
    checked: false,
    parentId: "p2",
  },
  {
    name: "Child 2-2",
    id: "c22",
    markedFieldCount: 0,
    checked: false,
    parentId: "p2",
  },
];
function App() {
  const [fields, setFields] = useState(fieldsConfig);

  const markFieldBottomUp = (currentField, checked) => {
    const parentField = fieldsConfig.find(
      (field) => field.id === currentField.parentId
    );
    if (parentField) {
      if (checked) {
        parentField.markedFieldCount++;
      } else {
        parentField.markedFieldCount--;
      }

      const numberOfSiblings = fields.filter(
        (field) => field.parentId === currentField.parentId
      ).length;
      if (parentField.markedFieldCount === numberOfSiblings) {
        parentField.checked = true;
        console.log("mark ", parentField.id);
        // markFieldBottomUp(parentField, parentField.checked);
      }
    }
  };

  const handleChange = (e) => {
    const { checked, id } = e.target;
    const currentField = fieldsConfig.find((field) => field.id === id);
    currentField.checked = checked;
    markFieldBottomUp(currentField, checked);
  
    setFields(fieldsConfig);
    console.log(JSON.stringify(fields), 'fields state');
  };

  const CheckInput = ({ config }) =>
    config.map((field) => {
      console.log(JSON.stringify(field), "field");
      return (
        <>
          <input
            type="checkbox"
            id={field.id}
            value={field.checked}
            onChange={handleChange}
            parentId={field.parentId}
          />
          <label for={field.id}>
            {field.name} - {field.checked}
          </label>
          <br />
          {field.children && <CheckInput config={field.children} />}
        </>
      );
    });

  return <CheckInput config={fields} />;
}

export default App;
