import React from "react";
import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";

function CarTypeFilter({ filterType, setFilterType }) {
  return (
    <ButtonGroup
      variant="contained"
      color="primary"
      aria-label="contained primary button group"
      sx={{
        
       
        "& .MuiButton-root": {
          backgroundColor: "#339966", // Green color
          height:"50px",
          color: "#fff", // White text
          padding: "10px 20px", // Adjust padding as needed
          borderRadius: "5px", // Add rounded corners
          marginLeft: "5px",
          "&:hover": {
            backgroundColor: "#669999", // Darker green on hover
          },
        },
      }}
    >
      <Button
        onClick={() => setFilterType("")}
        variant={filterType === "" ? "contained" : "outlined"}
      >
        All
      </Button>
      <Button
        onClick={() => setFilterType("Sedan")}
        variant={filterType === "Sedan" ? "contained" : "outlined"}
      >
        Sedan
      </Button>
      <Button
        onClick={() => setFilterType("SUV")}
        variant={filterType === "SUV" ? "contained" : "outlined"}
      >
        SUV
      </Button>
      <Button
        onClick={() => setFilterType("Crossover")}
        variant={filterType === "Crossover" ? "contained" : "outlined"}
      >
        Crossover
      </Button>
      <Button
        onClick={() => setFilterType("Sports")}
        variant={filterType === "Sports" ? "contained" : "outlined"}
      >
        Sports
      </Button>
      <Button
        onClick={() => setFilterType("Electric")}
        variant={filterType === "Electric" ? "contained" : "outlined"}
      >
        Electric
      </Button>
    </ButtonGroup>
  );
}

export default CarTypeFilter;
