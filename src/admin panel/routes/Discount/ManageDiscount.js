import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { Link } from "react-router-dom";
import Header from "../../components/Header";
import axios from "axios";
import DataTable from "react-data-table-component";
import { Toaster, toast } from "react-hot-toast";
import { ConfigProvider } from "antd";
import { message, Popconfirm } from "antd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan, faPenToSquare } from "@fortawesome/free-regular-svg-icons";
import ClipLoader from "react-spinners/ClipLoader";
import { isEmpty, escapeRegExp } from "lodash";

function ManageDiscount() {
  const history = useHistory();
  const [discount, setDiscount] = useState([]);
  const [search, setSearch] = useState("");
  const [filteredSupplier, setFilteredSupplier] = useState([]);
  const [deleteFlag, setDeleteFlag] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const headers = { Authorization: `Bearer ${token}` };
    try {
      axios
        .get(`${process.env.REACT_APP_API_HOST}/product-discount/`, { headers })
        .then((response) => {
          setLoading(false);
          console.log(response)
          setDiscount(response.data.data);
          setFilteredSupplier(response.data.data);
          setLoading(true);
        })
        .catch((error) => {
          console.log(error);
        });
    } catch (err) {}
  }, [deleteFlag]);

  const confirm = (discid) => {
    console.log(discid);

    const token = localStorage.getItem("token");
    const headers = { Authorization: `Bearer ${token}` };

    try {
      axios
        .delete(
          `${process.env.REACT_APP_API_HOST}/product-discount/${discid}/`,
          {
            headers,
          }
        )
        .then((response) => {
          //  console.log(response);
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
        <Link to={`updateDiscount/${row._id}`}>
          <FontAwesomeIcon className="edit-supplier" icon={faPenToSquare} />
        </Link>
      ),
      //  right:true,
      width: "100px",
    },
    {
      name: <h4>Delete</h4>,
      cell: (row) => (
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
            title="Delete"
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
      width: "100px",
    },
    {
      name: <h4>Discount percentage</h4>,
      selector: (row) => row.disc_percent,
      sortable: true,
    },
    {
      name: <h4>Valid From:</h4>,
      selector: (row) => row.valid_from.substring(0, 10),
      sortable: true,
    },
    {
      name: <h4>Valid Until:</h4>,
      selector: (row) => row.valid_until.substring(0, 10),
      sortable: true,
    },
    {
      name: <h4>Coupon Code</h4>,
      selector: (row) => row.coupon_code,
      sortable: true,
    },
    {
      name: <h4>Minimum Order Value</h4>,
      selector: (row) => row.min_ord_val,
      sortable: true,
    },
    {
      name: <h4>Maximum Discount Amount</h4>,
      selector: (row) => row.max_disc_amt,
      sortable: true,
    },
  ];

  useEffect(() => {
    const result = discount.filter((supp) => {
      return supp.coupon_code.toLowerCase().match(search.toLowerCase());
    });
    setFilteredSupplier(result);
  }, [search]);

  useEffect(() => {
    if (!isEmpty(discount)) {
      const escapedSearch = escapeRegExp(search);
      const regex = new RegExp(escapedSearch, "i"); // "i" flag for case-insensitive matching
      const result = discount.filter((val) => {
        return (
          val["coupon_code"].match(regex) ||
          val["create_date"].match(regex) ||
          val["disc_percent"].toString().match(regex) ||
          val["max_disc_amt"].toString().match(regex) ||
          val["min_ord_val"].toString().match(regex) ||
          val["valid_from"].match(regex) ||
          val["valid_until"].match(regex) 
        );
      });
      setFilteredSupplier(result);
    }
  }, [discount, search]);

  return (
    <>
      <Header name="Manage Discount" path="admin / manageDiscount" />
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
                  onClick={() => history.push("/admin/addDiscount")}>
                  Add new discount
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

      <Toaster
        position="top-center"
        containerStyle={{
          top: 65,
        }}
        reverseOrder={true}
        toastOptions={{
          // Default options for specific types
          success: {
            duration: 3000,
            theme: {
              primary: "green",
              secondary: "black",
            },
          },
        }}
      />
    </>
  );
}

export default ManageDiscount;
