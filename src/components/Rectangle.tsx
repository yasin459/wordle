export type RectanglePropsType = {
  color: "red" | "yellow" | "gray" | "green";
  letter: string;
};
export const Rectangle = (props: RectanglePropsType) => {
  return (
    <div
      style={{
        margin: "2px",
        backgroundColor: props.color,
        textAlign: "center",
        padding: "5px",
      }}
    >
      {props.letter}
    </div>
  );
};
