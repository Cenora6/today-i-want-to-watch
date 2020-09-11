import React, {useState} from 'react';
import AnimatedTv from "./components/AnimatedTv/AnimatedTv";
import Home from "./components/Home/Home";

function App() {

    const [height, setHeight] = useState<number>(0);
    const [width, setWidth] = useState<number>(0);

    const updateWindowDimensions = (event: React.MouseEvent) => {
        const newWidth = event.clientX;
        const newHeight = event.clientY;
        setHeight(newHeight);
        setWidth(newWidth);
    };

  return (
    <div className="main" onMouseMove={updateWindowDimensions}>
        <Home/>
        <AnimatedTv width={width} height={height}/>
</div>
  );
}

export default App;
