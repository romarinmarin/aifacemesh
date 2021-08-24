import logo from "./logo.svg";
import "./App.css";
import * as tf from "@tensorflow/tfjs";
import * as facemesh from "@tensorflow-models/facemesh";
import Webcam from "react-webcam";
import { useRef, useEffect } from "react";
import { drawMesh } from "./utilitites";

function App() {
  // setup refencies
  const webcamRef = useRef(null);
  const canvasRef = useRef(null);

  // load facemesh
  const runFacemesh = async () => {
    const net = await facemesh.load();
    setInterval(() => {
      detect(net);
    }, 100);
  };

  // detect function
  const detect = async (net) => {
    if (
      typeof webcamRef.current !== "undefined" &&
      webcamRef.current !== null &&
      webcamRef.current.video.readyState === 4
    ) {
      // // Get Video Properties
      const video = webcamRef.current.video;
      const videoWidth = webcamRef.current.video.videoWidth;
      const videoHeight = webcamRef.current.video.videoHeight;
      // Set video width
      webcamRef.current.video.width = videoWidth;
      webcamRef.current.video.height = videoHeight;
      // Set canvas width
      canvasRef.current.width = videoWidth;
      canvasRef.current.height = videoHeight;
      const faces = await net.estimateFaces(video);
      console.log(faces);
      const ctx = canvasRef.current.getContext("2d");
      drawMesh(faces, ctx);
    }
  };

  useEffect(() => {
    runFacemesh();
  });

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
