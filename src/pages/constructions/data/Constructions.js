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
import PageTitle from "../../../components/PageTitle/PageTitle";
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
  const [filterServiceName, setFilterServiceName] = useState([]);
  const [serviceName, setServiceName] = useState('');
  const [filterServiceTypeName, setFilterServiceTypeName] = useState([]);
  const [serviceTypeName, setServiceTypeName] = useState('');

  const [city, setCity] = useState([]);

  useEffect(() => {
    loadConstruction();
    loadServicesType();
    loadServices();
    loadStatus();
    loadCity();
  }, []);

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

  const loadConstruction = async () => {
    const result = await axios.get(
      'https://backend.omcloud.vn/api/construction',
      {
        headers: { 
          'Authorization': 'Bearer 10|wrpJyOOlFaGAbvXyOsSvHJQbpYmP0HiPi2KVMck4', 
          'Content-Type': 'application/json'
        },
      }
    );
    setData(result.data.data);
  };

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

  const handleServiceChange = (value) => {
    setServiceName(value);
    const result = [];
    data.forEach(item => {
      if (item.service.name === value) 
        result.push(item);
      }
    );
    setFilterServiceName(result);
  }

  const handleServiceTypeChange = (value) => {
    setServiceTypeName(value);
    const result = [];
    data.forEach(item => {
      if (item.service_type.name === value) 
        result.push(item);
      }
    );
    setFilterServiceTypeName(result);
  }

  const handleDelete = (id) => {
    if (window.confirm('Bạn có muốn xóa không?')) {
      axios.delete(
        url_construction + id,
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
    { field: 'name', headerName: t('construction-name'), width: 210 },
    {
      field: 'service_type',
      headerName: t('service-type'),
      width: 150,
      valueGetter: (params) => `${params.row.service_type.name}`
    },
    {
      field: 'service_id',
      headerName: t('Services'),
      width: 200,
      valueGetter: (params) => `${params.row.service.name}`
    },
    { field: 'address', headerName: t('construction-address'), width: 300 },
    {
      field: 'status',
      headerName: t('Status'),
      width: 150,
      valueGetter: (params) => `${params.row.status.name}`
    },
    {
      field: 'contact',
      headerName: t('contact'),
      width: 350,
      renderCell: (params) => {
        return (
          <div>
            {params.row.representative_mail}/{params.row.representative_tel}/{params.row.representative}
          </div>
        );
      }
    },
    {
      field: 'hanhDong',
      headerName: t('Action'),
      width: 100,
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
      {
        serviceName.length !==0 &&  serviceName !== '---Dịch vụ---'
        ? <DataGrid
            rows={search(filterServiceName)}
            columns={columns}
            pageSize={30}
            rowsPerPageOptions={[30]}
            disableSelectionOnClick
            className={classes.constructionData}
          />
      : <DataGrid
          rows={search(data)}
          columns={columns}
          pageSize={30}
          rowsPerPageOptions={[30]}
          disableSelectionOnClick
          className={classes.constructionData}
        />
      }

      {/* {
        serviceTypeName.length !==0 &&  serviceTypeName !== '---Loại dịch vụ---'
        ? <DataGrid
            rows={search(filterServiceTypeName)}
            columns={columns}
            pageSize={5}
            rowsPerPageOptions={[5]}
            disableSelectionOnClick
            className={classes.constructionData}
          />
      : <DataGrid
          rows={search(data)}
          columns={columns}
          pageSize={5}
          rowsPerPageOptions={[5]}
          disableSelectionOnClick
          className={classes.constructionData}
        />
      } */}
      
    </>
  );
}
