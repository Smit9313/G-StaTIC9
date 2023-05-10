import React, { useEffect, useState } from "react";
import { useHistory, Link } from "react-router-dom";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import axios from "axios";
import DataTable from "react-data-table-component";
import { Toaster, toast } from "react-hot-toast";
import { ConfigProvider } from "antd";
import { message, Popconfirm } from "antd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan, faPenToSquare } from "@fortawesome/free-regular-svg-icons";
import { isEmpty, escapeRegExp } from "lodash";
import ClipLoader from "react-spinners/ClipLoader";

function ManageProduct() {
  const history = useHistory();
  const [product, setProduct] = useState([]);
  const [search, setSearch] = useState("");
  const [filteredProduct, setFilteredProduct] = useState([]);
  const [deleteFlag, setDeleteFlag] = useState(false);

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const headers = { Authorization: `Bearer ${token}` };
    try {
      axios
        .get(`${process.env.REACT_APP_API_HOST}/admin-product/`, { headers })
        .then((response) => {
          console.log(response.data.data);
          setLoading(false);
          setProduct(response.data.data);
          setFilteredProduct(response.data.data);
          setLoading(true);
        })
        .catch((error) => {
          console.log(error);
        });
    } catch (err) {}
  }, [deleteFlag]);

  const confirm = (prodid) => {
    console.log(prodid);

    const token = localStorage.getItem("token");
    const headers = { Authorization: `Bearer ${token}` };

    try {
      axios
        .delete(`${process.env.REACT_APP_API_HOST}/admin-product/${prodid}/`, {
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

  const CustomTitle = ({ row }) => (
    <div>
      {!isEmpty(row.prod_qty) ? (
        <div key={row._id} className="single-purchase">
          {/* <p>Name : {val.prod_name}</p>
              <p>Price : {val.purch_price}</p> */}

          <div>
            <table className="purchase-data-table">
              <thead>
                <tr>
                  <th>Size</th>
                  <th>Qty</th>
                </tr>
              </thead>
              <tbody>
                {row.prod_qty.map((val1, index1) => {
                  // console.log(val)
                  return (
                    <tr key={index1}>
                      <td>{val1.size}</td>
                      <td>{val1.qty}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <>-</>
      )}

      <div>{row.title}</div>
      <div>
        <div
          data-tag="allowRowEvents"
          style={{
            color: "grey",
            overflow: "hidden",
            whiteSpace: "wrap",
            textOverflow: "ellipses",
          }}>
          {}
          {row.plot}
        </div>
      </div>
    </div>
  );

  const columns = [
    {
      name: <h4>Edit</h4>,
      cell: (row) => (
        <Link to={`updateProduct/${row._id}`}>
          <FontAwesomeIcon className="edit-supplier" icon={faPenToSquare} />
        </Link>
      ),
      //  right:true,
      width: "100px",
    },
    {
      name: <h4>Delete</h4>,
      cell: (row) => (
        //  <button className="supplier-delete-btn" onClick={() => alert(row._id)}>
        //    Delete
        //  </button>

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
      name: <h4>Images</h4>,
      selector: (row) => (
        <Link to={`/single-product/${row._id}`}>
          <img width="40px" height="50px" src={row.prod_image[0]} />{" "}
          <img width="40px" height="50px" src={row.prod_image[1]} />{" "}
          <img width="40px" height="50px" src={row.prod_image[2]} />
        </Link>
      ),
      width: "200px",
    },

    {
      name: <h4>Product name</h4>,
      selector: (row) =><Link to={`/single-product/${row._id}`} style={{textDecoration:"none",color:"black"}}>{row.prod_name}</Link>,
      sortable: true,
      width: "170px",
    },
    {
      name: <h4>Category</h4>,
      selector: (row) => row.cat_title,
      sortable: true,
      width: "170px",
    },
    {
      name: <h4>Desccription</h4>,
      selector: (row) => row.prod_desc,
      sortable: true,
    },
    {
      name: <h4>created_at</h4>,
      selector: (row) => row.created_at.substring(0, 10),
      sortable: true,
      width: "200px",
    },
    {
      name: <h4>prod_price</h4>,
      selector: (row) => row.prod_price,
      sortable: true,
      width: "130px",
    },
    {
      name: <h4>active</h4>,
      selector: (row) => row.active.toString(),
      sortable: true,
      width: "100px",
    },
    {
      name: <h4>Qty</h4>,
      selector: (row) => row.prod_qty,
      cell: (row) => <CustomTitle row={row} />,
      sortable: true,
       width: "350px",
    },
  ];


  useEffect(() => {
    if (!isEmpty(product)) {
      const escapedSearch = escapeRegExp(search);
      const regex = new RegExp(escapedSearch, "i"); // "i" flag for case-insensitive matching
      const result = product.filter((val) => {
        return (
          val["active"].toString().match(regex) ||
          val["cat_title"].match(regex) ||
          val["created_at"].match(regex) ||
          val["prod_desc"].match(regex) ||
          val["prod_name"].match(regex) ||
          val["prod_price"].toString().match(regex)
        );
      });
      setFilteredProduct(result);
    }
  }, [product, search]);



  return (
    <>
      <Header name="Manage Product" path="admin / manageProduct" />
      {loading ? (
        <>
          <div className="suplier-list">
            <DataTable
              columns={columns}
              data={filteredProduct}
              pagination
              highlightOnHover
              actions={
                <button
                  className="supplier-add-btn"
                  onClick={() => history.push("/admin/addProduct")}>
                  Add new Product
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

export default ManageProduct;
