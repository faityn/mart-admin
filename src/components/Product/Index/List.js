import React from "react";
import { GET_PRODUCTS } from "../Queries";
import ZoomInIcon from "@material-ui/icons/ZoomIn";
import ZoomOutIcon from "@material-ui/icons/ZoomOut";
import AddIcon from "@material-ui/icons/Add";
import FastfoodIcon from "@material-ui/icons/Fastfood";
import ProductTable from "./Table";
import ProductSearch from "./Search";
import BaseList from "../../../core/common/List";
import PageTitle from "../../../core/common/Partials/PageTitle";
import { Grid, Switch, FormControlLabel, Button } from "@material-ui/core";
import { Link } from "react-router-dom";

/**
 * @summary Product list
 * @version 1.0
 * @author Batbayar Tuuchintav <coder.batbayar@gmail.com>
 * @package Product
 */
class List extends BaseList {
  /**
   * @constructor
   */
  constructor(props) {
    super(props);

    // Merge search states
    this.state = Object.assign(this.state, {
      search: {
        name: "",
        firstCategory: "",
        secondCategory: "",
        thirdCategory: "",
        sticker: null,
        isDisplay: null,
        isAdmin: true,
        registrant: "",
      },
      orderBy: "updated_date",
      type: "DESC",
    });

    // Override
    this.query = GET_PRODUCTS;
    this.table = ProductTable;

    // Bind
    this.handleCategory = this.handleCategory.bind(this);
    this.handleSticker = this.handleSticker.bind(this);
    this.handleDisplay = this.handleDisplay.bind(this);
    this.handleRegistrant = this.handleRegistrant.bind(this);
    this.onDisplayOnOff = this.onDisplayOnOff.bind(this);
    this.onReset = this.onReset.bind(this);
  }

  /**
   * @summary Search
   * @param {String} childrenName
   * @param {String} childrenState
   */
  search(childrenName, childrenState) {
    this.setState({
      search: {
        name: childrenState.search.name ? childrenState.search.name : null,
        sku: childrenState.search.sku ? childrenState.search.sku : null,
        firstCategory: this.state.search.firstCategory,
        secondCategory: this.state.search.secondCategory,
        thirdCategory: this.state.search.thirdCategory,
        isDisplay: this.state.search.isDisplay,
        isAdmin: true,
        registrant: this.state.search.registrant,
      },
    });
  }

  /**
   * @summary SearchByCategory
   * @param {MouseEvent} event
   */
  handleCategory(event, level) {
    event.preventDefault();

    if (level === 1) {
      if (event.target.value) {
        this.setState({
          search: {
            name: this.state.search.name,
            firstCategory: this.state.search.firstCategory,
            secondCategory: event.target.value,
            thirdCategory: this.state.search.thirdCategory,
            sticker: this.state.search.sticker,
            isDisplay: this.state.search.isDisplay,
            isAdmin: true,
            registrant: this.state.search.registrant,
          },
        });
      } else {
        this.setState({
          search: {
            name: this.state.search.name,
            firstCategory: this.state.search.firstCategory,
            secondCategory: null,
            thirdCategory: null,
            sticker: this.state.search.sticker,
            isDisplay: this.state.search.isDisplay,
            isAdmin: true,
            registrant: this.state.search.registrant,
          },
        });
      }
    } else if (level === 2) {
      this.setState({
        search: {
          name: this.state.search.name,
          firstCategory: this.state.search.firstCategory,
          secondCategory: this.state.search.secondCategory,
          thirdCategory: event.target.value,
          sticker: this.state.search.sticker,
          isDisplay: this.state.search.isDisplay,
          isAdmin: true,
          registrant: this.state.search.registrant,
        },
      });
    } else {
      if (event.target.value) {
        this.setState({
          search: {
            name: this.state.search.name,
            firstCategory: event.target.value,
            secondCategory: this.state.search.secondCategory,
            thirdCategory: this.state.search.thirdCategory,
            sticker: this.state.search.sticker,
            isDisplay: this.state.search.isDisplay,
            isAdmin: true,
            registrant: this.state.search.registrant,
          },
        });
      } else {
        this.setState({
          search: {
            name: this.state.search.name,
            firstCategory: null,
            secondCategory: null,
            thirdCategory: null,
            sticker: this.state.search.sticker,
            isDisplay: this.state.search.isDisplay,
            isAdmin: true,
            registrant: this.state.search.registrant,
          },
        });
      }
    }
  }

