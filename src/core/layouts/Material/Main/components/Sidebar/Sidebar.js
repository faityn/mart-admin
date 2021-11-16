import React from "react";
import clsx from "clsx";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { makeStyles, createStyles } from "@material-ui/core/styles";
import { Divider, Drawer } from "@material-ui/core";
import DashboardIcon from "@material-ui/icons/Dashboard";
import CategoryIcon from "@material-ui/icons/Category";
import GroupIcon from "@material-ui/icons/Group";
import { Profile } from "./components";
import TreeView from "@material-ui/lab/TreeView";
import TreeItem from "@material-ui/lab/TreeItem";
import Typography from "@material-ui/core/Typography";
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";
import ArrowRightIcon from "@material-ui/icons/ArrowRight";
import { Link } from "react-router-dom";
import PublishIcon from "@material-ui/icons/Publish";
import SettingsIcon from "@material-ui/icons/Settings";
import RecentActorsIcon from "@material-ui/icons/RecentActors";
import MenuIcon from "@material-ui/icons/Menu";
import FastfoodIcon from "@material-ui/icons/Fastfood";
import BusinessIcon from "@material-ui/icons/Business";
import SubjectIcon from "@material-ui/icons/Subject";
import SearchIcon from "@material-ui/icons/Search";
import PasswordIcon from "@material-ui/icons/Security";

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
                                    color="#1a73e8"
                                    bgColor="#e8f0fe"
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
                            <Link to="/edit-product">
                                <StyledTreeItem
                                    nodeId="9"
                                    labelText="마스터 상품(조회/수정"
                                    labelIcon={MenuIcon}
                                    color="#1a73e8"
                                    bgColor="#e8f0fe"
                                />
                            </Link>
                            <Link to="/product-order">
                                <StyledTreeItem
                                    nodeId="10"
                                    labelText="주문/배송현황"
                                    labelIcon={MenuIcon}
                                    color="#1a73e8"
                                    bgColor="#e8f0fe"
                                />
                            </Link>
                            <Link to="/product-refund">
                                <StyledTreeItem
                                    nodeId="11"
                                    labelText="취소/반품/교환/환불 관리"
                                    labelIcon={MenuIcon}
                                    color="#1a73e8"
                                    bgColor="#e8f0fe"
                                />
                            </Link>
                            <Link to="/supply-management">
                                <StyledTreeItem
                                    nodeId="12"
                                    labelText="공급사(마트) 관리"
                                    labelIcon={MenuIcon}
                                    color="#1a73e8"
                                    bgColor="#e8f0fe"
                                />
                            </Link>
                            <Link to="/product-management">
                                <StyledTreeItem
                                    nodeId="13"
                                    labelText="상품관리"
                                    labelIcon={MenuIcon}
                                    color="#1a73e8"
                                    bgColor="#e8f0fe"
                                />
                            </Link>
                            <Link to="/product-notice">
                                <StyledTreeItem
                                    nodeId="14"
                                    labelText="상품문의"
                                    labelIcon={MenuIcon}
                                    color="#1a73e8"
                                    bgColor="#e8f0fe"
                                />
                            </Link>
                            <Link to="/payment-management-all">
                                <StyledTreeItem
                                    nodeId="15"
                                    labelText="통합정산관리"
                                    labelIcon={MenuIcon}
                                    color="#1a73e8"
                                    bgColor="#e8f0fe"
                                />
                            </Link>
                            <Link to="/payment-management">
                                <StyledTreeItem
                                    nodeId="16"
                                    labelText="정산관리"
                                    labelIcon={MenuIcon}
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

                            {/* Operator role basic settings */}
                            <Link to="/settings-operator-role">
                                <StyledTreeItem
                                    nodeId="719"
                                    labelText="운영자 권한 설정"
                                    labelIcon={RecentActorsIcon}
                                    color="#1a73e8"
                                    bgColor="#e8f0fe"
                                />
                            </Link>               

                            {/* Password search basic settings */}
                            <Link to="/settings-password-search">
                                <StyledTreeItem
                                    nodeId="7120"
                                    labelText="비밀번호 찾기 설정"
                                    labelIcon={SearchIcon}
                                    color="#1a73e8"
                                    bgColor="#e8f0fe"
                                />
                            </Link>         

                            {/* Password reset basic settings */}
                            <Link to="/settings-password-reset">
                                <StyledTreeItem
                                    nodeId="7121"
                                    labelText="비밀번호 변경안내 설정"
                                    labelIcon={PasswordIcon}
                                    color="#1a73e8"
                                    bgColor="#e8f0fe"
                                />
                            </Link> 

                            {/* Login history list */}
                            <Link to="/login-history">
                                <StyledTreeItem
                                    nodeId="7122"
                                    labelText="개인정보접속기록 조회"
                                    labelIcon={SubjectIcon}
                                    color="#1a73e8"
                                    bgColor="#e8f0fe"
                                />
                            </Link>  

                            {/* Product usage guide */}
                            <Link to="/product-usage-guide">
                                <StyledTreeItem
                                    nodeId="7123"
                                    labelText="상품 상세 이용안내 관리"
                                    labelIcon={SubjectIcon}
                                    color="#1a73e8"
                                    bgColor="#e8f0fe"
                                />
                            </Link>    

                            {/* Order configuration */}
                            <Link to="/order-config">
                                <StyledTreeItem
                                    nodeId="7124"
                                    labelText="주문 기본 설정"
                                    labelIcon={SettingsIcon}
                                    color="#1a73e8"
                                    bgColor="#e8f0fe"
                                />
                            </Link>  

                            {/* SMS configuration */}
                            <Link to="/sms-config">
                                <StyledTreeItem
                                    nodeId="7125"
                                    labelText="SMS 설정"
                                    labelIcon={SettingsIcon}
                                    color="#1a73e8"
                                    bgColor="#e8f0fe"
                                />
                            </Link>  

                            {/* 080 unsubcribe list */}
                            <Link to="/unsubscribe-list">
                                <StyledTreeItem
                                    nodeId="7126"
                                    labelText="080 수신거부 리스트"
                                    labelIcon={SubjectIcon}
                                    color="#1a73e8"
                                    bgColor="#e8f0fe"
                                />
                            </Link>  
                        </StyledTreeItem>
                        <StyledTreeItem
                            nodeId="1000"
                            labelText="회원관리"
                            labelIcon={GroupIcon}
                        >
                            <Link to="/user-notice">
                                <StyledTreeItem
                                    nodeId="1010"
                                    labelText="게시판 리스트"
                                    labelIcon={GroupIcon}
                                />
                            </Link>
                            <Link to="/user-question">
                                <StyledTreeItem
                                    nodeId="1020"
                                    labelText="상품문의"
                                    labelIcon={GroupIcon}
                                />
                            </Link>
                            <Link to="/user-faq">
                                <StyledTreeItem
                                    nodeId="1030"
                                    labelText="게시판 FAQ 관리"
                                    labelIcon={GroupIcon}
                                />
                            </Link>
                            <Link to="/user-review">
                                <StyledTreeItem
                                    nodeId="1040"
                                    labelText="리뷰관리"
                                    labelIcon={GroupIcon}
                                />
                            </Link>
                        </StyledTreeItem>
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
