import { useEffect, useRef, useState } from "react";
import "./App.css";
import h337 from "heatmap.js";
import Map from "./map.jpg";

function App() {
    const mapRef = useRef(null);
    const heatmapInstanceRef = useRef(null);
    const [isImageLoaded, setIsImageLoaded] = useState(false);

    useEffect(() => {
        createHeatmap();
        if (isImageLoaded) {
            getData();
        }
    }, [isImageLoaded]);

    const handleImageLoad = () => {
        setIsImageLoaded(true);
    };

    const createHeatmap = () => {
        const container = document.querySelector(".map");
        const instance = h337.create({
            container,
            radius: 40,
        });
        heatmapInstanceRef.current = instance;
    };

    const getData = () => {
        fetch("http://localhost:3000/heatPoint")
            .then((res) => res.json())
            .then((data) => {
                const heatmapInstance = heatmapInstanceRef.current;
                if (heatmapInstance && data.length > 0) {
                    const map = document.querySelector(".map img");
                    const oldWidth = map.naturalWidth;
                    const oldHeight = map.naturalHeight;
                    const newWidth = mapRef.current.clientWidth;
                    const newHeight = mapRef.current.clientHeight;
                    ///
                    const newData = data.map(({ x, y, value }) => ({
                        x: Number(((x * newWidth) / oldWidth).toFixed(0)),
                        y: Number(((y * newHeight) / oldHeight).toFixed(0)),
                        value,
                    }));
                    heatmapInstance.setData({ data: newData });
                }
            });
    };

    window.onresize = () => {
        const heatmapInstance = heatmapInstanceRef.current;
        if (heatmapInstance) {
            heatmapInstance.setData({ data: [] });
        }
        getData();
    };

    return (
        <div className="App">
            <div className="map">
                <img
                    src={Map}
                    alt="map"
                    ref={mapRef}
                    onLoad={handleImageLoad}
                />
            </div>
        </div>
    );
}

export default App;
