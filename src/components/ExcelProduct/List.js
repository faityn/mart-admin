import React from "react";
import PageTitle from "../../core/common/Partials/PageTitle";
import { Grid, Button, Divider, CircularProgress } from "@material-ui/core";
import {
  ExcelExport,
  ExcelExportColumn,
} from "@progress/kendo-react-excel-export";
import axios from "axios";
import { DropzoneArea } from "material-ui-dropzone";
import ImportExportIcon from "@material-ui/icons/ImportExport";
import { withSnackbar } from "notistack";
import fileDownload from "js-file-download";
import PublishIcon from "@material-ui/icons/Publish";
import SaveIcon from "@material-ui/icons/Save";

/**
 * @summary Product Excel
 * @version 1.0
 * @author Batbayar Tuuchintav <coder.batbayar@gmail.com>
 * @package ExcelProduct
 */
class List extends React.Component {
  /**
   * @constructor
   */
  constructor(props) {
    super(props);

    // Default
    this.state = {
      open: false,
      uploadProducts: null,
      priceAndInventory: null,
      name: null,
      isProcessing: false,
      isLoading: false,
    };

    this.token = localStorage.getItem(process.env.REACT_ACCESS_TOKEN_NAME);

    // Event
    this.onHandleSubmit = this.onHandleSubmit.bind(this);
    this.onDrop = this.onDrop.bind(this);
  }

  _exporter;
  export = () => {
    this._exporter.save();
  };

  /**
   * @summary Handle submit form
   * @param {MouseEvent} event
   */
  async onHandleSubmit(event) {
    event.preventDefault();

    let uploadProducts = this.state.uploadProducts
      ? this.state.uploadProducts[0]
      : null;
    let priceAndInventory = this.state.priceAndInventory
      ? this.state.priceAndInventory[0]
      : null;

      let name = this.state.name
      ? this.state.name[0]
      : null;


    if (this.state.isProcessing) return;

    // Form data
    const formData = new FormData();

    this.setState({
      isProcessing: true,
    });

    this.props.enqueueSnackbar("The saving process is being started ...", {
      variant: "info",
    });

    if (uploadProducts !== null) {
      let url = process.env.REACT_APP_DOMAIN + "/import/products";
      formData.append("file", uploadProducts);

      await axios({
        url: url,
        method: "POST",
        headers: {
          "Content-Type": "multipart/form-data",
          authorization: this.token ? `Bearer ${this.token}` : "",
        },
        data: formData,
      })
        .then((response) => {
          console.log(response);
          if (response.status === 200) {
            this.props.enqueueSnackbar(response.data, {
              variant: "success",
            });
          } else {
            this.props.enqueueSnackbar(response.data, {
              variant: "error",
            });
          }
        })
        .catch((error) => {
          this.props.enqueueSnackbar(error.response.data.message, {
            variant: "error",
          });
        });
    }

    if (priceAndInventory !== null) {
      let url = process.env.REACT_APP_DOMAIN + "/import/inventoryPrice";
      formData.append("file", priceAndInventory);

      await axios({
        url: url,
        method: "POST",
        headers: {
          authorization: this.token ? `Bearer ${this.token}` : "",
        },
        data: formData,
      })
        .then((response) => {
          if (response.data === "FAILURE") {
            this.props.enqueueSnackbar(
              "Sorry, there is an error in excel file.",
              { variant: "error" }
            );
          } else if (response.data === "SUCCESS") {
            this.props.enqueueSnackbar(
              "Product has been successfully uploaded.",
              { variant: "success" }
            );
          } else if (response.data === "SHEET DOESNT EXISTS") {
            this.props.enqueueSnackbar(
              "Sorry, there is an error in excel sheet.",
              { variant: "error" }
            );
          }
        })
        .catch((error) => {
          this.props.enqueueSnackbar(
            "Sorry, there is an error occurred while fetching data.",
            { variant: "error" }
          );
        });
    }

    if (name !== null) {
      let url = process.env.REACT_APP_DOMAIN + "/import/name";
      formData.append("file", name);

      await axios({
        url: url,
        method: "POST",
        headers: {
          authorization: this.token ? `Bearer ${this.token}` : "",
        },
        data: formData,
      })
        .then((response) => {
          if (response.data === "FAILURE") {
            this.props.enqueueSnackbar(
              "Sorry, there is an error in excel file.",
              { variant: "error" }
            );
          } else if (response.data === "SUCCESS") {
            this.props.enqueueSnackbar(
              "Product has been successfully uploaded.",
              { variant: "success" }
            );
          } else if (response.data === "SHEET DOESNT EXISTS") {
            this.props.enqueueSnackbar(
              "Sorry, there is an error in excel sheet.",
              { variant: "error" }
            );
          }
        })
        .catch((error) => {
          this.props.enqueueSnackbar(
            "Sorry, there is an error occurred while fetching data.",
            { variant: "error" }
          );
        });
    }

    if (uploadProducts === null && priceAndInventory === null && name === null) {
      this.props.enqueueSnackbar("Sorry, there is no excel file", {
        variant: "error",
      });
    }

    this.setState({
      isProcessing: false,
    });
  }

