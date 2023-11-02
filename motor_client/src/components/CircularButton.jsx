import React, { useState } from "react";

const CircularButton = ({ selectedColor, onColorChange }) => {
  const colors = ["red", "black", "blue"];

  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
      {colors.map((color) => (
        <button
          key={color}
          style={{
            borderRadius: "50%",
            width: "30px",
            height: "30px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            cursor: "pointer",
            border: "2px solid transparent",
            backgroundColor: color,
            marginRight: "10px",
            border: color === selectedColor ? "2px solid green" : "2px solid transparent",
          }}
          onClick={() => onColorChange(color)}
        >
          {color === selectedColor && "✓"}
        </button>
      ))}
    </div>
  );
};

export default CircularButton;
