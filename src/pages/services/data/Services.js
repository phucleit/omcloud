import React, { useState, useEffect } from "react";
import {
  Button
} from "@material-ui/core";
import axios from 'axios';
import { DataGrid } from '@mui/x-data-grid';
import { DeleteOutline } from '@mui/icons-material';
import {
  Link,
} from "react-router-dom";

// components
import PageTitle from "../../../components/PageTitle/PageTitle";
import useStyles from "./styles";
import { useTranslation } from 'react-i18next';


const url_service = `https://backend.omcloud.vn/api/service/`;

export default function ServicesPage() {
  var classes = useStyles();
  const [query, setQuery] = useState('');
  const [data, setData] = useState([]);
  const { t } = useTranslation()
  useEffect(() => {
    loadServices();
  }, []);

  const loadServices = async () => {
    const result = await axios.get(
      'https://backend.omcloud.vn/api/service',
      {
        headers: { 
          'Authorization': 'Bearer 10|wrpJyOOlFaGAbvXyOsSvHJQbpYmP0HiPi2KVMck4', 
          'Content-Type': 'application/json'
        },
      }
    );
    setData(result.data.data);
  };

  const handleDelete = (id) => {
    if (window.confirm('Bạn có muốn xóa không?')) {
      axios.delete(
        url_service + id,
        {
          headers: { 
            'Authorization': 'Bearer 10|wrpJyOOlFaGAbvXyOsSvHJQbpYmP0HiPi2KVMck4', 
            'Content-Type': 'application/json'
          },
        }
      ).then(res => {
          setData(data.filter((item) => item.id !== id));
        })
        .catch(error => console.log(error));
    }
  }

  const columns = [
    { field: 'name', headerName: t('service-name'), width: 250 },
    {
      field: 'service_type',
      headerName: t('service-type'),
      width: 250,
      valueGetter: (params) => `${params.row.service_type.name}`
    },
    { field: 'construction_count', headerName: t('construction_count'), width: 200 },
    {
      field: 'hanhDong',
      headerName: t('Action'),
      width: 150,
      renderCell: (params) => {
        return (
          <div className={classes.buttonAction}>
            <Link to={"/app/edit-service/" + params.row.id}>
              <button className={classes.serviceListEdit}>Edit</button>
            </Link>
            <DeleteOutline className={classes.serviceListDelete} onClick={() => handleDelete(params.row.id)} />
          </div>
        );
      }
    },
  ];

  const search = (rows) => {
    return rows.filter(
      (services) =>
        services.name.toLowerCase().indexOf(query) > -1 ||
        services.name.indexOf(query) > -1 ||
        services.service_type.name.toLowerCase().indexOf(query) > -1 ||
        services.service_type.name.indexOf(query) > -1
    );
  }

  return (
    <>
      <PageTitle title={t("Services-List")} />
      <div className={classes.boxSearch}>
        <input type="search" className={classes.searchTerm} placeholder={t('Search-input')} onChange={e => setQuery(e.target.value)} />
        <Link to="/app/new-service">
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
