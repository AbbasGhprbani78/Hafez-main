import { useContext, useEffect } from "react";
import "./Pform4.css";

import apiClient from "../../../../config/axiosConfig";
import { MyContext } from "../../../../context/context";

export default function Pform4({ formId }) {
  const { editMode } = useContext(MyContext);

  const getDataAllForm = async () => {
    try {
      const response = await apiClient.get(`/app/get-complated-form/${formId}`);
      if (response.status === 200) {
        console.log(response.data);
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getDataAllForm();
  }, []);

  return (
    <>
      <div className="confirmation-form-wrapper">
        <div className="hlep-texts-content-bottom">
          <ul className="help-text-list">
            <li className="help-text-item">
              <span className="dot-item"></span>
              مسئولیت حفظ و نگهداری وسایل شخصی بر عهده مالک/آورنده خودرو است.
            </li>
            <li className="help-text-item">
              <span className="dot-item"></span>
              این شرکت در صورت نیاز به انجام خدمات خارج از تعمیرگاه اجازه خروج
              خودرو را دارم.
            </li>
            <li className="help-text-item">
              <span className="dot-item"></span>
              در صورت افزایش مبلغ و یا زمان تخمینی تعمیرات، مراتب از طریق تماس
              تلفنی به مشتری اطلاع داده می شود.
            </li>
            <li className="help-text-item">
              <span className="dot-item"></span>
              هزینه خدمات خارج از تعمیرگاه در محاسبات فاکتور لحاظ نمی گردد و به
              صورت جداگانه می بایست توسط مالک/آورنده خودرو تصفیه/پرداخت شود.
            </li>
          </ul>
        </div>
      </div>
    </>
  );
}
