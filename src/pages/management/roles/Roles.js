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


export default function RolesPage() {
  const { t } = useTranslation()
  var classes = useStyles();
  const [query, setQuery] = useState('');

  const [data, setData] = useState([]);
  useEffect(() => {
    loadRoles();
  }, []);

  const loadRoles = async () => {
    const result = await axios.get('https://backend.omcloud.vn/api/role');
    setData(result.data.data);
  };

  const columns = [
    { field: 'id', headerName: 'ID', width: 70 },
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
      <PageTitle title={t("Account-Group")} button={(
        <Link to="/app/new-role">
          <Button
            variant="contained"
            size="medium"
            color="secondary"
          >
            {t("Add")}
          </Button>
        </Link>
      )} />
      <div className={classes.search}>
        <input type="text" className={classes.searchTerm} placeholder="Nhập từ khóa tìm kiếm" onChange={e => setQuery(e.target.value)} />
        <button type="submit" className={classes.searchButton}>
          <i className="fa fa-search"></i>
        </button>
      </div>
      <DataGrid
        rows={search(data)}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5]}
        disableSelectionOnClick
        className={classes.rolesData}
      />
    </>
  );
}
