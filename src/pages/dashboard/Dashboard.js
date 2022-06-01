import React, { useState, useEffect } from "react";
import { useTranslation } from 'react-i18next';
import axios from 'axios';
import { DataGrid } from '@mui/x-data-grid';
import useStyles from "./styles";
import {
  Link,
} from "react-router-dom";
import PageTitle from "../../components/PageTitle/PageTitle";

export default function Dashboard() {
  const { t } = useTranslation();
  var classes = useStyles();

  const [dataService, setDataService] = useState([]);
  const [dataConstruction, setDataConstruction] = useState([]);

  useEffect(() => {
    loadServices();
    loadConstruction();
  }, []);

  const loadConstruction = async () => {
    const result = await axios.get('https://backend.omcloud.vn/api/construction');
    setDataConstruction(result.data.data);
  };

  const columnsConstruction = [
    { field: 'name', headerName: t('construction-name'), width: 250 },
    {
      field: 'service_id',
      headerName: t('Services'),
      width: 200,
      valueGetter: (params) => `${params.row.service.name}`
    },
    { field: 'address', headerName: t('construction-address'), width: 300 },
    {
      field: 'service_type',
      headerName: t('service-type'),
      width: 150,
      valueGetter: (params) => `${params.row.service_type.name}`
    },
    {
      field: 'hanhDong',
      headerName: t('Action'),
      width: 150,
      renderCell: (params) => {
        return (
          <div className={classes.buttonAction}>
            <Link to={"/app/edit-construction/" + params.row.id}>
              <button className={classes.dashboardListEdit}>View</button>
            </Link>
          </div>
        );
      }
    },
  ];

  const loadServices = async () => {
    const result = await axios.get('https://backend.omcloud.vn/api/service');
    setDataService(result.data.data);
  };

  const columnsService = [
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
              <button className={classes.dashboardListEdit}>View</button>
            </Link>
          </div>
        );
      }
    },
  ];

  return (
    <>
      <div style={{ height: 300, width: '100%' }}>
        <PageTitle title={t("Constructions-List")} />
        <DataGrid
          rows={dataConstruction}
          columns={columnsConstruction}
          pageSize={5}
          disableSelectionOnClick
          className={classes.dashboardData}
        />
      </div>

      <div style={{ height: 300, width: '100%', marginTop: '8%' }}>
        <PageTitle title={t("Services-List")} />
        <DataGrid
          rows={dataService}
          columns={columnsService}
          pageSize={5}
          disableSelectionOnClick
          className={classes.dashboardData}
        />
      </div>
    </>
  )
}
