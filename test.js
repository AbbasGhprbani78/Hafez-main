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
import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import styles from "./Arboretum.module.css";

import apiClient from "../../config/axiosConfig";

const TableRow = ({ rowData }) => (
  <div className={styles.table_row}>
    <div className={styles.col_wrapper}>
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
    </div>

    <div className={styles.col_wrapper}>
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
    </div>

    <div className={styles.col_wrapper}>
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
    </div>

    <div className={styles.col_wrapper}>
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
  </div>
);

TableRow.propTypes = {
  rowData: PropTypes.object.isRequired,
};

const SearchSection = ({ section, placeholder, value, onChange }) => (
  <div className={styles.search_cell}>
    <div className={styles.search_input_wrapper}>
      <input
        type="text"
        className={styles.search_input}
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(section, e.target.value)}
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
  value: PropTypes.string,
  onChange: PropTypes.func.isRequired,
};

export default function Arboretum() {
  const [searchInputs, setSearchInputs] = useState({
    parts: "",
    wages: "",
    defects: "",
    statements: "",
  });

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const [selectedStatement, setSelectedStatement] = useState(null);
  const [selectedDefect, setSelectedDefect] = useState(null);
  const [selectedWage, setSelectedWage] = useState(null);

  const [apiData, setApiData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const tableData = apiData.length > 0 ? apiData : [];

  const handleSearchChange = (section, value) => {
    setSearchInputs((prev) => ({
      ...prev,
      [section]: value,
    }));
  };

  useEffect(() => {
    setCurrentPage(1);
  }, [searchInputs]);

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  const getPaginatedData = (data, page, perPage) => {
    const startIndex = (page - 1) * perPage;
    const endIndex = startIndex + perPage;
    return data.slice(startIndex, endIndex);
  };

  const getTotalPages = (data) => Math.ceil(data.length / itemsPerPage);

  const uniqueByCode = (items, field) => {
    const map = new Map();
    items.forEach((r) => {
      const it = r[field] || { code: "", title: "" };
      if (it && it.code) map.set(it.code, it);
    });
    return Array.from(map.values());
  };

  const filterListBySearch = (list, section) => {
    const q = (searchInputs[section] || "").toString().trim().toLowerCase();
    if (!q) return list;
    return list.filter((it) => {
      const code = (it.code || "").toString().toLowerCase();
      const title = (it.title || "").toString().toLowerCase();

      // Special handling for wages: search by code or by price (numeric)
      if (section === "wages") {
        const price = it.price != null ? it.price.toString() : "";
        const qDigits = q.replace(/\D/g, "");
        const priceDigits = price.replace(/\D/g, "");
        // if query contains digits, match against numeric price (ignoring separators)
        if (qDigits) {
          return priceDigits.includes(qDigits) || code.includes(q);
        }
        // otherwise fall back to code or salary/title text
        return (
          code.includes(q) ||
          title.includes(q) ||
          (it.salary || "").toString().toLowerCase().includes(q)
        );
      }

      return code.includes(q) || title.includes(q);
    });
  };

  const statementsList = filterListBySearch(
    uniqueByCode(tableData, "statements"),
    "statements"
  );

  const defectsList = filterListBySearch(
    uniqueByCode(
      tableData.filter((r) => {
        if (!selectedStatement) return true;
        return r.statements && r.statements.code === selectedStatement;
      }),
      "defects"
    ),
    "defects"
  );

  const wagesList = filterListBySearch(
    uniqueByCode(
      tableData.filter((r) => {
        if (selectedDefect)
          return r.defects && r.defects.code === selectedDefect;
        return true;
      }),
      "wages"
    ),
    "wages"
  );

  const partsList = filterListBySearch(
    uniqueByCode(
      tableData.filter((r) => {
        if (selectedWage) return r.wages && r.wages.code === selectedWage;
        return true;
      }),
      "parts"
    ),
    "parts"
  );

  const handleSelectStatement = (code) => {
    setSelectedStatement((prev) => (prev === code ? null : code));
    setSelectedDefect(null);
    setSelectedWage(null);
    setSearchInputs((prev) => ({ ...prev, defects: "", wages: "", parts: "" }));
  };

  const handleSelectDefect = (code) => {
    setSelectedDefect((prev) => (prev === code ? null : code));
    setSelectedWage(null);
    setSearchInputs((prev) => ({ ...prev, wages: "", parts: "" }));
  };

  const handleSelectWage = (code) => {
    setSelectedWage((prev) => (prev === code ? null : code));
    setSearchInputs((prev) => ({ ...prev, parts: "" }));
  };

  const transformApiData = (apiData) => {
    const transformedData = [];

    apiData.forEach((statement) => {
      if (statement.defects && statement.defects.length > 0) {
        statement.defects.forEach((defect) => {
          if (defect.wages && defect.wages.length > 0) {
            defect.wages.forEach((wage) => {
              if (wage.parts && wage.parts.length > 0) {
                wage.parts.forEach((part) => {
                  transformedData.push({
                    statements: {
                      code: statement.code,
                      title: statement.title,
                      id: statement.id,
                    },
                    defects: {
                      code: defect.code,
                      title: defect.title,
                      id: defect.id,
                    },
                    wages: {
                      code: wage.code,
                      price: parseInt(wage.price),
                      salary: wage.salary,
                      id: wage.id,
                    },
                    parts: {
                      code: part.value_number,
                      title: part.title,
                      id: part.id,
                    },
                  });
                });
              } else {
                transformedData.push({
                  statements: {
                    code: statement.code,
                    title: statement.title,
                    id: statement.id,
                  },
                  defects: {
                    code: defect.code,
                    title: defect.title,
                    id: defect.id,
                  },
                  wages: {
                    code: wage.code,
                    price: parseInt(wage.price),
                    salary: wage.salary,
                    id: wage.id,
                  },
                  parts: {
                    code: "",
                    title: "داده‌ای موجود نیست",
                    id: null,
                  },
                });
              }
            });
          } else {
            transformedData.push({
              statements: {
                code: statement.code,
                title: statement.title,
                id: statement.id,
              },
              defects: {
                code: defect.code,
                title: defect.title,
                id: defect.id,
              },
              wages: {
                code: "",
                price: 0,
                salary: "",
                id: null,
              },
              parts: {
                code: "",
                title: "داده‌ای موجود نیست",
                id: null,
              },
            });
          }
        });
      } else {
        transformedData.push({
          statements: {
            code: statement.code,
            title: statement.title,
            id: statement.id,
          },
          defects: {
            code: "",
            title: "داده‌ای موجود نیست",
            id: null,
          },
          wages: {
            code: "",
            price: 0,
            salary: "",
            id: null,
          },
          parts: {
            code: "",
            title: "داده‌ای موجود نیست",
            id: null,
          },
        });
      }
    });

    return transformedData;
  };

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await apiClient.get("/app/api/tree/");
        if (response.status === 200) {
          const transformedData = transformApiData(response.data);
          setApiData(transformedData);
        }
      } catch (error) {
        console.error("API Error:", error);
        setError("خطا در دریافت داده‌ها");
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const Pagination = () => {
    const maxTotalPages = Math.max(
      getTotalPages(statementsList),
      getTotalPages(defectsList),
      getTotalPages(wagesList),
      getTotalPages(partsList)
    );

    if (maxTotalPages <= 1) {
      return null;
    }

    const startItem = (currentPage - 1) * itemsPerPage + 1;
    const endItem = Math.min(
      currentPage * itemsPerPage,
      Math.max(
        statementsList.length,
        defectsList.length,
        wagesList.length,
        partsList.length
      )
    );

    return (
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
          {startItem} - {endItem}
        </span>
        <button
          className={styles.pagination_button}
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === maxTotalPages}
        >
          <FontAwesomeIcon icon={faChevronRight} />
        </button>
        <button
          className={styles.pagination_button}
          onClick={() => handlePageChange(maxTotalPages)}
          disabled={currentPage === maxTotalPages}
        >
          <FontAwesomeIcon icon={faAngleDoubleRight} />
        </button>
      </div>
    );
  };

  return (
    <>
      <div className="content-conatiner">
        <SideBar />
        <div className="space-content">
          <Header title={"درختواره"} />
          <div className={styles.arboretum_container}>
            <div className={styles.separate_tables_container}>
              {/* Statements Table */}

              <div className={styles.table_column}>
                <div className={styles.table_header}>اظهارات</div>
                <SearchSection
                  section="statements"
                  placeholder="کد/عنوان"
                  value={searchInputs.statements}
                  onChange={handleSearchChange}
                />
                <div className={styles.sub_header_row}>
                  <div className={styles.sub_header_cell}>کد</div>
                  <div className={styles.sub_header_cell}>عنوان</div>
                </div>
                <div className={styles.table_content}>
                  {getPaginatedData(
                    statementsList,
                    currentPage,
                    itemsPerPage
                  ).map((s, i) => (
                    <div
                      key={i}
                      className={`${styles.table_row} ${
                        selectedStatement === (s && s.code)
                          ? styles.selected
                          : ""
                      }`}
                      onClick={() => s && handleSelectStatement(s.code)}
                    >
                      <div className={styles.table_cell}>
                        {(s && s.code) || "-"}
                      </div>
                      <div className={styles.table_cell}>
                        {(s && s.title) || "داده‌ای موجود نیست"}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Defects Table */}
              <div className={styles.table_column}>
                <div className={styles.table_header}>عیب ها</div>
                <SearchSection
                  section="defects"
                  placeholder="کد/عنوان"
                  value={searchInputs.defects}
                  onChange={handleSearchChange}
                />
                <div className={styles.sub_header_row}>
                  <div className={styles.sub_header_cell}>کد</div>
                  <div className={styles.sub_header_cell}>عنوان</div>
                </div>
                <div className={styles.table_content}>
                  {selectedStatement || searchInputs.defects ? (
                    getPaginatedData(
                      defectsList,
                      currentPage,
                      itemsPerPage
                    ).map((d, i) => (
                      <div
                        key={i}
                        className={`${styles.table_row} ${
                          selectedDefect === (d && d.code)
                            ? styles.selected
                            : ""
                        }`}
                        onClick={() => d && handleSelectDefect(d.code)}
                      >
                        <div className={styles.table_cell}>
                          {(d && d.code) || "-"}
                        </div>
                        <div className={styles.table_cell}>
                          {(d && d.title) || "داده‌ای موجود نیست"}
                        </div>
                      </div>
                    ))
                  ) : (
                    <></>
                  )}
                </div>
              </div>

              {/* Prices Table */}
              <div className={styles.table_column}>
                <div className={styles.table_header}>اجرت ها</div>
                <SearchSection
                  section="wages"
                  placeholder="کد/قیمت"
                  value={searchInputs.wages}
                  onChange={handleSearchChange}
                />
                <div className={styles.sub_header_row}>
                  <div className={styles.sub_header_cell}>کد</div>
                  <div className={styles.sub_header_cell}>قیمت</div>
                </div>
                <div className={styles.table_content}>
                  {selectedDefect || searchInputs.wages ? (
                    getPaginatedData(wagesList, currentPage, itemsPerPage).map(
                      (w, i) => (
                        <div
                          key={i}
                          className={`${styles.table_row} ${
                            selectedWage === (w && w.code)
                              ? styles.selected
                              : ""
                          }`}
                          onClick={() => w && handleSelectWage(w.code)}
                        >
                          <div className={styles.table_cell}>
                            {(w && w.code) || "-"}
                          </div>
                          <div className={styles.table_cell}>
                            {w && w.price
                              ? `${w.price.toLocaleString()} تومان`
                              : "داده‌ای موجود نیست"}
                          </div>
                        </div>
                      )
                    )
                  ) : (
                    <></>
                  )}
                </div>
              </div>

              {/* Parts Table */}
              <div className={styles.table_column}>
                <div className={styles.table_header}>قطعات</div>
                <SearchSection
                  section="parts"
                  placeholder="کد/عنوان"
                  value={searchInputs.parts}
                  onChange={handleSearchChange}
                />
                <div className={styles.sub_header_row}>
                  <div className={styles.sub_header_cell}>کد</div>
                  <div className={styles.sub_header_cell}>عنوان</div>
                </div>
                <div className={styles.table_content}>
                  {selectedWage ? (
                    getPaginatedData(partsList, currentPage, itemsPerPage).map(
                      (p, i) => (
                        <div key={i} className={styles.table_row}>
                          <div className={styles.table_cell}>
                            {(p && p.code) || "-"}
                          </div>
                          <div className={styles.table_cell}>
                            {(p && p.title) || "داده‌ای موجود نیست"}
                          </div>
                        </div>
                      )
                    )
                  ) : (
                    <></>
                  )}
                </div>
              </div>
            </div>
            <Pagination />
          </div>
        </div>
      </div>
    </>
  );
}


///////////////////////////////////



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
import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import styles from "./Arboretum.module.css";

import apiClient from "../../config/axiosConfig";

const TableRow = ({ rowData }) => (
  <div className={styles.table_row}>
    <div className={styles.col_wrapper}>
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
    </div>

    <div className={styles.col_wrapper}>
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
    </div>

    <div className={styles.col_wrapper}>
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
    </div>

    <div className={styles.col_wrapper}>
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
  </div>
);

TableRow.propTypes = {
  rowData: PropTypes.object.isRequired,
};

const SearchSection = ({ section, placeholder, value, onChange }) => (
  <div className={styles.search_cell}>
    <div className={styles.search_input_wrapper}>
      <input
        type="text"
        className={styles.search_input}
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(section, e.target.value)}
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
  value: PropTypes.string,
  onChange: PropTypes.func.isRequired,
};

export default function Arboretum() {
  const [searchInputs, setSearchInputs] = useState({
    parts: "",
    wages: "",
    defects: "",
    statements: "",
  });

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const [selectedStatement, setSelectedStatement] = useState(null);
  const [selectedDefect, setSelectedDefect] = useState(null);
  const [selectedWage, setSelectedWage] = useState(null);
  const [selectedPart, setSelectedPart] = useState(null);

  const [apiData, setApiData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const tableData = apiData.length > 0 ? apiData : [];

  const handleSearchChange = (section, value) => {
    setSearchInputs((prev) => ({
      ...prev,
      [section]: value,
    }));
  };

  useEffect(() => {
    setCurrentPage(1);
  }, [searchInputs]);

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  const getPaginatedData = (data, page, perPage) => {
    const startIndex = (page - 1) * perPage;
    const endIndex = startIndex + perPage;
    return data.slice(startIndex, endIndex);
  };

  const getTotalPages = (data) => Math.ceil(data.length / itemsPerPage);

  const uniqueByCode = (items, field) => {
    const map = new Map();
    items.forEach((r) => {
      const it = r[field] || { code: "", title: "" };
      if (it && it.code) map.set(it.code, it);
    });
    return Array.from(map.values());
  };

  const filterListBySearch = (list, section) => {
    const q = (searchInputs[section] || "").toString().trim().toLowerCase();
    if (!q) return list;
    return list.filter((it) => {
      const code = (it.code || "").toString().toLowerCase();
      const title = (it.title || "").toString().toLowerCase();

      // Special handling for wages: search by code or by price (numeric)
      if (section === "wages") {
        const price = it.price != null ? it.price.toString() : "";
        const qDigits = q.replace(/\D/g, "");
        const priceDigits = price.replace(/\D/g, "");
        // if query contains digits, match against numeric price (ignoring separators)
        if (qDigits) {
          return priceDigits.includes(qDigits) || code.includes(q);
        }
        // otherwise fall back to code or salary/title text
        return (
          code.includes(q) ||
          title.includes(q) ||
          (it.salary || "").toString().toLowerCase().includes(q)
        );
      }

      return code.includes(q) || title.includes(q);
    });
  };

  const statementsList = filterListBySearch(
    uniqueByCode(tableData, "statements"),
    "statements"
  );

  const defectsList = filterListBySearch(
    uniqueByCode(
      tableData.filter((r) => {
        if (
          selectedStatement &&
          !(r.statements && r.statements.code === selectedStatement)
        )
          return false;
        if (selectedWage && !(r.wages && r.wages.code === selectedWage))
          return false;
        if (selectedPart && !(r.parts && r.parts.code === selectedPart))
          return false;
        return true;
      }),
      "defects"
    ),
    "defects"
  );

  const wagesList = filterListBySearch(
    uniqueByCode(
      tableData.filter((r) => {
        if (
          selectedStatement &&
          !(r.statements && r.statements.code === selectedStatement)
        )
          return false;
        if (selectedDefect && !(r.defects && r.defects.code === selectedDefect))
          return false;
        if (selectedPart && !(r.parts && r.parts.code === selectedPart))
          return false;
        return true;
      }),
      "wages"
    ),
    "wages"
  );

  const partsList = filterListBySearch(
    uniqueByCode(
      tableData.filter((r) => {
        if (
          selectedStatement &&
          !(r.statements && r.statements.code === selectedStatement)
        )
          return false;
        if (selectedDefect && !(r.defects && r.defects.code === selectedDefect))
          return false;
        if (selectedWage && !(r.wages && r.wages.code === selectedWage))
          return false;
        return true;
      }),
      "parts"
    ),
    "parts"
  );

  const handleSelectStatement = (code) => {
    setSelectedStatement((prev) => (prev === code ? null : code));
    setSelectedDefect(null);
    setSelectedWage(null);
    setSelectedPart(null);
    setSearchInputs((prev) => ({ ...prev, defects: "", wages: "", parts: "" }));
  };

  const handleSelectDefect = (code) => {
    setSelectedDefect((prev) => (prev === code ? null : code));
    // when selecting a defect, clear lower selections
    setSelectedWage(null);
    setSelectedPart(null);
    setSearchInputs((prev) => ({ ...prev, wages: "", parts: "" }));
    // try to auto-select parent statement if unique
    try {
      const relatedStatements = Array.from(
        new Set(
          tableData
            .filter((r) => r.defects && r.defects.code === code)
            .map((r) => (r.statements && r.statements.code) || null)
            .filter(Boolean)
        )
      );
      if (relatedStatements.length === 1)
        setSelectedStatement(relatedStatements[0]);
    } catch (e) {
      // ignore
    }
  };

  const handleSelectWage = (code) => {
    setSelectedWage((prev) => (prev === code ? null : code));
    // clear lower selection
    setSelectedPart(null);
    setSearchInputs((prev) => ({ ...prev, parts: "" }));
    // try to auto-select parent defect and statement if unique
    try {
      const relatedDefects = Array.from(
        new Set(
          tableData
            .filter((r) => r.wages && r.wages.code === code)
            .map((r) => (r.defects && r.defects.code) || null)
            .filter(Boolean)
        )
      );
      if (relatedDefects.length === 1) setSelectedDefect(relatedDefects[0]);

      const relatedStatements = Array.from(
        new Set(
          tableData
            .filter((r) => r.wages && r.wages.code === code)
            .map((r) => (r.statements && r.statements.code) || null)
            .filter(Boolean)
        )
      );
      if (relatedStatements.length === 1)
        setSelectedStatement(relatedStatements[0]);
    } catch (e) {
      // ignore
    }
  };

  const handleSelectPart = (code) => {
    setSelectedPart((prev) => (prev === code ? null : code));

    setSearchInputs((prev) => ({ ...prev }));

    try {
      const relatedWages = Array.from(
        new Set(
          tableData
            .filter((r) => r.parts && r.parts.code === code)
            .map((r) => (r.wages && r.wages.code) || null)
            .filter(Boolean)
        )
      );
      if (relatedWages.length === 1) setSelectedWage(relatedWages[0]);

      const relatedDefects = Array.from(
        new Set(
          tableData
            .filter((r) => r.parts && r.parts.code === code)
            .map((r) => (r.defects && r.defects.code) || null)
            .filter(Boolean)
        )
      );
      if (relatedDefects.length === 1) setSelectedDefect(relatedDefects[0]);

      const relatedStatements = Array.from(
        new Set(
          tableData
            .filter((r) => r.parts && r.parts.code === code)
            .map((r) => (r.statements && r.statements.code) || null)
            .filter(Boolean)
        )
      );
      if (relatedStatements.length === 1)
        setSelectedStatement(relatedStatements[0]);
    } catch (e) {
      console.log(e);
    }
  };

  const transformApiData = (apiData) => {
    const transformedData = [];

    apiData.forEach((statement) => {
      if (statement.defects && statement.defects.length > 0) {
        statement.defects.forEach((defect) => {
          if (defect.wages && defect.wages.length > 0) {
            defect.wages.forEach((wage) => {
              if (wage.parts && wage.parts.length > 0) {
                wage.parts.forEach((part) => {
                  transformedData.push({
                    statements: {
                      code: statement.code,
                      title: statement.title,
                      id: statement.id,
                    },
                    defects: {
                      code: defect.code,
                      title: defect.title,
                      id: defect.id,
                    },
                    wages: {
                      code: wage.code,
                      price: parseInt(wage.price),
                      salary: wage.salary,
                      id: wage.id,
                    },
                    parts: {
                      code: part.value_number,
                      title: part.title,
                      id: part.id,
                    },
                  });
                });
              } else {
                transformedData.push({
                  statements: {
                    code: statement.code,
                    title: statement.title,
                    id: statement.id,
                  },
                  defects: {
                    code: defect.code,
                    title: defect.title,
                    id: defect.id,
                  },
                  wages: {
                    code: wage.code,
                    price: parseInt(wage.price),
                    salary: wage.salary,
                    id: wage.id,
                  },
                  parts: {
                    code: "",
                    title: "داده‌ای موجود نیست",
                    id: null,
                  },
                });
              }
            });
          } else {
            transformedData.push({
              statements: {
                code: statement.code,
                title: statement.title,
                id: statement.id,
              },
              defects: {
                code: defect.code,
                title: defect.title,
                id: defect.id,
              },
              wages: {
                code: "",
                price: 0,
                salary: "",
                id: null,
              },
              parts: {
                code: "",
                title: "داده‌ای موجود نیست",
                id: null,
              },
            });
          }
        });
      } else {
        transformedData.push({
          statements: {
            code: statement.code,
            title: statement.title,
            id: statement.id,
          },
          defects: {
            code: "",
            title: "داده‌ای موجود نیست",
            id: null,
          },
          wages: {
            code: "",
            price: 0,
            salary: "",
            id: null,
          },
          parts: {
            code: "",
            title: "داده‌ای موجود نیست",
            id: null,
          },
        });
      }
    });

    return transformedData;
  };

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await apiClient.get("/app/api/tree/");
        if (response.status === 200) {
          const transformedData = transformApiData(response.data);
          setApiData(transformedData);
        }
      } catch (error) {
        console.error("API Error:", error);
        setError("خطا در دریافت داده‌ها");
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const Pagination = () => {
    const maxTotalPages = Math.max(
      getTotalPages(statementsList),
      getTotalPages(defectsList),
      getTotalPages(wagesList),
      getTotalPages(partsList)
    );

    if (maxTotalPages <= 1) {
      return null;
    }

    const startItem = (currentPage - 1) * itemsPerPage + 1;
    const endItem = Math.min(
      currentPage * itemsPerPage,
      Math.max(
        statementsList.length,
        defectsList.length,
        wagesList.length,
        partsList.length
      )
    );

    return (
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
          {startItem} - {endItem}
        </span>
        <button
          className={styles.pagination_button}
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === maxTotalPages}
        >
          <FontAwesomeIcon icon={faChevronRight} />
        </button>
        <button
          className={styles.pagination_button}
          onClick={() => handlePageChange(maxTotalPages)}
          disabled={currentPage === maxTotalPages}
        >
          <FontAwesomeIcon icon={faAngleDoubleRight} />
        </button>
      </div>
    );
  };

  return (
    <>
      <div className="content-conatiner">
        <SideBar />
        <div className="space-content">
          <Header title={"درختواره"} />
          <div className={styles.arboretum_container}>
            {loading ? (
              <div className={styles.loading}>در حال دریافت داده‌ها...</div>
            ) : error ? (
              <div className={styles.error}>{error}</div>
            ) : null}
            <div className={styles.separate_tables_container}>
              {/* Statements Table */}

              <div className={styles.table_column}>
                <div className={styles.table_header}>اظهارات</div>
                <SearchSection
                  section="statements"
                  placeholder="کد/عنوان"
                  value={searchInputs.statements}
                  onChange={handleSearchChange}
                />
                <div className={styles.sub_header_row}>
                  <div className={styles.sub_header_cell}>کد</div>
                  <div className={styles.sub_header_cell}>عنوان</div>
                </div>
                <div className={styles.table_content}>
                  {getPaginatedData(
                    statementsList,
                    currentPage,
                    itemsPerPage
                  ).map((s, i) => (
                    <div
                      key={i}
                      className={`${styles.table_row} ${
                        selectedStatement === (s && s.code)
                          ? styles.selected
                          : ""
                      }`}
                      onClick={() => s && handleSelectStatement(s.code)}
                    >
                      <div className={styles.table_cell}>
                        {(s && s.code) || "-"}
                      </div>
                      <div className={styles.table_cell}>
                        {(s && s.title) || "داده‌ای موجود نیست"}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Defects Table */}
              <div className={styles.table_column}>
                <div className={styles.table_header}>عیب ها</div>
                <SearchSection
                  section="defects"
                  placeholder="کد/عنوان"
                  value={searchInputs.defects}
                  onChange={handleSearchChange}
                />
                <div className={styles.sub_header_row}>
                  <div className={styles.sub_header_cell}>کد</div>
                  <div className={styles.sub_header_cell}>عنوان</div>
                </div>
                <div className={styles.table_content}>
                  {selectedStatement ||
                  searchInputs.defects ||
                  selectedPart ||
                  selectedWage ? (
                    getPaginatedData(
                      defectsList,
                      currentPage,
                      itemsPerPage
                    ).map((d, i) => (
                      <div
                        key={i}
                        className={`${styles.table_row} ${
                          selectedDefect === (d && d.code)
                            ? styles.selected
                            : ""
                        }`}
                        onClick={() => d && handleSelectDefect(d.code)}
                      >
                        <div className={styles.table_cell}>
                          {(d && d.code) || "-"}
                        </div>
                        <div className={styles.table_cell}>
                          {(d && d.title) || "داده‌ای موجود نیست"}
                        </div>
                      </div>
                    ))
                  ) : (
                    <></>
                  )}
                </div>
              </div>

              {/* Prices Table */}
              <div className={styles.table_column}>
                <div className={styles.table_header}>اجرت ها</div>
                <SearchSection
                  section="wages"
                  placeholder="کد/قیمت"
                  value={searchInputs.wages}
                  onChange={handleSearchChange}
                />
                <div className={styles.sub_header_row}>
                  <div className={styles.sub_header_cell}>کد</div>
                  <div className={styles.sub_header_cell}>قیمت</div>
                </div>
                <div className={styles.table_content}>
                  {selectedDefect || searchInputs.wages || selectedPart ? (
                    getPaginatedData(wagesList, currentPage, itemsPerPage).map(
                      (w, i) => (
                        <div
                          key={i}
                          className={`${styles.table_row} ${
                            selectedWage === (w && w.code)
                              ? styles.selected
                              : ""
                          }`}
                          onClick={() => w && handleSelectWage(w.code)}
                        >
                          <div className={styles.table_cell}>
                            {(w && w.code) || "-"}
                          </div>
                          <div className={styles.table_cell}>
                            {w && w.price
                              ? `${w.price.toLocaleString()} تومان`
                              : "داده‌ای موجود نیست"}
                          </div>
                        </div>
                      )
                    )
                  ) : (
                    <></>
                  )}
                </div>
              </div>

              {/* Parts Table */}
              <div className={styles.table_column}>
                <div className={styles.table_header}>قطعات</div>
                <SearchSection
                  section="parts"
                  placeholder="کد/عنوان"
                  value={searchInputs.parts}
                  onChange={handleSearchChange}
                />
                <div className={styles.sub_header_row}>
                  <div className={styles.sub_header_cell}>کد</div>
                  <div className={styles.sub_header_cell}>عنوان</div>
                </div>
                <div className={styles.table_content}>
                  {selectedWage || searchInputs.parts || selectedPart ? (
                    getPaginatedData(partsList, currentPage, itemsPerPage).map(
                      (p, i) => (
                        <div
                          key={i}
                          className={`${styles.table_row} ${
                            selectedPart === (p && p.code)
                              ? styles.selected
                              : ""
                          }`}
                          onClick={() => p && handleSelectPart(p.code)}
                        >
                          <div className={styles.table_cell}>
                            {(p && p.code) || "-"}
                          </div>
                          <div className={styles.table_cell}>
                            {(p && p.title) || "داده‌ای موجود نیست"}
                          </div>
                        </div>
                      )
                    )
                  ) : (
                    <></>
                  )}
                </div>
              </div>
            </div>
            <Pagination />
          </div>
        </div>
      </div>
    </>
  );
}
