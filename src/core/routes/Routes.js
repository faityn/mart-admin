import React, { lazy } from "react";
import { Switch, Redirect, Route } from "react-router-dom";
import { connect } from "react-redux";
import RouteWithLayout from "../../components/RouteWithLayout/RouteWuthLayout";

// Material UI Main and Minimal layouts
// const MainLayout = lazy(() => import('../layouts/Material/Main'));
// const MinimalLayout = lazy(() => import('../layouts/Material/Minimal'));
import MainLayout from "../layouts/Material/Main";
import MinimalLayout from "../layouts/Material/Minimal";

// Views and Pages
import DashboardView from "../../components/Dashboard/Dashboard";
import NotFoundView from "../../components/NotFound/NotFound";
import SignInView from "../../components/SignIn/SignIn";
import SignUpView from "../../components/SignUp/SignUp";
import ForgetPasswordView from "../../components/ForgetPassword/ForgetPassword";
import MemberManagementView from "../../components/Users/Index/Management";
import ProductListView from "../../components/Product/Index/List";
import MDPickCreateView from "../../components/MDPick/Form/Form";
import TimeDealCreateView from "../../components/TimeDeal/Form/Form";
import DownloadProductListView from "../../components/DownloadProduct/Index/List";
import ProductForm from "../../components/Product/Form/Form";
import EditProductView from "../../components/Product/Form/Edit";
import ProductOrderView from "../../components/Product/Form/Order";
import ProductRefundView from "../../components/Product/Form/Refund";
import SupplyManagementView from "../../components/Product/Supply/Management";
import ProductManagementView from "../../components/Product/Form/Management";
import ProductNoticeView from "../../components/Product/Form/Notice";
import AllPaymentManagementView from "../../components/Product/Payment/AllManagement";
import PaymentManagementView from "../../components/Product/Payment/Management";
import UserNoticeView from "../../components/Users/Notice/List";
import UserQuestionView from "../../components/Users/Question/List";
import UserListView from "../../components/Users/List";
import UserFAQView from "../../components/Users/Question/FAQ";
import UserReviewView from "../../components/Users/Review/List";
import SetProductListView from "../../components/SetProduct/Index/List";
import SetProductFormView from "../../components/SetProduct/Form/Form";
import CategoryView from "../../components/Category/Index/Index";
import ExcelProductListView from "../../components/ExcelProduct/List";
import MemberFormView from "../../components/Users/Form/MemberForm";
import ConsultManagement from "../../components/ConsultationManagement/Index/List";
import ConsultChatView from "../../components/ConsultationManagement/Form/Chat";

// Mail
import MailManagementCreateView from "../../components/EmailManagemant/Create/Create";
import MailManagementListView from "../../components/EmailManagemant/Index/List";

// Order
import OrderListView from "../../components/Order/Index/List";
import OrderPrintViewQr from "../../components/Order/Print/PrintOld";
import StickerListView from "../../components/Sticker/Index/List";
import OrderRefundView from "../../components/OrderRefund/Index/List";
import OrderPrintDeatil from "../../components/Order/Print/Print";

// Coupon
import CouponListView from "../../components/Settings/Coupon/List";
import CouponFormView from "../../components/Settings/Coupon/Form";
import CouponShowView from "../../components/Settings/Coupon/Show";
import AutoCouponView from "../../components/Settings/AutoCoupon/Form";

