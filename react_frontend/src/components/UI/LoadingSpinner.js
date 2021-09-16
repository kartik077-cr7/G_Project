import React from 'react';
import Loader from "react-loader-spinner";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";

const LoadingSpinner = () => {
  return (
    <Loader
      style ={{marginLeft:'45%',marginTop:'35%'}}
      type="Puff"
      color="#00BFFF"
      height={100}
      width={100}
    />
  );
}
export default LoadingSpinner;
