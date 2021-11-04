import React from "react";
import clsx from "clsx";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { makeStyles, createStyles } from "@material-ui/core/styles";
import { Divider, Drawer } from "@material-ui/core";
import DashboardIcon from "@material-ui/icons/Dashboard";
import CategoryIcon from "@material-ui/icons/Category";
import GroupIcon from "@material-ui/icons/Group";
import LoyaltyIcon from "@material-ui/icons/Loyalty";
import { Profile } from "./components";
import LocalPrintshopIcon from "@material-ui/icons/LocalPrintshop";
import TreeView from "@material-ui/lab/TreeView";
import TreeItem from "@material-ui/lab/TreeItem";
import Typography from "@material-ui/core/Typography";
import MailIcon from "@material-ui/icons/Mail";
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";
import ArrowRightIcon from "@material-ui/icons/ArrowRight";
import { Link } from "react-router-dom";
import PublishIcon from "@material-ui/icons/Publish";
import SettingsIcon from "@material-ui/icons/Settings";
import LocalShippingIcon from "@material-ui/icons/LocalShipping";
import ConfirmationNumberIcon from "@material-ui/icons/ConfirmationNumber";
import AlarmIcon from "@material-ui/icons/Alarm";
import MoneyIcon from "@material-ui/icons/Money";
import RecentActorsIcon from "@material-ui/icons/RecentActors";
import LowPriorityIcon from "@material-ui/icons/LowPriority";
import PublicIcon from "@material-ui/icons/Public";
import MenuIcon from "@material-ui/icons/Menu";
import FastfoodIcon from "@material-ui/icons/Fastfood";
import MonetizationOnIcon from "@material-ui/icons/MonetizationOn";
import InfoIcon from "@material-ui/icons/Info";
import EventIcon from "@material-ui/icons/Event";
import ViewCarouselIcon from "@material-ui/icons/ViewCarousel";
import BusinessIcon from "@material-ui/icons/Business";
import ReceiptIcon from "@material-ui/icons/Receipt";
import PhotoAlbumIcon from "@material-ui/icons/PhotoAlbum";
import RedeemIcon from "@material-ui/icons/Redeem";
import SubjectIcon from "@material-ui/icons/Subject";
import TouchAppIcon from "@material-ui/icons/TouchApp";
import VideoLabelIcon from "@material-ui/icons/VideoLabel";
import EmojiSymbolsIcon from "@material-ui/icons/EmojiSymbols";
import ForumIcon from "@material-ui/icons/Forum";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import NotificationsIcon from "@material-ui/icons/Notifications";
import LocalAtmIcon from "@material-ui/icons/LocalAtm";
import HistoryIcon from "@material-ui/icons/History";
import PersonIcon from "@material-ui/icons/Person";
import StorefrontIcon from "@material-ui/icons/Storefront";
import EqualizerIcon from "@material-ui/icons/Equalizer";
import TimelineIcon from "@material-ui/icons/Timeline";
import AppsIcon from "@material-ui/icons/Apps";
import AvTimerIcon from "@material-ui/icons/AvTimer";
import RefreshIcon from "@material-ui/icons/Refresh";
import SearchIcon from "@material-ui/icons/Search";
import {
    CompareTwoTone,
    Equalizer,
    PieChart,
    PieChartTwoTone,
    ShowChart,
    TableChartRounded,
} from "@material-ui/icons";
import { Timeline } from "@material-ui/lab";

/**
 * @template useStyles
 */
const useStyles = makeStyles((theme) => ({
    drawer: {
        width: 240,
        [theme.breakpoints.up("lg")]: {
            marginTop: 64,
            height: "calc(100% - 64px)",
        },
    },
    root: {
        backgroundColor: theme.palette.white,
        display: "flex",
        flexDirection: "column",
        height: "100%",
        padding: theme.spacing(2),
    },
    divider: {
        margin: theme.spacing(2, 0),
    },
    nav: {
        marginBottom: theme.spacing(2),
    },
}));

