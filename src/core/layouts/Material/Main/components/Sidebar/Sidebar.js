import React from "react";
import clsx from "clsx";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Profile } from "./components";
import { makeStyles, createStyles } from "@material-ui/core/styles";
import { Divider, Drawer } from "@material-ui/core";
import { Link } from "react-router-dom";
import DashboardIcon from "@material-ui/icons/Dashboard";
import OrderIcon from "@material-ui/icons/FormatListBulleted";
import CalculateIcon from "@material-ui/icons/SquareFoot";
import NoticeIcon from "@material-ui/icons/Announcement";
import TreeView from "@material-ui/lab/TreeView";
import TreeItem from "@material-ui/lab/TreeItem";
import Typography from "@material-ui/core/Typography";
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";
import ArrowRightIcon from "@material-ui/icons/ArrowRight";
import SettingsIcon from "@material-ui/icons/Settings";
import MenuIcon from "@material-ui/icons/Menu";
import ProductIcon from "@material-ui/icons/ViewComfy";
import MartRegistrationIcon from "@material-ui/icons/Storefront";

/**
 * @template useStyles
 */
const useStyles = makeStyles((theme) => ({
  drawer: {
    width: 320,
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

const Sidebar = (props) => {
  const { open, variant, onClose, className, ...rest } = props;

  const classes = useStyles();

  const loggedUser = props.loggedUser.roleName
    ? props.loggedUser.roleName
    : null;

  if (!loggedUser) return null;

  if (loggedUser === "ROLE_MARKET")
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
                nodeId="0"
                labelText="대시보드"
                labelIcon={DashboardIcon}
              />
            </Link>

            <StyledTreeItem
              nodeId="1"
              labelText="기본설정"
              labelIcon={SettingsIcon}
            >
              <StyledTreeItem
                nodeId="111"
                labelText="기본설정"
                labelIcon={SettingsIcon}
              >
                {/* General information */}
                <Link to="/general-information">
                  <StyledTreeItem
                    nodeId="1111"
                    labelText="기본 정보 설정"
                    labelIcon={MenuIcon}
                    color="#1a73e8"
                    bgColor="#e8f0fe"
                  />
                </Link>
              </StyledTreeItem>

              <StyledTreeItem
                nodeId="122"
                labelText="관리정책"
                labelIcon={SettingsIcon}
              >
                <Link to="/user-list">
                  <StyledTreeItem
                    nodeId="1221"
                    labelText="운영자 관리"
                    labelIcon={MenuIcon}
                    color="#1a73e8"
                    bgColor="#e8f0fe"
                  />
                </Link>

                <Link to="/operator-role">
                  <StyledTreeItem
                    nodeId="1222"
                    labelText="운영자 권한 설정"
                    labelIcon={MenuIcon}
                    color="#1a73e8"
                    bgColor="#e8f0fe"
                  />
                </Link>
                {/* 
                                <Link>
                                    <StyledTreeItem
                                        nodeId="1223"
                                        labelText="비밀번호 찾기/변경"
                                        labelIcon={MenuIcon}
                                        color="#1a73e8"
                                        bgColor="#e8f0fe"
                                    />
                                </Link>
                                */}
              </StyledTreeItem>
            </StyledTreeItem>

            <StyledTreeItem
              nodeId="2"
              labelText="상품관리"
              labelIcon={ProductIcon}
            >
              <StyledTreeItem
                nodeId="211"
                labelText="상품 리스트"
                labelIcon={ProductIcon}
                color="#1a73e8"
                bgColor="#e8f0fe"
              >
                <Link to="/product-management">
                  <StyledTreeItem
                    nodeId="2111"
                    labelText="마스터 상품 리스트"
                    labelIcon={MenuIcon}
                    color="#1a73e8"
                    bgColor="#e8f0fe"
                  />
                </Link>
                <Link to="/market-product">
                  <StyledTreeItem
                    nodeId="2112"
                    labelText="마스터 상품 불러오기/수정"
                    labelIcon={MenuIcon}
                    color="#1a73e8"
                    bgColor="#e8f0fe"
                  />
                </Link>
              </StyledTreeItem>

              <Link>
                <StyledTreeItem
                  nodeId="222"
                  labelText="상품 노출관리"
                  labelIcon={ProductIcon}
                  color="#1a73e8"
                  bgColor="#e8f0fe"
                />
              </Link>
            </StyledTreeItem>

            <StyledTreeItem
              nodeId="3"
              labelText="주문/배송"
              labelIcon={OrderIcon}
            >
              <StyledTreeItem
                nodeId="311"
                labelText="주문관리"
                labelIcon={OrderIcon}
                color="#1a73e8"
                bgColor="#e8f0fe"
              >
                <Link to="/product-order-all">
                  <StyledTreeItem
                    nodeId="3111"
                    labelText="주문통합리스트"
                    labelIcon={MenuIcon}
                    color="#1a73e8"
                    bgColor="#e8f0fe"
                  />
                </Link>
                <Link to="/product-order-new">
                  <StyledTreeItem
                    nodeId="3112"
                    labelText="신규주문"
                    labelIcon={MenuIcon}
                    color="#1a73e8"
                    bgColor="#e8f0fe"
                  />
                </Link>
                <Link to="/product-order-prepare">
                  <StyledTreeItem
                    nodeId="3113"
                    labelText="상품 준비중"
                    labelIcon={MenuIcon}
                    color="#1a73e8"
                    bgColor="#e8f0fe"
                  />
                </Link>
                <Link to="/product-order-shipping">
                  <StyledTreeItem
                    nodeId="3114"
                    labelText="배송중"
                    labelIcon={MenuIcon}
                    color="#1a73e8"
                    bgColor="#e8f0fe"
                  />
                </Link>
                <Link to="/product-order-delivered">
                  <StyledTreeItem
                    nodeId="3115"
                    labelText="배송완료"
                    labelIcon={MenuIcon}
                    color="#1a73e8"
                    bgColor="#e8f0fe"
                  />
                </Link>
                <Link to="/product-order-purchased">
                  <StyledTreeItem
                    nodeId="3116"
                    labelText="구매확정"
                    labelIcon={MenuIcon}
                    color="#1a73e8"
                    bgColor="#e8f0fe"
                  />
                </Link>
              </StyledTreeItem>

              <StyledTreeItem
                nodeId="322"
                labelText="교환/반품/환불관리"
                labelIcon={OrderIcon}
                color="#1a73e8"
                bgColor="#e8f0fe"
              >
                <Link to="/product-order-exchanged">
                  <StyledTreeItem
                    nodeId="3221"
                    labelText="교환 리스트"
                    labelIcon={MenuIcon}
                    color="#1a73e8"
                    bgColor="#e8f0fe"
                  />
                </Link>
                <Link to="/product-order-returned">
                  <StyledTreeItem
                    nodeId="3222"
                    labelText="반품 리스트"
                    labelIcon={MenuIcon}
                    color="#1a73e8"
                    bgColor="#e8f0fe"
                  />
                </Link>
                <Link to="/product-order-refunded">
                  <StyledTreeItem
                    nodeId="3223"
                    labelText="환불 리스트"
                    labelIcon={MenuIcon}
                    color="#1a73e8"
                    bgColor="#e8f0fe"
                  />
                </Link>
              </StyledTreeItem>
            </StyledTreeItem>

            <StyledTreeItem
              nodeId="4"
              labelText="게시글"
              labelIcon={NoticeIcon}
            >
              <Link to="/notice-list">
                <StyledTreeItem
                  nodeId="411"
                  labelText="공지사항 보기"
                  labelIcon={MenuIcon}
                />
              </Link>
              <Link to="/one-to-one">
                <StyledTreeItem
                  nodeId="422"
                  labelText="1:1 문의하기"
                  labelIcon={MenuIcon}
                />
              </Link>
            </StyledTreeItem>

            <StyledTreeItem
              nodeId="5"
              labelText="정산"
              labelIcon={CalculateIcon}
            >
              <StyledTreeItem
                nodeId="511"
                labelText="정산관리"
                labelIcon={CalculateIcon}
                color="#1a73e8"
                bgColor="#e8f0fe"
              >
                <Link>
                  <StyledTreeItem
                    nodeId="5111"
                    labelText="정산 현황"
                    labelIcon={MenuIcon}
                  />
                </Link>
                <Link>
                  <StyledTreeItem
                    nodeId="5112"
                    labelText="수기 정산 요청"
                    labelIcon={MenuIcon}
                  />
                </Link>
                <Link>
                  <StyledTreeItem
                    nodeId="5113"
                    labelText="주문 상품 정산 요청"
                    labelIcon={MenuIcon}
                  />
                </Link>
                <Link>
                  <StyledTreeItem
                    nodeId="5114"
                    labelText="배송비 정산 요청"
                    labelIcon={MenuIcon}
                  />
                </Link>
                <Link>
                  <StyledTreeItem
                    nodeId="5115"
                    labelText="부가세신고 내역"
                    labelIcon={MenuIcon}
                  />
                </Link>
              </StyledTreeItem>

              <StyledTreeItem
                nodeId="522"
                labelText="정산 후 환불"
                labelIcon={CalculateIcon}
                color="#1a73e8"
                bgColor="#e8f0fe"
              >
                <Link to="/product-refund">
                  <StyledTreeItem
                    nodeId="5221"
                    labelText="정산 후 주문 상품 환불 정산"
                    labelIcon={MenuIcon}
                  />
                </Link>
                <Link to="/shipping-refund">
                  <StyledTreeItem
                    nodeId="5222"
                    labelText="정산 후 배송비 환불 정산"
                    labelIcon={MenuIcon}
                  />
                </Link>
              </StyledTreeItem>

              <StyledTreeItem
                nodeId="533"
                labelText="전자세금계산서"
                labelIcon={CalculateIcon}
                color="#1a73e8"
                bgColor="#e8f0fe"
              >
                <Link to="/tax-invoice">
                  <StyledTreeItem
                    nodeId="5331"
                    labelText="발행내역 리스트"
                    labelIcon={MenuIcon}
                  />
                </Link>
              </StyledTreeItem>
            </StyledTreeItem>

            <Link to="/register-mart">
              <StyledTreeItem
                nodeId="6"
                labelText="마트 등록"
                labelIcon={MartRegistrationIcon}
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
