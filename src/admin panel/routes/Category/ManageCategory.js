import React, { useState, useEffect } from "react";
import { useHistory, Link } from "react-router-dom";
import Footer from "../../components/Footer";
import Header from "../../components/Header";
import DataTable from "react-data-table-component";
import axios from "axios";
import { Toaster, toast } from "react-hot-toast";
import { isEmpty, escapeRegExp } from "lodash";
import { ConfigProvider } from "antd";
import { message, Popconfirm } from "antd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan, faPenToSquare } from "@fortawesome/free-regular-svg-icons";
import ClipLoader from "react-spinners/ClipLoader";

function ManageCategory() {
  const history = useHistory();
  const [catType, setCatType] = useState([]);
  const [search, setSearch] = useState("");
  const [filteredCatType, setFilteredCatType] = useState([]);

  const [category, setCategory] = useState([]);
  const [searchCategory, setSearchCategory] = useState("");
  const [filteredCategory, setFilteredCategory] = useState([]);
  const [deleteFlag, setDeleteFlag] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const headers = { Authorization: `Bearer ${token}` };
    try {
      axios
        .get(`${process.env.REACT_APP_API_HOST}/admin-category-type/`, {
          headers,
        })
        .then((response) => {
          // console.log(response);
          setLoading(false);
          setCatType(response.data.data);
          setFilteredCatType(response.data.data);
          setLoading(true);
        })
        .catch((error) => {
          console.log(error);
        });
    } catch (err) {}

    try {
      axios
        .get(`${process.env.REACT_APP_API_HOST}/admin-category/`, { headers })
        .then((response) => {
          console.log(response);
          setLoading(false);
          setCategory(response.data.data);
          setFilteredCategory(response.data.data);
          setLoading(true);
        })
        .catch((error) => {
          console.log(error);
        });
    } catch (err) {}
  }, [deleteFlag]);

  const confirm = (typeid) => {
    console.log(typeid);

    const token = localStorage.getItem("token");
    const headers = { Authorization: `Bearer ${token}` };

    try {
      axios
        .delete(
          `${process.env.REACT_APP_API_HOST}/admin-category-type/${typeid}`,
          {
            headers,
          }
        )
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

  const confirm1 = (catid) => {
    console.log(catid);

    const token = localStorage.getItem("token");
    const headers = { Authorization: `Bearer ${token}` };

    try {
      axios
        .delete(`${process.env.REACT_APP_API_HOST}/admin-category/${catid}`, {
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

  const columns = [
    {
      name: <h4>Edit</h4>,
      cell: (row) => (
        // <button className="supplier-edit-btn" onClick={() => alert(row._id)}>
        //   Edit
        // </button>
        <Link to={`updateCategory/${row._id}`}>
          <FontAwesomeIcon className="edit-supplier" icon={faPenToSquare} />
        </Link>
      ),
      // right: true,
    },
    {
      name: <h4>Delete</h4>,
      cell: (row) => (
        // <button
        //   className="supplier-delete-btn"
        //   onClick={() => alert(row._id)}>
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
    },
    {
      name: <h4>Cat_type</h4>,
      selector: (row) => (
        <Link
          to={`/shop/${row.cat_type}`}
          style={{ textDecoration: "none", color: "black" }}>
          {row.cat_type}
        </Link>
      ),
      sortable: true,
    },
    {
      name: <h4>Status</h4>,
      selector: (row) => row.active.toString(),
      sortable: true,
    },
  ];

  const columns1 = [
    {
      name: <h4>Edit</h4>,
      cell: (row) => (
        // <button className="supplier-edit-btn" onClick={() => alert(row._id)}>
        //   Edit
        // </button>
        <Link to={`updateCategory/${row._id}`}>
          <FontAwesomeIcon className="edit-supplier" icon={faPenToSquare} />
        </Link>
      ),
      // right: true,
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
            title="Delete the task"
            description="Are you sure to delete this record?"
            onConfirm={() => confirm1(row._id)}
            onCancel={cancel}
            okText="Yes"
            cancelText="No">
            {" "}
            {/* <button className="supplier-delete-btn">Delete </button> */}
            <FontAwesomeIcon className="edit-supplier" icon={faTrashCan} />
          </Popconfirm>
        </ConfigProvider>
      ),
    },
    {
      name: <h4>Cat_type</h4>,
      selector: (row) => (
        <Link
          to={`/shop/${row.cat_type}`}
          style={{ textDecoration: "none", color: "black" }}>
          {row.cat_type}
        </Link>
      ),
      sortable: true,
      // right:true,
    },
    {
      name: <h4>Title</h4>,
      selector: (row) => (
        <Link
          to={`/shop/${row.cat_type}/${row.cat_title}`}
          style={{ textDecoration: "none", color: "black" }}>
          {row.cat_title}
        </Link>
      ),
      sortable: true,
    },
    {
      name: <h4>Description</h4>,
      selector: (row) => row.cat_desc,
      sortable: true,
    },
    {
      name: <h4>Active</h4>,
      selector: (row) => row.active.toString(),
      sortable: true,
    },
  ];

  useEffect(() => {
    if (!isEmpty(catType)) {
      const escapedSearch = escapeRegExp(search);
      const regex = new RegExp(escapedSearch, "i"); // "i" flag for case-insensitive matching
      const result = catType.filter((val) => {
        return (
          val["cat_type"].match(regex) || val["active"].toString().match(regex)
        );
      });
      setFilteredCatType(result);
    }
  }, [catType, search]);

  useEffect(() => {
    if (!isEmpty(category)) {
      const escapedSearch = escapeRegExp(searchCategory);
      const regex = new RegExp(escapedSearch, "i"); // "i" flag for case-insensitive matching
      const result = category.filter((val) => {
        return (
          val["cat_type"].match(regex) ||
          val["active"].toString().match(regex) ||
          val["cat_desc"].match(regex) ||
          val["cat_title"].match(regex)
        );
      });
      setFilteredCategory(result);
    }
  }, [category, searchCategory]);

  return (
    <>
      <Header name="Manage Category" path="admin / manageCategory" />
      {loading ? (
        <>
          <div className="suplier-list">
            <DataTable
              columns={columns}
              data={filteredCatType}
              title="Manage Category_type"
              pagination
              highlightOnHover
              actions={
                <button
                  className="supplier-add-btn"
                  onClick={() => history.push("/admin/addCategory")}>
                  Add new category_type
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

          <div className="suplier-list">
            <DataTable
              columns={columns1}
              data={filteredCategory}
              title="Manage category"
              pagination
              highlightOnHover
              actions={
                <button
                  className="supplier-add-btn"
                  onClick={() => history.push("/admin/addCategory")}>
                  Add new category
                </button>
              }
              subHeader
              subHeaderComponent={
                <input
                  type="text"
                  className="search-supplier"
                  value={searchCategory}
                  onChange={(e) => setSearchCategory(e.target.value)}
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

export default ManageCategory;
