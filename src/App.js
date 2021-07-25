import logo from "./logo.svg";
import "./App.css";
import * as tf from "@tensorflow/tfjs";
import * as facemesh from "@tensorflow-models/facemesh";
import Webcam from "react-webcam";
import { useRef } from "react";

function App() {
  // setup refencies
  const webcamRef = useRef(null);
  const canvasRef = useRef(null);

  const innerStyle = {
    width: 640,
    height: 480,
    backgroundColor: "black",
    position: "relative",
  };
  const canvasStyle = {
    position: "absolute",
    zIndex: "1",
    top: "0",
    left: "0",
    right: "0",
    bottom: "0",
    width: 640,
    height: 480,
  };

  return (
    <div className="App">
      <div className="inner" style={innerStyle}>
        <Webcam ref={webcamRef} style={canvasStyle}></Webcam>
        <canvas ref={canvasRef} style={canvasStyle}></canvas>
      </div>
    </div>
  );
}

export default App;
