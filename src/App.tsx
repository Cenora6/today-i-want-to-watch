import React, {useState} from 'react';
import AnimatedTv from "./components/animatedTv/AnimatedTv";

function App() {

    const [height, setHeight] = useState(0);
    const [width, setWidth] = useState(0);

    const updateWindowDimensions = (e: any) => {
        const newWidth = e.clientX;
        const newHeight = e.clientY;
        setHeight(newHeight);
        setWidth(newWidth);
    };

  return (
    <div className="main" onMouseMove={updateWindowDimensions}>
      <p>works</p>
        <AnimatedTv width={width} height={height}/>
    </div>
  );
}

export default App;
