import React, {useState, useEffect} from 'react';
import AnimatedTv from "./components/AnimatedTv/AnimatedTv";
import Home from "./components/Home/Home";

function App() {

    const [height, setHeight] = useState<number>(0);
    const [width, setWidth] = useState<number>(0);
    const [screenWidth, setScreenWidth] = useState<number>(window.innerWidth);

    useEffect(() => {
        const updateSize = () => {
            setScreenWidth(window.innerWidth);
        }

        window.addEventListener('resize', updateSize);
        updateSize();
        return () => window.removeEventListener('resize', updateSize);
    }, []);

    const updateWindowDimensions = (event: React.MouseEvent) => {
        const newWidth = event.clientX;
        const newHeight = event.clientY;
        setHeight(newHeight);
        setWidth(newWidth);
    };

    return (
        <div className="home" onMouseMove={updateWindowDimensions}>
            <Home/>
            {(screenWidth > 1500) && <AnimatedTv width={width} height={height}/>}
        </div>
    );
}

export default App;
