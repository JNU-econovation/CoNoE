import PropTypes from "prop-types";

const setMyVideoRef = (ref, localStreamRef) => {
  ref.current.srcObject = localStreamRef.current;
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
  localStreamRef,
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
    localStreamRef.current = await navigator.mediaDevices.getUserMedia(
      initialConstrains
    );

    if (myVideoRef) {
      setMyVideoRef(myVideoRef, localStreamRef);
    }

    if (!micId && !cameraId) {
      await getDevices({ setCameraArray, setMicArray });
    }

    return localStreamRef.current;
  } catch (err) {
    console.error(err);
  }
};

getMedia.propTypes = {
  micId: PropTypes.string,
  cameraId: PropTypes.string,
  localStreamRef: PropTypes.object.isRequired,
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
