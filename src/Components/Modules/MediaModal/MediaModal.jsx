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

//   const handleFileChange = (e) => {
//     const selectedFiles = Array.from(e.target.files);
//     if (!selectedFiles.length) return;

//     const validFiles = selectedFiles.filter(isValidFileSize);

//     let newFiles = [...files];

//     for (let i = 0; i < validFiles.length && newFiles.length < 3; i++) {
//       newFiles.push(validFiles[i]);
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
//           <div
//             className={styles.wrap_image}
//             key={file ? file.name + i : `placeholder-${i}`}
//           >
//             {type === "image" ? (
//               file ? (
//                 <img
//                   src={URL.createObjectURL(file)}
//                   alt={`media-${i}`}
//                   className={styles.image}
//                 />
//               ) : (
//                 <img
//                   src={"/image/2.svg"}
//                   alt="media placeholder"
//                   className={styles.image}
//                 />
//               )
//             ) : (
//               <div className={styles.audio_container}>
//                 {file ? (
//                   <>
//                     <AudioFileIcon
//                       style={{ fontSize: "4rem", color: "#666" }}
//                     />
//                     <audio style={{ width: "100%", marginTop: "0.5rem" }}>
//                       <source
//                         src={URL.createObjectURL(file)}
//                         type={file.type}
//                       />
//                       مرورگر شما از پخش فایل صوتی پشتیبانی نمی‌کند.
//                     </audio>
//                   </>
//                 ) : (
//                   <AudioFileOutlinedIcon
//                     style={{ fontSize: "4rem", color: "#aaa" }}
//                   />
//                 )}
//               </div>
//             )}

//             <input
//               type="file"
//               accept={type === "image" ? "image/*" : "audio/*"}
//               multiple
//               style={{ display: "none" }}
//               ref={(el) => (inputRefs.current[i] = el)}
//               onChange={handleFileChange}
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
import Resizer from "react-image-file-resizer";

export default function MediaModal({ text, type, files, setFiles }) {
  const inputRefs = useRef([]);

  const handleUploadClick = (index) => {
    if (inputRefs.current[index]) {
      inputRefs.current[index].click();
    }
  };

  const handleFileChange = async (e) => {
    const selectedFiles = Array.from(e.target.files);
    if (!selectedFiles.length) return;

    const validFiles = selectedFiles.filter(isValidFileSize);
    let newFiles = [...files];

    for (let i = 0; i < validFiles.length && newFiles.length < 3; i++) {
      const file = validFiles[i];

      if (type === "image") {
        try {
          const base64 = await resizeImage(file);
          newFiles.push({ preview: URL.createObjectURL(file), base64 });
        } catch (error) {
          console.error("Error resizing image:", error);
        }
      } else if (type === "voice") {
        try {
          const base64 = await fileToBase64(file);
          newFiles.push({
            preview: URL.createObjectURL(file),
            base64,
            type: file.type,
          });
        } catch (error) {
          console.error("Error reading audio file:", error);
        }
      }
    }

    setFiles(newFiles);
  };

  const resizeImage = (file) =>
    new Promise((resolve, reject) => {
      Resizer.imageFileResizer(
        file,
        800,
        800,
        "JPEG",
        70,
        0,
        (uri) => resolve(uri),
        "base64"
      );
    });

  const fileToBase64 = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });

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
          <div
            className={styles.wrap_image}
            key={file ? file.preview + i : `placeholder-${i}`}
          >
            {type === "image" ? (
              file ? (
                <img
                  src={file.preview}
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
                      style={{ width: "100%", marginTop: "0.5rem" }}
                      controls
                    >
                      <source src={file.preview} type={file.type} />
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
              multiple
              style={{ display: "none" }}
              ref={(el) => (inputRefs.current[i] = el)}
              onChange={handleFileChange}
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
