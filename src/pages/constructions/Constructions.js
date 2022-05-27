import React, { useState, useEffect } from "react";
import { useTranslation } from 'react-i18next';

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
import PageTitle from "../../components/PageTitle/PageTitle";
import useStyles from "./styles";

const url_construction = `https://backend.omcloud.vn/api/construction/`;

export default function ConstructionsPage() {
  var classes = useStyles();
  const [query, setQuery] = useState('');
  const { t } = useTranslation()
  const [data, setData] = useState([]);
  const [status, setStatus] = useState([]);
  const [service, setService] = useState([]);
  const [serviceType, setServiceType] = useState([]);

  useEffect(() => {
    loadConstruction();
    loadServicesType();
    loadServices();
    loadStatus();
  }, []);

  const loadConstruction = async () => {
    const result = await axios.get('https://backend.omcloud.vn/api/construction');
    setData(result.data.data);
  };

  const loadStatus = async () => {
    const result = await axios.get('https://backend.omcloud.vn/api/status');
    setStatus(result.data.data);
  };

  const Status = status.map(Status => Status);

  const loadServices = async () => {
    const result = await axios.get('https://backend.omcloud.vn/api/service');
    setService(result.data.data);
  };

  const Service = service.map(Service => Service);

  const loadServicesType = async () => {
    const result = await axios.get('https://backend.omcloud.vn/api/service-type');
    setServiceType(result.data.data);
  };

  const Type = serviceType.map(Type => Type.name)

  const handleDelete = (id) => {
    if (window.confirm('Bạn có muốn xóa không?')) {
      axios.delete(url_construction + id)
        .then(res => {
          setData(data.filter((item) => item.id !== id));
        })
        .catch(error => console.log(error));
    }
  }

  const columns = [
    // { field: 'id', headerName: 'ID', width: 70 },
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
              <button className={classes.constructionListEdit}>Edit</button>
            </Link>
            <DeleteOutline className={classes.constructionListDelete} onClick={() => handleDelete(params.row.id)} />
          </div>
        );
      }
    },
  ];

  const search = (rows) => {
    return rows.filter(
      (constructions) =>
        constructions.name.toLowerCase().indexOf(query) > -1 ||
        constructions.name.indexOf(query) > -1 ||
        constructions.service.name.toLowerCase().indexOf(query) > -1 ||
        constructions.service.name.indexOf(query) > -1 ||
        constructions.address.toLowerCase().indexOf(query) > -1 ||
        constructions.address.indexOf(query) > -1 ||
        constructions.service_type.name.toLowerCase().indexOf(query) > -1 ||
        constructions.service_type.name.indexOf(query) > -1
    );
  }

  return (
    <>
      <PageTitle title={t("Constructions-List")} />
      <div className={classes.boxSearch}>
        <select
          className={classes.newStatusType}
          id="newConstructionType"
        >
          <option>---{t('Status')}---</option>
          {
            Status.map((name, key) => <option key={key + 1} value={name.id}>{name.name}</option>)
          }
        </select>
        <select
          className={classes.newConstructionType}
          id="newConstructionType"
        >
          <option>---{t('Services')}---</option>
          {
            Service.map((name, key) => <option key={key + 1} value={name.id}>{name.name}</option>)
          }
        </select>
        <select
          className={classes.newConstructionType}
          id="newConstructionType"
          >
          <option>---{t('service-type')}---</option>
          {
            Type.map((name, key) => <option key={key + 1} value={key + 1}>{name}</option>)
          }
        </select>
        <input type="text" className={classes.searchTerm} placeholder={t('Search-input')} onChange={e => setQuery(e.target.value)} />
        <Link to="/app/new-construction">
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
        className={classes.constructionData}
      />
    </>
  );
}
