import React, { useState, useEffect, useRef } from "react";
import { useHistory, useParams } from "react-router-dom";
import html2canvas from "html2canvas";
import "../Style/bodymeasurements.css";
import { Toaster, toast } from "react-hot-toast";
import axios from "axios";
import ClipLoader from "react-spinners/ClipLoader";
import { Howl } from "howler";
import { Button, Result } from 'antd';

function BodyMeasurements() {
  const history = useHistory();
  const { pid, gender, height, weight } = useParams();

  const [ss, setSs] = useState([]);
  const videoRef = useRef(null);
  const [loading, setLoading] = useState(true);
  const [bdata, setBdata] = useState();
  const [tmp, setTmp] = useState(true);
  const [cameraOn, setCameraOn] = useState(true);
  const [fail, setFail] = useState(false);

  const [cameraMode, setCameraMode] = useState("environment");

  const [isFullScreen, setIsFullScreen] = useState(false);
  const [svgFlag, setSvgFlag] = useState(false);
  
  useEffect(() => {
    // check if mediaDevices is supported
    if (
      navigator.mediaDevices &&
      navigator.mediaDevices.getUserMedia &&
      navigator.mediaDevices.enumerateDevices
    ) {
      // first we call getUserMedia to trigger permissions
      // we need this before deviceCount, otherwise Safari doesn't return all the cameras
      // we need to have the number in order to display the switch front/back button
      navigator.mediaDevices
        .getUserMedia({
          audio: false,
          video: { facingMode: cameraMode },
        })
        .then((stream) => {
          if (window.stream) {
            window.stream.getTracks().forEach(function (track) {
              console.log(track);
              track.stop();
            });
          }

          videoRef.current.srcObject = stream;
          videoRef.current.facingMode = cameraMode;
          videoRef.current.play();
        })
        .catch((error) => {
          //https://developer.mozilla.org/en-US/docs/Web/API/MediaDevices/getUserMedia
          if (error === "PermissionDeniedError") {
            alert("Permission denied. Please refresh and give permission.");
          }

          console.error("getUserMedia() error: ", error);
        });
    } else {
      alert(
        "Mobile camera is not supported by browser, or there is no camera detected/connected"
      );
    }
  }, [cameraMode]);

  function dataURItoBlob(dataURI, fileName) {
    // Convert the data URI to a binary buffer
    const binary = atob(dataURI.split(",")[1]);
    const buffer = new Uint8Array(binary.length);
    for (let i = 0; i < binary.length; i++) {
      buffer[i] = binary.charCodeAt(i);
    }

    // Create a new Blob object from the buffer with the correct MIME type
    const blob = new Blob([buffer], { type: "image/png" });
    blob.name = fileName;

    // Set the originFileObj property to the new Blob object
    blob.originFileObj = blob;

    // Return the new Blob object
    return blob;
  }

  const handleFullScreen = () => {
    if (!isFullScreen) {
      document.documentElement.requestFullscreen();
      setIsFullScreen(true);
    } else {
      document.exitFullscreen();
      setIsFullScreen(false);
    }
  };


  const handleScreenshot = async () => {
    var sndClick = new Howl({ src: ["snd/click.mp3"] });
    sndClick.play();
    setSvgFlag(true);
    // const video = videoRef.current;
    // video.height = 800;
    // video.height = 600;
    const canvas = document.createElement("canvas");
    canvas.width = 512;
    canvas.height = 512; 
    console.log(canvas.width,canvas.height);
    const context = canvas.getContext("2d");


    context.drawImage(videoRef.current, 0, 0, canvas.width, canvas.width);
    const screenshot = await html2canvas(videoRef.current);
    console.log(screenshot);
    const dataURL = canvas.toDataURL("image/png");
    console.log(dataURL);
    const img = new Image();
    img.src = dataURL;
    console.log(ss.length);
    if (ss.length < 2) {
      setSs([...ss, dataURL]);
      toast.success("Clicked", {
        duration: 3000,
      });
    } else {
      toast.error("Something wrong!", {
        duration: 3000,
      });
    }
    console.log(ss);

    if (ss.length === 1) {
      const video = document.getElementById("video");

      const stream = video.srcObject;
      if (stream) {
        const tracks = stream.getTracks();
        tracks.forEach((track) => track.stop());
        video.srcObject = null;
      }

      setLoading(true);
      setTmp(false);
      setCameraOn(false);
      // fire();
      console.log("valid");
      console.log(height, weight, gender);
      console.log(ss);

      const formData = new FormData();

      const fileName0 = "my-image0.png";
      const fileName1 = "my-image1.png";
      const file0 = dataURItoBlob(ss[0], fileName0);
      const file1 = dataURItoBlob(dataURL, fileName1);
      console.log(file0);

      formData.append(fileName0, file0.originFileObj, file0?.name);
      formData.append(fileName1, file1.originFileObj, file1?.name);

      formData.append("gender", gender);
      formData.append("height", height);
      formData.append("weight", weight);

      const token = localStorage.getItem("token");
      const headers = { Authorization: `Bearer ${token}` };
      try {
        axios
          .post(`${process.env.REACT_APP_API_HOST}/measure/`, formData, {
            headers,
          })
          .then((response) => {
            console.log(response);

            if (response.data.message === "Success!") {
              setBdata(response.data.data);
              setLoading(false);
              history.push(
                `/measurement-result/${pid}/${gender}/${response.data.data.measurement_results[
                  "chest"
                ].toFixed(2)}/${response.data.data.measurement_results[
                  "hip"
                ].toFixed(2)}/${response.data.data.measurement_results[
                  "waist"
                ].toFixed(2)}`
              );
            }else{
              setLoading(false);
              setFail(true);
            }
          })
          .catch((error) => {
            console.log(error);
          });
      } catch (err) {}
    }
  };

  return (
    <>
      {/* <Navbar /> */}
      {tmp && (
        <>
          <div id="vid_container">
            <video id="video" ref={videoRef} autoPlay playsInline></video>
            <div id="video_overlay"></div>
            {gender === "male" && loading && !svgFlag && (
              <div
                style={{
                  position: "absolute",
                  top: "50%",
                  left: "50%",
                  transform: "translate(-50%, -50%)",
                }}>
                <img
                  src="https://firebasestorage.googleapis.com/v0/b/clothing-store-2.appspot.com/o/camera-files%2Fman-front.svg?alt=media&token=1691acac-2285-4fd5-a492-cdee3a8fb187"
                  alt="SVG"
                  height="500px"
                  width="420px"
                />
              </div>
            )}
            {gender === "male" && loading && svgFlag && (
              <div
                style={{
                  position: "absolute",
                  top: "50%",
                  left: "50%",
                  transform: "translate(-50%, -50%)",
                }}>
                <img
                  src="https://firebasestorage.googleapis.com/v0/b/clothing-store-2.appspot.com/o/camera-files%2Fman-side.svg?alt=media&token=1691acac-2285-4fd5-a492-cdee3a8fb187"
                  alt="SVG"
                  height="500px"
                  width="450px"
                />
              </div>
            )}
            {gender === "female" && loading && !svgFlag && (
              <div
                style={{
                  position: "absolute",
                  top: "50%",
                  left: "50%",
                  transform: "translate(-50%, -50%)",
                }}>
                <img
                  src="https://firebasestorage.googleapis.com/v0/b/clothing-store-2.appspot.com/o/camera-files%2Fwoman-front.svg?alt=media&token=1691acac-2285-4fd5-a492-cdee3a8fb187"
                  alt="SVG"
                  height="500px"
                  width="420px"
                />
              </div>
            )}
            {gender === "female" && loading && svgFlag && (
              <div
                style={{
                  position: "absolute",
                  top: "50%",
                  left: "50%",
                  transform: "translate(-50%, -50%)",
                }}>
                <img
                  src="https://firebasestorage.googleapis.com/v0/b/clothing-store-2.appspot.com/o/camera-files%2Fwoman-side.svg?alt=media&token=1691acac-2285-4fd5-a492-cdee3a8fb187"
                  alt="SVG"
                  height="500px"
                  width="450px"
                />
              </div>
            )}
          </div>
          <div id="gui_controls">
            <button
              id="takePhotoButton"
              className="button_megic"
              onClick={handleScreenshot}
              name="take Photo"
              type="button"></button>
            <button
              id="toggleFullScreenButton"
              className="button_megic"
              name="toggle FullScreen"
              type="button"
              onClick={handleFullScreen}
              aria-pressed={isFullScreen}></button>
            {tmp !== "" && <p style={{ color: "white" }}>{tmp}</p>}
          </div>
        </>
      )}

      {loading && !tmp && (
        <>
          <div className="loader-spin">
            <ClipLoader color="#000" />
          </div>
        </>
      )}

      {fail && (
        <Result
          status="warning"
          title="There are some problems with your operation."
          extra={
            <Button type="primary" key="console">
              Go Console
            </Button>
          }
        />
      )}

      <Toaster
        position="top-center"
        containerStyle={{
          top: 65,
        }}
        reverseOrder={true}
      />
    </>
  );
}

export default BodyMeasurements;
