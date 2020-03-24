import React from "react";
import axios from "axios";
// import { lifecycle, withHandlers } from "recompose";
export const withDownloader = WrappedComponent => function WithDownloader(props) {
  const newProps = Object.assign({}, props, {
    download: (url = "", fileName = "") => {
      if (url && fileName) {
        axios
          .request({
            url,
            method: "GET",
            responseType: "blob",
          })
          .then(response => {
            const blobData = new Blob([response.data]);
            const downloadUrl = window.URL.createObjectURL(blobData);
            const link = document.createElement("a");
            link.href = url;
            link.setAttribute("download", downloadUrl);
            link.setAttribute("id", fileName);
            document.body.appendChild(link);
            link.click();
          });
      }
    },
  });
  return <WrappedComponent {...newProps} />;
};

export default withDownloader;
