import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Header from "../../components/Header";
import "../../Style/supplierreport.css";
import { DatePicker } from "antd";
import { isEmpty, escapeRegExp } from "lodash";
import axios from "axios";
import { Toaster, toast } from "react-hot-toast";
import dayjs from "dayjs";
import moment from "moment";
import DataTable from "react-data-table-component";
import { FrownOutlined } from "@ant-design/icons";
import { Result, ConfigProvider } from "antd";

const { RangePicker } = DatePicker;
const dateFormat = "YYYY/MM/DD";

function SalesReport() {
  const [selectedDates, setSelectedDates] = useState([]);
  const [data, setData] = useState("");
  const [date, setDate] = useState();
  const [search, setSearch] = useState("");
  const [filteredProduct, setFilteredProduct] = useState([]);

  const token = localStorage.getItem("token");
  const headers = { Authorization: `Bearer ${token}` };

  function handleDateChange(dates) {
    setSelectedDates(dates);
  }

  const handleClick = async () => {
    if (!isEmpty(selectedDates)) {
      var date1 = new Date(selectedDates[0].$d);
      var day1 = ("0" + date1.getDate()).slice(-2);
      var month1 = ("0" + (date1.getMonth() + 1)).slice(-2);
      var year1 = date1.getFullYear();
      var formattedDate1 = month1 + "-" + day1 + "-" + year1;

      var date2 = new Date(selectedDates[1].$d);
      var day2 = ("0" + date2.getDate()).slice(-2);
      var month2 = ("0" + (date2.getMonth() + 1)).slice(-2);
      var year2 = date1.getFullYear();
      var formattedDate2 = month2 + "-" + day2 + "-" + year2;

      setDate(`${formattedDate1}-to-${formattedDate2}`);

      console.log(selectedDates[0].$d);
      const jsonData = {
        from_date: selectedDates[0].$d,
        until_date: selectedDates[1].$d,
      };

      // setDate(jsonData)

      try {
        axios
          .post(`${process.env.REACT_APP_API_HOST}/sales-report/`, jsonData, {
            headers,
            // responseType: "blob",
          })
          .then((response) => {
            console.log(response)
            if (response.data.message === "Success!") {
              setData(response.data.data);
              setFilteredProduct(response.data.data);
            }else if(response.data.message === "Records not found."){
              setData(response.data.message);
            }else{
              
            }
          })
          .catch((error) => {
            console.log(error);
          });
      } catch (err) {
        console.log("Error");
      }
    } else {
      toast.error("Select date!", {
        duration: 3000,
      });
    }
  };

  const columns = [
    {
      name: <h4>Product Name</h4>,
      selector: (row) => (
        <Link
          to={`/single-product/${row["prod_id"]}`}
          className="remove-line-link" target="_blank">
          {row["Product name"]}
        </Link>
      ),
      sortable: true,
    },
    {
      name: <h4>Price</h4>,
      selector: (row) => row["Product price"],
      sortable: true,
    },
    {
      name: <h4>Size</h4>,
      selector: (row) => row["Product size"],
      sortable: true,
    },
    {
      name: <h4>Total quantity</h4>,
      selector: (row) => row["Total quantity"],
      sortable: true,
    },
  ];

  const handleExcelClick = () => {
    const jsonData = {
      from_date: selectedDates[0].$d,
      until_date: selectedDates[1].$d,
    };
    // console.log(token)

    try {
      axios
        .post(
          `${process.env.REACT_APP_API_HOST}/sales-report-export/`,
          jsonData,
          {
            headers: headers,
            responseType: "blob",
          }
        )
        .then((response) => {
          console.log(response);
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

  // useEffect(() => {
   
  //   if(!isEmpty(data)){
  //     const result = data.filter((val)=>{
  //       return val["Product name"].toLowerCase().match(search.toLowerCase());
  //     });
  //     setFilteredProduct(result);
  //   }

  // }, [search])

  
  useEffect(() => {
     if (!isEmpty(data)) {
       const escapedSearch = escapeRegExp(search);
       const regex = new RegExp(escapedSearch, "i"); // "i" flag for case-insensitive matching
       const result = data.filter((val) => {
         return (
           val["Product name"].match(regex) ||
           val["Product price"].toString().match(regex) ||
           val["Product size"].match(regex) ||
           val["Total quantity"].toString().match(regex) ||
           val["prod_id"].match(regex)
         );
       });
       setFilteredProduct(result);
     }
   }, [data, search]);

  return (
    <>
      <Header name="Sales Report" path="admin / salesReport" />
      {/* <div className="add-suplier supplier-report"> */}
      <div className="add-suplier-sub1">
        <div className="box">
          <h3>Select date:</h3>
        </div>
        <RangePicker
          onChange={handleDateChange}
          format={dateFormat}
          defaultValue={[dayjs("2023-02-03", dateFormat), dayjs(dayjs())]}
          disabledDate={(current) => {
            const now = new Date();
            const abc = new Date(now.getFullYear(), 0, 1);
            const abc1 = new Date(now.getFullYear(), 11, 31);
            return (
              current < abc ||
              current > abc1 ||
              current.isAfter(moment().subtract(1, "day"))
            );
          }}
        />
        <button
          className="button-311 supplier-report-button"
          onClick={() => handleClick()}>
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
                    window.open(`/admin/salesReportPdf/${date}`, "_blank")
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

export default SalesReport;
