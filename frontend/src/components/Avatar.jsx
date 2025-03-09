import React, { useEffect, useRef, useState } from "react";
import { CiCamera } from "react-icons/ci";

const Avatar = ({ file, setFile, initialImage = "" }) => {
  const [blob, setBlob] = useState(initialImage);
  const inputFileRef = useRef(null);

  useEffect(() => {
    if (file) {
      const objectURL = URL.createObjectURL(file);
      setBlob(objectURL);

      return () => URL.revokeObjectURL(objectURL);
    }
  }, [file]);

  const onFileChange = (e) => {
    const newFile = e.target.files[0];
  
    if (newFile) {
      if (!newFile.type.startsWith("image/")) {
        alert("Vui lòng chọn một file ảnh hợp lệ!");
        return;
      }
      inputFileRef.current.value = null; // Reset input file để chọn lại cùng ảnh nếu cần
      setFile(newFile);
    }
  };
  

  return (
    <div
      onClick={() => inputFileRef.current.click()}
      className={`relative rounded-full overflow-hidden cursor-pointer h-[180px] w-[180px] mx-auto flex items-center border-2 border-primary select-none ${
        blob ? "before-bg-file" : ""
      }`}
    >
      {blob ? (
        <img
          src={blob?.url || blob}
          alt="Avatar"
          className="absolute top-0 left-0 w-full h-full object-cover"
        />
      ) : (
        <div className="flex items-center justify-center w-full h-full bg-gray-200">
          <CiCamera size={32} color="#666" />
        </div>
      )}

      <div
        className={`absolute left-0 w-full h-full flex justify-center items-center bg-black bg-opacity-50 transition-opacity ${
          blob ? "opacity-0 hover:opacity-100" : "opacity-100"
        }`}
      >
        <CiCamera size={32} color="#fff" />
      </div>

      <input
        ref={inputFileRef}
        onChange={onFileChange}
        type="file"
        accept="image/*"
        hidden
      />
    </div>
  );
};

export default Avatar;
