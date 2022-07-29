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
import PageTitle from "../../../../components/PageTitle/PageTitle";
import useStyles from "./styles";
import { useTranslation } from 'react-i18next';


export default function RolesPage() {
  const { t } = useTranslation()
  var classes = useStyles();
  const [query, setQuery] = useState('');

  const [data, setData] = useState([]);
  useEffect(() => {
    loadRoles();
  }, []);

  const loadRoles = async () => {
    const result = await axios.get(
      'https://backend.omcloud.vn/api/role',
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
    { field: 'title', headerName: t("GroupName"), width: 250 },
    { field: 'description', headerName: t("Desc"), width: 650 },
  ];

  const search = (rows) => {
    return rows.filter(
      (roles) =>
        roles.title.toLowerCase().indexOf(query) > -1 ||
        roles.title.indexOf(query) > -1 ||
        roles.description.toLowerCase().indexOf(query) > -1 ||
        roles.description.indexOf(query) > -1
    );
  }

  return (
    <>
      <PageTitle title={t("Account-Group")} />
      <div className={classes.boxSearch}>
        <input type="search" className={classes.searchTerm} placeholder={t('Search-input')} onChange={e => setQuery(e.target.value)} />
        <Link to="/app/new-role">
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
        pageSize={30}
        rowsPerPageOptions={[30]}
        disableSelectionOnClick
        className={classes.rolesData}
      />
    </>
  );
}
