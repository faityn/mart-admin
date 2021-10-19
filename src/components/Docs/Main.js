import React, { useEffect } from "react";
import useSWR from "swr";
import List from "./List";
import fetcher from "./Util/fetcher";
import "../../assets/css/docs.css";

const Main = () => {
    const { data, error } = useSWR(
        process.env.REACT_APP_DOMAIN + "/api/v1/influence",
        fetcher
    );
    if (error) return <div>{error}</div>;
    if (!data) return <div>로딩중...</div>;
    console.log(data);

    const applicant = data.filter((v) => v.level === "LV_0");
    const influence = data.filter((v) => v.level !== "LV_0");
    console.log("applicant", applicant);
    console.log("influence", influence);

    return <List applicant={applicant} influence={influence} />;
};

export default Main;
