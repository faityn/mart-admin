import { useQuery } from "@apollo/client";
import { Button } from "@material-ui/core";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { GET_AFFILIATE_POLICY_LIST } from "../../../Queries/Affiliate";
import { GET_CATEGORIES } from "../../../Queries/Category";
import Item from "./Item";

const ListNew = () => {
    const [categories, setCategories] = useState(null);
    const [policyList, setPolicyList] = useState(null);
    const [list, setList] = useState(null);
    const { apolloClient } = useSelector((state) => state);

    useEffect(() => {
        loadCategory();
        loadAffiliatePolicyList();
    }, []);

    useEffect(() => {
        if (policyList && categories) {
            mergeData();
        }
    }, [policyList, categories]);

    const loadCategory = () => {
        apolloClient.httpClient
            .query({
                query: GET_CATEGORIES,
            })
            .then((result) => {
                setCategories(result.data.categories.second);
            })
            .catch((error) => {
                console.error(error);
            });
    };

    const loadAffiliatePolicyList = () => {
        apolloClient.httpClient
            .query({
                query: GET_AFFILIATE_POLICY_LIST,
                variables: {
                    search: {},
                    page: {
                        orderBy: "created_date",
                        type: "DESC",
                        limit: 50,
                        pageNumber: 1,
                    },
                },
            })
            .then((result) => {
                setPolicyList(result.data.getAffiliatePolicyList.list);
            })
            .catch((error) => {
                console.error(error);
            });
    };
    const mergeData = () => {
        setList(
            categories.map((category) => {
                category.percentage = "";
                policyList.map((policy) => {
                    if (category.name === policy.category2) {
                        category.percentage = policy.percentage;
                    }
                });

                return category;
            })
        );
    };


    const goPaid = async () => {
        const token = localStorage.getItem(process.env.REACT_ACCESS_TOKEN_NAME);
        let url = process.env.REACT_APP_DOMAIN + "/api/v1/paid/affiliate"
    
        await axios({
          headers: {
            authorization: token ? `Bearer ${token}` : "",
          },
          method: 'GET',
          url: url,
        //   responseType: 'json'
        }).then(response => {
          console.log(response)
        }).catch(error => {
            console.error(error)
        });
    }

    return (
        <div>

            <button onClick={goPaid}>정산가주아!</button>

            <div className="affiliatePolicyWrap">
                <h2>Affiliate Policy</h2>
                <div className="head">
                    <span>Category</span>
                    <span>Percentage</span>
                    <span>Save</span>
                </div>
                <div className="body">
                    {list?.map((category) => (
                        <Item
                            category={category}
                            key={category.id}
                            apolloClient={apolloClient}
                        />
                    ))}
            </div>
        </div>



        </div>
    );
};

export default ListNew;
