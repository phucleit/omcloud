import React, { useState, useEffect } from "react";
import { Button } from "@material-ui/core";
import PageTitle from "../../../components/PageTitle/PageTitle";
import useStyles from "./styles";
import {
  useHistory,
  useParams,
} from "react-router-dom";
import axios from 'axios';
import { useTranslation } from 'react-i18next';
import {
    Link,
} from "react-router-dom";
import { DataGrid } from '@mui/x-data-grid';

import './custom.css';

const url = `https://backend.omcloud.vn/api/construction/`;

export default function EditConstruction() {
  var classes = useStyles();
  let history = useHistory();
  const { t } = useTranslation()

  const paramId = useParams();
  const currentContructionId = paramId.id;

  const [ permission, setPermission ] = useState(false);

  const [ name, setName ] = useState('');
  const [ address, setAddress ] = useState('');
  const [ representative, setRepresentative ] = useState('');
  const [ representative_tel, setRepresentativeTel ] = useState('');
  const [ representative_mail, setRepresentativeMail ] = useState('');

  const [city, setCity] = useState([]);
  const [status, setStatus] = useState([]);
  const [service, setService] = useState([]);
  const [serviceType, setServiceType] = useState([]);

  useEffect(() => {
    loadConstruction();
    loadCity();
    loadStatus();
    loadServices();
    loadServicesType();
    if (localStorage.abilities.includes("construction-update"))
      setPermission(true)
    else setPermission(false)
  }, []);

  const loadConstruction = async () => {
    const result = await axios.get(url + currentContructionId);
    setName(result.data.data.name);
    setAddress(result.data.data.address);
    setRepresentative(result.data.data.representative);
    setRepresentativeTel(result.data.data.representative_tel);
    setRepresentativeMail(result.data.data.representative_mail);
  };

  const loadCity = async () => {
    const result = await axios.get(
      'https://backend.omcloud.vn/api/city?limit=100',
      {
        headers: { 
          'Authorization': 'Bearer 10|wrpJyOOlFaGAbvXyOsSvHJQbpYmP0HiPi2KVMck4', 
          'Content-Type': 'application/json'
        },
      }
    );
    setCity(result.data.data);
  };

  const City = city.map(City => City);

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
    setStatus(result.data.data);
  };

  const Status = status.map(Status => Status);

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
    setService(result.data.data);
  };

  const Service = service.map(Service => Service);

  const loadServicesType = async () => {
    const result = await axios.get(
      'https://backend.omcloud.vn/api/service-type',
      {
        headers: { 
          'Authorization': 'Bearer 10|wrpJyOOlFaGAbvXyOsSvHJQbpYmP0HiPi2KVMck4', 
          'Content-Type': 'application/json'
        },
      }
    );
    setServiceType(result.data.data);
  };

  const ServiceType = serviceType.map(ServiceType => ServiceType)

  const columns_status = [
    { field: 'period', headerName: t('period'), width: 50 },
    { field: 'date', headerName: t('date'), width: 100 },
    { field: 'services', headerName: t('Services'), width: 150 },
    { field: 'service_type', headerName: t('service-type'), width: 150 },
    { field: 'status', headerName: t('Status'), width: 150 },
    { field: 'in_charge_enter', headerName: t('in-charge-enter'), width: 200 },
    { field: 'action', headerName: t('action-2'), width: 200 },
  ];

  const columns_history = [
    { field: 'date', headerName: t('date'), width: 100 },
    { field: 'services', headerName: t('Services'), width: 150 },
    { field: 'service_type', headerName: t('service-type'), width: 150 },
    { field: 'status', headerName: t('Status'), width: 150 },
    { field: 'in_charge_enter', headerName: t('in-charge-enter'), width: 200 },
    { field: 'action', headerName: t('action-2'), width: 200 },
  ];

  return (
    <>
      {
        permission ?
          <>
            <PageTitle title={t('construction-detail')} />
            <div className="info-construction">
                <p><strong>{t('construction-name-enter')}:</strong> {name}</p>
                <p><strong>{t('address')}:</strong> {address}</p>
                <p><strong>{t('client-name')}:</strong> {representative}</p>
                <p><strong>{t('client-phone')}:</strong> {representative_tel}</p>
                <p><strong>{t('client-email')}:</strong> {representative_mail}</p>
            </div>
            <div className={classes.boxSearch}>
                <select
                    className={classes.newStatusType}
                    id="newConstructionType"
                >
                    <option>---{t('City')}---</option>
                    {
                        City.map((name, key) => <option key={key + 1} value={name.name}>{name.name}</option>)
                    }
                </select>
                <select
                    className={classes.newConstructionType}
                    id="newConstructionType"
                >
                    <option>---{t('Status')}---</option>
                    {
                        Status.map((name, key) => <option key={key + 1} value={name.name}>{name.name}</option>)
                    }
                </select>
                <select
                    onChange={(e) => handleServiceChange(e.target.value)}
                    className={classes.newConstructionType}
                    id="newConstructionType"
                >
                    <option>---{t('Services')}---</option>
                    {
                        Service.map((name, key) => <option key={key + 1} value={name.name}>{name.name}</option>)
                    }
                </select>
                <select
                    onChange={(e) => handleServiceTypeChange(e.target.value)}
                    className={classes.newConstructionType}
                    id="newConstructionType"
                >
                    <option>---{t('service-type')}---</option>
                    {
                        ServiceType.map((name, key) => <option key={key + 1} value={name.name}>{name.name}</option>)
                    }
                </select>
                <input type="search" className={classes.searchTerm} placeholder={t('Search-input')} onChange={e => setQuery(e.target.value)} />
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
            <div className="tinh-trang">
                <h5>{t('current-status')}</h5>
                <DataGrid
                    rows={''}
                    columns={columns_status}
                    pageSize={30}
                    rowsPerPageOptions={[30]}
                    disableSelectionOnClick
                    className={classes.constructionData}
                />
            </div>

            <div className="tinh-trang">
                <h5>{t('current-history')}</h5>
                <DataGrid
                    rows={''}
                    columns={columns_history}
                    pageSize={30}
                    rowsPerPageOptions={[30]}
                    disableSelectionOnClick
                    className={classes.constructionData}
                />
            </div>
            
          </> :
          <div>{t('not-permission')} !</div>
      }
    </>

  );
}