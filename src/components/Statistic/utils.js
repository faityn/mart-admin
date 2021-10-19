import { format } from "date-fns";
import moment from "moment";

export const formatDate = (string) => {
  return format(
    new Date(
      string.substring(0, 4),
      string.substring(4, 6) - 1,
      string.substring(6, 8)
    ),
    "yyyy-MM-d"
  );
};
export const formatMonth = (string) => {
  return moment(string, "YYYYMM").format("YYYY-MM")
};

export const transformToDate = (string) => {
  return new Date(
    string.substring(0, 4),
    string.substring(4, 6) - 1,
    string.substring(6, 8)
  );
};

export const getCSV = (headers, data, fileName, extraData) => {
  const header_data = headers.join(",");
  const new_data = [];
  data.forEach((row, index) => {
      const rowData = [];
      headers.forEach(header => {
        rowData.push(row[header] ? row[header] : "");
      });
      new_data.push(rowData);
  });
  extraData.forEach((row)=>{
      new_data.push(row);
  });
  const csv = "\uFEFF" + header_data + '\r\n' + new_data.join('\r\n');
  const hiddenElement = document.createElement('a');
  hiddenElement.href = 'data:text/csv;charset=utf-8,' + encodeURI(csv);
  hiddenElement.target = '_blank';
  hiddenElement.download = fileName;
  hiddenElement.click();
};

export const getCSVStatistics = (headers, data, fileName, extraData) => {
  const header_data = headers.join(",");
  const new_data = [];
  data.forEach((row, index) => {
      const rowData = [];
      headers.forEach(header => {
        rowData.push(row[header] ? row[header] : "");
      });
      new_data.push(rowData);
  });
  extraData.forEach((row)=>{
      new_data.push(row);
  });
  const csv = "\uFEFF" + header_data + '\r\n' + data.join('\r\n');
  const hiddenElement = document.createElement('a');
  hiddenElement.href = 'data:text/csv;charset=utf-8,' + encodeURI(csv);
  hiddenElement.target = '_blank';
  hiddenElement.download = fileName;
  hiddenElement.click();
};

export const getDate = (date)=>{
    return moment(date).format("YYYY-MM-DD")
}