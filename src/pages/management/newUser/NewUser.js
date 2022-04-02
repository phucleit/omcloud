import React, { useState, useEffect } from "react";
import {
  Button
} from "@material-ui/core";
import axios from 'axios';

// components
import PageTitle from "../../../components/PageTitle/PageTitle";

// icons sets
import "font-awesome/css/font-awesome.min.css";

export default function NewUser () {

  const handleClick = (e) => {
    
  }

  return (
    <>
      <PageTitle title="Thêm tài khoản" button={(
        <Button
          variant="contained"
          size="medium"
          color="secondary"
          onClick={e => handleClick(e)}
        >
          Thêm mới
        </Button>
      )} />
    </>
  );
}
