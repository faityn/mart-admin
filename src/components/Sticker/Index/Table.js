import React from 'react';
import PerfectScrollbar from 'react-perfect-scrollbar';
import BorderColorIcon from '@material-ui/icons/BorderColor';
import { Subscription } from 'react-apollo';
import { 
  SUBSCRIPTION_PRODUCT,
  UPLOAD_IMAGE,
  UPDATE_IMAGE_STICKER
} from '../Queries'; 
import StickerForm  from '../Form/Form';
import {
  Avatar,
  Card,
  CardContent,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  IconButton,
  Badge,
  Button,
  Grid
} from '@material-ui/core';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import { DropzoneDialog } from 'material-ui-dropzone';
import { connect } from 'react-redux';
import { withSnackbar } from 'notistack';
import moment from 'moment'

/**
 * @summary Product list table
 * @version 1.0
 * @author Batbayar Tuuchintav <coder.batbayar@gmail.com>
 * @package Product
 */
class ProductTable extends React.Component {

  /**
   * @constructor
   */
  constructor(props){
    super(props);
    
    // Default state
    this.state = {
      id: null,
      open: false,
      dropzone: false,
      isProcessing: false
    }

    // Events
    this.handleClickOpen = this.handleClickOpen.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.handleDropzoneOpen = this.handleDropzoneOpen.bind(this);
    this.handleDropzoneClose = this.handleDropzoneClose.bind(this);
    this.onClickDelete = this.onClickDelete.bind(this);
  }

  /**
   * @summary Open box
   * @param {event} 
   */
  handleClickOpen(event, id) {
    this.setState({open: true, id: id});
  };

  /**
   * @summary Close box
   * @param {event} 
   */
  handleClose() {
    this.setState({open: false});
  };

  /**
   * @summary Close box
   * @param {event} 
   */
  handleDropzoneOpen(event, id, name, color) {
    this.setState({
      dropzone: true, 
      id: id,
      name: name,
      color: color
    });
  };

  /**
   * @summary Close box
   * @param {event} 
   */
  handleDropzoneClose() {
    this.setState({dropzone: false});
  };

  /**
   * @summary Add image
   * @param {String} url 
   */
  onAddImage(url) {
    this.setState(prevState => ({
      imageUrl: prevState.imageUrl.concat([{ imageUrl: url }])
    }));
  }

  /**
   * @summary Upload files
   * @param {!Array<Object>} files
   */
  async onDrop(images) {
    this.setState({isProcessing: true});
    this.props.enqueueSnackbar('The uploading process is being started ...', {variant: 'info'});

    let hasErrors = false;
    images.reduce((accumulatorPromise, image) => 
      accumulatorPromise.then(() =>
        new Promise(resolve => {
          this.props.apolloClient.uploadClient.mutate({ 
            mutation: UPLOAD_IMAGE, 
            variables: { image }
          }).then((result) => {
            if(result.data.uploadImageSticker) {
              // Form data to object
              let stickerImage = {
                "id": this.state.id,
                "imageUrl": result.data.uploadImageSticker.data,
              }

              this.props.apolloClient.httpClient.mutate({
                mutation: UPDATE_IMAGE_STICKER, 
                variables: { 
                  stickerImage: stickerImage
                }
              })
              this.handleDropzoneClose();
            }
          }).catch((error) => {
            hasErrors = true;
            this.props.enqueueSnackbar('Sorry, there is an error occurred while uploading image.', {variant: 'error'});
          });

          resolve(true);
        })
      ), Promise.resolve());

    let message = !hasErrors ? 'The uploading process has been completed successfully.' : 'The uploading process has been completed with errors.';
    let variant = !hasErrors ? 'success' : 'warning';

    this.props.enqueueSnackbar(message, {variant: variant});
    this.setState({isProcessing: false});
  }

