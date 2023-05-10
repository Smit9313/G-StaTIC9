import React, { useState, useEffect } from "react";
import { useHistory, Link } from "react-router-dom";
import "../../Style/managesuplier.css";
import Footer from "../../components/Footer";
import Header from "../../components/Header";
import axios from "axios";
import DataTable from "react-data-table-component";
import { ConfigProvider } from "antd";
import { message, Popconfirm } from "antd";
import { Toaster, toast } from "react-hot-toast";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan, faPenToSquare } from "@fortawesome/free-regular-svg-icons";
import ClipLoader from "react-spinners/ClipLoader";
import { isEmpty, escapeRegExp } from "lodash";

function ManageSuplier() {
  const history = useHistory();
  const [supplier, setSupplier] = useState([]);
  const [search, setSearch] = useState("");
  const [filteredSupplier, setFilteredSupplier] = useState([]);
  const [deleteFlag, setDeleteFlag] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const headers = { Authorization: `Bearer ${token}` };
    try {
      axios
        .get(`${process.env.REACT_APP_API_HOST}/admin-supplier/`, { headers })
        .then((response) => {
          setLoading(false);
          setSupplier(response.data.data);
          console.log(response.data.data);
          setFilteredSupplier(response.data.data);
          setLoading(true);
        })
        .catch((error) => {
          console.log(error);
        });
    } catch (err) {}
  }, [deleteFlag]);

  const confirm = (supid) => {
    console.log(supid);

    const token = localStorage.getItem("token");
    const headers = { Authorization: `Bearer ${token}` };

    try {
      axios
        .delete(`${process.env.REACT_APP_API_HOST}/admin-supplier/${supid}`, {
          headers,
        })
        .then((response) => {
          console.log(response);
          if (response.data.message === "Success!") {
            message.success("deleted successfully!");
            setDeleteFlag(!deleteFlag);
          } else {
            toast.error(response.data.message, {
              duration: 3000,
            });
          }
        })
        .catch((error) => {
          console.log(error);
        });
    } catch (err) {
      console.log("Error");
    }
  };
  const cancel = (e) => {
    console.log(e);
    message.error("Click on No");
  };

  const columns = [
    {
      name: <h4>Edit</h4>,
      cell: (row) => (
        <Link to={`updateSupplier/${row._id}`}>
          <FontAwesomeIcon className="edit-supplier" icon={faPenToSquare} />
        </Link>
      ),
      width: "100px",
      // right:true,
    },
    {
      name: <h4>Delete</h4>,
      cell: (row) => (
        // <button className="supplier-delete-btn" onClick={() => alert(row._id)}>
        //   Delete
        // </button>
        <ConfigProvider
          theme={{
            components: {
              Button: {
                colorPrimary: "rgb(140, 2, 2)",
                colorPrimaryHover: "#000",
                colorPrimaryClick: "#000",
              },
            },
          }}>
          <Popconfirm
            title="Delete the task"
            description="Are you sure to delete this record?"
            onConfirm={() => confirm(row._id)}
            onCancel={cancel}
            okText="Yes"
            cancelText="No">
            {" "}
            {/* <button className="supplier-delete-btn">Delete </button> */}
            <FontAwesomeIcon className="edit-supplier" icon={faTrashCan} />
          </Popconfirm>
        </ConfigProvider>
      ),
      // right:true,
      width: "100px",
    },
    {
      name: <h4>Supplier Name</h4>,
      selector: (row) => row.name,
      sortable: true,
      width: "135px",
    },
    {
      name: <h4>Mobile no</h4>,
      selector: (row) => row.mobile_no,
      sortable: true,
      width: "135px",
    },
    {
      name: (
        <center>
          <h4>email</h4>
        </center>
      ),
      selector: (row) => row.email,
      sortable: true,
      width: "230px",
    },
    {
      name: <h4>shop_no</h4>,
      selector: (row) => row.shop_no,
      sortable: true,
      width: "130px",
    },
    {
      name: <h4>Area street</h4>,
      selector: (row) => row.area_street,
      sortable: true,
      width: "270px",
    },
    {
      name: <h4>Landmark</h4>,
      selector: (row) => row.landmark,
      sortable: true,
      width: "130px",
    },
    {
      name: <h4>City</h4>,
      selector: (row) => row.city,
      sortable: true,
      width: "130px",
    },
    {
      name: <h4>State</h4>,
      selector: (row) => row.state,
      sortable: true,
      width: "100px",
    },
    {
      name: <h4>Pincode</h4>,
      selector: (row) => row.pincode,
      sortable: true,
      width: "100px",
    },
  ];

  useEffect(() => {
    if (!isEmpty(supplier)) {
      const escapedSearch = escapeRegExp(search);
      const regex = new RegExp(escapedSearch, "i"); // "i" flag for case-insensitive matching
      const result = supplier.filter((val) => {
        return (
          val["name"].match(regex) ||
          val["area_street"].match(regex) ||
          val["city"].match(regex) ||
          val["email"].match(regex) ||
          val["landmark"].match(regex) ||
          val["mobile_no"].toString().match(regex) ||
          val["pincode"].toString().match(regex) ||
          val["shop_no"].match(regex) ||
          val["state"].match(regex)
        );
      });
      setFilteredSupplier(result);
    }
  }, [supplier, search]);

  return (
    <>
      <Header name="Suplier List" path="admin / manageSuplier" />

      {loading ? (
        <>
          <div className="suplier-list">
            <DataTable
              columns={columns}
              data={filteredSupplier}
              pagination
              highlightOnHover
              actions={
                <button
                  className="supplier-add-btn"
                  onClick={() => history.push("/admin/addSupplier")}>
                  Add new supplier
                </button>
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
          </div>
        </>
      ) : (
        <>
          <div className="loader-spin">
            <ClipLoader color="#000" />
          </div>
        </>
      )}

      <Footer />
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

export default ManageSuplier;
