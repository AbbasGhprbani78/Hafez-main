import styles from "./Attaches.module.css";
import Button2 from "../../../Modules/Button2/Button2";
import Texteara from "../../../Modules/Texteara/Textarea";
import Grid from "@mui/material/Grid2";
import { useState } from "react";
import { Box } from "@mui/material";
import { faPlus, faTrash } from "@fortawesome/free-solid-svg-icons";
import Resizer from "react-image-file-resizer";
import { isValidFileSize } from "../../../../utils/helper";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function Attaches() {
  const [openModalAttaches, setOpenModalAttaches] = useState(false);
  const [attachesData, setAttachesData] = useState({
    media: [],
    discription: "",
  });

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

  const handleFileChange = async (e) => {
    const selectedFiles = Array.from(e.target.files);
    if (!selectedFiles.length) return;

    const validFiles = selectedFiles.filter(isValidFileSize);
    let newFiles = [...attachesData.media];

    for (let i = 0; i < validFiles.length && newFiles.length < 6; i++) {
      const file = validFiles[i];

      try {
        const base64 = await resizeImage(file);
        newFiles.push(base64);
      } catch (error) {
        console.error("Error resizing image:", error);
      }
    }

    setAttachesData((prev) => ({
      ...prev,
      media: [...newFiles],
    }));
  };

  const handleChangeText = (e) => {
    const { name, value } = e.target;
    setAttachesData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleRemove = (index) => {
    let newFiles = [...attachesData.media];
    newFiles.splice(index, 1);
    setAttachesData((prev) => ({
      ...prev,
      media: [...newFiles],
    }));
  };

  return (
    <div className={styles.box}>
      <span className={`${styles.box_title} subtitle-project`}>
        پیوستها:
        <Button2 onClick={""}>{"تاریخچه پیوست‌ها"}</Button2>
      </span>
      <Grid container spacing={4} sx={{ marginTop: "2rem" }}>
        <Grid size={{ xs: 12, md: 5 }}>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <span>بارگذاری عکس و فیلم</span>
            <label htmlFor="media" className={styles.upload_btn}>
              افزودن
              <FontAwesomeIcon icon={faPlus} />
              <input
                type="file"
                name="media"
                id="media"
                style={{ display: "none" }}
                onChange={handleFileChange}
                accept="image/*,video/*"
              />
            </label>
          </Box>
          {attachesData.media.length > 0 && (
            <Grid container spacing={4} sx={{ marginTop: "1.7rem" }}>
              {attachesData.media.map((item, i) => (
                <Grid
                  size={{ xs: 12, sm: 6, md: 4 }}
                  className={styles.imageWrap}
                  key={i}
                >
                  <img src={item} alt="image attach" className={styles.image} />
                  <div className={styles.cover}>
                    <FontAwesomeIcon
                      icon={faTrash}
                      className="deleteIcon"
                      onClick={() => handleRemove(i)}
                    />
                  </div>
                </Grid>
              ))}
            </Grid>
          )}
        </Grid>
        <Grid size={{ xs: 12, md: 7 }}>
          <Texteara
            value={attachesData.discription}
            onChange={handleChangeText}
            name={"discription"}
            text={"توضیحات"}
          />
        </Grid>
      </Grid>
    </div>
  );
}
