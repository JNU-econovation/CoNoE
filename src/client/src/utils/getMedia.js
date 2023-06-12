import PropTypes from "prop-types";

const setMyVideoRef = (ref, localStream) => {
  ref.current.srcObject = localStream;
};

const getDevices = async ({ setCameraArray, setMicArray }) => {
  try {
    const devices = await navigator.mediaDevices.enumerateDevices();
    setCameraArray(devices.filter((device) => device.kind === "videoinput"));
    setMicArray(devices.filter((device) => device.kind === "audioinput"));
  } catch (err) {
    console.error(err);
  }
};

const getMedia = async ({
  micId,
  cameraId,
  localStream,
  myVideoRef,
  setCameraArray,
  setMicArray,
}) => {
  const initialConstrains = {
    audio: micId ? { deviceId: { exact: micId } } : true,
    video: cameraId ? { deviceId: { exact: cameraId } } : true,
  };

  console.log(initialConstrains);

  try {
    localStream = await navigator.mediaDevices.getUserMedia(initialConstrains);

    if (myVideoRef) {
      setMyVideoRef(myVideoRef, localStream);
    }

    if (!micId && !cameraId) {
      await getDevices({ setCameraArray, setMicArray });
    }

    return localStream;
  } catch (err) {
    console.error(err);
  }
};

getMedia.propTypes = {
  micId: PropTypes.string,
  cameraId: PropTypes.string,
  localStream: PropTypes.any.isRequired,
  myVideoRef: PropTypes.node,
  setCameraArray: PropTypes.func,
  setMicArray: PropTypes.func,
};

getMedia.defaultValues = {
  micId: undefined,
  cameraId: undefined,
  myVideoRef: undefined,
  setCameraArray: () => {},
  setMicArray: () => {},
};
export default getMedia;