// Settings
import SettingsAboutUsListView from "../../components/Settings/AboutUs/Index";
import SettingsTermListView from "../../components/Settings/Term/Index";
import SettingsPrivacyListView from "../../components/Settings/Privacy/Index";
import SettingsSEOListView from "../../components/Settings/Seo/Index";
import SettingsUserListView from "../../components/Settings/User/Index";
import SettingsOperatorListView from "../../components/Settings/Operator/Index";
import SettingsOperatorRoleListView from "../../components/Settings/Operator/Role";
import SettingsPasswordSearchView from "../../components/Settings/Password/Search";
import SettingsPasswordResetView from "../../components/Settings/Password/Reset";
import LoginListView from "../../components/Settings/Login/History";
import ProductGuideView from "../../components/Settings/Product/Guide";
import OrderConfigView from "../../components/Settings/Order/Index";
import SMSConfigView from "../../components/Settings/SMS/Index";
import UnsubscribeListView from "../../components/Settings/SMS/Unsubscribe"
import SettingsMemberPointsListView from "../../components/Settings/Member/Points/Index";
import SettingsProductListView from "../../components/Settings/Product/Index";
import SettingsCategoryListView from "../../components/Settings/Category/Index";
import SettingsShippingListView from "../../components/Settings/Shipping/Index";
import SettingsDeliveryListView from "../../components/Settings/Delivery/index";
import Tax from "../../components/Settings/Tax/Tax";
import SettingsMemberPreferencesListView from "../../components/Settings/Member/Preferences/Index";
import ShippingCountryListView from "../../components/ShippingCountryStatus/Index";
import SettingsMainBannerView from "../../components/Settings/Banner/Main";
import SettingsMiddleBannerView from "../../components/Settings/Banner/Middle";
import SettingsPeekomBannerView from "../../components/Settings/Banner/Peekom";
import SettingsBusinessView from "../../components/Settings/Business/Form";
import MembershipManagement from "../../components/Settings/Membership/Management";
import AutoMailSetting from "../../components/Settings/Mail/AutoMail";
import MailTemplateList from "../../components/Settings/Mail/MailTemplateList";
import MailHistory from "../../components/Settings/Mail/MailHistory";
import MarketingMail from "../../components/Settings/Mail/MarketingMail";
import MarketingMailTemplate from "../../components/Settings/Mail/MarketingMailTemplate";
import SettingsDiscountView from "../../components/Settings/Discount/Form";
import SettingsFreeShippingView from "../../components/Settings/Free/Form";
import SettingsNotice from "../../components/Settings/Notice/Index";
import SettingsNoticeView from "../../components/Settings/Notice/Notice/NoticeView";
import SettingsNoticeForm from "../../components/Settings/Notice/Notice/NoticeForm";
import SettingsQnaView from "../../components/Settings/Notice/Qna/QnaView";
import SettingsFaqForm from "../../components/Settings/Notice/Faq/Form";
import SettingsPopupView from "../../components/Settings/Popup/Index";

// Operator
import OperatorIndexView from "../../components/Operator/Index/List";
import OperatorFormView from "../../components/Operator/Form/Form";

// Event
import EventPickOneView from "../../components/Event/Pick1/Form";
import EventPickTwoView from "../../components/Event/Pick2/Form";

// N+1
import NPlusOneView from "../../components/N+1/Form";

// Exhibition
import ExhibitionView from "../../components/Exhibition/Index/Exhibition";
import ExhibitionForm from "../../components/Exhibition/Form/Form";

// Seller list in admin
import SellerView from "../../components/Settings/Seller/Index/List";
import SellersForm from "../../components/Settings/Seller/Create/Form";
import SellerFormView from "../../components/Settings/Seller/Form/Form";
import SellerPolicyManagement from "../../components/Settings/Seller/PolicyManagement/PolicyManagement";
import SellerSettlementManagement from "../../components/Settings/Seller/SettlementManagement/SettlementManagement";
import SellerHistory from "../../components/Settings/Seller/History/History";

// Affiliate
import AffiliateView from "../../components/Settings/Affiliate/Index/AffiliateList";
import AffiliatePayment from "../../components/Settings/Affiliate/Payment/List";
import AffiliatePolicyFormView from "../../components/Settings/Affiliate/PolicyForm/Form";
import AffiliateTermCondition from "../../components/Settings/Affiliate/Term/Index";
import AffiliateFaq from "../../components/Settings/Affiliate/Faq/Faq";
import AffiliateMaintenance from "../../components/Settings/Affiliate/Maintenance/AffiliateMaintenance";

