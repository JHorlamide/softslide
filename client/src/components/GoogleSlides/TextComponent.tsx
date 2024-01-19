import React, { Fragment, useState } from 'react'
import { DraggableData, Rnd } from "react-rnd";
import { Textarea } from '@chakra-ui/react'

interface TextComponentProps {
  rndPosition: {
    x: number;
    y: number;
    width: number;
    height: number;
  },
  onInputChange: (value: string) => void;
  onDragChange: (value: { x: number, y: number }) => void;
  onResizeChange: (value: { width: number, height: number }) => void;
  onFocusChange: () => void;
}

const TextComponent: React.FC<TextComponentProps> = ({
  rndPosition,
  onInputChange,
  onDragChange,
  onResizeChange,
  onFocusChange
}) => {
  const [text, setText] = useState("");

  const [layout, setLayout] = useState({
    width: 0,
    height: 0
  });

  const [position, setPosition] = useState({
    x: 0,
    y: 0,
  });

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { value } = e.target;
    setText(value);
    onInputChange(value);
  }

  const handleDragStop = (d: DraggableData) => {
    const cords = { x: d.x, y: d.y }
    setPosition(cords);
    onDragChange(cords);
  }

  const handleResizeChange = (ref: HTMLElement) => {
    const layout = {
      width: parseInt(ref.style.width),
      height: parseInt(ref.style.height),
    }

    setLayout(layout);
    onResizeChange(layout)
  }

  return (
    <Rnd
      default={{ ...rndPosition }}
      position={{ x: position.x, y: position.y }}
      onDragStop={(e, d) => handleDragStop(d)}
      onResizeStop={(e, direction, ref, delta, position) => handleResizeChange(ref)}
    >
      <Textarea
        focusBorderColor="black"
        value={text}
        color="black"
        _focus={{
          borderBottomEndRadius: 10,
          borderBlockEndWidth: 5
        }}
        onBlur={onFocusChange}
        onChange={handleChange}
      />
    </Rnd>
  )
}

export default TextComponent;


