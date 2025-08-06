import styles from "./Attaches.module.css";
import Button2 from "../../../Modules/Button2/Button2";
import Texteara from "../../../Modules/Texteara/Textarea";
import Grid from "@mui/material/Grid2";
import { useEffect, useState } from "react";
import { Box } from "@mui/material";
import { faCheck, faPlus, faTrash } from "@fortawesome/free-solid-svg-icons";
import Resizer from "react-image-file-resizer";
import { isValidFileSize } from "../../../../utils/helper";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import apiClient from "../../../../config/axiosConfig";
import {
  errorMessage,
  successMessage,
} from "../../../Modules/Toast/ToastCustom";

export default function Attaches({ id }) {
  const [openModalAttaches, setOpenModalAttaches] = useState(false);
  const [loading, setLoading] = useState(false);
  const [attachesData, setAttachesData] = useState({
    media: [],
    discription: "",
  });

  const MAX_UPLOAD_LIMIT = 6;

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

    // گرفتن مقدار فعلی media
    const currentMedia = Array.isArray(attachesData.media)
      ? [...attachesData.media]
      : [];

    const remainingSlots = MAX_UPLOAD_LIMIT - currentMedia.length;

    if (remainingSlots <= 0) {
      errorMessage(`حداکثر ${MAX_UPLOAD_LIMIT} فایل مجاز است.`);
      return;
    }

    if (validFiles.length > remainingSlots) {
      errorMessage(`حداکثر ${MAX_UPLOAD_LIMIT} فایل مجاز است.`);
    }

    const filesToAdd = validFiles.slice(0, remainingSlots);

    const resizedFiles = await Promise.all(
      filesToAdd.map(async (file) => {
        try {
          return await resizeImage(file);
        } catch (error) {
          console.error("Error resizing image:", error);
          return null;
        }
      })
    );

    const filteredFiles = resizedFiles.filter(Boolean);

    setAttachesData((prev) => ({
      ...prev,
      media: [
        ...(Array.isArray(prev.media) ? prev.media : []),
        ...filteredFiles,
      ],
    }));

    e.target.value = "";
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

  const postData = async () => {
    const payload = {
      form: id,
      descriptions: attachesData.discription,
      files: attachesData.media,
    };
    setLoading(true);
    try {
      const response = await apiClient.post(
        "app/api/attachments/create/",
        payload
      );
      if (response.status === 201) {
        successMessage("پیوست ها با موفقیت ارسال شد .");
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const getData = async () => {
    try {
      const response = await apiClient.get(`app/api/attachments/${id}/`);
      if (response.status === 200) {
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div className={styles.box}>
      {/* <span className={`${styles.box_title} subtitle-project`}>
        پیوستها:
        <Button2 onClick={""}>{"تاریخچه پیوست‌ها"}</Button2>
      </span> */}
      <Grid container spacing={4} sx={{ marginTop: "2rem" }}>
        <Grid size={{ xs: 12, sm: 6, lg: 5 }}>
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
                multiple
              />
            </label>
          </Box>
          {attachesData?.media?.length > 0 && (
            <Grid container spacing={4} sx={{ marginTop: "1.7rem" }}>
              {attachesData?.media?.map((item, i) => (
                <Grid
                  size={{ xs: 6, sm: 4, xl: 4 }}
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
        <Grid size={{ xs: 12, sm: 6, lg: 7 }}>
          <Texteara
            value={attachesData.discription}
            onChange={handleChangeText}
            name={"discription"}
            text={"توضیحات"}
          />
        </Grid>
      </Grid>
      <div className="p-form-actions">
        <div className="p-form-actions">
          <Button2 onClick={postData} disable={loading}>
            تایید
            <FontAwesomeIcon icon={faCheck} />
          </Button2>
        </div>
      </div>
    </div>
  );
}