// Print
import PrintViewQr from "../../components/Print/Print";

//Statistics
import GoogleAnalytics from "../../components/Statistic/01GoogleAnalytics/00GoogleAnalytics";
import VisitsAnalysis from "../../components/Statistic/01Visits/VisitsAnalysis";
import VisitsConfiguration from "../../components/Statistic/01VisitsConfig/VisitsConfiguration";
import SalesStatistics from "../../components/Statistic/02SalesStatistics/01SalesStatistics";
import SalesStatisticsProduct from "../../components/Statistic/02SalesStatistics/02SalesStatisticsProduct";
import ProductAnalytics from "../../components/Statistic/02SalesStatistics/03ProductAnalytics";
import NewMemberStatistic from "../../components/Statistic/03MemberStatistics/01NewMemberStatistic";
import CountryStatistic from "../../components/Statistic/03MemberStatistics/02CountryStatistic";
import AgeStatistic from "../../components/Statistic/03MemberStatistics/03AgeStatistic";
import DeviceStatistic from "../../components/Statistic/04OtherStatistics/01DeviceStatistic";
import Ranking from "../../components/Statistic/04OtherStatistics/02Ranking";

// SELLER ROUTES
import SellerDashboard from "../../components/Seller/Dashboard/Dashboard";
import SellerPersonalInfo from "../../components/Seller/PersonalInfo/PersonalInfo";
import SellerSalesStatusListView from "../../components/Seller/SalesStatus/SalesStatus";

import SellerRegistrationStatusListView from "../../components/Seller/ProductManagement/RegistrationStatus/RegistrationStatus";
import SellerRestockApplicationListView from "../../components/Seller/ProductManagement/RestockApplication/RestockApplication";
import SellerWarehousingApplicationListView from "../../components/Seller/ProductManagement/WarehousingApplication/WarehousingApplication";
import SellerWarehousingStatusListView from "../../components/Seller/ProductManagement/WarehousingStatus/WarehousingStatus";

import Docs from "../../components/Docs/Main";
import DocsDetail from "../../components/Docs/Detail";

import Survey from "../../components/Survey/Main";
/**
 * @const Routes
 * @version 1.0
 * @author Tuguldur Unurtsetseg
 * @package core/routes
 */