  /**
   * @summary On drop files
   * @param {Array} files
   * @param {String} uploadFrom
   */
  async onDrop(files, uploadFrom) {
    if (uploadFrom === "product") {
      this.setState({
        uploadProducts: files,
      });
    }

    if (uploadFrom === "priceAndInventory") {
      this.setState({
        priceAndInventory: files,
      });
    }

    if (uploadFrom === "name") {
      this.setState({
        name: files,
      });
    }
  }

  /**
   * @summary Downlaod products
   */
  async onDownloadExcelProducts() {
    console.log("loading :", this.state.isLoading)
    this.setState({
      ...this.state,
      isLoading:true,
    })

    const url = process.env.REACT_APP_DOMAIN + "/download/products";

    // var formData = new FormData();
    // formData.append("ids", "");

    await axios({
      headers: {
        authorization: this.token ? `Bearer ${this.token}` : "",
      },
      method: "GET",
      url: url,
      responseType: "arraybuffer",
    })
      .then((response) => {
        fileDownload(response.data, "Products.xlsx");
        this.setState({
          ...this.state,
          isLoading:false,
        })
      })
      .catch((error) => {
        this.setState({
          ...this.state,
          isLoading:true,
        })
        console.log("error", error);
        this.props.enqueueSnackbar(
          "Sorry, there is an error occurred while fetching data.",
          { variant: "error" }
        );
      });
  }

  /**
   * @summary Downlaod products
   */
  onDownloadExcelInventory() {
    const url = process.env.REACT_APP_DOMAIN + "/download/inventoryPrice";

    var formData = new FormData();
    formData.append("ids", "");

    axios({
      headers: {
        authorization: this.token ? `Bearer ${this.token}` : "",
      },
      method: "POST",
      url: url,
      data: formData,
      responseType: "arraybuffer",
    })
      .then((response) => {
        fileDownload(response.data, "ProductsPriceInventory.xlsx");
      })
      .catch((error) => {
        console.log(error);
        this.props.enqueueSnackbar(
          "Sorry, there is an error occurred while fetching data.",
          { variant: "error" }
        );
      });
  }

