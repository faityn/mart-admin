import React, { lazy } from "react";
import { Switch, Redirect, Route } from "react-router-dom";
import { connect } from "react-redux";
import RouteWithLayout from "../../components/RouteWithLayout/RouteWuthLayout";
import MainLayout from "../layouts/Material/Main";
import MinimalLayout from "../layouts/Material/Minimal";

// Views and Pages
import DashboardView from "../../components/Dashboard/Dashboard";
import NotFoundView from "../../components/NotFound/NotFound";
import SignInView from "../../components/SignIn/SignIn";
import SignUpView from "../../components/SignUp/SignUp";
import MartRegistrationView from "../../components/SignUp/Register";
import ForgetPasswordView from "../../components/ForgetPassword/ForgetPassword";

// Settings
import GeneralInformationView from "../../components/General/Information";
import UserListView from "../../components/Users/List";
import SettingsOperatorRoleView from "../../components/Settings/Operator/Role";

// Product
import ProductManagementView from "../../components/Product/Form/Management";
import EditProductView from "../../components/Product/Form/Edit";
import ProductOrderListView from "../../components/Product/Form/Order";
import ProductNewStatusView from "../../components/Product/Form/StatusNew";
import ProductPrepareStatusView from "../../components/Product/Form/StatusPrepare";
import ProductShippingStatusView from "../../components/Product/Form/StatusShipping";
import ProductDeliveredStatusView from "../../components/Product/Form/StatusDelivered";
import ProductPurchasedStatusView from "../../components/Product/Form/StatusPurchased";
import ProductExchangedStatusView from "../../components/Product/Form/StatusExchanged";
import ProductReturnedStatusView from "../../components/Product/Form/StatusReturned";
import ProductRefundedStatusView from "../../components/Product/Form/StatusRefunded";

// Notice
import NoticeListView from "../../components/Notice/List";
import OneToOneListView from "../../components/OneToOne/List";

// Calculation
import TaxInvoiceListView from "../../components/Calculation/Tax";
import VATReturnView from "../../components/Calculation/VAT";
import ProductRefundView from "../../components/Calculation/ProductRefund";
import ShippingRefundView from "../../components/Calculation/ShippingRefund";


class Routes extends React.Component {
    render() {
        let loggedUser = this.props.loggedUser ? this.props.loggedUser : null;

        if (!loggedUser)
            return (
                <Switch>
                    <Redirect exact from="/" to="/dashboard" />
                    <RouteWithLayout
                        component={SignInView}
                        exact
                        layout={MinimalLayout}
                        path="/signin"
                    />
                    <RouteWithLayout
                        component={SignUpView}
                        exact
                        layout={MinimalLayout}
                        path="/signup"
                    />
                    <RouteWithLayout
                        component={SignUpView}
                        exact
                        layout={MinimalLayout}
                        path="/activation/:token"
                    />

                    {/* Forget password */}
                    <RouteWithLayout
                        component={ForgetPasswordView}
                        exact
                        layout={MinimalLayout}
                        path="/forget-password"
                    />

                    {/* Not Found */}
                    <RouteWithLayout
                        component={NotFoundView}
                        exact
                        layout={MinimalLayout}
                        path="/not-found"
                    />
                    <Redirect to="/not-found" />
                </Switch>
            );

        if (loggedUser.roleName === "ROLE_ADMIN")
            return (
                // <Suspense fallback={<Page loader={"bar"} color={"#A9A9A9"} size={4} />}>
                <Switch>
                    <Redirect exact from="/" to="/dashboard" />
                    <RouteWithLayout
                        component={DashboardView}
                        exact
                        layout={MainLayout}
                        path="/dashboard"
                    />

                    {/* General information */}
                    <RouteWithLayout
                        component={GeneralInformationView}
                        exact
                        layout={MainLayout}
                        path="/general-information"
                    />

                    {/* User management */}
                    <RouteWithLayout
                        component={UserListView}
                        exact
                        layout={MainLayout}
                        path="/user-list"
                    />

                    <RouteWithLayout
                        component={SettingsOperatorRoleView}
                        exact
                        layout={MainLayout}
                        path="/operator-role"
                    />                    

                    <RouteWithLayout
                        component={ProductManagementView}
                        exact
                        layout={MainLayout}
                        path="/product-management"
                    />         
                    
                    <RouteWithLayout
                        component={EditProductView}
                        exact
                        layout={MainLayout}
                        path="/edit-product"
                    />

                    <RouteWithLayout
                        component={ProductOrderListView}
                        exact
                        layout={MainLayout}
                        path="/product-order-all"
                    />

                    <RouteWithLayout
                        component={ProductNewStatusView}
                        exact
                        layout={MainLayout}
                        path="/product-order-new"
                    />

                    <RouteWithLayout
                        component={ProductPrepareStatusView}
                        exact
                        layout={MainLayout}
                        path="/product-order-prepare"
                    />

                    <RouteWithLayout
                        component={ProductShippingStatusView}
                        exact
                        layout={MainLayout}
                        path="/product-order-shipping"
                    />

                    <RouteWithLayout
                        component={ProductDeliveredStatusView}
                        exact
                        layout={MainLayout}
                        path="/product-order-delivered"
                    />

                    <RouteWithLayout
                        component={ProductPurchasedStatusView}
                        exact
                        layout={MainLayout}
                        path="/product-order-purchased"
                    />

                    <RouteWithLayout
                        component={ProductExchangedStatusView}
                        exact
                        layout={MainLayout}
                        path="/product-order-exchanged"
                    />

                    <RouteWithLayout
                        component={ProductReturnedStatusView}
                        exact
                        layout={MainLayout}
                        path="/product-order-returned"
                    />

                    <RouteWithLayout
                        component={ProductRefundedStatusView}
                        exact
                        layout={MainLayout}
                        path="/product-order-refunded"
                    />

                    <RouteWithLayout
                        component={NoticeListView}
                        exact
                        layout={MainLayout}
                        path="/notice-list"
                    />

                    <RouteWithLayout
                        component={OneToOneListView}
                        exact
                        layout={MainLayout}
                        path="/one-to-one"
                    />

                    <RouteWithLayout
                        component={TaxInvoiceListView}
                        exact
                        layout={MainLayout}
                        path="/tax-invoice"
                    />

                    <RouteWithLayout
                        component={VATReturnView}
                        exact
                        layout={MainLayout}
                        path="/vat-return"
                    />

                    <RouteWithLayout
                        component={ProductRefundView}
                        exact
                        layout={MainLayout}
                        path="/product-refund"
                    />

                    <RouteWithLayout
                        component={ShippingRefundView}
                        exact
                        layout={MainLayout}
                        path="/shipping-refund"
                    />

                    <RouteWithLayout
                        component={MartRegistrationView}
                        exact
                        layout={MainLayout}
                        path="/register-mart"
                    />

                    <RouteWithLayout
                        component={SignInView}
                        exact
                        layout={MinimalLayout}
                        path="/signin"
                    />

                    <RouteWithLayout
                        component={SignUpView}
                        exact
                        layout={MinimalLayout}
                        path="/signup"
                    />

                    <RouteWithLayout
                        component={NotFoundView}
                        exact
                        layout={MinimalLayout}
                        path="/not-found"
                    />
                    <Redirect to="/not-found" />
                </Switch>
            );

        return null;
    }
}

// Redux state to props
const mapStateToProps = (state) => {
    return {
        apolloClient: state.apolloClient,
        loggedUser: state.loggedUser,
    };
};

export default connect(mapStateToProps, null)(Routes);
