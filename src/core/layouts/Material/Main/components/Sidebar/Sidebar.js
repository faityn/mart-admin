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
                labelText="????????????"
                labelIcon={DashboardIcon}
              />
            </Link>

            <StyledTreeItem
              nodeId="1"
              labelText="????????????"
              labelIcon={SettingsIcon}
            >
              <StyledTreeItem
                nodeId="111"
                labelText="????????????"
                labelIcon={SettingsIcon}
              >
                {/* General information */}
                <Link to="/general-information">
                  <StyledTreeItem
                    nodeId="1111"
                    labelText="?????? ?????? ??????"
                    labelIcon={MenuIcon}
                    color="#1a73e8"
                    bgColor="#e8f0fe"
                  />
                </Link>
              </StyledTreeItem>

              <StyledTreeItem
                nodeId="122"
                labelText="????????????"
                labelIcon={SettingsIcon}
              >
                <Link to="/user-list">
                  <StyledTreeItem
                    nodeId="1221"
                    labelText="????????? ??????"
                    labelIcon={MenuIcon}
                    color="#1a73e8"
                    bgColor="#e8f0fe"
                  />
                </Link>

                <Link to="/operator-role">
                  <StyledTreeItem
                    nodeId="1222"
                    labelText="????????? ?????? ??????"
                    labelIcon={MenuIcon}
                    color="#1a73e8"
                    bgColor="#e8f0fe"
                  />
                </Link>
                {/* 
                                <Link>
                                    <StyledTreeItem
                                        nodeId="1223"
                                        labelText="???????????? ??????/??????"
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
              labelText="????????????"
              labelIcon={ProductIcon}
            >
              <StyledTreeItem
                nodeId="211"
                labelText="?????? ?????????"
                labelIcon={ProductIcon}
                color="#1a73e8"
                bgColor="#e8f0fe"
              >
                <Link to="/product-management">
                  <StyledTreeItem
                    nodeId="2111"
                    labelText="????????? ?????? ?????????"
                    labelIcon={MenuIcon}
                    color="#1a73e8"
                    bgColor="#e8f0fe"
                  />
                </Link>
                <Link to="/market-product">
                  <StyledTreeItem
                    nodeId="2112"
                    labelText="????????? ?????? ????????????/??????"
                    labelIcon={MenuIcon}
                    color="#1a73e8"
                    bgColor="#e8f0fe"
                  />
                </Link>
              </StyledTreeItem>

              <Link>
                <StyledTreeItem
                  nodeId="222"
                  labelText="?????? ????????????"
                  labelIcon={ProductIcon}
                  color="#1a73e8"
                  bgColor="#e8f0fe"
                />
              </Link>
            </StyledTreeItem>

            <StyledTreeItem
              nodeId="3"
              labelText="??????/??????"
              labelIcon={OrderIcon}
            >
              <StyledTreeItem
                nodeId="311"
                labelText="????????????"
                labelIcon={OrderIcon}
                color="#1a73e8"
                bgColor="#e8f0fe"
              >
                <Link to="/product-order-all">
                  <StyledTreeItem
                    nodeId="3111"
                    labelText="?????????????????????"
                    labelIcon={MenuIcon}
                    color="#1a73e8"
                    bgColor="#e8f0fe"
                  />
                </Link>
                <Link to="/product-order-new">
                  <StyledTreeItem
                    nodeId="3112"
                    labelText="????????????"
                    labelIcon={MenuIcon}
                    color="#1a73e8"
                    bgColor="#e8f0fe"
                  />
                </Link>
                <Link to="/product-order-prepare">
                  <StyledTreeItem
                    nodeId="3113"
                    labelText="?????? ?????????"
                    labelIcon={MenuIcon}
                    color="#1a73e8"
                    bgColor="#e8f0fe"
                  />
                </Link>
                <Link to="/product-order-shipping">
                  <StyledTreeItem
                    nodeId="3114"
                    labelText="?????????"
                    labelIcon={MenuIcon}
                    color="#1a73e8"
                    bgColor="#e8f0fe"
                  />
                </Link>
                <Link to="/product-order-delivered">
                  <StyledTreeItem
                    nodeId="3115"
                    labelText="????????????"
                    labelIcon={MenuIcon}
                    color="#1a73e8"
                    bgColor="#e8f0fe"
                  />
                </Link>
                <Link to="/product-order-purchased">
                  <StyledTreeItem
                    nodeId="3116"
                    labelText="????????????"
                    labelIcon={MenuIcon}
                    color="#1a73e8"
                    bgColor="#e8f0fe"
                  />
                </Link>
              </StyledTreeItem>

              <StyledTreeItem
                nodeId="322"
                labelText="??????/??????/????????????"
                labelIcon={OrderIcon}
                color="#1a73e8"
                bgColor="#e8f0fe"
              >
                <Link to="/product-order-exchanged">
                  <StyledTreeItem
                    nodeId="3221"
                    labelText="?????? ?????????"
                    labelIcon={MenuIcon}
                    color="#1a73e8"
                    bgColor="#e8f0fe"
                  />
                </Link>
                <Link to="/product-order-returned">
                  <StyledTreeItem
                    nodeId="3222"
                    labelText="?????? ?????????"
                    labelIcon={MenuIcon}
                    color="#1a73e8"
                    bgColor="#e8f0fe"
                  />
                </Link>
                <Link to="/product-order-refunded">
                  <StyledTreeItem
                    nodeId="3223"
                    labelText="?????? ?????????"
                    labelIcon={MenuIcon}
                    color="#1a73e8"
                    bgColor="#e8f0fe"
                  />
                </Link>
              </StyledTreeItem>
            </StyledTreeItem>

            <StyledTreeItem
              nodeId="4"
              labelText="?????????"
              labelIcon={NoticeIcon}
            >
              <Link to="/notice-list">
                <StyledTreeItem
                  nodeId="411"
                  labelText="???????????? ??????"
                  labelIcon={MenuIcon}
                />
              </Link>
              <Link to="/one-to-one">
                <StyledTreeItem
                  nodeId="422"
                  labelText="1:1 ????????????"
                  labelIcon={MenuIcon}
                />
              </Link>
            </StyledTreeItem>

            <StyledTreeItem
              nodeId="5"
              labelText="??????"
              labelIcon={CalculateIcon}
            >
              <StyledTreeItem
                nodeId="511"
                labelText="????????????"
                labelIcon={CalculateIcon}
                color="#1a73e8"
                bgColor="#e8f0fe"
              >
                <Link>
                  <StyledTreeItem
                    nodeId="5111"
                    labelText="?????? ??????"
                    labelIcon={MenuIcon}
                  />
                </Link>
                <Link>
                  <StyledTreeItem
                    nodeId="5112"
                    labelText="?????? ?????? ??????"
                    labelIcon={MenuIcon}
                  />
                </Link>
                <Link>
                  <StyledTreeItem
                    nodeId="5113"
                    labelText="?????? ?????? ?????? ??????"
                    labelIcon={MenuIcon}
                  />
                </Link>
                <Link>
                  <StyledTreeItem
                    nodeId="5114"
                    labelText="????????? ?????? ??????"
                    labelIcon={MenuIcon}
                  />
                </Link>
                <Link>
                  <StyledTreeItem
                    nodeId="5115"
                    labelText="??????????????? ??????"
                    labelIcon={MenuIcon}
                  />
                </Link>
              </StyledTreeItem>

              <StyledTreeItem
                nodeId="522"
                labelText="?????? ??? ??????"
                labelIcon={CalculateIcon}
                color="#1a73e8"
                bgColor="#e8f0fe"
              >
                <Link to="/product-refund">
                  <StyledTreeItem
                    nodeId="5221"
                    labelText="?????? ??? ?????? ?????? ?????? ??????"
                    labelIcon={MenuIcon}
                  />
                </Link>
                <Link to="/shipping-refund">
                  <StyledTreeItem
                    nodeId="5222"
                    labelText="?????? ??? ????????? ?????? ??????"
                    labelIcon={MenuIcon}
                  />
                </Link>
              </StyledTreeItem>

              <StyledTreeItem
                nodeId="533"
                labelText="?????????????????????"
                labelIcon={CalculateIcon}
                color="#1a73e8"
                bgColor="#e8f0fe"
              >
                <Link to="/tax-invoice">
                  <StyledTreeItem
                    nodeId="5331"
                    labelText="???????????? ?????????"
                    labelIcon={MenuIcon}
                  />
                </Link>
              </StyledTreeItem>
            </StyledTreeItem>

            <Link to="/register-mart">
              <StyledTreeItem
                nodeId="6"
                labelText="?????? ??????"
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
