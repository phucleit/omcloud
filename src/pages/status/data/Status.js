import React, { useState, useEffect } from "react";
import {
  Button
} from "@material-ui/core";
import axios from 'axios';
import { DataGrid } from '@mui/x-data-grid';
import {
  Link,
} from "react-router-dom";

// components
import PageTitle from "../../../components/PageTitle/PageTitle";
import useStyles from "./styles";
import { useTranslation } from 'react-i18next';

export default function StatusPage() {
  var classes = useStyles();
  const [query, setQuery] = useState('');
  const [data, setData] = useState([]);
  const { t } = useTranslation()
  useEffect(() => {
    loadStatus();
  }, []);

  const loadStatus = async () => {
    const result = await axios.get(
      'https://backend.omcloud.vn/api/status',
      {
        headers: { 
          'Authorization': 'Bearer 10|wrpJyOOlFaGAbvXyOsSvHJQbpYmP0HiPi2KVMck4', 
          'Content-Type': 'application/json'
        },
      }
    );
    setData(result.data.data);
  };

  const columns = [
    { field: 'name', headerName: t('status-name'), width: 250 },
    { field: 'description', headerName: t('status-desc'), width: 400 },
  ];

  const search = (rows) => {
    return rows.filter(
      (status) =>
        status.name.toLowerCase().indexOf(query) > -1 ||
        status.name.indexOf(query) > -1 ||
        status.description.toLowerCase().indexOf(query) > -1 ||
        status.description.indexOf(query) > -1
    );
  }

  return (
    <>
      <PageTitle title={t("Status-List")} />
      <div className={classes.boxSearch}>
        <input type="search" className={classes.searchTerm} placeholder={t('Search-input')} onChange={e => setQuery(e.target.value)} />
        <Link to="/app/new-status">
          <Button
            variant="contained"
            size="medium"
            color="secondary"
          >
            {t("Add")}
          </Button>
        </Link>
      </div>
      <DataGrid
        rows={search(data)}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5]}
        disableSelectionOnClick
        className={classes.serviceData}
      />
    </>
  );
}
