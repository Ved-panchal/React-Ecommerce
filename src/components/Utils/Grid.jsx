import React from "react";

const Grid = ({ children, variant }) => {
  const cols = {
    1: "grid-cols-1",
    2: "grid-cols-2",
    3: "grid-cols-3",
    4: "grid-cols-4",
    5: "grid-cols-5",
    "auto-fill": "grid-cols-[repeat(auto-fill,minmax(200px,1fr))]",
    "ProdCard": "grid-cols-[repeat(auto-fill,minmax(340px,1fr))] max-sm:grid-cols-1 gap-12",
  };

  return (
    <>
      <div className={`grid ${cols[variant]}`}>{children}</div>
    </>
  );
};

export default Grid;