  /**
   * @summary Delete Image
   * @param {String} url 
   */
  async onClickDelete(event, id, name, position) {
    event.stopPropagation();

    // Form data to object
    let stickerImage = {
      "id": id,
      "imageUrl": "no-image",
    }

    // Mutate
    await this.props.apolloClient.httpClient.mutate({
      mutation: UPDATE_IMAGE_STICKER, 
      variables: { 
        stickerImage: stickerImage
      }
    }).then( async (result) => {
      const message = "Sticker image has been successfully deleted.";

      this.props.enqueueSnackbar(message, {variant: 'success'});
    }).catch((error) => {
      this.props.enqueueSnackbar('Sorry, there is an error occurred while saving data.', {variant: 'error'});
    });
  }
  
  /**
   * @override
   */
  render() {
    return (
      <React.Fragment>
        
        <Card className="mt-20">
          {/* List */}
          <CardContent>
            <PerfectScrollbar>
              <div>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>Sticker</TableCell>
                      <TableCell>Sticker image registration</TableCell>
                      <TableCell>Exposure position</TableCell>
                      <TableCell>Whether or not to use</TableCell>
                      <TableCell>Date</TableCell>
                      <TableCell>Priority</TableCell>
                      <TableCell>Action</TableCell>
                    </TableRow>
                  </TableHead>

                  <TableBody>
                    {(this.props.data.getStickers || []).map((item, index) => (
                      <TableRow  key={item.id}>
                        <TableCell>{item.name}</TableCell>
                        <TableCell className="small-Btn">
                          {item.imageUrl === "no-image" ? 
                            <Button 
                              size="small" 
                              variant="outlined" 
                              color="primary" 
                              onClick={(e) => this.handleDropzoneOpen(e, item.id, item.name, item.color)}
                            >
                              Upload image
                            </Button>  
                          :
                            <Badge
                              overlap="circle"
                              anchorOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                              }}
                              badgeContent={
                                <IconButton color="default" onClick={(e) => this.onClickDelete(e, item.id, item.name, item.position)}>
                                  <DeleteForeverIcon />
                                </IconButton>
                              }
                            >
                              <Avatar variant="rounded" alt="File" src={process.env.REACT_APP_CDN_URL + "sticker/" + item.imageUrl} className="custom-avatar" />
                            </Badge>
                          }
                        </TableCell>
                        <TableCell>Top left of thumbnail</TableCell>
                        <TableCell> {item.active === true ? "Used" : "Not used"} </TableCell>
                        <TableCell> {moment(item.startDate, "YYYY-MM-DDTHH:mm:ssZ").format("YYYY-MM-DD")} ~ {moment(item.endDate, "YYYY-MM-DDTHH:mm:ssZ").format("YYYY-MM-DD")}</TableCell>
                        <TableCell> {item.priority} </TableCell>
                        <TableCell className="custom-svgIcon">
                          <IconButton 
                            size="small"
                            color="primary" 
                            aria-label="Enrollment" 
                            alt="Enrollment"
                            onClick={(e) => this.handleClickOpen(e, item.id)}
                          >
                            <BorderColorIcon />
                          </IconButton>
                                 
                        </TableCell>
                        
                        <Subscription
                          subscription={SUBSCRIPTION_PRODUCT}
                          variables={{ id: item.id }}>
                          {() => {return null;}}
                        </Subscription>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </PerfectScrollbar>
          </CardContent>
        </Card>

        <DropzoneDialog
          maxFileSize={30000000}
          acceptedFiles={['image/*']}
          filesLimit={1}
          open={this.state.dropzone}
          onClose={this.handleDropzoneClose}
          onDrop={this.onDrop.bind(this)}
        />

        {/* Popup */}
        <StickerForm id={this.state.id} open={this.state.open} handleClose={this.handleClose}/>
      </React.Fragment>
    );
  }
};

// Redux state to props
const mapStateToProps = state => {
  return {
    apolloClient: state.apolloClient
  }
}

export default withSnackbar(connect(mapStateToProps, null)(ProductTable));