class Routes extends React.Component {
    /**
     * @override
     */
    render() {
        let loggedUser = this.props.loggedUser ? this.props.loggedUser : null;

        if (!loggedUser)
            return (
                <Switch>
                    <Redirect exact from="/" to="/dashboard" />
                    <RouteWithLayout
                        component={PrintViewQr}
                        exact
                        layout={MinimalLayout}
                        path="/print/:orderNumber"
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

                    {/* Member management */}
                    <RouteWithLayout
                        component={MemberManagementView}
                        exact
                        layout={MainLayout}
                        path="/member-management"
                    />
                    <RouteWithLayout
                        component={MemberFormView}
                        exact
                        layout={MainLayout}
                        path="/member/create/"
                    />
                    <RouteWithLayout
                        component={MemberFormView}
                        exact
                        layout={MainLayout}
                        path="/member/edit/:id"
                    />
                    <RouteWithLayout
                        component={ConsultManagement}
                        exact
                        layout={MainLayout}
                        path="/consult-management"
                    />
                    <RouteWithLayout
                        component={ConsultChatView}
                        exact
                        layout={MainLayout}
                        path="/consult/edit/:id"
                    />
                    <RouteWithLayout
                        component={PrintViewQr}
                        exact
                        layout={MinimalLayout}
                        path="/print/:orderNumber"
                    />

                    {/* Mail */}
                    <RouteWithLayout
                        component={MailManagementListView}
                        exact
                        layout={MainLayout}
                        path="/mail-management"
                    />
                    <RouteWithLayout
                        component={MailManagementCreateView}
                        exact
                        layout={MainLayout}
                        path="/mail-management-create"
                    />

                    {/* Order */}
                    <RouteWithLayout
                        component={OrderListView}
                        exact
                        layout={MainLayout}
                        path="/orders"
                    />
                    {/* <RouteWithLayout
            component={OrderPrintViewQr}
            exact
            layout={MainLayout}
            path="/order-print"
          /> */}
                    <Route
                        component={OrderPrintDeatil}
                        exact
                        path="/orders/detail"
                    />
                    <RouteWithLayout
                        component={OrderRefundView}
                        exact
                        layout={MainLayout}
                        path="/order/refund"
                    />

                    {/* Products */}
                    <RouteWithLayout
                        component={ProductListView}
                        exact
                        layout={MainLayout}
                        path="/products"
                    />
                    <RouteWithLayout
                        component={DownloadProductListView}
                        exact
                        layout={MainLayout}
                        path="/download-products"
                    />
                    <RouteWithLayout
                        component={ExcelProductListView}
                        exact
                        layout={MainLayout}
                        path="/excel-product"
                    />
                    <RouteWithLayout
                        component={ProductForm}
                        exact
                        layout={MainLayout}
                        path="/product/create"
                    />
                    <RouteWithLayout
                        component={ProductForm}
                        exact
                        layout={MainLayout}
                        path="/product/edit/:id"
                    />
                    <RouteWithLayout
                        component={SetProductListView}
                        exact
                        layout={MainLayout}
                        path="/setproduct"
                    />
                    <RouteWithLayout
                        component={SetProductFormView}
                        exact
                        layout={MainLayout}
                        path="/setproduct/form/:code"
                    />

                    <RouteWithLayout
                        component={MDPickCreateView}
                        exact
                        layout={MainLayout}
                        path="/product-mdpick"
                    />

                    <RouteWithLayout
                        component={TimeDealCreateView}
                        exact
                        layout={MainLayout}
                        path="/product-timedeal"
                    />

                    {/* Event */}
                    <RouteWithLayout
                        component={EventPickOneView}
                        exact
                        layout={MainLayout}
                        path="/event-pick-one"
                    />

                    <RouteWithLayout
                        component={EventPickTwoView}
                        exact
                        layout={MainLayout}
                        path="/event-pick-two"
                    />

                    {/* N+1 */}
                    <RouteWithLayout
                        component={NPlusOneView}
                        exact
                        layout={MainLayout}
                        path="/n-plus-one"
                    />

                    {/* Exhibition */}
                    <RouteWithLayout
                        component={ExhibitionView}
                        exact
                        layout={MainLayout}
                        path="/exhibition"
                    />

                    <RouteWithLayout
                        component={ExhibitionForm}
                        exact
                        layout={MainLayout}
                        path="/exhibition/create"
                    />

                    <RouteWithLayout
                        component={ExhibitionForm}
                        exact
                        layout={MainLayout}
                        path="/exhibition/edit/:id"
                    />

                    {/* Category */}
                    <RouteWithLayout
                        component={CategoryView}
                        exact
                        layout={MainLayout}
                        path="/category"
                    />

                    {/* Operator */}
                    <RouteWithLayout
                        component={OperatorIndexView}
                        exact
                        layout={MainLayout}
                        path="/operators"
                    />

                    <RouteWithLayout
                        component={OperatorFormView}
                        exact
                        layout={MainLayout}
                        path="/operator/create"
                    />

                    <RouteWithLayout
                        component={OperatorFormView}
                        exact
                        layout={MainLayout}
                        path="/operator/edit/:id"
                    />

                    {/* Seller */}
                    <RouteWithLayout
                        component={SellerView}
                        exact
                        layout={MainLayout}
                        path="/partners"
                    />

                    <RouteWithLayout
                        component={SellersForm}
                        exact
                        layout={MainLayout}
                        path="/partners/create"
                    />

                    <RouteWithLayout
                        component={SellerFormView}
                        exact
                        layout={MainLayout}
                        path="/partner/create"
                    />

                    <RouteWithLayout
                        component={SellerFormView}
                        exact
                        layout={MainLayout}
                        path="/partner/edit/:id"
                    />

                    <RouteWithLayout
                        component={SellerPolicyManagement}
                        exact
                        layout={MainLayout}
                        path="/partner/policy-management"
                    />

                    <RouteWithLayout
                        component={SellerSettlementManagement}
                        exact
                        layout={MainLayout}
                        path="/partner/settlement-management"
                    />

                    <RouteWithLayout
                        component={SellerHistory}
                        exact
                        layout={MainLayout}
                        path="/partner/history"
                    />

                    {/* Auth */}
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

                    {/* <RouteWithLayout
            component={SignUpView}
            exact
            layout={MinimalLayout}
            path="/sign-up"
          />
          <RouteWithLayout
            component={ForgetPasswordView}
            exact
            layout={MinimalLayout}
            path="/forget-password"
          /> */}

                    {/* Shipping Country */}
                    <RouteWithLayout
                        component={ShippingCountryListView}
                        exact
                        layout={MainLayout}
                        path="/shipping-country-list"
                    />

                    {/* Sticker */}
                    <RouteWithLayout
                        component={StickerListView}
                        exact
                        layout={MainLayout}
                        path="/stickers"
                    />

                    {/* Settings */}
                    <RouteWithLayout
                        component={SettingsAboutUsListView}
                        exact
                        layout={MainLayout}
                        path="/settings-aboutus"
                    />

                    <RouteWithLayout
                        component={SettingsTermListView}
                        exact
                        layout={MainLayout}
                        path="/settings-term"
                    />

                    <RouteWithLayout
                        component={SettingsPrivacyListView}
                        exact
                        layout={MainLayout}
                        path="/settings-privacy"
                    />

                    <RouteWithLayout
                        component={SettingsUserListView}
                        exact
                        layout={MainLayout}
                        path="/settings-user"
                    />

                    <RouteWithLayout
                        component={SettingsOperatorListView}
                        exact
                        layout={MainLayout}
                        path="/settings-operator"
                    />

                    <RouteWithLayout
                        component={SettingsOperatorRoleListView}
                        exact
                        layout={MainLayout}
                        path="/settings-operator-role"
                    />

                    <RouteWithLayout
                        component={SettingsPasswordSearchView}
                        exact
                        layout={MainLayout}
                        path="/settings-password-search"
                    />

                    <RouteWithLayout
                        component={SettingsPasswordResetView}
                        exact
                        layout={MainLayout}
                        path="/settings-password-reset"
                    />

                    <RouteWithLayout
                        component={LoginListView}
                        exact
                        layout={MainLayout}
                        path="/login-history"
                    />

                    <RouteWithLayout
                        component={ProductGuideView}
                        exact
                        layout={MainLayout}
                        path="/product-usage-guide"
                    />

                    <RouteWithLayout
                        component={OrderConfigView}
                        exact
                        layout={MainLayout}
                        path="/order-config"
                    />

                    <RouteWithLayout
                        component={SMSConfigView}
                        exact
                        layout={MainLayout}
                        path="/sms-config"
                    />

                    <RouteWithLayout
                        component={UnsubscribeListView}
                        exact
                        layout={MainLayout}
                        path="/unsubscribe-list"
                    />

                    <RouteWithLayout
                        component={SettingsSEOListView}
                        exact
                        layout={MainLayout}
                        path="/settings-seo"
                    />

                    <RouteWithLayout
                        component={SettingsMemberPreferencesListView}
                        exact
                        layout={MainLayout}
                        path="/settings/operation/member"
                    />

                    <RouteWithLayout
                        component={SettingsMemberPointsListView}
                        exact
                        layout={MainLayout}
                        path="/settings/operation/points"
                    />

                    <RouteWithLayout
                        component={CouponListView}
                        exact
                        layout={MainLayout}
                        path="/settings/operation/coupon"
                    />

                    <RouteWithLayout
                        component={CouponFormView}
                        exact
                        layout={MainLayout}
                        path="/settings/operation/coupon/create"
                    />
                    <RouteWithLayout
                        // component={CouponShowView}
                        component={CouponFormView}
                        exact
                        layout={MainLayout}
                        path="/settings/operation/coupon/edit/:id"
                    />

                    <RouteWithLayout
                        component={AutoCouponView}
                        exact
                        layout={MainLayout}
                        path="/settings/operation/auto-coupon"
                    />

                    <RouteWithLayout
                        component={SettingsShippingListView}
                        exact
                        layout={MainLayout}
                        path="/settings/operation/shipping"
                    />

                    <RouteWithLayout
                        component={SettingsDeliveryListView}
                        exact
                        layout={MainLayout}
                        path="/settings/operation/delivery"
                    />

                    <RouteWithLayout
                        component={Tax}
                        exact
                        layout={MainLayout}
                        path="/settings/operation/tax"
                    />

                    <RouteWithLayout
                        component={SettingsProductListView}
                        exact
                        layout={MainLayout}
                        path="/settings/product"
                    />

                    <RouteWithLayout
                        component={EditProductView}
                        exact
                        layout={MainLayout}
                        path="/edit-product"
                    />

                    <RouteWithLayout
                        component={ProductOrderView}
                        exact
                        layout={MainLayout}
                        path="/product-order"
                    />

                    <RouteWithLayout
                        component={ProductRefundView}
                        exact
                        layout={MainLayout}
                        path="/product-refund"
                    />

                    <RouteWithLayout
                        component={SupplyManagementView}
                        exact
                        layout={MainLayout}
                        path="/supply-management"
                    />

                    <RouteWithLayout
                        component={ProductManagementView}
                        exact
                        layout={MainLayout}
                        path="/product-management"
                    />

                    <RouteWithLayout
                        component={ProductNoticeView}
                        exact
                        layout={MainLayout}
                        path="/product-notice"
                    />

                    <RouteWithLayout
                        component={AllPaymentManagementView}
                        exact
                        layout={MainLayout}
                        path="/payment-management-all"
                    />

                    <RouteWithLayout
                        component={PaymentManagementView}
                        exact
                        layout={MainLayout}
                        path="/payment-management"
                    />

                    <RouteWithLayout
                        component={UserNoticeView}
                        exact
                        layout={MainLayout}
                        path="/user-notice"
                    />

                    <RouteWithLayout
                        component={UserQuestionView}
                        exact
                        layout={MainLayout}
                        path="/user-question"
                    />

                    <RouteWithLayout
                        component={UserFAQView}
                        exact
                        layout={MainLayout}
                        path="/user-faq"
                    />

                    <RouteWithLayout
                        component={UserListView}
                        exact
                        layout={MainLayout}
                        path="/user-list"
                    />

                    <RouteWithLayout
                        component={UserReviewView}
                        exact
                        layout={MainLayout}
                        path="/user-review"
                    />
                    <RouteWithLayout
                        component={SettingsCategoryListView}
                        exact
                        layout={MainLayout}
                        path="/settings-category"
                    />

                    {/* MainBanner */}
                    <RouteWithLayout
                        component={SettingsMainBannerView}
                        exact
                        layout={MainLayout}
                        path="/settings-main-banner"
                    />

                    {/* MiddleBanner */}
                    <RouteWithLayout
                        component={SettingsMiddleBannerView}
                        exact
                        layout={MainLayout}
                        path="/settings-middle-banner"
                    />

                    {/* PeekomBanner */}
                    <RouteWithLayout
                        component={SettingsPeekomBannerView}
                        exact
                        layout={MainLayout}
                        path="/settings-peekom-banner"
                    />

                    {/* Business */}
                    <RouteWithLayout
                        component={SettingsBusinessView}
                        exact
                        layout={MainLayout}
                        path="/settings-business"
                    />

                    <RouteWithLayout
                        component={MembershipManagement}
                        exact
                        layout={MainLayout}
                        path="/settings-membership-management"
                    />

                    {/* Auto Mail */}
                    <RouteWithLayout
                        component={AutoMailSetting}
                        exact
                        layout={MainLayout}
                        path="/settings-mail-auto"
                    />
                    <RouteWithLayout
                        component={MailTemplateList}
                        exact
                        layout={MainLayout}
                        path="/settings-mail-templates"
                    />
                    <RouteWithLayout
                        component={MailHistory}
                        exact
                        layout={MainLayout}
                        path="/settings-history"
                    />
                    <RouteWithLayout
                        component={MarketingMailTemplate}
                        exact
                        layout={MainLayout}
                        path="/marketing-mail-templates"
                    />
                    <RouteWithLayout
                        component={MarketingMail}
                        exact
                        layout={MainLayout}
                        path="/marketing-mail"
                    />

                    {/* Discount */}
                    <RouteWithLayout
                        component={SettingsDiscountView}
                        exact
                        layout={MainLayout}
                        path="/promotion/discount"
                    />

                    {/* Popup */}
                    <RouteWithLayout
                        component={SettingsPopupView}
                        exact
                        layout={MainLayout}
                        path="/promotion/popup"
                    />

                    {/* FreeShipping */}
                    <RouteWithLayout
                        component={SettingsFreeShippingView}
                        exact
                        layout={MainLayout}
                        path="/settings-free-shipping"
                    />

                    {/* Affiliate */}

                    <RouteWithLayout
                        component={AffiliateView}
                        exact
                        layout={MainLayout}
                        path="/settings/operation/affiliate"
                    />

                    <RouteWithLayout
                        component={AffiliatePolicyFormView}
                        exact
                        layout={MainLayout}
                        path="/settings/operation/affiliate-policy/create"
                    />

                    <RouteWithLayout
                        component={AffiliatePayment}
                        exact
                        layout={MainLayout}
                        path="/settings/operation/affiliate/payment"
                    />

                    <RouteWithLayout
                        component={AffiliateTermCondition}
                        exact
                        layout={MainLayout}
                        path="/settings/operation/affiliate/term"
                    />

                    <RouteWithLayout
                        component={AffiliateFaq}
                        exact
                        layout={MainLayout}
                        path="/settings/operation/affiliate/faq"
                    />

                    <RouteWithLayout
                        component={AffiliateMaintenance}
                        exact
                        layout={MainLayout}
                        path="/settings/operation/affiliate/maintenance"
                    />

                    {/* Notice */}
                    <RouteWithLayout
                        component={SettingsNotice}
                        exact
                        layout={MainLayout}
                        path="/settings-notice"
                    />

                    <RouteWithLayout
                        component={SettingsNoticeView}
                        exact
                        layout={MainLayout}
                        path="/settings-notice/view/:id"
                    />

                    <RouteWithLayout
                        component={SettingsNoticeForm}
                        exact
                        layout={MainLayout}
                        path="/settings-notice/form/:id"
                    />

                    <RouteWithLayout
                        component={SettingsQnaView}
                        exact
                        layout={MainLayout}
                        path="/settings-notice/qa/:id"
                    />

                    <RouteWithLayout
                        component={SettingsFaqForm}
                        exact
                        layout={MainLayout}
                        path="/settings-faq/form/:id"
                    />

                    <RouteWithLayout
                        component={GoogleAnalytics}
                        exact
                        layout={MainLayout}
                        path="/google-analytics"
                    />

                    <RouteWithLayout
                        component={VisitsAnalysis}
                        exact
                        layout={MainLayout}
                        path="/visits-analysis"
                    />
                    
                    <RouteWithLayout
                        component={VisitsConfiguration}
                        exact
                        layout={MainLayout}
                        path="/visits-configuration"
                    />

                    <RouteWithLayout
                        component={SalesStatistics}
                        exact
                        layout={MainLayout}
                        path="/sales-statistic"
                    />

                    <RouteWithLayout
                        component={SalesStatisticsProduct}
                        exact
                        layout={MainLayout}
                        path="/sales-statistic-by-product"
                    />

                    <RouteWithLayout
                        component={ProductAnalytics}
                        exact
                        layout={MainLayout}
                        path="/product-analytics"
                    />

                    <RouteWithLayout
                        component={NewMemberStatistic}
                        exact
                        layout={MainLayout}
                        path="/new-members-statistic"
                    />

                    <RouteWithLayout
                        component={CountryStatistic}
                        exact
                        layout={MainLayout}
                        path="/country-statistic"
                    />

                    <RouteWithLayout
                        component={AgeStatistic}
                        exact
                        layout={MainLayout}
                        path="/age-statistic"
                    />

                    <RouteWithLayout
                        component={DeviceStatistic}
                        exact
                        layout={MainLayout}
                        path="/device-statistic"
                    />

                    <RouteWithLayout
                        component={Ranking}
                        exact
                        layout={MainLayout}
                        path="/ranking"
                    />
                    {/* Docs */}
                    <RouteWithLayout
                        component={Docs}
                        exact
                        layout={MainLayout}
                        path="/docs"
                    />
                    <RouteWithLayout
                        component={DocsDetail}
                        layout={MainLayout}
                        path="/docs/:id"
                    />

                    {/* Survey */}
                    <RouteWithLayout
                        component={Survey}
                        exact
                        layout={MainLayout}
                        path="/survey"
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
                // </Suspense>
            );

        if (loggedUser.roleName === "ROLE_SELLER")
            return (
                // <Suspense fallback={<Page loader={"bar"} color={"#A9A9A9"} size={4} />}>
                <Switch>
                    {/* Dashboard */}
                    <Redirect exact from="/" to="/dashboard" />
                    <RouteWithLayout
                        component={SellerDashboard}
                        exact
                        layout={MainLayout}
                        path="/dashboard"
                    />

                    {/* Seller personal info */}
                    <RouteWithLayout
                        component={SellerPersonalInfo}
                        exact
                        layout={MainLayout}
                        path="/partner-information"
                    />

                    {/* Create & edit product */}
                    <RouteWithLayout
                        component={ProductForm}
                        exact
                        layout={MainLayout}
                        path="/product/create"
                    />
                    <RouteWithLayout
                        component={ProductForm}
                        exact
                        layout={MainLayout}
                        path="/product/edit/:id"
                    />

                    {/* Seller product management */}
                    <RouteWithLayout
                        component={SellerRegistrationStatusListView}
                        exact
                        layout={MainLayout}
                        path="/partner/product-management/registration-status"
                    />
                    <RouteWithLayout
                        component={SellerRestockApplicationListView}
                        exact
                        layout={MainLayout}
                        path="/partner/product-management/restock-application"
                    />
                    <RouteWithLayout
                        component={SellerWarehousingApplicationListView}
                        exact
                        layout={MainLayout}
                        path="/partner/product-management/warehousing-application"
                    />
                    <RouteWithLayout
                        component={SellerWarehousingStatusListView}
                        exact
                        layout={MainLayout}
                        path="/partner/product-management/warehousing-status"
                    />

                    {/* Seller sales status */}
                    <RouteWithLayout
                        component={SellerSalesStatusListView}
                        exact
                        layout={MainLayout}
                        path="/partner/sales-status"
                    />
                    {/* Seller History */}
                    <RouteWithLayout
                        component={SellerHistory}
                        exact
                        layout={MainLayout}
                        path="/partner/history"
                    />

                    {/* Signin */}
                    <RouteWithLayout
                        component={SignInView}
                        exact
                        layout={MinimalLayout}
                        path="/signin"
                    />

                    {/* Signup */}
                    <RouteWithLayout
                        component={SignUpView}
                        exact
                        layout={MinimalLayout}
                        path="/signup"
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
                // </Suspense>
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
