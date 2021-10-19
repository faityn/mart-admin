import React from "react";
import useSWR from "swr";
import List from "./List";
import fetcher from "./Util/fetcher";

const Main = () => {
  const { data, error } = useSWR(
    process.env.REACT_APP_DOMAIN + "/api/v1/surveys",
    fetcher
  );
  if (error) return <div>{error}</div>;
  if (!data) return <div>로딩중...</div>;
  console.log(data);

  return <List data={data} />;
};

export default Main;
