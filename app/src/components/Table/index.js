"use client";
import React from "react";
import styles from "./Table.module.css";

const Table = ({ rows, columns, onCellClick }) => {
  const handleCellClick = (row, cellId) => {
    onCellClick(row, cellId);
  };

  if (rows?.length && columns?.length)
    return (
      <table className={styles.container}>
        <thead>
          <tr>
            {columns.map((column) => (
              <th key={column.id}>{column.value}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row.id}>
              {row.cells.map((cell) => {
                let className, onClick;
                if (cell.clickable) {
                  className = styles.clickable;
                  onClick = () => handleCellClick(row, cell.id);
                }
                let value = cell.value;
                if (typeof value === "number") value = value.toString().replace(".", ",");
                return (
                  <td key={cell.id} className={className} onClick={onClick}>
                    {value}
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    );
};

export default Table;
