import React, { useMemo, useState, useEffect } from "react";
import Table from "./Table";
import data from './data/low_level_data.json';
import './css/App.css';

function App() {
  const columns = useMemo(
    () => [
      {
        Header: " ",
        columns: [
          {
            Header: " ",
          }
        ]
      },
      {
        Header: " ",
        columns: [
          {
            Header: "Food Product",
            accessor: "Food product"
          }
        ]
      },
      {
        Header: " ",
        columns: [
          {
            Header: "Animal Feed",
            accessor: "Animal Feed"
          }
        ]
      },
      {
        Header: "Production",
        columns: [
          {
            Header: "Farm",
            accessor: "Farm"
          },
          {
            Header: "Processing",
            accessor: "Processing"
          }
        ]
      },
      {
        Header: "Distribution",
        columns: [
          {
            Header: "Transport",
            accessor: "Transport"
          },
          {
            Header: "Packaging",
            accessor: "Packaging"
          }
        ]
      }
    ]
  );

  return (
    <div className="App">
      <header className="App-header">
        <p>
          Carbon Crushers
        </p>
        <p className="App-sub-header">
          Carbon emissions from agriculture need to be designed out of our systems. Through carbon labels on packaging we aim to provide greater clarity for consumers.
        </p>
      </header>

      <Table 
        columns={columns} 
        data={data}
      />
    </div>
  );
}

export default App;
