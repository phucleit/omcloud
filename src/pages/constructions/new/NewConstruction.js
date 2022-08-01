import React, { useState, useEffect } from "react";
import { Button } from "@material-ui/core";
import PageTitle from "../../../components/PageTitle/PageTitle";
import useStyles from "./styles";
import { useTranslation } from 'react-i18next';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import Autocomplete from '@mui/material/Autocomplete';
import { Box } from '@mui/system';

import {
  useHistory,
} from "react-router-dom";
import axios from 'axios';
import './custom.css'

export default function NewConstruction() {
  var classes = useStyles();
  let history = useHistory();
  const { t } = useTranslation()
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [representative, setRepresentative] = useState('');
  const [representative_tel, setRepresentativeTel] = useState('');
  const [representative_mail, setRepresentativeMail] = useState('');

  const [service, setService] = useState([]);
  const [serviceID, setServiceID] = useState();

  const [serviceType, setServiceType] = useState([]);
  const [serviceTypeID, setServiceTypeID] = useState('');
  
  const [city, setCity] = useState([]);
  const [cityID, setCityID] = useState('');

  const [staffID, setStaffID] = useState('');

  const [status, setStatus] = useState([]);
  const [statusID, setStatusID] = useState('');

  const [user, setUser] = useState([]);

  const [permission, setPermission] = useState(false)
  useEffect(() => {
    loadServicesType();
    loadServices();
    loadCity();
    loadUser();
    loadStatus();

    if (localStorage.abilities.includes("construction-create"))
      setPermission(true)
    else setPermission(false)
  }, []);

  const loadUser = async () => {
    const result = await axios.get('https://backend.omcloud.vn/api/user');
    setUser(result.data.data);
  };

  const loadCity = async () => {
    const result = await axios.get('https://backend.omcloud.vn/api/city?limit=100');
    setCity(result.data.data);
  };

  const City = city.map(City => City);

  const handleCityChange = (e) => {
    setCityID(e.target.value);
  }

  const loadServices = async () => {
    const result = await axios.get('https://backend.omcloud.vn/api/service');
    setService(result.data.data);
  };

  const Service = service.map(Service => Service);

  const handleServiceChange = (e) => {
    setServiceID(e.target.value);
  }

  const loadServicesType = async () => {
    const result = await axios.get('https://backend.omcloud.vn/api/service-type');
    setServiceType(result.data.data);
  };

  const Type = serviceType.map(Type => Type.name)

  const handleTypeChange = (e) => {
    setServiceTypeID(e.target.value);
  }

  const loadStatus = async () => {
    const result = await axios.get('https://backend.omcloud.vn/api/status');
    setStatus(result.data.data);
  };

  const Status = status.map(Status => Status);

  const handleStatusChange = (e) => {
    setStatusID(e.target.value);
  }

  const handleAddConstruction = (e) => {
    e.preventDefault();

    if (name === "") {
      alert("Vui lòng nhập tên công trình");
      return;
    } else if (address === "") {
      alert("Vui lòng nhập địa điểm");
      return;
    } else if (representative === "") {
      alert("Vui lòng nhập họ tên đại diện");
      return;
    } else {
      const newConstruction = {
        address: address,
        city_id: cityID,
        name: name,
        representative: representative,
        representative_tel: representative_tel,
        representative_mail: representative_mail,
        service_id: serviceID,
        service_type_id: serviceTypeID,
        staffs: [staffID],
        status: statusID
      };

      const config = {
        method: 'post',
        url: 'https://backend.omcloud.vn/api/construction',
        headers: { 
            'Authorization': 'Bearer 10|wrpJyOOlFaGAbvXyOsSvHJQbpYmP0HiPi2KVMck4', 
            'Content-Type': 'application/json'
        },
        data: newConstruction
      };

      axios(config)
        .then(res => {
          alert('Thêm công trình thành công!');
          history.push('/app/constructions');
        })
        .catch(error => console.log(error));
    }
  }


  return (
    <>
      {
        permission ?
          <>
            <PageTitle title={t('Constructions-Add')} />
            <div className={classes.newConstructionForm}>
              <div className="row">
                <div className="col medium-4 small-12 large-4">
                  <div className={classes.newConstructionItem}>
                    <label className={classes.label}>{t('construction-name')}</label>
                    <input type="text" name="tencongtrinh" className={classes.inputName} value={name} onChange={(e) => setName(e.target.value)} placeholder={t('construction-name-enter')} />
                  </div>
                </div>
                <div className="col medium-4 small-12 large-4">
                  <div className={classes.newConstructionItem}>
                    <label className={classes.label}>{t('construction-address')}</label>
                    <input type="text" name="diadiem" className={classes.inputName} value={address} onChange={(e) => setAddress(e.target.value)} placeholder={t('construction-address-enter')} />
                  </div>
                </div>
                <div className="col medium-4 small-12 large-4">
                  <div className={classes.newConstructionItem}>
                    <label className={classes.label}>{t('City')}</label>
                    <select
                      onChange={e => handleCityChange(e)}
                      className={classes.newConstructionType}
                      id="newConstructionType"
                    >
                      <option>-----</option>
                      {
                        City.map((name, key) => <option key={key + 1} value={name.id}>{name.name}</option>)
                      }
                    </select>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col medium-6 small-12 large-6">
                  <div className={classes.newConstructionItem}>
                    <label className={classes.label}>{t('client-name')}</label>
                    <input type="text" name="hotendaidien" className={classes.inputName} value={representative} onChange={(e) => setRepresentative(e.target.value)} placeholder={t('client-name-enter')} />
                  </div>
                </div>
                <div className="col medium-6 small-12 large-6">
                  <div className={classes.newConstructionItem}>
                    <label className={classes.label}>{t('client-phone')}</label>
                    <input type="tel" name="dienthoaidaidien" className={classes.inputName} value={representative_tel} onChange={(e) => setRepresentativeTel(e.target.value)} placeholder={t('client-phone-enter')} />
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col medium-6 small-12 large-6">
                  <div className={classes.newConstructionItem}>
                    <label className={classes.label}>{t('client-email')}</label>
                    <input type="email" name="representative_mail" className={classes.inputName} value={representative_mail} onChange={(e) => setRepresentativeMail(e.target.value)} placeholder={t('client-email-enter')} />
                  </div>
                </div>
                <div className="col medium-6 small-12 large-6">
                  <div className={classes.newConstructionItem}>
                    <label className={classes.label}>{t('in-charge')}</label>
                    <Autocomplete
                      // multiple
                      id="list_complete_2"
                      onChange={(e) => {
                        setStaffID(e.target.value);
                      }}
                      getOptionLabel={(user) => `${user.name}`}
                      options={user}
                      isOptionEqualToValue={(option, value) => 
                        option.name === value.name
                      }
                      renderOption={(props, user) => (
                        <Box component="li" {...props} value={user.id} key={user.id}>{user.name}</Box>
                      )}
                      renderInput={(params) => <TextField {...params} label={t('in-charge-enter')} />}
                    />
                   </div>
                </div>
              </div>
              <div className="row">
                <div className="col medium-4 small-12 large-4">
                  <div className={classes.newConstructionItem}>
                    <label className={classes.label}>{t('Services')}</label>
                    <select
                      onChange={e => handleServiceChange(e)}
                      className={classes.newConstructionType}
                      id="newConstructionType"
                    >
                      <option>-----</option>
                      {
                        Service.map((name, key) => <option key={key + 1} value={name.id}>{name.name}</option>)
                      }
                    </select>
                  </div>
                </div>
                <div className="col medium-4 small-12 large-4">
                  <div className={classes.newConstructionItem}>
                    <label className={classes.label}>{t('service-type')}</label>
                    <select
                      onChange={e => handleTypeChange(e)}
                      className={classes.newConstructionType}
                      id="newConstructionType"
                    >
                      <option>-----</option> 
                      {
                        Type.map((name, key) => <option key={key + 1} value={key + 1}>{name}</option>)
                      }
                    </select>
                  </div>
                </div>
                <div className="col medium-4 small-12 large-4">
                  <div className={classes.newConstructionItem}>
                    <label className={classes.label}>{t('Status')}</label>
                    <select
                      onChange={e => handleStatusChange(e)}
                      className={classes.newConstructionType}
                      id="newConstructionType"
                    >
                      <option>-----</option> 
                      {
                        Status.map((name, key) => <option key={key + 1} value={name.id}>{name.name}</option>)
                      }
                    </select>
                  </div>
                </div>
              </div>
              <Button
                variant="contained"
                size="medium"
                color="secondary"
                className={classes.newConstructionBtn}
                onClick={handleAddConstruction}
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