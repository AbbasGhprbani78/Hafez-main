import { useContext, useEffect, useRef, useState } from "react";
import "./Pform4.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen, faPrint } from "@fortawesome/free-solid-svg-icons";
import { Col } from "react-bootstrap";
import { useReactToPrint } from "react-to-print";
import { MyContext } from "../../../../context/context";

import apiClient from "../../../../config/axiosConfig";

export default function Pform4({ prevTab }) {
  const contentRef = useRef(null);
  const reactToPrintFn = useReactToPrint({ contentRef });
  const { idForm } = useContext(MyContext);
  const [dataForm, setDataForm] = useState();

  useEffect(() => {
    const getMainFormData = async () => {
      try {
        const response = await apiClient.get(
          `/app/get-complated-form/${idForm}`
        );
        if (response.status === 200) {
          console.log(response.data);
          setDataForm(response.data);
        }
      } catch (error) {
        console.log(error);
      }
    };
    getMainFormData();
  }, [idForm]);

  return (
    <div className="confirmation-form-wrapper">
      <div className="confirmation-form" ref={contentRef}>
        <div className="amission-number-wrapper">
          <p className="">شماره پذیرش</p>
          <p className="amission-number">14856258</p>
        </div>
        <div className="confirmation-form-contant">
          {/* Additional content here */}
        </div>
        <div className="hlep-texts-content">
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
        <div className="signature-content">
          <Col xs={12} md={6}>
            <p className="signature-text">
              ضمن مطالعه کامل برگ پذیرش و کلیه موارد ثبت شده را تایید می نمایم.
            </p>
          </Col>
          <Col xs={12} md={6}>
            <div className="location-of-signatures">
              <p>محل امضا مشتری</p>
              <p className="signature-res">محل امضا پذیرشگر</p>
            </div>
          </Col>
        </div>
      </div>

      <div className="confirmation-btns">
        <button className="edit-btn confirmation-btn " onClick={prevTab}>
          قبلی
          <FontAwesomeIcon icon={faPen} className={`penicon`} />
        </button>
        <button className="print-btn confirmation-btn" onClick={reactToPrintFn}>
          پرینت
          <FontAwesomeIcon icon={faPrint} />
        </button>
      </div>

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
  );
}
