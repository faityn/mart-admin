import React from "react";
import { Grid, CardContent, TextField, Button } from "@material-ui/core";

/**
 * @summary External
 * @version 1.0
 * @author Batbayar Tuuchintav <coder.batbayar@gmail.com>
 * @package Product/Form
 */
class External extends React.Component {
    /**
     * @constructor
     */
    constructor(props) {
        super(props);

        let links = [
            {
                name: "",
                url: "",
            },
        ];

        // Set default links
        if (
            this.props.product &&
            this.props.product.externalLinks &&
            this.props.product.externalLinks.length > 0
        ) {
            links = this.props.product.externalLinks;
        }

        // Default states
        this.state = {
            links: links,
        };

        // Events
        this.onAddLink = this.onAddLink.bind(this);
    }

    /**
     * @summary Detail
     * @param {Event} childrenName
     */
    onAddLink() {
        this.setState((prevState) => ({
            links: prevState.links.concat([
                {
                    name: "",
                    url: "",
                },
            ]),
        }));
    }
    /**
     * @override
     */
    render() {
        if (!this.props.isShowForm) return "";
        // ROLE SELLER
        const user = JSON.parse(
            localStorage.getItem(process.env.REACT_LOGGED_USER)
        );
        return (
            <CardContent>
                <Grid container spacing={3}>
                    <Grid item md={2} xs={12}>
                        <h5>적용중인 프리미엄 서비스</h5>
                    </Grid>
                </Grid>

                {this.state.links.map((link, index) => (
                    <Grid
                        container
                        spacing={3}
                        className="align-items-center"
                        key={index}
                    >
                        {/* Title */}
                        <Grid item md={2} xs={12}>
                            <h5>외부링크</h5>
                        </Grid>

                        {/* TextField */}
                        <Grid item md={3} xs={12}>
                            <TextField
                                fullWidth
                                label="Enter the platform name"
                                type="text"
                                size="small"
                                variant="outlined"
                                name="externalNames"
                                defaultValue={link.name}
                                disabled={
                                    user.roleName === "ROLE_SELLER"
                                        ? true
                                        : false
                                }
                            />
                        </Grid>

                        {/* TextField */}
                        <Grid item md={6} xs={12}>
                            <TextField
                                fullWidth
                                label="Please enter the URL"
                                type="text"
                                size="small"
                                variant="outlined"
                                name="externalUrl"
                                defaultValue={link.url}
                                disabled={
                                    user.roleName === "ROLE_SELLER"
                                        ? true
                                        : false
                                }
                            />
                        </Grid>
                    </Grid>
                ))}

                {/* Container */}
                {user.roleName === "ROLE_SELLER" ? null : (
                    <Grid container spacing={3} className="text-right">
                        {/* Title */}
                        <Grid item md={11} xs={12}>
                            <Button
                                size="small"
                                variant="contained"
                                color="primary"
                                onClick={this.onAddLink}
                            >
                                Add link
                            </Button>
                        </Grid>
                    </Grid>
                )}
            </CardContent>
        );
    }
}

export default External;