  onDownloadExcelName() {
    const url = process.env.REACT_APP_DOMAIN + "/download/name";

    var formData = new FormData();
    formData.append("ids", "");

    axios({
      headers: {
        authorization: this.token ? `Bearer ${this.token}` : "",
      },
      method: "POST",
      url: url,
      data: formData,
      responseType: "arraybuffer",
    })
      .then((response) => {
        fileDownload(response.data, "ProductsName.xlsx");
      })
      .catch((error) => {
        console.log(error);
        this.props.enqueueSnackbar(
          "Sorry, there is an error occurred while fetching data.",
          { variant: "error" }
        );
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
              icon={<PublishIcon />}
            />
          </Grid>
        </Grid>

        {this.state.isLoading ? (<CircularProgress/>) : ("") }

        {/* List section */}
        <div className="card mt-20">
          <form onSubmit={this.onHandleSubmit}>
            <Grid container className="align-items-center">
              <Grid item md={3} xs={12}>
                <h5>Product batch registration</h5>
              </Grid>
              {/* Download  Excel */}
              <Grid item md={9} xs={12}>
                <Button
                  variant="contained"
                  color="primary"
                  size="small"
                  startIcon={<ImportExportIcon />}
                  onClick={this.onDownloadExcelProducts.bind(this)}
                >
                  Download products
                </Button>
              </Grid>
            </Grid>
            <Grid container className="align-items-center">
              <Grid item md={3} xs={12}>
                <h5>Upload</h5>
              </Grid>
              <Grid item md={9} xs={12}>
                <DropzoneArea
                  maxFileSize={30000000}
                  filesLimit="1"
                  onDrop={(e) => this.onDrop(e, "product")}
                />
              </Grid>
            </Grid>

            <Divider className="mt-20" />

            <Grid container className="align-items-center">
              <Grid item md={3} xs={12}>
                <h5>Stock and Price</h5>
              </Grid>

              {/* Download  Excel */}
              <Grid item md={9} xs={12}>
                <Button
                  variant="contained"
                  color="primary"
                  size="small"
                  startIcon={<ImportExportIcon />}
                  onClick={this.onDownloadExcelInventory.bind(this)}
                >
                  Download products price and inventory
                </Button>
              </Grid>
            </Grid>
            <Grid container className="align-items-center">
              <Grid item md={3} xs={12}>
                <h5>Upload</h5>
              </Grid>

              <Grid item md={9} xs={12}>
                <DropzoneArea
                  maxFileSize={30000000}
                  filesLimit="1"
                  onDrop={(e) => this.onDrop(e, "priceAndInventory")}
                />
              </Grid>
            </Grid>

            <Divider className="mt-20" />

            <Divider className="mt-20" />

<Grid container className="align-items-center">
  <Grid item md={3} xs={12}>
    <h5>Name</h5>
  </Grid>

  {/* Download  Excel */}
  <Grid item md={9} xs={12}>
    <Button
      variant="contained"
      color="primary"
      size="small"
      startIcon={<ImportExportIcon />}
      onClick={this.onDownloadExcelName.bind(this)}
    >
      Download products name
    </Button>
  </Grid>
</Grid>
<Grid container className="align-items-center">
  <Grid item md={3} xs={12}>
    <h5>Upload</h5>
  </Grid>

  <Grid item md={9} xs={12}>
    <DropzoneArea
      maxFileSize={30000000}
      filesLimit="1"
      onDrop={(e) => this.onDrop(e, "name")}
    />
  </Grid>
</Grid>

            <Grid container className="mt-20">
              <Grid item md={12} xs={12}>
                <Button
                  variant="contained"
                  size="small"
                  color="primary"
                  type="submit"
                  disabled={this.state.isProcessing}
                  startIcon={
                    this.state.isProcessing ? (
                      <CircularProgress color="white" size="1rem" />
                    ) : (
                      <SaveIcon fontSize="small" className="mr-10" />
                    )
                  }
                >
                  SAVE
                </Button>
              </Grid>
            </Grid>
          </form>

          <ExcelExport
            fileName="PriceAndInventory.xlsx"
            ref={(exporter) => {
              this._exporter = exporter;
            }}
          >
            <ExcelExportColumn
              field="SKU"
              title="SKU"
              locked={true}
              width={200}
            />
            <ExcelExportColumn
              field="Inventory"
              title="Inventory"
              width={350}
            />
            <ExcelExportColumn field="Price" title="Price" width={350} />
          </ExcelExport>
        </div>
      </React.Fragment>
    );
  }
}

export default withSnackbar(List);
