import React, { useState, useEffect } from "react";
import Header from "../../components/Header";
import { Link } from "react-router-dom";
import axios from "axios";
import DataTable from "react-data-table-component";
import { Toaster, toast } from "react-hot-toast";
import { ColorRing } from "react-loader-spinner";
import "../../Style/allorder.css";
import { ConfigProvider, Switch } from "antd";
import qs from "qs";
import ClipLoader from "react-spinners/ClipLoader";

function PendingOrder() {
  const [deliveredOrderData, setDeliveredOrderData] = useState();

  const [loading, setLoading] = useState(false);
  const [deliveredFlag, setDeliveredFlag] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const headers = { Authorization: `Bearer ${token}` };
    try {
      axios
        .get(
          `${process.env.REACT_APP_API_HOST}/admin-order?order_status=Pending`,
          // { order_status: "All"},
          { headers }
        )
        .then((response) => {
          setLoading(false);
          console.log(response);
          if (response.data.message === "Success!") {
            setDeliveredOrderData(response.data.data);
          }else{
            setDeliveredOrderData();
          }

          setLoading(true);
        })
        .catch((error) => {
          console.log(error);
        });
    } catch (err) {
      console.log("dshbhj");
    }
  }, [deliveredFlag]);

  function sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  const CustomTitle = ({ row }) => (
    <div>
      <div className="single-purchase">
        <div>
          <table className="order-data-table">
            <thead>
              <tr>
                <th>prod_disc</th>
                <th>prod_name</th>
                <th>prod_price</th>
                <th>size</th>
                <th>qty</th>
              </tr>
            </thead>
            <tbody>
              {row.Order_details.map((val, index) => {
                return (
                  <tr key={index}>
                    <td>{val.prod_disc}</td>
                    <td width="150px">{val.prod_name}</td>
                    <td width="100px">{val.prod_price}</td>
                    <td width="60px">{val.size}</td>
                    <td width="60px">{val.qty}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

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

  const CustomTitle1 = ({ row }) => (
    <ConfigProvider
      theme={{
        components: {
          Switch: {
            colorPrimary: "#000",
            colorPrimaryHover: "#000",
            colorPrimaryBorder: "#000",
            colorPrimaryBorderHover: "#000",
          },
        },
      }}>
      <div>
        {row.order_status === "Pending" && (
          <>
            <Switch
              checkedChildren="Delivered"
              unCheckedChildren="Pending"
              onChange={() => {
                const token = localStorage.getItem("token");
                const headers = { Authorization: `Bearer ${token}` };
                try {
                  axios
                    .patch(
                      `${process.env.REACT_APP_API_HOST}/admin-order/${row._id}/`,
                      qs.stringify({ order_status: "Delivered" }),
                      { headers }
                    )
                    .then(async (response) => {
                      await sleep(1000);
                      if (response.data.message === "Success!") {
                        toast.success("Delivered!", {
                          duration: 3000,
                        });
                        setDeliveredFlag(!deliveredFlag);
                      }
                    })
                    .catch((error) => {
                      console.log(error);
                    });
                } catch (err) {
                  console.log("dshbhj");
                }
              }}
            />
          </>
        )}
        {row.order_status === "Delivered" && (
          <>
            <h4>Delivered</h4>
          </>
        )}
        {row.order_status === "Failed" && (
          <>
            <h4>Failed</h4>
          </>
        )}{" "}
      </div>
    </ConfigProvider>
  );

  const columns = [
    {
      name: <h4>Status</h4>,
      selector: (row) => row.Order_details,
      cell: (row) => <CustomTitle1 row={row} />,
      sortable: true,
      width: "130px",
    },
    {
      name: <h4>Name</h4>,
      selector: (row) => row.name,
      sortable: true,
    },
    {
      name: <h4>Email</h4>,
      selector: (row) => row.email,
      sortable: true,
    },
    {
      name: <h4>Mobile_no</h4>,
      selector: (row) => row.mobile_no,
      sortable: true,
    },
    {
      name: <h4>Address type</h4>,
      selector: (row) => row.add_type,
      sortable: true,
    },
    {
      name: <h4>House_no</h4>,
      selector: (row) => row.house_no,
      sortable: true,
    },
    {
      name: <h4>Area street</h4>,
      selector: (row) => row.area_street,
      sortable: true,
    },
    {
      name: <h4>City</h4>,
      selector: (row) => row.city,
      sortable: true,
    },
    {
      name: <h4>State</h4>,
      selector: (row) => row.state,
      sortable: true,
    },
    {
      name: <h4>Pincode</h4>,
      selector: (row) => row.pincode,
      sortable: true,
    },
    {
      name: <h4>Order date</h4>,
      selector: (row) => row.order_date.substring(0, 10),
      sortable: true,
    },
    {
      name: <h4>Total amount</h4>,
      selector: (row) => row.total_amount,
      sortable: true,
    },
    {
      name: <h4>Discount</h4>,
      selector: (row) => row.discount,
      sortable: true,
    },
    {
      name: <h4>Payment method</h4>,
      selector: (row) => row.payment_method,
      sortable: true,
    },
    {
      name: <h4>Card last4</h4>,
      selector: (row) => row.card_last4,
      sortable: true,
    },
    {
      name: <h4>Purchase Details</h4>,
      selector: (row) => row.Order_details,
      cell: (row) => <CustomTitle row={row} />,
      width: "600px",
    },
  ];

  return (
    <>
      <Header name="Pending Order" path="admin / pendingOrder" />
      {loading ? (
        <div className="suplier-list">
          <DataTable
            columns={columns}
            data={deliveredOrderData}
            pagination
            highlightOnHover
            subHeader
          />
        </div>
      ) : (
        <div className="loader-spin">
          <ClipLoader color="#000" />
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

export default PendingOrder;
