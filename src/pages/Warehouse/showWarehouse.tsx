import { Button, Table } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";

export default function ShowWarehouse() {
  const [items, setItems] = React.useState<any[]>([]);

  // Fetch items from local storage or API (mocked here)
  React.useEffect(() => {
    const data = JSON.parse(localStorage.getItem("items") || "[]");
    setItems(data);
  }, []);

  const handleDelete = (id: number) => {
    const updatedItems = items.filter((item) => item.id !== id);
    setItems(updatedItems);
    localStorage.setItem("items", JSON.stringify(updatedItems));
  };

  return (
    <div>
      <h2>Warehouse Items</h2>
      <Link to="/create">
        <Button variant="contained">Add Item</Button>
      </Link>
      <Table>
        {/* Table headers */}
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item) => (
            <tr key={item.id}>
              <td>{item.id}</td>
              <td>{item.name}</td>
              <td>
                <Link to={`/edit/${item.id}`}>
                  <Button>Edit</Button>
                </Link>
                <Button onClick={() => handleDelete(item.id)}>Delete</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
}
