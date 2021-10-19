import { Button } from "@material-ui/core";
import { useSnackbar } from "notistack";
import React, { useState } from "react";
import { SAVE_AFFILIATE_POLICY } from "../../../Queries/Queries";

const Item = ({ category, apolloClient }) => {
    const { enqueueSnackbar, closeSnackbar } = useSnackbar();
    const [affiliatePolicy, setAffiliatePolicy] = useState({
        category1: category.parentId,
        category2: category.id,
        category3: "",
        percentage: category.percentage,
    });

    const onChange = (e) => {
        const { name, value } = e.target;
        setAffiliatePolicy({
            ...affiliatePolicy,
            [name]: value,
        });
    };

    const onSubmit = () => {
        if (affiliatePolicy.percentage === "") {
            enqueueSnackbar("Enter percentage", { variant: "warning" });
            return;
        }
        apolloClient.httpClient
            .mutate({
                mutation: SAVE_AFFILIATE_POLICY,
                variables: {
                    affiliatePolicy: affiliatePolicy,
                },
            })
            .then((result) => {
                if (result.data.saveAffiliatePolicy.statusCode === 200) {
                    enqueueSnackbar(
                        "Affiliate policy has been successfully updated.",
                        { variant: "success" }
                    );
                } else {
                    enqueueSnackbar(
                        "Sorry, there is an error occurred while saving data.",
                        { variant: "error" }
                    );
                }
            })
            .catch((error) => {
                enqueueSnackbar(
                    "Sorry, there is an error occurred while saving data.",
                    { variant: "error" }
                );
            });
    };
    return (
        <div className="data">
            <p>{category.name}</p>
            <input
                type="number"
                value={affiliatePolicy.percentage}
                name="percentage"
                onChange={(e) => onChange(e)}
            />
            <input
                type="text"
                value={affiliatePolicy.category2}
                name="category2"
                style={{ display: "none" }}
                onChange={(e) => onChange(e)}
            />
            <div className="btn">
                <Button
                    type="button"
                    variant="contained"
                    color="primary"
                    onClick={onSubmit}
                >
                    Save
                </Button>
            </div>
        </div>
    );
};

export default Item;
