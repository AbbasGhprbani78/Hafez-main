import SideBar from "../../Components/Modules/SideBar/SideBar";
import Header from "../../Components/Modules/Header/Header";
import {
  faMagnifyingGlass,
  faChevronLeft,
  faChevronRight,
  faAngleDoubleLeft,
  faAngleDoubleRight,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import PropTypes from "prop-types";
import styles from "./Arboretum.module.css";

export default function Arboretum() {
  const [searchInputs, setSearchInputs] = useState({
    parts: "",
    wages: "",
    defects: "",
    statements: "",
  });

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const tableData = [
    {
      parts: { title: "", code: "" },
      wages: { title: "", code: "" },
      defects: { title: "نشتي روغن ترمز", code: "10225" },
      statements: { title: "نشتي روغن ترمز", code: "10225" },
    },
    {
      parts: { title: "", code: "" },
      wages: { title: "", code: "" },
      defects: { title: "", code: "" },
      statements: {
        title: "عملکرد نامناسب نشانگر وضعیت چراغ دیلایت و اتولایت",
        code: "10225",
      },
    },
    {
      parts: { title: "", code: "" },
      wages: { title: "", code: "" },
      defects: { title: "", code: "" },
      statements: { title: "عملکرد نامناسب نشانگر وضعیت دربها", code: "10225" },
    },
    {
      parts: { title: "", code: "" },
      wages: { title: "", code: "" },
      defects: { title: "", code: "" },
      statements: { title: "نشتي روغن ترمز", code: "10225" },
    },
    {
      parts: { title: "", code: "" },
      wages: { title: "", code: "" },
      defects: { title: "", code: "" },
      statements: {
        title: "عملکرد نامناسب نشانگر وضعیت چراغ دیلایت و اتولایت",
        code: "10225",
      },
    },
    {
      parts: { title: "", code: "" },
      wages: { title: "", code: "" },
      defects: { title: "", code: "" },
      statements: { title: "عملکرد نامناسب نشانگر وضعیت دربها", code: "10225" },
    },
    {
      parts: { title: "", code: "" },
      wages: { title: "", code: "" },
      defects: { title: "", code: "" },
      statements: { title: "نشتي روغن ترمز", code: "10225" },
    },
    {
      parts: { title: "", code: "" },
      wages: { title: "", code: "" },
      defects: { title: "", code: "" },
      statements: {
        title: "عملکرد نامناسب نشانگر وضعیت چراغ دیلایت و اتولایت",
        code: "10225",
      },
    },
    {
      parts: { title: "", code: "" },
      wages: { title: "", code: "" },
      defects: { title: "", code: "" },
      statements: { title: "عملکرد نامناسب نشانگر وضعیت دربها", code: "10225" },
    },
    {
      parts: { title: "", code: "" },
      wages: { title: "", code: "" },
      defects: { title: "", code: "" },
      statements: { title: "نشتي روغن ترمز", code: "10225" },
    },
  ];

  const handleSearchChange = (section, value) => {
    setSearchInputs((prev) => ({
      ...prev,
      [section]: value,
    }));
  };

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  const getPaginatedData = (data) => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return data.slice(startIndex, endIndex);
  };

  const totalPages = Math.ceil(tableData.length / itemsPerPage);

  const TableRow = ({ rowData }) => (
    <div className={styles.table_row}>
      <div className={styles.table_cell}>
        {rowData.statements.code || (
          <span style={{ color: "var(--color-1)" }}>-</span>
        )}
      </div>
      <div className={styles.table_cell}>
        {rowData.statements.title || (
          <span style={{ color: "var(--color-1)" }}>داده‌ای موجود نیست</span>
        )}
      </div>

      <div className={styles.table_cell}>
        {rowData.defects.code || (
          <span style={{ color: "var(--color-1)" }}>-</span>
        )}
      </div>
      <div className={styles.table_cell}>
        {rowData.defects.title || (
          <span style={{ color: "var(--color-1)" }}>داده‌ای موجود نیست</span>
        )}
      </div>

      <div className={styles.table_cell}>
        {rowData.wages.code || (
          <span style={{ color: "var(--color-1)" }}>-</span>
        )}
      </div>
      <div className={styles.table_cell}>
        {rowData.wages.title || (
          <span style={{ color: "var(--color-1)" }}>داده‌ای موجود نیست</span>
        )}
      </div>

      <div className={styles.table_cell}>
        {rowData.parts.code || (
          <span style={{ color: "var(--color-1)" }}>-</span>
        )}
      </div>
      <div className={styles.table_cell}>
        {rowData.parts.title || (
          <span style={{ color: "var(--color-1)" }}>داده‌ای موجود نیست</span>
        )}
      </div>
    </div>
  );

  TableRow.propTypes = {
    rowData: PropTypes.object.isRequired,
  };

  const SearchSection = ({ section, placeholder }) => (
    <div className={styles.search_cell}>
      <div className={styles.search_input_wrapper}>
        <input
          type="text"
          className={styles.search_input}
          placeholder={placeholder}
          value={searchInputs[section]}
          onChange={(e) => handleSearchChange(section, e.target.value)}
        />
        <FontAwesomeIcon
          icon={faMagnifyingGlass}
          className={styles.search_icon}
        />
      </div>
    </div>
  );

  SearchSection.propTypes = {
    section: PropTypes.string.isRequired,
    placeholder: PropTypes.string.isRequired,
  };

  const Pagination = () => (
    <div className={styles.pagination_container}>
      <button
        className={styles.pagination_button}
        onClick={() => handlePageChange(1)}
        disabled={currentPage === 1}
      >
        <FontAwesomeIcon icon={faAngleDoubleLeft} />
      </button>
      <button
        className={styles.pagination_button}
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={currentPage === 1}
      >
        <FontAwesomeIcon icon={faChevronLeft} />
      </button>
      <span className={styles.pagination_info}>
        {currentPage} - {itemsPerPage}
      </span>
      <button
        className={styles.pagination_button}
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        <FontAwesomeIcon icon={faChevronRight} />
      </button>
      <button
        className={styles.pagination_button}
        onClick={() => handlePageChange(totalPages)}
        disabled={currentPage === totalPages}
      >
        <FontAwesomeIcon icon={faAngleDoubleRight} />
      </button>
    </div>
  );

  return (
    <>
      <div className="content-conatiner">
        <SideBar />
        <div className="space-content">
          <Header title={"درختواره"} />
          <div className={styles.arboretum_container}>
            <div className={styles.unified_table}>
              {/* Table Header */}
              <div className={styles.table_header_row}>
                <div className={styles.table_header_cell}>اظهارات</div>
                <div className={styles.table_header_cell}>عیب ها</div>
                <div className={styles.table_header_cell}>اجرت ها</div>
                <div className={styles.table_header_cell}>قطعات</div>
              </div>

              <div className={styles.search_row}>
                <SearchSection section="statements" placeholder="کد/عنوان" />
                <SearchSection section="defects" placeholder="کد/عنوان" />
                <SearchSection section="wages" placeholder="کد/عنوان" />
                <SearchSection section="parts" placeholder="کد/عنوان" />
              </div>
              {/* Sub Headers */}
              <div className={styles.sub_header_row}>
                <div className={styles.sub_header_cell}>کد</div>
                <div className={styles.sub_header_cell}>عنوان</div>
                <div className={styles.sub_header_cell}>کد</div>
                <div className={styles.sub_header_cell}>عنوان</div>
                <div className={styles.sub_header_cell}>کد</div>
                <div className={styles.sub_header_cell}>عنوان</div>
                <div className={styles.sub_header_cell}>کد</div>
                <div className={styles.sub_header_cell}>عنوان</div>
              </div>

              <div className={styles.table_content}>
                {getPaginatedData(tableData).map((rowData, index) => (
                  <TableRow key={index} rowData={rowData} />
                ))}
              </div>

              <Pagination />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
