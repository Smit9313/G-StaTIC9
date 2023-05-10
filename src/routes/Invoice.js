import React from "react";
import "../Style/invoice.css";
import { isEmpty } from "lodash";
import data from "../data/InvoiceData";

function Invoice() {
  let total = 0;

  return (
    <>
      <div className="invoice-background">
        {!isEmpty(data) && (
          <div className="gamme-te tm_container">
            <div className="gamme-te tm_invoice_wrap">
              <div
                className="gamme-te tm_invoice tm_style1"
                id="tm_download_section"
              >
                <div className="gamme-te tm_invoice_in">
                  <div className="gamme-te tm_invoice_head tm_align_center tm_mb20">
                    <div className="gamme-te tm_invoice_left">
                      <div className="gamme-te tm_logo">
                        <img
                          src="https://firebasestorage.googleapis.com/v0/b/clothing-store-2.appspot.com/o/site_images%2Fgurukrupa.png?alt=media&token=f6246337-bbac-46a9-b2bf-1abaac2de541"
                          alt="Logo"
                        />
                      </div>
                    </div>
                    <div className="gamme-te tm_invoice_right tm_text_right">
                      <div className="gamme-te tm_primary_color tm_f50 tm_text_uppercase">
                        Invoice
                      </div>
                    </div>
                  </div>
                  <div className="gamme-te tm_invoice_info tm_mb20">
                    <div className="gamme-te tm_invoice_seperator tm_gray_bg"></div>
                    <div className="gamme-te tm_invoice_info_list">
                      <p className="tm_invoice_number tm_m0 mar-b">
                        Invoice No:{" "}
                        <b className="tm_primary_color">{data._id}</b>
                      </p>
                      <p className="tm_invoice_date tm_m0 mar-b">
                        Date:{" "}
                        <b className="tm_primary_color">
                          {data.order_date.substring(0, 10)}
                        </b>
                      </p>
                    </div>
                  </div>
                  <div className="gamme-te tm_invoice_head tm_mb10">
                    <div className="gamme-te tm_invoice_left">
                      <p className="tm_mb2 mar-b">
                        <b className="tm_primary_color">Invoice To:</b>
                      </p>
                      <p className="mar-b">
                        {data.name} <br />
                        {data.house_no}, {data.area_street}, {data.city} <br />
                        {data.state} - {data.pincode} <br />
                        {data.email}
                      </p>
                    </div>
                    <div className="gamme-te tm_invoice_right tm_text_right">
                      <p className="tm_mb2 mar-b">
                        <b className="tm_primary_color">Pay To:</b>
                      </p>
                      <p className="mar-b">
                        Gurukrupa Fashion <br />
                        Maruti Chowk,
                        <br /> Nr. Rachna Circle, LH Road,
                        <br /> Surat-395006.
                        <br />
                        gurukrupafashion90@gmail.com
                      </p>
                    </div>
                  </div>
                  <div className="gamme-te tm_table tm_style1">
                    <div className="gamme-te tm_round_border tm_radius_0">
                      <div className="gamme-te tm_table_responsive">
                        <table className="table-style">
                          <thead>
                            <tr>
                              <th className="th-style tm_width_3 tm_semi_bold tm_primary_color tm_gray_bg">
                                Item
                              </th>
                              <th className="th-style tm_width_4 tm_semi_bold tm_primary_color tm_gray_bg">
                                Description
                              </th>
                              <th className="th-style tm_width_2 tm_semi_bold tm_primary_color tm_gray_bg">
                                Price
                              </th>
                              <th className="th-style tm_width_1 tm_semi_bold tm_primary_color tm_gray_bg">
                                Qty
                              </th>
                              <th className="th-style tm_width_2 tm_semi_bold tm_primary_color tm_gray_bg tm_text_right">
                                Total
                              </th>
                            </tr>
                          </thead>
                          <tbody>
                            {data.Order_details.map((val, index) => {
                              total = total + val.prod_price * val.qty;

                              return (
                                <>
                                  <tr className="tm_table_baseline" key={index}>
                                    <td className="td-style tm_width_3 tm_primary_color">
                                      {val.prod_name}
                                    </td>
                                    <td className="td-style tm_width_4">
                                      {val.prod_disc}
                                    </td>
                                    <td className="td-style tm_width_2">
                                      {val.prod_price} ₹
                                    </td>
                                    <td className="td-style tm_width_1">
                                      {val.qty}
                                    </td>
                                    <td className="td-style tm_width_2 tm_text_right">
                                      {val.prod_price * val.qty} ₹
                                    </td>
                                  </tr>
                                </>
                              );
                            })}
                          </tbody>
                        </table>
                      </div>
                    </div>

                    <div className="gamme-te tm_invoice_footer tm_border_left tm_border_left_none_md">
                      {data.payment_method === "card" && (
                        <div className="gamme-te tm_left_footer tm_padd_left_15_md">
                          <p className="tm_mb2 mar-b">
                            <b className="tm_primary_color">Payment info:</b>
                          </p>
                          <p className="tm_mb2 mar-b">
                            Payment method : {data.payment_method.toUpperCase()}
                          </p>
                          <p className="tm_m0 mar-b">
                            Credit Card - **********{data.card_last4} <br />
                            Amount : {data.total_amount - data.discount} ₹
                          </p>
                        </div>
                      )}

                      {data.payment_method === "upi" && (
                        <div className="gamme-te tm_left_footer tm_padd_left_15_md">
                          <p className="tm_mb2 mar-b">
                            <b className="tm_primary_color">Payment info:</b>
                          </p>
                          <p className="tm_mb2 mar-b">
                            Payment method : {data.payment_method.toUpperCase()}
                          </p>
                          <p className="tm_m0 mar-b">
                            UPI-id : {data.upi_transaction_id} <br />
                            Amount : {data.total_amount - data.discount} ₹
                          </p>
                        </div>
                      )}

                      <div className="gamme-te tm_right_footer">
                        <table className="table-style">
                          <tbody>
                            <tr className="tm_gray_bg tm_border_top tm_border_left tm_border_right">
                              <td className="td-style tm_width_3 tm_primary_color tm_border_none tm_bold">
                                Subtoal
                              </td>
                              <td className="td-style tm_width_3 tm_primary_color tm_text_right tm_border_none tm_bold">
                                {total} ₹
                              </td>
                            </tr>

                            {data.discount !== 0 && (
                              <tr className="tm_gray_bg tm_border_left tm_border_right">
                                <td className="td-style tm_width_3 tm_primary_color tm_border_none tm_pt0">
                                  Discount{" "}
                                  <span className="tm_ternary_color">
                                    ({Math.round((data.discount * 100) / total)}{" "}
                                    %)
                                  </span>
                                </td>
                                <td className="td-style tm_width_3 tm_text_right tm_border_none tm_pt0 tm_danger_color">
                                  {data.discount} ₹
                                </td>
                              </tr>
                            )}

                            <tr className="tm_border_top tm_gray_bg tm_border_left tm_border_right">
                              <td className="td-style tm_width_3 tm_border_top_0 tm_bold tm_f16 tm_primary_color">
                                Grand Total{" "}
                              </td>
                              <td className="td-style tm_width_3 tm_border_top_0 tm_bold tm_f16 tm_primary_color tm_text_right">
                                {data.total_amount - data.discount} ₹
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                  <hr className="tm_mb20" />
                  <div className="gamme-te tm_text_center">
                    <p className="tm_mb5 mar-b">
                      <b className="tm_primary_color">Terms & Conditions:</b>
                    </p>
                    <p className="tm_m0 mar-b">
                      Your use of the Website shall be deemed to constitute your
                      understanding and approval of, and agreement{" "}
                      <br className="tm_hide_print" />
                      to be bound by, the Privacy Policy and you consent to the
                      collection.
                    </p>
                  </div>
                </div>
              </div>
              <div className="gamme-te tm_invoice_btns tm_hide_print">
                <a
                  href="javascript:window.print()"
                  className="tm_invoice_btn tm_color1"
                >
                  <span className="tm_btn_icon">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="ionicon"
                      viewBox="0 0 512 512"
                    >
                      <path
                        d="M384 368h24a40.12 40.12 0 0040-40V168a40.12 40.12 0 00-40-40H104a40.12 40.12 0 00-40 40v160a40.12 40.12 0 0040 40h24"
                        fill="none"
                        stroke="currentColor"
                        stroke-linejoin="round"
                        stroke-width="32"
                      />
                      <rect
                        x="128"
                        y="240"
                        width="256"
                        height="208"
                        rx="24.32"
                        ry="24.32"
                        fill="none"
                        stroke="currentColor"
                        stroke-linejoin="round"
                        stroke-width="32"
                      />
                      <path
                        d="M384 128v-24a40.12 40.12 0 00-40-40H168a40.12 40.12 0 00-40 40v24"
                        fill="none"
                        stroke="currentColor"
                        stroke-linejoin="round"
                        stroke-width="32"
                      />
                      <circle cx="392" cy="184" r="24" fill="currentColor" />
                    </svg>
                  </span>
                  <span className="tm_btn_text">Print</span>
                </a>
                {/* <button id="tm_download_btn" className="tm_invoice_btn tm_color2">
                <span className="tm_btn_icon">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="ionicon"
                    viewBox="0 0 512 512">
                    <path
                      d="M320 336h76c55 0 100-21.21 100-75.6s-53-73.47-96-75.6C391.11 99.74 329 48 256 48c-69 0-113.44 45.79-128 91.2-60 5.7-112 35.88-112 98.4S70 336 136 336h56M192 400.1l64 63.9 64-63.9M256 224v224.03"
                      fill="none"
                      stroke="currentColor"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="32"
                    />
                  </svg>
                </span>
                <span className="tm_btn_text">Download</span>
              </button> */}
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default Invoice;
