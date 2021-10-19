import axios from "axios";
import React, { useEffect, useState } from "react";
import { withRouter } from "react-router-dom";
import useSWR from "swr";
import fetcher from "./Util/fetcher";

const Detail = ({ match, history }) => {
  const { id } = match.params;
  const { data, error } = useSWR(
    process.env.REACT_APP_DOMAIN + `/api/v1/influence/${id}`,
    fetcher
  );

  useEffect(() => {
    if (data) {
      setUpdateData(data);
    }
  }, [data]);
  const [updateData, setUpdateData] = useState({
    level: null,
    adminMemo1: null,
    adminMemo2: null,
  });

  console.log(updateData);
  const [modifyAction, setModifyAction] = useState(false);

  const modifyhandler = () => {
    setModifyAction(true);
  };

  const modifyconfirmHandler = () => {
    const token = localStorage.getItem(process.env.REACT_ACCESS_TOKEN_NAME);
    if (
      updateData.level !== "" &&
      updateData.adminMemo1 !== null &&
      updateData.adminMemo2 !== null
    ) {
      axios({
        method: "put",
        url: process.env.REACT_APP_DOMAIN + `/api/v1/influence/${id}`,
        data: updateData,
        headers: {
          authorization: token ? `Bearer ${token}` : "",
        },
      })
        .then(function (response) {
          history.push("/docs");
        })
        .catch(function (error) {
          console.log(error);
        });
    }
  };

  const updateChangeHandler = (e) => {
    const { value, name } = e.target;
    setUpdateData({
      ...updateData,
      [name]: value,
    });
  };

  if (error) return <div>{error}</div>;
  if (!data) return <div>로딩중...</div>;
  return (
    <article
      style={{
        width: "100%",
        backgroundColor: "#fff",
        padding: "2vw",
        boxSizing: "border-box",
      }}
      className="docsDetail"
    >
      <table style={{ width: "100%" }}>
        <tbody>
          <tr>
            <th>개인정보</th>
          </tr>
          <tr>
            <th style={{ width: "50%" }}>이름</th>
            <th style={{ width: "50%" }}>국적</th>
            <td style={{ width: "50%" }}>
              {data.firstName}
              {data.middleName}
              {data.lastName}
            </td>
            <td style={{ width: "50%" }}>{data.nation}</td>
          </tr>
          <tr>
            <th colSpan="5">주소</th>
          </tr>
          <tr>
            <th style={{ width: "25%" }}>country</th>
            <th style={{ width: "25%" }}>city</th>
            <th style={{ width: "25%" }}>state</th>
            <th style={{ width: "25%" }}>zipCode</th>
          </tr>
          <tr>
            <td style={{ width: "25%" }}>{data.country}</td>
            <td style={{ width: "25%" }}>{data.city}</td>
            <td style={{ width: "25%" }}>{data.state}</td>
            <td style={{ width: "25%" }}>{data.zipCode}</td>
          </tr>
          <tr>
            <th colSpan="5">address</th>
          </tr>
          <tr>
            <td colSpan="5">{data.address}</td>
          </tr>
        </tbody>
      </table>
      <table style={{ width: "100%" }}>
        <tbody>
          <tr>
            <th>연락할 정보</th>
          </tr>
          <tr>
            <th style={{ width: "25%" }}>email</th>
            <td style={{ width: "25%" }}>{data.email}</td>
            <th style={{ width: "25%" }}>phoneNumber</th>
            <td style={{ width: "25%" }}>
              {data.phoneCode + data.phoneNumber}
            </td>
          </tr>
        </tbody>
      </table>
      <table style={{ width: "100%" }}>
        <tbody>
          <tr>
            <th>인스타</th>
          </tr>
          <tr>
            <th colSpan="5">instagram</th>
          </tr>
          <tr>
            <td colSpan="5">{data.instagramInfo}</td>
          </tr>
        </tbody>
      </table>
      <table style={{ width: "100%" }}>
        <tbody>
          <tr>
            <th>유튜브</th>
          </tr>
          <tr>
            <th colSpan="5">youtube</th>
          </tr>
          <tr>
            <th style={{ width: "20%" }}>youtube Title</th>
            <th style={{ width: "20%" }}>youtube Subscriber</th>
            <th style={{ width: "20%" }}>youtube ContentPer</th>
            <th style={{ width: "20%" }}>youtube Language</th>
            <th style={{ width: "20%" }}>youtube is Subtitle</th>
          </tr>
          <tr>
            <td style={{ width: "20%" }}>{data.youtubeInfo}</td>
            <td style={{ width: "20%" }}>{data.youtubeSubscriberAmount}</td>
            <td style={{ width: "20%" }}>{data.youtubeContentPerAmount}</td>
            <td style={{ width: "20%" }}>{data.youtubeLanguage}</td>
            <td style={{ width: "20%" }}>
              {data.youtubeIsSubtitle ? "Yes" : "No"}
            </td>
          </tr>
          <tr>
            <th colSpan="5">favorite</th>
          </tr>
          <tr>
            {data.favorite.beauty ? (
              <th style={{ width: "20%" }}>beauty</th>
            ) : null}
            {data.favorite.fashion ? (
              <th style={{ width: "20%" }}>fashion</th>
            ) : null}
            {data.favorite.electronics ? (
              <th style={{ width: "20%" }}>electronics</th>
            ) : null}
            {data.favorite.travel ? (
              <th style={{ width: "20%" }}>travel</th>
            ) : null}
            {data.favorite.other ? (
              <th style={{ width: "20%" }}>other</th>
            ) : null}
          </tr>
          <tr>
            {data.favorite.beauty ? (
              <td style={{ width: "20%" }}>
                {data.favorite.beauty ? "Yes" : "No"}
              </td>
            ) : null}
            {data.favorite.fashion ? (
              <td style={{ width: "20%" }}>
                {data.favorite.fashion ? "Yes" : "No"}
              </td>
            ) : null}
            {data.favorite.electronics ? (
              <td style={{ width: "20%" }}>
                {data.favorite.electronics ? "Yes" : "No"}
              </td>
            ) : null}
            {data.favorite.travel ? (
              <td style={{ width: "20%" }}>
                {data.favorite.travel ? "Yes" : "No"}
              </td>
            ) : null}
            {data.favorite.other ? (
              <td style={{ width: "20%" }}>
                {data.favorite.other ? "Yes" : "No"}
              </td>
            ) : null}
          </tr>
          <tr>
            {data.favorite.kfood ? (
              <th style={{ width: "33%" }}>kfood</th>
            ) : null}
            {data.favorite.kpop ? <th style={{ width: "33%" }}>kpop</th> : null}
            {data.favorite.kdramaMovie ? (
              <th style={{ width: "33%" }}>kdramaMovie</th>
            ) : null}
          </tr>
          <tr>
            {data.favorite.kfood ? (
              <td style={{ width: "20%" }}>
                {data.favorite.kfood ? "Yes" : "No"}
              </td>
            ) : null}
            {data.favorite.kfood ? (
              <td style={{ width: "20%" }}>
                {data.favorite.kfood ? "Yes" : "No"}
              </td>
            ) : null}
            {data.favorite.kpop ? (
              <td style={{ width: "20%" }}>
                {data.favorite.kpop ? "Yes" : "No"}
              </td>
            ) : null}
            {data.favorite.kdramaMovie ? (
              <td style={{ width: "20%" }}>
                {data.favorite.kdramaMovie ? "Yes" : "No"}
              </td>
            ) : null}
          </tr>
        </tbody>
      </table>
      <table style={{ width: "100%" }}>
        <tbody>
          <tr>
            <th>LEVEL</th>
          </tr>
          <tr>
            <th>Level</th>
            <td>
              {modifyAction ? (
                <select
                  defaultValue={data.level}
                  onChange={(e) => updateChangeHandler(e)}
                  name="level"
                >
                  <option value="LV_0" name="LV_0">
                    LV_0
                  </option>
                  <option value="LV_1" name="LV_1">
                    LV_1
                  </option>
                  <option value="LV_2" name="LV_2">
                    LV_2
                  </option>
                  <option value="LV_3" name="LV_3">
                    LV_3
                  </option>
                  <option value="LV_4" name="LV_4">
                    LV_4
                  </option>
                  <option value="LV_5" name="LV_5">
                    LV_5
                  </option>
                </select>
              ) : (
                <select defaultValue={data.level} disabled>
                  <option value="LV_0" name="LV_0">
                    LV_0
                  </option>
                  <option value="LV_1" name="LV_1">
                    LV_1
                  </option>
                  <option value="LV_2" name="LV_2">
                    LV_2
                  </option>
                  <option value="LV_3" name="LV_3">
                    LV_3
                  </option>
                  <option value="LV_4" name="LV_4">
                    LV_4
                  </option>
                  <option value="LV_5" name="LV_5">
                    LV_5
                  </option>
                </select>
              )}
            </td>
          </tr>
        </tbody>
      </table>
      <table style={{ width: "100%" }}>
        <tbody>
          <tr>
            <th>관리자 메모</th>
          </tr>
          <tr style={{ height: "100%" }}>
            <td style={{ width: "50%", height: "100%" }}>
              {modifyAction ? (
                <textarea
                  name="adminMemo1"
                  placeholder="메모1"
                  onChange={(e) => updateChangeHandler(e)}
                  defaultValue={data.adminMemo1}
                />
              ) : (
                <textarea
                  name="adminMemo1"
                  placeholder="메모1"
                  onChange={(e) => updateChangeHandler(e)}
                  defaultValue={data.adminMemo1}
                  disabled
                />
              )}
            </td>
            <td style={{ width: "50%", height: "100%" }}>
              {modifyAction ? (
                <textarea
                  name="adminMemo2"
                  placeholder="메모2"
                  onChange={(e) => updateChangeHandler(e)}
                  defaultValue={data.adminMemo2}
                />
              ) : (
                <textarea
                  name="adminMemo2"
                  placeholder="메모2"
                  onChange={(e) => updateChangeHandler(e)}
                  defaultValue={data.adminMemo2}
                  disabled
                />
              )}
            </td>
          </tr>
        </tbody>
      </table>
      {modifyAction ? (
        <button type="button" onClick={modifyconfirmHandler}>
          수정완료
        </button>
      ) : (
        <button type="button" onClick={modifyhandler}>
          수정하기
        </button>
      )}
    </article>
  );
};

export default withRouter(Detail);