const useTreeItemStyles = makeStyles((theme) =>
    createStyles({
        content: {
            color: theme.palette.text.secondary,
            borderTopRightRadius: theme.spacing(2),
            borderBottomRightRadius: theme.spacing(2),
            paddingRight: theme.spacing(1),
            fontWeight: theme.typography.fontWeightMedium,
            "$expanded > &": {
                fontWeight: theme.typography.fontWeightRegular,
            },
        },
        group: {
            marginLeft: 0,
            "& $content": {
                paddingLeft: theme.spacing(2),
            },
        },
        expanded: {},
        selected: {},
        label: {
            fontWeight: "inherit",
            color: "inherit",
            margin: theme.spacing(0.7, 0),
        },
        labelRoot: {
            display: "flex",
            alignItems: "center",
            padding: theme.spacing(0.5, 0),
        },
        labelIcon: {
            marginRight: theme.spacing(1),
        },
        labelText: {
            fontWeight: "inherit",
            flexGrow: 1,
        },
    })
);

function StyledTreeItem(props) {
    const classes = useTreeItemStyles();
    const {
        labelText,
        labelIcon: LabelIcon,
        labelInfo,
        color,
        bgColor,
        ...other
    } = props;

    return (
        <TreeItem
            label={
                <div className={classes.labelRoot}>
                    <LabelIcon color="inherit" className={classes.labelIcon} />
                    <Typography variant="body2" className={classes.labelText}>
                        {labelText}
                    </Typography>
                    <Typography variant="caption" color="inherit">
                        {labelInfo}
                    </Typography>
                </div>
            }
            style={{
                "--tree-view-color": color,
                "--tree-view-bg-color": bgColor,
            }}
            classes={{
                root: classes.root,
                content: classes.content,
                expanded: classes.expanded,
                selected: classes.selected,
                group: classes.group,
                label: classes.label,
            }}
            {...other}
        />
    );
}

/**
 * @const Sidebar
 * @version 0.1
 * @author Tuguldur Unurtsetseg
 * @package core/layouts/main/components
 */
