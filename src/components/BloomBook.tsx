import React, { useEffect } from "react";

const BloomBook: React.FunctionComponent<{ bookId: string }> = (props) => {
  useEffect(() => {
    const url = `https://api.bloomlibrary.org/v1/fs/harvest/${props.bookId}/bloomdigital/index.htm`;

    const fetchData = async () => {
      try {
        const response = await fetch(url, { mode: "no-cors" });

        console.log("X: " + JSON.stringify(response));
      } catch (error) {
        console.error("error", error);
      }
    };

    fetchData();
  }, []);

  return <h1>bloom book {props.bookId}</h1>;
};

export default BloomBook;
