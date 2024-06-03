import { LENGTH } from "../constants";
import { useGridState } from "../hooks/useGridState";
import { Rectangle } from "./Rectangle";

export const Grid = () => {
  const { state, status } = useGridState();

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "12px",
        border: "2px solid #3498db" /* Border width and color */,
        borderRadius: "5px" /* Rounded corners */,
        boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)" /* Shadow effect */,
        padding: "10px" /* Padding inside the border */,
      }}
    >
      <h1 style={{ color: "blue" }}>WOOORDLE</h1>
      <div
        style={{
          minWidth: 300,
          display: "grid",
          gridTemplateColumns: Array(LENGTH)
            .fill(0)
            .map((i) => "auto")
            .join(" "),
        }}
      >
        {state.grid.map((gridItem) => (
          <Rectangle letter={gridItem.letter} color={gridItem.color} />
        ))}
      </div>
      {status === "succeeded" && (
        <div style={{ color: "green" }}>congratulations you solved WORDLE</div>
      )}
      {status === "failed" && (
        <div style={{ color: "red" }}>Sorry, you are a failure</div>
      )}
      {status === "playing" && (
        <div style={{ color: "white" }}>I hope you do well!</div>
      )}
    </div>
  );
};