  /**
   * @summary handleSelectOne
   * @param {int} id
   */
  handleSticker(event, id) {
    let sticker = this.state.search.sticker ? this.state.search.sticker : [];
    const selectedIndex = sticker.indexOf(id);
    let newStickerIds = [];

    if (selectedIndex === -1) {
      newStickerIds = newStickerIds.concat(sticker, id);
    } else if (selectedIndex === 0) {
      newStickerIds = newStickerIds.concat(sticker.slice(1));
    } else if (selectedIndex === sticker.length - 1) {
      newStickerIds = newStickerIds.concat(sticker.slice(0, -1));
    } else if (selectedIndex > 0) {
      newStickerIds = newStickerIds.concat(
        sticker.slice(0, selectedIndex),
        sticker.slice(selectedIndex + 1)
      );
    }
    if (sticker.length >= 0) {
      this.setState({
        search: {
          name: this.state.search.name,
          firstCategory: this.state.search.firstCategory,
          secondCategory: this.state.search.secondCategory,
          thirdCategory: this.state.search.thirdCategory,
          isDisplay: this.state.search.isDisplay,
          sticker: newStickerIds,
          isAdmin: true,
          registrant: this.state.search.registrant,
        },
      });
    } else if (sticker.length === 0) {
      this.setState({
        search: {
          name: this.state.search.name,
          firstCategory: this.state.search.firstCategory,
          secondCategory: this.state.search.secondCategory,
          thirdCategory: this.state.search.thirdCategory,
          isDisplay: this.state.search.isDisplay,
          sticker: "null",
          isAdmin: true,
          registrant: this.state.search.registrant,
        },
      });
    }
  }

  /**
   * @summary handleSelectOne
   * @param {int} id
   */
  handleDisplay(event) {
    this.setState({
      search: {
        name: this.state.search.name,
        firstCategory: this.state.search.firstCategory,
        secondCategory: this.state.search.secondCategory,
        thirdCategory: this.state.search.thirdCategory,
        sticker: this.state.search.sticker,
        isDisplay: event.target.value ? event.target.value : null,
        isAdmin: true,
        registrant: this.state.search.registrant,
      },
    });
  }

  /**
   * @summary handle registrant
   * @param {int} id
   */
  handleRegistrant(event) {
    this.setState({
      search: {
        name: this.state.search.name,
        firstCategory: this.state.search.firstCategory,
        secondCategory: this.state.search.secondCategory,
        thirdCategory: this.state.search.thirdCategory,
        sticker: this.state.search.sticker,
        isDisplay: this.state.search.isDisplay,
        isAdmin: true,
        registrant: event.target.value ? event.target.value : "",
      },
    });
  }

  /**
   * @summary onDisplayOnOff
   * @param {Boolean} true
   */
  onDisplayOnOff(event) {
    this.setState({
      search: {
        name: this.state.search.name,
        firstCategory: this.state.search.firstCategory,
        secondCategory: this.state.search.secondCategory,
        thirdCategory: this.state.search.thirdCategory,
        sticker: this.state.search.sticker,
        isDisplay: event.target.checked ? event.target.checked : null,
        isAdmin: true,
        registrant: this.state.search.registrant,
      },
    });
  }

  /**
   * @summary onReset
   * @param {MouseEvent} event
   */
  onReset(event) {
    this.setState({
      search: {
        name: "",
        firstCategory: "",
        secondCategory: "",
        thirdCategory: "",
        sticker: null,
        isDisplay: null,
        isAdmin: true,
        registrant: "",
      },
    });
  }

  /**
   * @override
   */
  render() {
    return (
      <React.Fragment>
        <Grid container>
          {/* Title section */}
          <Grid item xs={6}>
            <PageTitle
              menuName="Products"
              title="Product list"
              icon={<FastfoodIcon />}
            />
          </Grid>

          {/* Button section */}
          <Grid item xs={6} className="text-right">
            {/* Display on/off */}
            <FormControlLabel
              control={
                <Switch
                  name="checkedB"
                  color="primary"
                  onChange={this.onDisplayOnOff}
                />
              }
              label="Display On/Off"
            />

            {/* Search */}
            <Button
              variant="contained"
              color="default"
              size="small"
              startIcon={
                this.state.isShowSearchPanel ? <ZoomOutIcon /> : <ZoomInIcon />
              }
              onClick={this.toggleSearchPanel}
            >
              Search
            </Button>

            {/* Create */}
            <Link to="/product/create">
              <Button
                variant="contained"
                color="primary"
                size="small"
                startIcon={<AddIcon />}
                className="ml-20"
              >
                New Product
              </Button>
            </Link>
          </Grid>
        </Grid>

        {/* List section */}
        <div className="mt-20">
          {/* Search div */}
          {this.state.isShowSearchPanel ? (
            <div className="card">
              <ProductSearch
                search={this.state.search}
                searchWord={this.search}
                handleCategory={this.handleCategory}
                handleSticker={this.handleSticker}
                handleDisplay={this.handleDisplay}
                handleRegistrant={this.handleRegistrant}
                onReset={this.onReset}
              />
            </div>
          ) : null}

          {/* List */}
          {this.executeQuery()}
        </div>
      </React.Fragment>
    );
  }
}

export default List;
