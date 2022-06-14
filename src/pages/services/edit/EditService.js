import React, { useState, useEffect } from "react";
import { Button } from "@material-ui/core";
import PageTitle from "../../../components/PageTitle/PageTitle";
import useStyles from "./styles";
import axios from 'axios';
import {
  useHistory,
  useParams,
} from "react-router-dom";
import { useTranslation } from 'react-i18next';

const url = 'https://backend.omcloud.vn/api/service';

export default function EditService() {
  var classes = useStyles();
  let history = useHistory();
  const { t } = useTranslation()

  const paramId = useParams();
  const currentServiceId = paramId.id;

  const [serviceType, setServiceType] = useState([]);
  const [serviceName, setServiceName] = useState('');
  const [serviceTypeName, setServiceTypeName] = useState('');
  const [permission, setPermission] = useState(false)
  useEffect(() => {
    loadServicesType();
    loadService();
    if (localStorage.abilities.includes("service-update"))
      setPermission(true)
    else setPermission(false)
  }, []);

  const loadServicesType = async () => {
    const result = await axios.get('https://backend.omcloud.vn/api/service-type');
    setServiceType(result.data.data);
  };
  const Type = serviceType.map(Type => Type.name)

  const loadService = async () => {
    const result = await axios.get(url + '/' + currentServiceId);
    setServiceName(result.data.data.name);
    setServiceTypeName(result.data.data.service_type.id);
  };

  const handleTypeChange = (e) => {
    setServiceTypeName(e.target.value);
  }

  const handleServiceNameChange = (e) => {
    setServiceName(e.target.value);
  }

  const handleEditService = (e) => {
    e.preventDefault();
    if (serviceName === "") {
      alert("Vui lòng nhập tên dịch vụ");
      return;
    }

    const editService = {
      name: serviceName,
      type_id: parseInt(serviceTypeName),
    }

    axios.put(url + '/' + currentServiceId, editService)
      .then(res => {
        alert('Cập nhật dịch vụ thành công!');
        history.push('/app/services');
      })
      .catch(error => console.log(error));
  }

  return (
    <>
      {
        permission ?
          <>
            <PageTitle title="Cập nhật dịch vụ" />
            <div className={classes.newServiceForm}>
              <div className={classes.newServiceItem}>
                <label className={classes.label}>{t('service-name')}</label>
                <input type="text" name="tendichvu" className={classes.inputName} value={serviceName} onChange={handleServiceNameChange} placeholder={t('service-name-enter')} />
              </div>
              <div className={classes.newServiceItem}>
                <label className={classes.label}>{t('service-type')}</label>
                <select
                  onChange={e => handleTypeChange(e)}
                  className={classes.newServiceType}
                  id="newServiceType"
                  value={serviceTypeName}
                >
                  <option>-----</option>
                  {
                    Type.map((name, key) => <option key={key + 1} value={key + 1}>{name}</option>)
                  }
                </select>
              </div>
              <Button
                variant="contained"
                size="medium"
                color="secondary"
                className={classes.newServiceBtn}
                onClick={handleEditService}
              >
                {t('btn-update')}
              </Button>
            </div>
          </>
          :
          <div>{t('not-permission')} !</div>
      }
    </>

  );
}