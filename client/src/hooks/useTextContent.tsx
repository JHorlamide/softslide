import { useState } from "react";

interface TextComponent {
  x: number;
  y: number;
  width: number;
  height: number;
  inputValue: string;
}

export const useTextContent = () => {
  const [textComponents, setTextComponents] = useState<TextComponent[]>([]);

  const handleAddText = () => {
    const defaultPosition = {
      x: 0,
      y: 0,
      width: 600,
      height: 100,
      inputValue: ""
    }

    setTextComponents(prevState => ([...prevState, {
      ...defaultPosition,
      x: defaultPosition.x + 10,
      y: defaultPosition.y + 10
    }]));
  }

  const handleInputChange = (index: number, inputValue: string) => {
    const updateComponent = [...textComponents];
    textComponents[index].inputValue = inputValue;
    setTextComponents(updateComponent);
  }

  const handleDragChange = (index: number, cords: { x: number, y: number }) => {
    const updateComponent = [...textComponents];
    updateComponent[index].x = cords.x;
    updateComponent[index].y = cords.y;
    setTextComponents(updateComponent);
  }

  const handleResizeChange = (index: number, cords: { width: number, height: number }) => {
    const updateComponent = [...textComponents];
    updateComponent[index].width = cords.width;
    updateComponent[index].y = cords.height;
    setTextComponents(updateComponent);
  }

  const handleAddMetric = () => {
    console.log("Metric Added")
  }

  const handleAddImage = () => {
    console.log("Image Added")
  }

  const handleCompDataStorage = () => {
    localStorage.setItem("slideContent", JSON.stringify(textComponents));
  }

  return {
    textComponents,
    setTextComponents,
    handleAddText,
    handleAddMetric,
    handleAddImage,
    handleCompDataStorage,
    handleInputChange,
    handleDragChange,
    handleResizeChange
  }
}
