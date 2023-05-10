import React, { useState, useEffect } from "react";
import "../Style/dashboard.css";
import DataTable from "react-data-table-component";
import { ConfigProvider, Badge, Switch } from "antd";
import axios from "axios";
import SortIcon from "@mui/icons-material/ArrowDownward";
import { Col, Row, Statistic, Card } from "antd";
import CountUp from "react-countup";
import { Toaster, toast } from "react-hot-toast";
import { isEmpty } from "lodash";
import { Divider } from "antd";
import ClipLoader from "react-spinners/ClipLoader";


const formatter = (value) => <CountUp end={value} separator="," />;

const CustomTitle = ({ row }) => (
  <div>
    {}
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
        {row.message}
      </div>
    </div>
  </div>
);

function Dashboard() {
  const [update, setUpdate] = useState(false);

  const [count, setCount] = useState();
  const [userCount, setUserCount] = useState();
  const [orderCount, setOrderCount] = useState();
  const [loading, setLoading] = useState(false);

  const [data, setData] = useState();


  useEffect(() => {
    const token = localStorage.getItem("token");
    const headers = { Authorization: `Bearer ${token}` };
    try {
      axios
        .get(`${process.env.REACT_APP_API_HOST}/admin-user-count/`, { headers })
        .then((response) => {
          console.log(response);
          if(response.data.message === "Success!"){
            setUserCount(response.data.data.user_count)
          }
        })
        .catch((error) => {
          console.log(error);
        });
    } catch (err) {}
  }, []);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const headers = { Authorization: `Bearer ${token}` };
    try {
      axios
        .get(`${process.env.REACT_APP_API_HOST}/admin-order-count/`, { headers })
        .then((response) => {
          console.log(response);
          if (response.data.message === "Success!") {
            setOrderCount(response.data.data.user_count);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    } catch (err) {}
  }, []);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const headers = { Authorization: `Bearer ${token}` };
    try {
      axios
        .get(`${process.env.REACT_APP_API_HOST}/admin-contact-us/`, { headers })
        .then((response) => {
          setLoading(false);
          console.log(response);
          // setCatType(response.data.data);
          setData(response.data.data);
          setLoading(true);
        })
        .catch((error) => {
          console.log(error);
        });
    } catch (err) {}

    try {
      axios
        .get(`${process.env.REACT_APP_API_HOST}/admin-count-messages/`, { headers })
        .then((response) => {
          setCount(response.data.data["message_count"]);
        })
        .catch((error) => {
          console.log(error);
        });
    } catch (err) {}
  }, [update]);

  const customStyles = {
    rows: {
      style: {
        minHeight: "72px", // override the row height
      },
    },
    headCells: {
      style: {
        paddingLeft: "8px", // override the cell padding for head cells
        paddingRight: "8px",
      },
    },
    cells: {
      style: {
        paddingLeft: "18px", // override the cell padding for data cells
        paddingRight: "8px",
        paddingTop: "8px",
        paddingBottom: "8px",
      },
    },
  };

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
        {row.status === "unseen" ? (
          <>
            <Switch
              checkedChildren="Seen"
              unCheckedChildren="Unseen"
              // checked={row.status === "seen"}

              onChange={() => {
                const token = localStorage.getItem("token");
                const headers = { Authorization: `Bearer ${token}` };
                try {
                  axios
                    .patch(
                      `${process.env.REACT_APP_API_HOST}/admin-contact-us/${row._id}/`,
                      {
                        status: "seen",
                      },
                      { headers }
                    )
                    .then(async (response) => {
                      console.log(response);
                     
                      if (response.data.message === "Success!") {
                        setUpdate(!update);
                        toast.success("Seen!", {
                          duration: 3000,
                        });
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
        ) : (
          <>
            <Switch
              checkedChildren="Seen"
              unCheckedChildren="Unseen"
              checked={true}
            />
          </>
        )}{" "}
      </div>
    </ConfigProvider>
  );

  const columns = [
    {
      name: <h4>Status</h4>,
      selector: (row) => row.status,
      cell: (row) => <CustomTitle1 row={row} />,
      sortable: true,
      width: "130px",
      // right: true,
    },
    {
      name: <h4>Name</h4>,
      cell: (row) => row.name,
      sortable: true,
    },
    {
      name: <h4>Date</h4>,
      selector: (row) => row.date.substring(0, 10),
      sortable: true,
    },
    {
      name: <h4>Email</h4>,
      cell: (row) => row.email,
      sortable: true,
    },
    {
      name: <h4>Status</h4>,
      selector: (row) => row.is_user,
      sortable: true,
    },
    {
      name: <h4>Subject</h4>,
      selector: (row) => row.subject,
      sortable: true,
    },
    {
      name: <h4>Message</h4>,
      selector: (row) => row.message,
      sortable: true,
      // maxWidth: "600px", // when using custom you should use width or maxWidth, otherwise, the table will default to flex grow behavior
      cell: (row) => <CustomTitle row={row} />,
      width: "400px",
    },
  ];

  return (
    <>
      <div className="dashboard-container">
        <div className="dashboaed-header">
          <div className="dashboard-name">
            <h3>Dashboard</h3>
          </div>
          <div className="icon-header">
            <ConfigProvider
              theme={{
                colorPrimary: "#000",
                colorPrimaryHover: "#000",
                colorErrorText: "#000",
                colorError: "#000",
              }}>
              <Badge
                count={count}
                showZero
                className=""
                style={{
                  backgroundColor: "white",
                  color: "black",
                }}>
                <img
                  src="https://cdn-icons-png.flaticon.com/512/2645/2645897.png"
                  alt=""
                  className="bell-icon"
                />
              </Badge>
            </ConfigProvider>
          </div>
        </div>

        {loading ? (
          <>
            <div className="suplier-list">
              {!isEmpty(orderCount) && (
                <div className="dashboard-statistic">
                  <div className="dashboard-statistic-sub1">
                    <Card bordered={false} className="dashboard-statistic-card">
                      <Statistic
                        title="Users"
                        value={userCount}
                        precision={2}
                        valueStyle={{
                          color: "#3f8600",
                        }}
                        formatter={formatter}
                      />
                    </Card>
                    <Divider
                      type="vertical"
                      style={{ height: "150px", backgroundColor: "#000" }}
                    />

                    <Card bordered={false} className="dashboard-statistic-card">
                      <Statistic
                        title="Delivered"
                        value={orderCount.Delivered}
                        precision={2}
                        valueStyle={{
                          color: "#3f8600",
                        }}
                        formatter={formatter}
                      />
                    </Card>
                  </div>
                  <div className="dashboard-statistic-sub1">
                    <Card bordered={false} className="dashboard-statistic-card">
                      <Statistic
                        title="Pending"
                        value={orderCount.Pending}
                        precision={2}
                        valueStyle={{
                          color: "#fca503",
                        }}
                        formatter={formatter}
                      />
                    </Card>

                    <Card bordered={false} className="dashboard-statistic-card">
                      <Statistic
                        title="Failed"
                        value={orderCount.Failed}
                        precision={2}
                        valueStyle={{
                          color: "#cf1322",
                        }}
                        formatter={formatter}
                      />
                    </Card>
                  </div>
                </div>
              )}
            </div>

            <div className="suplier-list">
              <DataTable
                columns={columns}
                data={data}
                title="Manage Messages"
                pagination
                sortable
                sortIcon={<SortIcon />}
                customStyles={customStyles}
                highlightOnHover
                subHeader
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
      </div>
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

export default Dashboard;
