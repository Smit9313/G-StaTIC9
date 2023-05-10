import React from 'react';
import Sidebar from './components/Sidebar';
import { Switch, Route, useRouteMatch ,Redirect} from "react-router-dom";
import Home from './routes/Home';
import UpdateDiscount from './routes/Discount/UpdateDiscount';
import UpdateProduct from "./routes/Product/UpdateProduct";
import UpdateCategory from './routes/Category/UpdateCategory';
import UpdateSupplier from './routes/Supplier/UpdateSupplier';
import UpdatePurchase from './routes/Purchase/UpdatePurchase';

function Admin() {

  const { path, url } = useRouteMatch();

  return (
    <>
      <Sidebar url={url} />
      <Switch>
        <Route exact path={path}>
          <Redirect to="admin/dashboard" />
        </Route>
        <Route path={`${path}/updateDiscount/:id`}>
          <UpdateDiscount />
        </Route>
        <Route path={`${path}/updateProduct/:id`}>
          <UpdateProduct />
        </Route>
        <Route path={`${path}/updateCategory/:id`}>
          <UpdateCategory />
        </Route>
        <Route path={`${path}/updateSupplier/:id`}>
          <UpdateSupplier />
        </Route>
        <Route path={`${path}/updatePurchase/:id`}>
          <UpdatePurchase />
        </Route>
        <Route path={`${path}/:id`}>
          <Home path={path} />
        </Route>
      </Switch>
    </>
  );
}

export default Admin