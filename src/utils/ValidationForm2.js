// validation.js
export const validateFields = (form2,otherCar, otherColor) => {
    const newErrors = {};
    const chassisNumberPattern = /^[A-HJ-NPR-Z0-9]{17}$/i;
    const number = /^[0-9]+$/;

    if (!form2.customer_secend_form.material) {
        newErrors.material = 'وارد کردن نوع خودروالزامیست';
    }
    if (otherCar && !form2.customer_secend_form.other_car) {
        newErrors.other_car = 'وارد کردن خودروی سایر الزامی است';
    }

    if (!form2.customer_secend_form.chassis_number) {
        newErrors.chassis_number = 'شماره شاسی الزامی است';
    } else if (!chassisNumberPattern.test(form2.customer_secend_form.chassis_number)) {
        newErrors.chassis_number = 'شماره شاسی باید شامل ۱۷ رقم و ترکیبی از اعداد و حروف باشد';
    }

    if (!form2.customer_secend_form.color) {
        newErrors.color = 'وارد کردن رنگ الزامیست';
    }

    if (otherColor && !form2.customer_secend_form.other_color) {
        newErrors.other_color = 'وارد کردن رنگ سایر الزامی است';
    }

    if (!form2.customer_secend_form.car_operation) {
        newErrors.car_operation = ' تعیین کارکرد خودرو الزامی است';
    } else if (!number.test(form2.customer_secend_form.car_operation)) {
        newErrors.car_operation = ' تعیین کارکرد خودرو باید تنها شامل اعداد باشد';
    }

    if (!form2.customer_secend_form.license_plate_number) {
        newErrors.license_plate_number = 'وارد کردن شماره پلاک الزامیست';
    }
    if (!form2.customer_secend_form.amount_fuel) {
        newErrors.amount_fuel = 'تعیین میزان سوخت الزامیست';
    }
    if (!form2.customer_secend_form.amount_cng) {
        newErrors.amount_cng = 'تعیین میزان CNG الزامیست';
    }
    if (!form2.customer_secend_form.tire_wear_rate) {
        newErrors.tire_wear_rate = 'تعیین فرسایش لاستیک ها الزامیست';
    }

    const puncturedTires = form2.customer_secend_form.number_punctured_tires;
    if (!puncturedTires) {
        newErrors.number_punctured_tires = 'تعیین تعداد لاستیک های پنچر الزامی است';
    } else if (!/^[0-4]$/.test(puncturedTires)) {
        newErrors.number_punctured_tires = 'تعداد لاستیک های پنچر باید بین 0 تا 4 باشد';
    }

    if (!form2.customer_secend_form.erosion_rate) {
        newErrors.erosion_rate = 'تعیین میزان فرسایش الزامیست';
    }

    if (!Array.isArray(form2.fill_form) || form2.fill_form.length === 0) {
        newErrors.fill_form = 'باید حداقل یک بخش از ماشین انتخاب شده باشد';
    }

    if (!Array.isArray(form2.accessories) || form2.accessories.length === 0) {
        newErrors.accessories = 'باید حداقل یک آیتم در لوازم جانبی وجود داشته باشد';
    }

    return newErrors;
};