const Sidebar = (props) => {
    const { open, variant, onClose, className, ...rest } = props;

    const classes = useStyles();

    const loggedUser = props.loggedUser.roleName
        ? props.loggedUser.roleName
        : null;

    if (!loggedUser) return null;

    if (loggedUser === "ROLE_ADMIN")
        return (
            <Drawer
                anchor="left"
                classes={{ paper: classes.drawer }}
                onClose={onClose}
                open={open}
                variant={variant}
            >
                <div {...rest} className={clsx(classes.root, className)}>
                    <Profile />
                    <Divider className={classes.divider} />

                    <TreeView
                        className="menu-svgIcon"
                        // defaultExpanded={['3']}
                        defaultCollapseIcon={<ArrowDropDownIcon />}
                        defaultExpandIcon={<ArrowRightIcon />}
                        defaultEndIcon={<div style={{ width: 200 }} />}
                    >
                        <Link to="/dashboard">
                            <StyledTreeItem
                                nodeId="1"
                                labelText="Dashboard"
                                labelIcon={DashboardIcon}
                            />
                        </Link>
                        <StyledTreeItem
                            nodeId="3"
                            labelText="Product management"
                            labelIcon={FastfoodIcon}
                        >
                            <Link to="/products">
                                <StyledTreeItem
                                    nodeId="4"
                                    labelText="Products"
                                    labelIcon={FastfoodIcon}
                                    color="#1a73e8"
                                    bgColor="#e8f0fe"
                                />
                            </Link>
                            <Link to="/setproduct">
                                <StyledTreeItem
                                    nodeId="744"
                                    labelText="Set Product"
                                    labelIcon={CategoryIcon}
                                    color="#1a73e8"
                                    bgColor="#e8f0fe"
                                />
                            </Link>
                            <Link to="/category">
                                <StyledTreeItem
                                    nodeId="2"
                                    labelText="Category"
                                    labelIcon={MenuIcon}
                                />
                            </Link>
                            <Link to="/excel-product">
                                <StyledTreeItem
                                    nodeId="8"
                                    labelText="Product batch"
                                    labelIcon={PublishIcon}
                                    color="#1a73e8"
                                    bgColor="#e8f0fe"
                                />
                            </Link>
                        </StyledTreeItem>
                        <StyledTreeItem
                            nodeId="789"
                            labelText="Promotion management"
                            labelIcon={RedeemIcon}
                        >
                            <StyledTreeItem
                                nodeId="41"
                                labelText="Main page"
                                labelIcon={SubjectIcon}
                            >
                                <Link to="/settings-main-banner">
                                    <StyledTreeItem
                                        nodeId="411"
                                        labelText="Main banner"
                                        labelIcon={ViewCarouselIcon}
                                        color="#1a73e8"
                                        bgColor="#e8f0fe"
                                    />
                                </Link>
                                <Link to="/settings-middle-banner">
                                    <StyledTreeItem
                                        nodeId="412"
                                        labelText="Middle banner"
                                        labelIcon={ViewCarouselIcon}
                                        color="#1a73e8"
                                        bgColor="#e8f0fe"
                                    />
                                </Link>
                                <Link to="/settings-peekom-banner">
                                    <StyledTreeItem
                                        nodeId="413"
                                        labelText="Peeking banner"
                                        labelIcon={ViewCarouselIcon}
                                        color="#1a73e8"
                                        bgColor="#e8f0fe"
                                    />
                                </Link>
                                <Link to="/product-mdpick">
                                    <StyledTreeItem
                                        nodeId="414"
                                        labelText="MD's Pick"
                                        labelIcon={TouchAppIcon}
                                        color="#1a73e8"
                                        bgColor="#e8f0fe"
                                    />
                                </Link>
                                <Link to="/event-pick-one">
                                    <StyledTreeItem
                                        nodeId="415"
                                        labelText="Event pick one"
                                        labelIcon={EventIcon}
                                        color="#1a73e8"
                                        bgColor="#e8f0fe"
                                    />
                                </Link>
                                <Link to="/event-pick-two">
                                    <StyledTreeItem
                                        nodeId="416"
                                        labelText="Event pick two"
                                        labelIcon={EventIcon}
                                        color="#1a73e8"
                                        bgColor="#e8f0fe"
                                    />
                                </Link>
                                <Link to="/product-timedeal">
                                    <StyledTreeItem
                                        nodeId="417"
                                        labelText="Time deal"
                                        labelIcon={AlarmIcon}
                                        color="#1a73e8"
                                        bgColor="#e8f0fe"
                                    />
                                </Link>
                            </StyledTreeItem>
                            <StyledTreeItem
                                nodeId="42"
                                labelText="Promotion type"
                                labelIcon={EmojiSymbolsIcon}
                            >
                                <Link to="/n-plus-one">
                                    <StyledTreeItem
                                        nodeId="421"
                                        labelText="N+1"
                                        labelIcon={RedeemIcon}
                                    />
                                </Link>
                                <Link to="/promotion/discount">
                                    <StyledTreeItem
                                        nodeId="422"
                                        labelText="Discount"
                                        labelIcon={ReceiptIcon}
                                        color="#1a73e8"
                                        bgColor="#e8f0fe"
                                    />
                                </Link>
                                <Link to="/settings-free-shipping">
                                    <StyledTreeItem
                                        nodeId="423"
                                        labelText="Free shipping"
                                        labelIcon={LocalShippingIcon}
                                    />
                                </Link>
                            </StyledTreeItem>
                            <Link to="/stickers">
                                <StyledTreeItem
                                    nodeId="43"
                                    labelText="Stickers"
                                    labelIcon={LoyaltyIcon}
                                />
                            </Link>
                            <Link to="/promotion/popup">
                                <StyledTreeItem
                                    nodeId="44"
                                    labelText="Popup"
                                    labelIcon={VideoLabelIcon}
                                />
                            </Link>
                            <Link to="/exhibition">
                                <StyledTreeItem
                                    nodeId="45"
                                    labelText="Exhibition"
                                    labelIcon={PhotoAlbumIcon}
                                    color="#1a73e8"
                                    bgColor="#e8f0fe"
                                />
                            </Link>
                            <Link to="/marketing-mail-templates">
                                <StyledTreeItem
                                    nodeId="46"
                                    labelText="Marketing mail template"
                                    labelIcon={MailIcon}
                                />
                            </Link>
                            <Link to="/marketing-mail">
                                <StyledTreeItem
                                    nodeId="47"
                                    labelText="Marketing mail"
                                    labelIcon={MailIcon}
                                />
                            </Link>
                            <Link to="/settings/operation/coupon">
                                <StyledTreeItem
                                    nodeId="48"
                                    labelText="Coupon"
                                    labelIcon={ConfirmationNumberIcon}
                                    color="#1a73e8"
                                    bgColor="#e8f0fe"
                                />
                            </Link>
                            <Link to="/settings/operation/auto-coupon">
                                <StyledTreeItem
                                    nodeId="49"
                                    labelText="Auto Coupon"
                                    labelIcon={ConfirmationNumberIcon}
                                    color="#1a73e8"
                                    bgColor="#e8f0fe"
                                />
                            </Link>
                        </StyledTreeItem>
                        <StyledTreeItem
                            nodeId="5"
                            labelText="Membership management"
                            labelIcon={FastfoodIcon}
                        >
                            <Link to="/member-management">
                                <StyledTreeItem
                                    nodeId="51"
                                    labelText="Member management"
                                    labelIcon={GroupIcon}
                                />
                            </Link>
                            <Link to="/consult-management">
                                <StyledTreeItem
                                    nodeId="52"
                                    labelText="1:1"
                                    labelIcon={ForumIcon}
                                />
                            </Link>
                            <StyledTreeItem
                                nodeId="723"
                                labelText="Affiliate"
                                labelIcon={RecentActorsIcon}
                                color="#1a73e8"
                                bgColor="#e8f0fe"
                            >
                                <Link to="/settings/operation/affiliate">
                                    <StyledTreeItem
                                        nodeId="723_1"
                                        labelText="Affiliate list"
                                        labelIcon={SettingsIcon}
                                    ></StyledTreeItem>
                                </Link>
                                <Link to="/settings/operation/affiliate/payment">
                                    <StyledTreeItem
                                        nodeId="723_2"
                                        labelText="Payment"
                                        labelIcon={SettingsIcon}
                                    ></StyledTreeItem>
                                </Link>
                                <Link to="/settings/operation/affiliate-policy/create">
                                    <StyledTreeItem
                                        nodeId="723_3"
                                        labelText="Settlement policy"
                                        labelIcon={SettingsIcon}
                                    ></StyledTreeItem>
                                </Link>
                                <Link to="/settings/operation/affiliate/faq">
                                    <StyledTreeItem
                                        nodeId="723_4"
                                        labelText="FAQ"
                                        labelIcon={SettingsIcon}
                                    ></StyledTreeItem>
                                </Link>
                                <Link to="/settings/operation/affiliate/term">
                                    <StyledTreeItem
                                        nodeId="723_5"
                                        labelText="Terms and conditions"
                                        labelIcon={SettingsIcon}
                                    ></StyledTreeItem>
                                </Link>
                                <Link to="/settings/operation/affiliate/maintenance">
                                    <StyledTreeItem
                                        nodeId="723_6"
                                        labelText="Maintenance mode"
                                        labelIcon={SettingsIcon}
                                    ></StyledTreeItem>
                                </Link>
                            </StyledTreeItem>
                        </StyledTreeItem>
                        <StyledTreeItem
                            nodeId="6"
                            labelText="Order management"
                            labelIcon={MonetizationOnIcon}
                        >
                            <Link to="/orders">
                                <StyledTreeItem
                                    nodeId="61"
                                    labelText="Orders list"
                                    labelIcon={MonetizationOnIcon}
                                    color="#1a73e8"
                                    bgColor="#e8f0fe"
                                />
                            </Link>
                            <Link to="/order/refund">
                                <StyledTreeItem
                                    nodeId="63"
                                    labelText="Refund"
                                    labelIcon={ArrowBackIcon}
                                    color="#1a73e8"
                                    bgColor="#e8f0fe"
                                />
                            </Link>
                        </StyledTreeItem>
                        <StyledTreeItem
                            nodeId="7"
                            labelText="Main settings"
                            labelIcon={SettingsIcon}
                        >
                            <StyledTreeItem
                                nodeId="71"
                                labelText="Page management"
                                labelIcon={SubjectIcon}
                            >
                                {/* Business  */}
                                <Link to="/settings-business">
                                    <StyledTreeItem
                                        nodeId="711"
                                        labelText="아니벌써 기본정보"
                                        labelIcon={BusinessIcon}
                                        color="#1a73e8"
                                        bgColor="#e8f0fe"
                                    />
                                </Link>
                                {/* Term basic settings */}
                                <Link to="/settings-term">
                                    <StyledTreeItem
                                        nodeId="714"
                                        labelText="환경설정"
                                        labelIcon={SubjectIcon}
                                        color="#1a73e8"
                                        bgColor="#e8f0fe"
                                    />
                                </Link>

                                {/* Privacy basic settings */}
                                <Link to="/settings-privacy">
                                    <StyledTreeItem
                                        nodeId="715"
                                        labelText="부가세율 설정"
                                        labelIcon={SubjectIcon}
                                        color="#1a73e8"
                                        bgColor="#e8f0fe"
                                    />
                                </Link>

                                {/* User  basic settings */}
                                <Link to="/settings-user">
                                    <StyledTreeItem
                                        nodeId="716"
                                        labelText="이용/탈퇴 안내"
                                        labelIcon={SubjectIcon}
                                        color="#1a73e8"
                                        bgColor="#e8f0fe"
                                    />
                                </Link>

                                {/* SEO  basic settings */}
                                <Link to="/settings-seo">
                                    <StyledTreeItem
                                        nodeId="717"
                                        labelText="검색엔진 최적화(SEO) 설정"
                                        labelIcon={SearchIcon}
                                        color="#1a73e8"
                                        bgColor="#e8f0fe"
                                    />
                                </Link>

                                {/* Operator management basic settings */}
                                <Link to="/settings-operator">
                                    <StyledTreeItem
                                        nodeId="718"
                                        labelText="운영자 관리"
                                        labelIcon={RecentActorsIcon}
                                        color="#1a73e8"
                                        bgColor="#e8f0fe"
                                    />
                                </Link>                                
                            </StyledTreeItem>

                            <StyledTreeItem
                                nodeId="72"
                                labelText="Operation"
                                labelIcon={LowPriorityIcon}
                            >
                                <Link to="/operators">
                                    <StyledTreeItem
                                        nodeId="721"
                                        labelText="Operator"
                                        labelIcon={RecentActorsIcon}
                                        color="#1a73e8"
                                        bgColor="#e8f0fe"
                                    />
                                </Link>
                                <StyledTreeItem
                                    nodeId="722"
                                    labelText="Partner"
                                    labelIcon={RecentActorsIcon}
                                >
                                    <Link to="/partners">
                                        <StyledTreeItem
                                            nodeId="7221"
                                            labelText="Partner"
                                            labelIcon={RecentActorsIcon}
                                            color="#1a73e8"
                                            bgColor="#e8f0fe"
                                        />
                                    </Link>
                                    <Link to="/partner/history">
                                        <StyledTreeItem
                                            nodeId="7222"
                                            labelText="History"
                                            labelIcon={HistoryIcon}
                                            color="#1a73e8"
                                            bgColor="#e8f0fe"
                                        />
                                    </Link>
                                </StyledTreeItem>
                                <Link to="/settings/operation/affiliate">
                                    <StyledTreeItem
                                        nodeId="723"
                                        labelText="Affiliate"
                                        labelIcon={RecentActorsIcon}
                                        color="#1a73e8"
                                        bgColor="#e8f0fe"
                                    />
                                </Link>

                                {/* Setting shipping */}
                                <Link to="/settings/operation/shipping">
                                    <StyledTreeItem
                                        nodeId="724"
                                        labelText="Shipping fare"
                                        labelIcon={LocalShippingIcon}
                                        color="#1a73e8"
                                        bgColor="#e8f0fe"
                                    />
                                </Link>

                                {/* Setting delivery */}
                                <Link to="/settings/operation/delivery">
                                    <StyledTreeItem
                                        nodeId="725"
                                        labelText="Delivery status"
                                        labelIcon={PublicIcon}
                                        color="#1a73e8"
                                        bgColor="#e8f0fe"
                                    />
                                </Link>

                                {/* Tax */}
                                <Link to="/settings/operation/tax">
                                    <StyledTreeItem
                                        nodeId="726"
                                        labelText="Tax"
                                        labelIcon={LocalAtmIcon}
                                        color="#1a73e8"
                                        bgColor="#e8f0fe"
                                    />
                                </Link>

                                {/* Member */}
                                <Link to="/settings/operation/member">
                                    <StyledTreeItem
                                        nodeId="727"
                                        labelText="Membership"
                                        labelIcon={RecentActorsIcon}
                                        color="#1a73e8"
                                        bgColor="#e8f0fe"
                                    />
                                </Link>

                                <Link to="/settings/operation/points">
                                    <StyledTreeItem
                                        nodeId="728"
                                        labelText="Points"
                                        labelIcon={MoneyIcon}
                                        color="#1a73e8"
                                        bgColor="#e8f0fe"
                                    />
                                </Link>
                                {/* <Link to="/settings/operation/coupon">
                  <StyledTreeItem
                    nodeId="729"
                    labelText="Coupon"
                    labelIcon={ConfirmationNumberIcon}
                    color="#1a73e8"
                    bgColor="#e8f0fe"
                  />
                </Link>
                <Link to="/settings/operation/auto-coupon">
                  <StyledTreeItem
                    nodeId="730"
                    labelText="Auto Coupon"
                    labelIcon={ConfirmationNumberIcon}
                    color="#1a73e8"
                    bgColor="#e8f0fe"
                  />
    </Link> */}
                            </StyledTreeItem>

                            {/* Product basic settings */}
                            <Link to="/settings/product">
                                <StyledTreeItem
                                    nodeId="73"
                                    labelText="Product"
                                    labelIcon={FastfoodIcon}
                                    color="#1a73e8"
                                    bgColor="#e8f0fe"
                                />
                            </Link>

                            {/* Category basic settings */}
                            <Link to="/settings-category">
                                <StyledTreeItem
                                    nodeId="74"
                                    labelText="Category"
                                    labelIcon={MenuIcon}
                                    color="#1a73e8"
                                    bgColor="#e8f0fe"
                                />
                            </Link>

                            <Link to="/settings-membership-management">
                                <StyledTreeItem
                                    nodeId="75"
                                    labelText="Membership management"
                                    labelIcon={RecentActorsIcon}
                                    color="#1a73e8"
                                    bgColor="#e8f0fe"
                                />
                            </Link>
                            <StyledTreeItem
                                nodeId="76"
                                labelText="Mail"
                                labelIcon={MailIcon}
                            >
                                <Link to="/settings-mail-auto">
                                    <StyledTreeItem
                                        nodeId="761"
                                        labelText="Auto Mail"
                                        labelIcon={MailIcon}
                                        color="#1a73e8"
                                        bgColor="#e8f0fe"
                                    />
                                </Link>
                                <Link to="/settings-mail-templates">
                                    <StyledTreeItem
                                        nodeId="762"
                                        labelText="Mail templates"
                                        labelIcon={MailIcon}
                                        color="#1a73e8"
                                        bgColor="#e8f0fe"
                                    />
                                </Link>
                                <Link to="/settings-history">
                                    <StyledTreeItem
                                        nodeId="763"
                                        labelText="Mail history"
                                        labelIcon={MailIcon}
                                        color="#1a73e8"
                                        bgColor="#e8f0fe"
                                    />
                                </Link>
                            </StyledTreeItem>
                        </StyledTreeItem>
                        <StyledTreeItem
                            nodeId="800"
                            labelText="통계관리"
                            labelIcon={ShowChart}
                        >
                            <StyledTreeItem
                                nodeId="810"
                                labelText="방문자 통계"
                                labelIcon={PublicIcon}
                            >
                                {/* <Link to="/google-analytics">
                                    <StyledTreeItem
                                        nodeId="8111"
                                        labelText="방문자 통계 GA"
                                        labelIcon={PublicIcon}
                                    />
                                </Link> */}
                                <Link to="/visits-analysis">
                                    <StyledTreeItem
                                        nodeId="811"
                                        labelText="방문자 통계"
                                        labelIcon={PublicIcon}
                                    />
                                </Link>
                                <Link to="/visits-configuration">
                                    <StyledTreeItem
                                        nodeId="812"
                                        labelText="configuration"
                                        labelIcon={SettingsIcon}
                                    />
                                </Link>
                            </StyledTreeItem>
                            {/* 2021-05-31 일시적인 주석처리 */}
                            <StyledTreeItem
                                nodeId="820"
                                labelText="매출 통계 관리"
                                labelIcon={MoneyIcon}
                            >
                                <Link to="/sales-statistic">
                                    <StyledTreeItem
                                        nodeId="821"
                                        labelText="매출 통계"
                                        labelIcon={MoneyIcon}
                                        color="#1a73e8"
                                        bgColor="#e8f0fe"
                                    />
                                </Link>
                                <Link to="/sales-statistic-by-product">
                                    <StyledTreeItem
                                        nodeId="822"
                                        labelText="상품별 매출 통계"
                                        labelIcon={MoneyIcon}
                                        color="#1a73e8"
                                        bgColor="#e8f0fe"
                                    />
                                </Link>
                                <Link to="/product-analytics">
                                    <StyledTreeItem
                                        nodeId="823"
                                        labelText="상품 분석"
                                        labelIcon={PieChart}
                                        color="#1a73e8"
                                        bgColor="#e8f0fe"
                                    />
                                </Link>
                            </StyledTreeItem>
                            <StyledTreeItem
                                nodeId="830"
                                labelText="회원 통계"
                                labelIcon={GroupIcon}
                            >
                                <Link to="/new-members-statistic">
                                    <StyledTreeItem
                                        nodeId="831"
                                        labelText="신규가입 통계"
                                        labelIcon={GroupIcon}
                                        color="#1a73e8"
                                        bgColor="#e8f0fe"
                                    />
                                </Link>
                                <Link to="/country-statistic">
                                    <StyledTreeItem
                                        nodeId="832"
                                        labelText="지역별 통계"
                                        labelIcon={PublicIcon}
                                        color="#1a73e8"
                                        bgColor="#e8f0fe"
                                    />
                                </Link>
                                <Link to="/age-statistic">
                                    <StyledTreeItem
                                        nodeId="834"
                                        labelText="연령별 통계"
                                        labelIcon={GroupIcon}
                                        color="#1a73e8"
                                        bgColor="#e8f0fe"
                                    />
                                </Link>
                            </StyledTreeItem>

                            <StyledTreeItem
                                nodeId="840"
                                labelText="기타 통계"
                                labelIcon={PieChart}
                            >
                                <Link to="/device-statistic">
                                    <StyledTreeItem
                                        nodeId="841"
                                        labelText="방문자 환경 통계"
                                        labelIcon={PieChart}
                                        color="#1a73e8"
                                        bgColor="#e8f0fe"
                                    />
                                </Link>
                                <Link to="/ranking">
                                    <StyledTreeItem
                                        nodeId="842"
                                        labelText="상품&검색어 순위"
                                        labelIcon={CompareTwoTone}
                                        color="#1a73e8"
                                        bgColor="#e8f0fe"
                                    />
                                </Link>
                            </StyledTreeItem>
                        </StyledTreeItem>
                        <StyledTreeItem
                            nodeId="900"
                            labelText="DOCS"
                            labelIcon={PublicIcon}
                        >
                            <Link to="/docs">
                                <StyledTreeItem
                                    nodeId="910"
                                    labelText="DOCS"
                                    labelIcon={PublicIcon}
                                />
                            </Link>
                            <Link to="/survey">
                                <StyledTreeItem
                                    nodeId="920"
                                    labelText="Survey"
                                    labelIcon={PublicIcon}
                                />
                            </Link>
                        </StyledTreeItem>
                    </TreeView>
                </div>
            </Drawer>
        );

    if (loggedUser === "ROLE_SELLER")
        return (
            <Drawer
                anchor="left"
                classes={{ paper: classes.drawer }}
                onClose={onClose}
                open={open}
                variant={variant}
            >
                <div {...rest} className={clsx(classes.root, className)}>
                    <Profile />
                    <Divider className={classes.divider} />

                    <TreeView
                        className="menu-svgIcon"
                        // defaultExpanded={['3']}
                        defaultCollapseIcon={<ArrowDropDownIcon />}
                        defaultExpandIcon={<ArrowRightIcon />}
                        defaultEndIcon={<div style={{ width: 200 }} />}
                    >
                        <Link to="/dashboard">
                            <StyledTreeItem
                                nodeId="1"
                                labelText="Dashboard"
                                labelIcon={DashboardIcon}
                            />
                        </Link>
                        <Link to="/partner-information">
                            <StyledTreeItem
                                nodeId="2"
                                labelText="Partner 정보"
                                labelIcon={PersonIcon}
                            />
                        </Link>
                        <Link to="/product/create">
                            <StyledTreeItem
                                nodeId="3"
                                // labelText="Product registration"
                                labelText="Partner 상품 등록"
                                labelIcon={StorefrontIcon}
                            />
                        </Link>
                        <StyledTreeItem
                            nodeId="4"
                            // labelText="Product management"
                            labelText="Partner 상품 관리"
                            labelIcon={FastfoodIcon}
                        >
                            <Link to="/partner/product-management/registration-status">
                                <StyledTreeItem
                                    nodeId="5"
                                    // labelText="Registration status"
                                    labelText="상품 등록 현황"
                                    labelIcon={TimelineIcon}
                                    color="#1a73e8"
                                    bgColor="#e8f0fe"
                                />
                            </Link>
                            <Link to="/partner/product-management/warehousing-application">
                                <StyledTreeItem
                                    nodeId="6"
                                    // labelText="Warehousing application"
                                    labelText="창고 관리"
                                    labelIcon={AppsIcon}
                                    color="#1a73e8"
                                    bgColor="#e8f0fe"
                                />
                            </Link>
                            <Link to="/partner/product-management/warehousing-status">
                                <StyledTreeItem
                                    nodeId="7"
                                    // labelText="Warehousing status"
                                    labelText="창고 현황"
                                    labelIcon={AvTimerIcon}
                                    color="#1a73e8"
                                    bgColor="#e8f0fe"
                                />
                            </Link>
                            <Link to="/partner/product-management/restock-application">
                                <StyledTreeItem
                                    nodeId="8"
                                    // labelText="Restock application"
                                    labelText="재입고 관리"
                                    labelIcon={RefreshIcon}
                                    color="#1a73e8"
                                    bgColor="#e8f0fe"
                                />
                            </Link>
                        </StyledTreeItem>
                        <Link to="/partner/sales-status">
                            <StyledTreeItem
                                nodeId="9"
                                // labelText="Sales status and settlement"
                                labelText="판매 현황 및 정산"
                                labelIcon={EqualizerIcon}
                            />
                        </Link>
                        <Link to="/partner/history">
                            <StyledTreeItem
                                nodeId="10"
                                // labelText="Histroy"
                                labelText="정산 목록"
                                labelIcon={EqualizerIcon}
                            />
                        </Link>
                    </TreeView>
                </div>
            </Drawer>
        );
};

Sidebar.propTypes = {
    className: PropTypes.string,
    onClose: PropTypes.func,
    open: PropTypes.bool.isRequired,
    variant: PropTypes.string.isRequired,
};

// Redux state to props
const mapStateToProps = (state) => {
    return {
        apolloClient: state.apolloClient,
        loggedUser: state.loggedUser,
    };
};

export default connect(mapStateToProps, null)(Sidebar);
