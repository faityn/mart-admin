import React from "react";
import { Link as RouterLink } from "react-router-dom";
import clsx from "clsx";
import { Avatar, Typography } from "@material-ui/core";
import AvatarImage from "../../../../../../../../assets/images/avatars/avatar_8.png";
import { connect } from "react-redux";
import { gql } from "apollo-boost";

const USER_LOGGED = gql`
    query {
        userLogged {
            email
            firstName
            middleName
            lastName
            birthday
            gender
            nation
            city
            state
            address1
            address2
            address3
            postalCode
            phoneNumber
            status
            companyName
        }
    }
`;

/**
 * @const Profile
 * @version 0.1
 * @author Tuguldur Unurtsetseg
 * @package core/layouts/main/components
 */
class Profile extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            user: null,
        };
    }

    /**
     * @override
     */
    async componentDidMount() {
        await this.props.apolloClient.httpClient
            .query({
                query: USER_LOGGED,
            })
            .then((result) => {
                this.setState({
                    user: result.data.userLogged,
                });
            })
            .catch((error) => {});
    }

    /**
     * @override
     */
    render() {
        if (!this.state.user) return "";

        return (
            <div className="text-center">
                <Typography variant="h4" className="text-center">
                    {this.state.user.firstName
                        ? this.state.user.firstName + this.state.user.lastName
                        : this.state.user.companyName}
                </Typography>
                <Typography variant="body2" className="text-center">
                    {this.state.user.email}
                </Typography>
            </div>
        );
    }
}

// Redux state to props
const mapStateToProps = (state) => {
    return {
        apolloClient: state.apolloClient,
    };
};

export default connect(mapStateToProps, null)(Profile);
