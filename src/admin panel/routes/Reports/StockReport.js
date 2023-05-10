import React, { useState, useEffect } from "react";
import { useHistory, Link } from "react-router-dom";
import Header from "../../components/Header";
import "../../Style/supplierreport.css";
import { DatePicker } from "antd";
import { isEmpty, escapeRegExp } from "lodash";
import axios from "axios";
import DataTable from "react-data-table-component";
import { Toaster, toast } from "react-hot-toast";
import { FrownOutlined } from "@ant-design/icons";
import { Result, ConfigProvider } from "antd";

const { RangePicker } = DatePicker;
const dateFormat = "YYYY/MM/DD";

function StockReport() {
  // const [selectedDates, setSelectedDates] = useState([]);

  // function handleDateChange(dates) {
  //   setSelectedDates(dates);
  // }

  const history = useHistory();

  const [data, setData] = useState("");
  const [date, setDate] = useState();
  const [search, setSearch] = useState("");
  const [filteredProduct, setFilteredProduct] = useState([]);

  const token = localStorage.getItem("token");
  const headers = { Authorization: `Bearer ${token}` };

  const handleClick = async () => {
    // const jsonData = {
    //   from_date: selectedDates[0].$d,
    //   until_date: selectedDates[1].$d,
    // };

    var today = new Date();
    var day = ("0" + today.getDate()).slice(-2);
    var month = ("0" + (today.getMonth() + 1)).slice(-2);
    var year = today.getFullYear();
    var formattedDate = day + "-" + month + "-" + year;
    setDate(formattedDate);

    try {
      axios
        .get(`${process.env.REACT_APP_API_HOST}/stock-report/`, {
          headers,
          // responseType: "blob",
        })
        .then((response) => {
          console.log(response);
          if (response.data.message === "Success!") {
            setData(response.data.data);
            setFilteredProduct(response.data.data);
          } else if (response.data.message === "Records not found.") {
            setData(response.data.message);
          } else {
          }
        })
        .catch((error) => {
          console.log(error);
        });
    } catch (err) {
      console.log("Error");
    }
  };

  const columns = [
    {
      name: <h4>Product Name</h4>,
      selector: (row) => (
        <Link
          to={`/single-product/${row["prod_id"]}`}
          className="remove-line-link"
          target="_blank">
          {row["Product name"]}
        </Link>
      ),
      sortable: true,
    },
    {
      name: <h4>Size</h4>,
      selector: (row) => row.Size,
      sortable: true,
    },
    {
      name: <h4>Category-type</h4>,
      selector: (row) => row["Category-type"],
      sortable: true,
    },
    {
      name: <h4>Category</h4>,
      selector: (row) => row.Category,
      sortable: true,
    },
    {
      name: <h4>Description</h4>,
      selector: (row) => row["Product description"],
      sortable: true,
    },
    {
      name: <h4>Quantity</h4>,
      selector: (row) => row["Quantity"],
      sortable: true,
    },
    {
      name: <h4>Price</h4>,
      selector: (row) => row["Product price"],
      sortable: true,
    },
    {
      name: <h4>sub total</h4>,
      selector: (row) => row["Sub total"],
      sortable: true,
    },
  ];

  const handleExcelClick = () => {
    try {
      axios
        .get(`${process.env.REACT_APP_API_HOST}/stock-report-export/`, {
          headers,
          responseType: "blob",
        })
        .then((response) => {
          console.log(response);
          // setData(response.data.data);
          //  console.log(response.headers);
          const contentDisposition = response.headers["content-disposition"];
          //  console.log(contentDisposition);
          const url = window.URL.createObjectURL(new Blob([response.data]));
          //  console.log(url);
          const link = document.createElement("a");
          //  console.log(link);
          link.href = url;
          link.setAttribute(
            "download",
            contentDisposition.split(";")[1].split("=")[1].replaceAll('"', "")
          );
          document.body.appendChild(link);
          link.click();
        })
        .catch((error) => {
          console.log(error);
        });
    } catch (err) {
      console.log("Error");
    }
  };

  useEffect(() => {
    if (!isEmpty(data)) {
      const escapedSearch = escapeRegExp(search);
      const regex = new RegExp(escapedSearch, "i"); // "i" flag for case-insensitive matching
      const result = data.filter((val) => {
        return (
          val["Category"].match(regex) ||
          val["Category-type"].match(regex) ||
          val["Product description"].match(regex) ||
          val["Product name"].match(regex) ||
          val["Product price"].toString().match(regex) ||
          val["Quantity"].toString().match(regex) ||
          val["Size"].match(regex) ||
          val["Sub total"].toString().match(regex) ||
          val["prod_id"].match(regex)
        );
      });
      setFilteredProduct(result);
    }
  }, [data, search]);

  return (
    <>
      <Header name="Stock Report" path="admin / stockReport" />
      {/* <div className="add-suplier supplier-report"> */}
      <div className="add-suplier-sub1">
        {/* <div className="box">
            <h3>Select date:</h3>
          </div> */}
        {/* <RangePicker onChange={handleDateChange} format={dateFormat} /> */}
        <button
          className="button-311 supplier-report-button"
          onClick={handleClick}>
          Generate report
        </button>
      </div>
      {/* </div> */}
      <div className="suplier-list">
        {!isEmpty(data) && (
          <DataTable
            columns={columns}
            data={filteredProduct}
            title={date}
            pagination
            highlightOnHover
            actions={
              <div>
                <button
                  className="supplier-add-btn"
                  onClick={
                    () => window.open(`/admin/stockReportPdf/${date}`, "_blank")
                    // history.push(`/admin/stockReportPdf/${date}`)
                  }>
                  Export as PDF
                </button>
                <button
                  className="supplier-add-btn"
                  onClick={() => handleExcelClick()}>
                  Export as Excel
                </button>
              </div>
            }
            subHeader
            subHeaderComponent={
              <input
                type="text"
                className="search-supplier"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search here"
              />
            }
            subHeaderAlign="left"
          />
        )}
      </div>
      {data === "Records not found." && (
        <div className="not-found">
          <ConfigProvider
            theme={{
              components: {
                Button: {
                  colorPrimary: "#000",
                  colorPrimaryHover: "#000",
                  colorPrimaryClick: "#000",
                  colorPrimaryActive: "#000",
                },
                Icon: {
                  colorPrimary: "#000",
                },
              },
            }}>
            <Result
              icon={<FrownOutlined style={{ color: "#000" }} />}
              title="No record found!!"
            />
          </ConfigProvider>
        </div>
      )}

      <Toaster
        position="top-center"
        containerStyle={{
          top: 65,
        }}
        reverseOrder={true}
      />
    </>
  );
}

export default StockReport;
