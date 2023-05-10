import React, { useState, useEffect } from "react";
import Header from "../../components/Header";
import "../../Style/supplierreport.css";
import { isEmpty, escapeRegExp } from "lodash";
import axios from "axios";
import DataTable from "react-data-table-component";
import ClipLoader from "react-spinners/ClipLoader";
import { FrownOutlined } from "@ant-design/icons";
import { Result, ConfigProvider } from "antd";

function SupplierReport() {
  const [data, setData] = useState("");
  const [loader, setLoader] = useState(false);
  const [date, setDate] = useState();
  const [search, setSearch] = useState("");
  const [filteredProduct, setFilteredProduct] = useState([]);

  const handleClick = async () => {
    setLoader(true);

    const token = localStorage.getItem("token");
    const headers = { Authorization: `Bearer ${token}` };

    var today = new Date();
    var day = ("0" + today.getDate()).slice(-2);
    var month = ("0" + (today.getMonth() + 1)).slice(-2);
    var year = today.getFullYear();
    var formattedDate = day + "-" + month + "-" + year;
    setDate(formattedDate);

    try {
      axios
        .get(`${process.env.REACT_APP_API_HOST}/supplier-report/`, {
          headers,
          // responseType: "blob",
        })
        .then((response) => {
          if (response.data.message === "Success!") {
            setData(response.data.data);
            setFilteredProduct(response.data.data);
            console.log(response)
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

  const handleExcelClick = () => {
    const token = localStorage.getItem("token");
    const headers = { Authorization: `Bearer ${token}` };

    try {
      axios
        .get(`${process.env.REACT_APP_API_HOST}/supplier-report-export/`, {
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

  const columns = [
    {
      name: <h4>Name</h4>,
      selector: (row) => row.Name,
      sortable: true,
    },
    {
      name: <h4>Mobile no</h4>,
      selector: (row) => row["Mobile No"],
      sortable: true,
    },
    {
      name: <h4>Email</h4>,
      selector: (row) => row.Email,
      sortable: true,
    },
    {
      name: <h4>Shop no</h4>,
      selector: (row) => row["Shop No"],
      sortable: true,
    },
    {
      name: <h4>Area/Street</h4>,
      selector: (row) => row["Area/Street"],
      sortable: true,
    },
    {
      name: <h4>City</h4>,
      selector: (row) => row.City,
      sortable: true,
    },
    {
      name: <h4>State</h4>,
      selector: (row) => row.State,
      sortable: true,
    },
    {
      name: <h4>Pincode</h4>,
      selector: (row) => row.Pincode,
      sortable: true,
    },
  ];


   useEffect(() => {
     if (!isEmpty(data)) {
       const escapedSearch = escapeRegExp(search);
       const regex = new RegExp(escapedSearch, "i"); // "i" flag for case-insensitive matching
       const result = data.filter((val) => {
         return (
           val["Name"].match(regex) ||
           val["Email"].match(regex) ||
           val["Mobile No"].toString().match(regex) ||
           val["Shop No"].toString().match(regex) ||
           val["Area/Street"].toString().match(regex) ||
           val["Pincode"].toString().match(regex) ||
           val["City"].toString().match(regex) ||
           val["State"].match(regex)
         );
       });
       setFilteredProduct(result);
     }
   }, [data, search]);
  


  return (
    <>
      <Header name="Supplier Report" path="admin / supplierReport" />
      {/* <div className="add-suplier supplier-report"> */}
      <div className="add-suplier-sub1">
        <button
          className="button-311 supplier-report-button"
          onClick={handleClick}>
          Generate report
        </button>
      </div>
      {/* </div> */}
      <div className="suplier-list">
        {!isEmpty(data) && data !== "Records not found." && (
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
                  onClick={() =>
                    // history.push("/admin/addCategory")
                    window.open(`/admin/supplierReportPdf/${date}`, "_blank")
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
        {loader ?? (
          <div className="loader-spin">
            <ClipLoader color="#000" />
          </div>
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
    </>
  );
}

export default SupplierReport;
