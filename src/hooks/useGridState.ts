import { useEffect, useState } from "react";
import { RectanglePropsType } from "../components/Rectangle";
import { LENGTH, TARGET } from "../constants";
import { letterStatusColor } from "../utils";

type State = {
  endOfLine: boolean;
  index: number;
  grid: RectanglePropsType[];
};
type Status = "playing" | "failed" | "succeeded";

export const useGridState = () => {
  const [status, setStatus] = useState<Status>("playing");
  const [state, setState] = useState<State>({
    index: 0,
    grid: [
      ...new Array(LENGTH * (LENGTH + 1))
        .fill(0)
        .map<RectanglePropsType>((_) => {
          return {
            letter: "_",
            color: "gray",
          };
        }),
    ],
    endOfLine: false,
  });

  const handleEnterPress = (prevState: State) => {
    if (prevState.endOfLine) {
      const newGrid = [...prevState.grid];
      const row = (prevState.index - (prevState.index % LENGTH)) / LENGTH - 1;
      let greenCount = 0;
      for (let colIndex = 0; colIndex < LENGTH; colIndex++) {
        const newIndex = row * LENGTH + colIndex;
        const color = letterStatusColor(newGrid[newIndex].letter, colIndex);
        if (color === "green") greenCount += 1;
        newGrid[newIndex] = {
          letter: newGrid[newIndex].letter,
          color,
        };
      }
      if (greenCount === LENGTH) setStatus("succeeded");
      else if (row === LENGTH) setStatus("failed");
      return {
        index: prevState.index,
        grid: newGrid,
        endOfLine: false,
      };
    }
    return prevState;
  };

  const handleBackspacePress = (prevState: State) => {
    if (prevState.index % LENGTH === 0 && !prevState.endOfLine)
      return prevState;
    else {
      const newGrid = [...prevState.grid];
      newGrid[prevState.index - 1] = {
        letter: "_",
        color: "gray",
      };
      return {
        index: prevState.index - 1,
        grid: newGrid,
        endOfLine: false,
      };
    }
  };

  const handleLetterPress = (prevState: State, key: string) => {
    const letterRegex = /^[a-zA-Z]$/;
    if (letterRegex.test(key) && !prevState.endOfLine) {
      const newGrid = [...prevState.grid];
      newGrid[prevState.index] = {
        letter: key,
        color: "gray",
      };
      return {
        index: prevState.index + 1,
        grid: newGrid,
        endOfLine: prevState.index % LENGTH === LENGTH - 1,
      };
    }
    return prevState;
  };
  const pressHandler = (event: KeyboardEvent) => {
    if (status !== "playing") return;
    const { key } = event;
    setState((prevState) => {
      if (key === "Enter") {
        // Enter is only for submitting current line
        return handleEnterPress(prevState);
      } else if (key === "Backspace") {
        // Backspace is for removing current line letters before submitting
        return handleBackspacePress(prevState);
      } else {
        // we only accept letters
        // otherwise we well ignore the event
        return handleLetterPress(prevState, key);
      }
    });
  };

  useEffect(() => {
    document.addEventListener("keydown", pressHandler);

    return () => {
      document.removeEventListener("keydown", pressHandler);
    };
  }, []);

  return { state, status };
};
