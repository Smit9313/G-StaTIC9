import React, { useState } from "react";
import "../Style/dashboard.css";
import DataTable from "react-data-table-component";
import { ConfigProvider, Badge, Switch } from "antd";
import SortIcon from "@mui/icons-material/ArrowDownward";
import { Statistic, Card } from "antd";
import CountUp from "react-countup";
import { Toaster } from "react-hot-toast";
import { Divider } from "antd";
import data from "../../data/MessageData";

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
        }}
      >
        {}
        {row.message}
      </div>
    </div>
  </div>
);

function Dashboard() {

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
      }}
    >
      <div>
        {row.status === "unseen" ? (
          <>
            <Switch checkedChildren="Seen" unCheckedChildren="Unseen" />
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
              }}
            >
              <Badge
                count={8}
                showZero
                className=""
                style={{
                  backgroundColor: "white",
                  color: "black",
                }}
              >
                <img
                  src="https://cdn-icons-png.flaticon.com/512/2645/2645897.png"
                  alt=""
                  className="bell-icon"
                />
              </Badge>
            </ConfigProvider>
          </div>
        </div>

        <div className="suplier-list">
          <div className="dashboard-statistic">
            <div className="dashboard-statistic-sub1">
              <Card bordered={false} className="dashboard-statistic-card">
                <Statistic
                  title="Users"
                  value={78}
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
                  value={35}
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
                  value={7}
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
                  value={10}
                  precision={2}
                  valueStyle={{
                    color: "#cf1322",
                  }}
                  formatter={formatter}
                />
              </Card>
            </div>
          </div>
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
