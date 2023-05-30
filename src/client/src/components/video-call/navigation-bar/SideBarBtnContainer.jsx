import React, { useState } from "react";
import BackdropModal from "../../common/modal/BackdropModal.jsx";
import SettingModal from "./SettingModal.jsx";

function SideBarBtnContainer({ localStreamRef, cameraArray, micArray }) {
  const [isSettingModalOpen, setIsSettingModalOpen] = useState(false);

  const handleSettingBtnClick = () => {
    setIsSettingModalOpen((isSettingModalOpen) => !isSettingModalOpen);
  };

  return (
    <div>
      <button>인간</button>
      <button onClick={handleSettingBtnClick}>설정</button>

      <BackdropModal open={isSettingModalOpen} setOpen={setIsSettingModalOpen}>
        <SettingModal
          localStreamRef={localStreamRef}
          cameraArray={cameraArray}
          micArray={micArray}
        />
      </BackdropModal>
    </div>
  );
}

export default SideBarBtnContainer;
