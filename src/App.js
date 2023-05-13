import { useEffect } from "react";
import "./App.css";
import h337 from "heatmap.js";
import Map from "./map.jpg";

function App() {
    const dataPoint = [
        { x: 0, y: 0 },
        { x: 20, y: 50 },
        { x: 50, y: 200 },
        { x: 200, y: 500 },
        { x: 30, y: 400 },
        { x: 200, y: 300 },
        { x: 800, y: 200 },
        { x: 1300, y: 50 },
    ];

    useEffect(() => {
        var heatmapInstance = h337.create({
            container: document.querySelector(".map"),
            radius: 50,
        });

        // fetch(dataPoint)
        //     .then((res) => res.json())
        //     .then((data) => console.log(data));

        // document.querySelector(".map").onclick = function (ev) {
        //     heatmapInstance.addData({
        //         x: ev.layerX,
        //         y: ev.layerY,
        //         value: 1,
        //     });
        // };

        var points = [];
        var max = 0;
        var width = window.innerWidth;
        var height = window.innerHeight;
        var len = 10;

        while (len--) {
            var val = Math.floor(Math.random() * 100);
            console.log(val);
            max = Math.max(max, val);
            console.log(max);
            var point = {
                x: Math.floor(Math.random() * width),
                y: Math.floor(Math.random() * height),
                value: val,
            };
            points.push(point);
        }

        var data = {
            max: max,
            data: points,
        };
        heatmapInstance.setData(data);
    });

    const dataRerender = () => {
        window.location.reload();
    };

    return (
        <div className="App">
            <div className="map">
                <img
                    src={Map}
                    alt="map"
                    style={{ width: "100%", height: "90vh" }}
                />
            </div>
            <button onClick={dataRerender}>Refresh Page</button>
        </div>
    );
}

export default App;
