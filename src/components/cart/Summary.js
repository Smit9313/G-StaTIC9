import React,{useState} from 'react';
import { useHistory } from 'react-router-dom';
import './summary.css';
import { Checkbox } from "antd";
import { ConfigProvider } from "antd";
import { Toaster, toast } from "react-hot-toast";

function Summary({
    subTotal
}) {

    const history = useHistory();
    const total = subTotal;

    const [noreturn,setNoReturn] = useState();

    const onChange = (e) => {
      console.log(`checked = ${e.target.checked}`);
      setNoReturn(e.target.checked)
    };

    const handleCheckout = (e) =>{
      e.preventDefault();
      console.log("hshb")

      if(noreturn === true){
        history.push("/checkout")
      }else{
        console.log("not valid")
        toast.error("Accept return policy!", {
          duration: 3000,
        });
      }

    }

  return (
    <section className="container">

      <div className="summary">
        <ul>
          <li className="total">
            Total <span>{parseFloat(total).toFixed(2)}</span>
          </li>
        </ul>
        <ul>
          <li
            style={{
              fontSize: "16px",
              marginBottom: "20px",
              letterSpacing: "1px",
            }}>
            <ConfigProvider
              theme={{
                components: {
                  Checkbox: {
                    colorPrimary: "#000",
                    colorPrimaryHover: "#000",
                    colorPrimaryBorder: "#000",
                    colorPrimaryBorderHover: "#000",
                  },
                },
              }}>
              <Checkbox
                onChange={onChange}
                style={{ marginRight: "10px" }}></Checkbox>
            </ConfigProvider>
            No Return, No Refund Policy *
            <span style={{ width: "150px" }}></span>
          </li>
        </ul>
      </div>

      <div className="checkout">
        <button type="button" onClick={handleCheckout}>
          Check Out
        </button>
      </div>
      <Toaster
        position="top-center"
        containerStyle={{
          top: 65,
        }}
        reverseOrder={true}
      />
    </section>
  );
}

export default Summary