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
const url_report = `https://backend.omcloud.vn/api/report`;

export default function DetailConstruction() {
  var classes = useStyles();
  let history = useHistory();
  const { t } = useTranslation();

  const paramId = useParams();
  const detailContructionId = paramId.id;

  const [ permission, setPermission ] = useState(false);

  const [ name, setName ] = useState('');
  const [ address, setAddress ] = useState('');
  const [ cityName, setCityName ] = useState('');
  const [ representative, setRepresentative ] = useState('');
  const [ representative_tel, setRepresentativeTel ] = useState('');
  const [ representative_mail, setRepresentativeMail ] = useState('');

  const [ city, setCity ] = useState([]);
  const [ status, setStatus ] = useState([]);
  const [ service, setService ] = useState([]);
  const [ serviceType, setServiceType ] = useState([]);

  const [ report, setReport ] = useState([]);
  const [ statusID, setStatusID ] = useState('');

  useEffect(() => {
    loadConstruction();
    loadCity();
    loadStatus();
    loadServices();
    loadServicesType();
    loadReport();
    if (localStorage.abilities.includes("construction-update"))
      setPermission(true)
    else setPermission(false)
  }, []);

  const loadConstruction = async () => {
    const result = await axios.get(url + detailContructionId);
    setName(result.data.data.name);
    setAddress(result.data.data.address);
    setCityName(result.data.data.city.name);
    setRepresentative(result.data.data.representative);
    setRepresentativeTel(result.data.data.representative_tel);
    setRepresentativeMail(result.data.data.representative_mail);
  };

  const loadReport = async () => {
    const result = await axios.get(
      `${url_report}?construction_id=${detailContructionId}`,
      {
        headers: { 
          'Authorization': 'Bearer 10|wrpJyOOlFaGAbvXyOsSvHJQbpYmP0HiPi2KVMck4', 
          'Content-Type': 'application/json'
        },
      }
    );
    setReport(result.data.data);
    result.data.data.forEach(item => {
      setStatusID(item.status);
    });
  }

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

  const handleAddReport = async () => {
    history.push('/app/new-report?id=' + detailContructionId);
  }

  return (
    <>
      {
        permission ?
          <>
            <PageTitle title={t('construction-detail')} />
            <div className="info-construction">
                <p><strong>{t('construction-name-enter')}:</strong> {name}</p>
                <p><strong>{t('address')}:</strong> {address}, {cityName}</p>
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
                <Button
                    variant="contained"
                    size="medium"
                    color="secondary"
                    className="btn-update"
                    onClick={() => handleAddReport()}
                >
                  {t("Add-List-Report")}
                </Button>
            </div>
            <div className="tinh-trang">
                <h5>{t('current-status')}</h5>
                <tbody>
                  <tr className="">
                    <th>{t("date")}</th>
                    <th>{t("Services")}</th>
                    <th>{t("service-type")}</th>
                    <th>{t("Status")}</th>
                    <th>{t("action-2")}</th>
                    <th>{t("period")}</th>
                </tr>
                {report.map((item, i) =>
                  <tr key={i}>
                    <td>{new Date(item.publish_day).toLocaleDateString()}</td>
                    <td>{item.construction.service.name}</td>
                    <td>{item.construction.service_type.name}</td>
                    {
                      item.status == 5 && <td>{t("Surveying")}</td>
                    }
                    {
                      item.status == 6 && <td>{t("Processing")}</td>
                    }
                    {
                      item.status == 3 && <td>{t("Accomplished")}</td>
                    }
                    <td>
                      <Link to={"/app/edit-construction/" + item.construction.id}>
                        <Button
                          variant="contained"
                          size="small"
                          color="secondary"
                          className="btn-update"
                        >
                          {t("btn-update")}
                        </Button>
                      </Link>
                    </td>
                    <td>{item.period}</td>
                  </tr>
                )}
                </tbody>
            </div>

            {
              statusID == 3 ?
              <>
                <div className="tinh-trang">
                  <h5>{t('current-history')}</h5>
                  
                </div>
              </> : <div></div>
            }
            
            
          </> :
          <div>{t('not-permission')} !</div>
      }
    </>

  );
}