// import { useRef } from "react";
// import styles from "./MediaModal.module.css";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faTrash, faUpload } from "@fortawesome/free-solid-svg-icons";
// import { isValidFileSize } from "../../../utils/helper";
// import AudioFileIcon from "@mui/icons-material/AudioFile";
// import AudioFileOutlinedIcon from "@mui/icons-material/AudioFileOutlined";

// export default function MediaModal({ text, type, files, setFiles }) {
//   const inputRefs = useRef([]);

//   const handleUploadClick = (index) => {
//     if (inputRefs.current[index]) {
//       inputRefs.current[index].click();
//     }
//   };

//   const handleFileChange = (e, index) => {
//     const file = e.target.files[0];
//     if (!file) return;

//     if (!isValidFileSize(file)) {
//       alert("حجم فایل بزرگ‌تر از حد مجاز است.");
//       return;
//     }

//     let newFiles = [...files];
//     if (index < newFiles.length) {
//       newFiles[index] = file;
//     } else {
//       if (newFiles.length < 3) {
//         newFiles.push(file);
//       }
//     }

//     setFiles(newFiles);
//   };

//   const handleRemove = (index) => {
//     let newFiles = [...files];
//     newFiles.splice(index, 1);
//     setFiles(newFiles);
//   };

//   const displayFiles = [...files];
//   while (displayFiles.length < 3) {
//     displayFiles.push(null);
//   }

//   return (
//     <div className={styles.container_modal}>
//       <p className={styles.text_modal}>{text}</p>
//       <div className={styles.wrap_image_modal}>
//         {displayFiles.map((file, i) => (
//           <div className={styles.wrap_image} key={i}>
//             {file ? (
//               <img
//                 src={URL.createObjectURL(file)}
//                 alt={`media-${i}`}
//                 className={styles.image}
//               />
//             ) : (
//               <img
//                 src={"/image/2.svg"}
//                 alt="media placeholder"
//                 className={styles.image}
//               />
//             )}
//             <input
//               type="file"
//               accept={"image/*"}
//               style={{ display: "none" }}
//               ref={(el) => (inputRefs.current[i] = el)}
//               onChange={(e) => handleFileChange(e, i)}
//             />
//             <div className={styles.wrap_icons}>
//               {file && (
//                 <FontAwesomeIcon
//                   icon={faTrash}
//                   className="deleteIcon"
//                   onClick={() => handleRemove(i)}
//                 />
//               )}
//               <FontAwesomeIcon
//                 icon={faUpload}
//                 className={styles.upload_icon}
//                 onClick={() => handleUploadClick(i)}
//               />
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }

import { useRef } from "react";
import styles from "./MediaModal.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faUpload } from "@fortawesome/free-solid-svg-icons";
import { isValidFileSize } from "../../../utils/helper";
import AudioFileIcon from "@mui/icons-material/AudioFile";
import AudioFileOutlinedIcon from "@mui/icons-material/AudioFileOutlined";

export default function MediaModal({ text, type, files, setFiles }) {
  const inputRefs = useRef([]);

  const handleUploadClick = (index) => {
    if (inputRefs.current[index]) {
      inputRefs.current[index].click();
    }
  };

  const handleFileChange = (e, index) => {
    const file = e.target.files[0];
    if (!file) return;

    if (!isValidFileSize(file)) {
      alert("حجم فایل بزرگ‌تر از حد مجاز است.");
      return;
    }

    let newFiles = [...files];
    if (index < newFiles.length) {
      newFiles[index] = file;
    } else {
      if (newFiles.length < 3) {
        newFiles.push(file);
      }
    }

    setFiles(newFiles);
  };

  const handleRemove = (index) => {
    let newFiles = [...files];
    newFiles.splice(index, 1);
    setFiles(newFiles);
  };

  const displayFiles = [...files];
  while (displayFiles.length < 3) {
    displayFiles.push(null);
  }

  return (
    <div className={styles.container_modal}>
      <p className={styles.text_modal}>{text}</p>
      <div className={styles.wrap_image_modal}>
        {displayFiles.map((file, i) => (
          <div className={styles.wrap_image} key={i}>
            {/* نمایش محتوا بسته به نوع فایل */}
            {type === "image" ? (
              file ? (
                <img
                  src={URL.createObjectURL(file)}
                  alt={`media-${i}`}
                  className={styles.image}
                />
              ) : (
                <img
                  src={"/image/2.svg"}
                  alt="media placeholder"
                  className={styles.image}
                />
              )
            ) : (
              <div className={styles.audio_container}>
                {file ? (
                  <>
                    <AudioFileIcon
                      style={{ fontSize: "4rem", color: "#666" }}
                    />
                    <audio
                      controls
                      style={{ width: "100%", marginTop: "0.5rem" }}
                    >
                      <source
                        src={URL.createObjectURL(file)}
                        type={file.type}
                      />
                      مرورگر شما از پخش فایل صوتی پشتیبانی نمی‌کند.
                    </audio>
                  </>
                ) : (
                  <AudioFileOutlinedIcon
                    style={{ fontSize: "4rem", color: "#aaa" }}
                  />
                )}
              </div>
            )}

            <input
              type="file"
              accept={type === "image" ? "image/*" : "audio/*"}
              style={{ display: "none" }}
              ref={(el) => (inputRefs.current[i] = el)}
              onChange={(e) => handleFileChange(e, i)}
            />

            <div className={styles.wrap_icons}>
              {file && (
                <FontAwesomeIcon
                  icon={faTrash}
                  className="deleteIcon"
                  onClick={() => handleRemove(i)}
                />
              )}
              <FontAwesomeIcon
                icon={faUpload}
                className={styles.upload_icon}
                onClick={() => handleUploadClick(i)}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
