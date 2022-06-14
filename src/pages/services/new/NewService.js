import React, { useState, useEffect } from "react";
import { Button } from "@material-ui/core";
import PageTitle from "../../../components/PageTitle/PageTitle";
import useStyles from "./styles";
import axios from 'axios';
import { useTranslation } from 'react-i18next';
import {
  useHistory,
} from "react-router-dom";

const URL_SERVICE_TYPE = 'https://backend.omcloud.vn/api/service-type';
const URL_ADD_SERVICE = 'https://backend.omcloud.vn/api/service';

export default function NewService() {
  var classes = useStyles();
  let history = useHistory();
  const { t } = useTranslation()
  const [serviceType, setServiceType] = useState([]);
  const [serviceTypeID, setServiceTypeID] = useState('');
  const [serviceName, setServiceName] = useState('');
  const [permission, setPermission] = useState(false)
  useEffect(() => {
    loadServicesType();
    if (localStorage.abilities.includes("service-create"))
      setPermission(true)
    else setPermission(false)
  }, []);

  const loadServicesType = async () => {
    const result = await axios.get(URL_SERVICE_TYPE);
    setServiceType(result.data.data);
  };

  const Type = serviceType.map(Type => Type.name)

  const handleTypeChange = (e) => {
    setServiceTypeID(e.target.value);
  }

  const handleAddService = (e) => {
    e.preventDefault();
    if (serviceName === "") {
      alert("Vui lòng nhập tên dịch vụ");
      return;
    }

    const newService = {
      name: serviceName,
      type_id: serviceTypeID,
    }

    axios.post(URL_ADD_SERVICE, newService)
      .then(res => {
        alert('Thêm dịch vụ thành công!');
        history.push('/app/services');
      })
      .catch(error => console.log(error));
  }

  return (
    <>
      {
        permission ?
          <>
            <PageTitle title={t('Services-Add')} />
            <div className={classes.newServiceForm}>
              <div className={classes.newServiceItem}>
                <label className={classes.label}>{t('service-name')}</label>
                <input type="text" name="tendichvu" placeholder={t('service-name-enter')} className={classes.inputName} value={serviceName} onChange={(e) => setServiceName(e.target.value)} />
              </div>
              <div className={classes.newServiceItem}>
                <label className={classes.label}>{t('service-type')}</label>
                <select
                  onChange={e => handleTypeChange(e)}
                  className={classes.newServiceType}
                  id="newServiceType"
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
                onClick={handleAddService}
              >
                {t('Add')}
              </Button>
            </div>
          </>
          : <div>{t('not-permission')} !</div>
      }
    </>

  );
}