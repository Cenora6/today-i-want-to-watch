import React, {useState, useEffect} from 'react';
import AnimatedTv from "./components/AnimatedTv/AnimatedTv";
import Home from "./components/Home/Home";

function App() {

    const [height, setHeight] = useState<number>(0);
    const [width, setWidth] = useState<number>(0);
    const [screenWidth, setScreenWidth] = useState<number>(window.innerWidth);
    const [orientation, setOrientation] = useState<number>(window.screen.orientation.angle)

    useEffect(() => {
        const updateSize = () => {
            setScreenWidth(window.innerWidth);
        }
        const updateOrientation = () => {
            setOrientation(window.screen.orientation.angle);
        }

        window.addEventListener('resize', updateSize);
        window.addEventListener('orientationchange', updateOrientation);
        updateSize();
        updateOrientation();

        return () => {
            window.removeEventListener('resize', updateSize);
            window.removeEventListener('orientationchange', updateOrientation);
        };
    }, []);

    const updateWindowDimensions = (event: React.MouseEvent) => {
        const newWidth = event.clientX;
        const newHeight = event.clientY;
        setHeight(newHeight);
        setWidth(newWidth);
    };

    {console.log(orientation)}
    return (
        <div className="home" onMouseMove={updateWindowDimensions}>
            <Home/>
            {(screenWidth > 1500) && (orientation === 90) && <AnimatedTv width={width} height={height}/>}
        </div>
    );
}

export default App;
