import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import Header from "../../components/Header";
import { Link } from "react-router-dom";
import axios from "axios";
import DataTable from "react-data-table-component";
import { isEmpty, escapeRegExp } from "lodash";
import "../../Style/managepurchase.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare } from "@fortawesome/free-regular-svg-icons";
import ClipLoader from "react-spinners/ClipLoader";

function ManagePurchase() {
  const history = useHistory();
  const [purchaseData, setpurchaseData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [loading, setLoading] = useState(false);
    const [search, setSearch] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    const headers = { Authorization: `Bearer ${token}` };
    try {
      axios
        .get(`${process.env.REACT_APP_API_HOST}/admin-purchase/`, { headers })
        .then((response) => {
          setLoading(false);
          console.log(response);
          setpurchaseData(response.data.data);
          setFilteredData(response.data.data);
          setLoading(true);
        })
        .catch((error) => {
          console.log(error);
        });
    } catch (err) {}
  }, []);

  const CustomTitle = ({ row }) => (
    <div>
      {row.Purchase_details.map((val, index) => {
        return (
          <div key={index} className="single-purchase">
            <p>Cat_type : {val.cat_type}</p>
            <p>Cat_title : {val.cat_title}</p>
            <p>Prod_name : {val.prod_name}</p>
            <p>Price : {val.purch_price}</p>

            <div>
              <table className="purchase-data-table">
                <thead>
                  <tr>
                    <th>Size</th>
                    <th>Qty</th>
                  </tr>
                </thead>
                <tbody>
                  {val.purch_qty.map((val1, index1) => {
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
        );
      })}

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
        <Link to={`updatePurchase/${row._id}`}>
          <FontAwesomeIcon className="edit-supplier" icon={faPenToSquare} />
        </Link>
      ),
      //  right:true,
      width: "100px",
    },
    {
      name: <h4>Supplier name</h4>,
      selector: (row) => row.supp_name,
      sortable: true,
    },
    {
      name: <h4>Purchase date</h4>,
      selector: (row) => row.date.substring(0, 10),
      sortable: true,
    },
    {
      name: <h4>Purchase Details</h4>,
      selector: (row) => row.Purchase_details,
      cell: (row) => <CustomTitle row={row} />,
    },
  ];

   useEffect(() => {
     if (!isEmpty(purchaseData)) {
       const escapedSearch = escapeRegExp(search);
       const regex = new RegExp(escapedSearch, "i"); // "i" flag for case-insensitive matching
       const result = purchaseData.filter((val) => {
         return (
           val["date"].match(regex) ||
           val["supp_name"].match(regex) 
         );
       });
       setFilteredData(result);
     }
   }, [purchaseData, search]);

  return (
    <>
      <Header name="Manage Purchase" path="admin / managePurchase" />
      {loading ? (
        <>
          <div className="suplier-list">
            <DataTable
              columns={columns}
              data={filteredData}
              pagination
              highlightOnHover
              actions={
                <button
                  className="supplier-add-btn"
                  onClick={() => history.push("/admin/addPurchase")}>
                  Add new purchase
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
    </>
  );
}

export default ManagePurchase;
