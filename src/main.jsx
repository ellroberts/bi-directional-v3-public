import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./index.css";

import CloudCustomer from "./pages/CloudCustomer";
import ResellerPrerequisites from "./pages/ResellerPrerequisites";
import Tenant from "./pages/Tenant";
import MCA from "./pages/MCA";
import Subscriptions from "./pages/Subscriptions";
import AddOns from "./pages/AddOns";
import EndDateAlignment from "./pages/EndDateAlignment";
import Summary from "./pages/Summary";

import LayoutWithFooter from "./components/LayoutWithFooter";
import { FooterNavProvider } from "./components/FooterNavContext";
import { CloudCustomerFormProvider } from "./context/CloudCustomerFormContext";
import { ResellerFormProvider } from "./context/ResellerFormContext";
import { TenantFormProvider } from "./context/TenantFormContext";
import { MCAFormProvider } from "./context/MCAFormContext";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
  <BrowserRouter>
    <FooterNavProvider>
      <CloudCustomerFormProvider>
        <ResellerFormProvider>
          <TenantFormProvider>
           <MCAFormProvider>
            <Routes>
              <Route element={<LayoutWithFooter />}>
                <Route path="/" element={<CloudCustomer />} />
                <Route path="/cloud-customer" element={<CloudCustomer />} />
                <Route path="/reseller-prerequisites" element={<ResellerPrerequisites />} />
                <Route path="/tenant" element={<Tenant />} />
                <Route path="/mca" element={<MCA />} />
                <Route path="/subscriptions" element={<Subscriptions />} />
                <Route path="/add-ons" element={<AddOns />} />
                <Route path="/end-date-alignment" element={<EndDateAlignment />} />
              </Route>
              <Route path="/summary" element={<Summary />} />
            </Routes>
            </MCAFormProvider>
          </TenantFormProvider>
        </ResellerFormProvider>
      </CloudCustomerFormProvider>
    </FooterNavProvider>
  </BrowserRouter>
</React.StrictMode>
);
