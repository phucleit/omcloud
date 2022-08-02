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

const url = `https://backend.omcloud.vn/api/construction/`;

export default function EditConstruction() {
  var classes = useStyles();
  let history = useHistory();
  const { t } = useTranslation()

  const paramId = useParams();
  const currentContructionId = paramId.id;

  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [representative, setRepresentative] = useState('');
  const [representative_tel, setRepresentativeTel] = useState('');
  const [representative_mail, setRepresentativeMail] = useState('');
  const [person_in_charge, setPersonInCharge] = useState('');

  const [service, setService] = useState([]);
  const [serviceID, setServiceID] = useState();

  const [serviceType, setServiceType] = useState([]);
  const [serviceTypeID, setServiceTypeID] = useState('');

  const [status, setStatus] = useState([]);

  const [statusID, setStatusID] = useState('');

  const [permission, setPermission] = useState(false)
  useEffect(() => {
    loadConstruction();
    loadServicesType();
    loadServices();
    loadStatus();
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
    setPersonInCharge(result.data.data.person_in_charge);
    setServiceID(result.data.data.service_id);
    setServiceTypeID(result.data.data.service_type_id);
  };

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

  const handleStatusChange = (e) => {
    setStatusID(e.target.value);
  }
  
  const loadStatus = async () => {
    const result = await axios.get('https://backend.omcloud.vn/api/status');
    setStatus(result.data.data);
  };

  const Status = status.map(Status => Status);

  const handleEditConstruction = (e) => {
    e.preventDefault();

    if (name === "") {
      alert("Vui lòng nhập tên dịch vụ");
      return;
    } else if (address === "") {
      alert("Vui lòng nhập địa điểm");
      return;
    } else if (representative === "") {
      alert("Vui lòng nhập họ tên đại diện");
      return;
    } else if (representative_tel === "") {
      alert("Vui lòng nhập số điện thoại");
      return;
    } else if (representative_mail === "") {
      alert("Vui lòng nhập email");
      return;
    } else if (person_in_charge === "") {
      alert("Vui lòng nhập nhân sự phụ trách");
      return;
    } else {
      const editConstruction = {
        name: name,
        address: address,
        representative: representative,
        representative_tel: representative_tel,
        representative_mail: representative_mail,
        person_in_charge: person_in_charge,
        service_id: serviceID,
        service_type_id: serviceTypeID,
        status: serviceTypeID
      };

      const config = {
        method: 'put',
        url: url + currentContructionId,
        headers: { 
            'Authorization': 'Bearer 10|wrpJyOOlFaGAbvXyOsSvHJQbpYmP0HiPi2KVMck4', 
            'Content-Type': 'application/json'
        },
        data: editConstruction
      };

      axios(config)
        .then(res => {
          alert('Cập nhật công trình thành công!');
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
            <PageTitle title="Cập nhật công trình" />
            <div className={classes.newConstructionForm}>
              <div className="row">
                <div className="col medium-6 small-12 large-6">
                  <div className={classes.newConstructionItem}>
                    <label className={classes.label}>{t('construction-name')}</label>
                    <input type="text" name="tencongtrinh" className={classes.inputName} value={name} onChange={(e) => setName(e.target.value)} placeholder={t('construction-name-enter')} />
                  </div>
                </div>
                <div className="col medium-6 small-12 large-6">
                  <div className={classes.newConstructionItem}>
                    <label className={classes.label}>{t('construction-address')}</label>
                    <input type="text" name="diadiem" className={classes.inputName} value={address} onChange={(e) => setAddress(e.target.value)} placeholder={t('construction-address-enter')} />
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
                    <input type="email" name="emaildaidien" className={classes.inputName} value={representative_mail} onChange={(e) => setRepresentativeMail(e.target.value)} placeholder={t('client-email-enter')} />
                  </div>
                </div>
                <div className="col medium-6 small-12 large-6">
                  <div className={classes.newConstructionItem}>
                    <label className={classes.label}>{t('in-charge')}</label>
                    <input type="text" name="nhansuphutrach" className={classes.inputName} value={person_in_charge} onChange={(e) => setPersonInCharge(e.target.value)} placeholder={t('in-charge-enter')} />
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col medium-6 small-12 large-6">
                  <div className={classes.newConstructionItem}>
                    <label className={classes.label}>{t('Services')}</label>
                    <select
                      onChange={e => handleServiceChange(e)}
                      className={classes.newConstructionType}
                      id="newConstructionType"
                      value={serviceID}
                    >
                      <option>-----</option>
                      {
                        Service.map((name, key) => <option key={key + 1} value={name.id}>{name.name}</option>)
                      }
                    </select>
                  </div>
                </div>
                <div className="col medium-6 small-12 large-6">
                  <div className={classes.newConstructionItem}>
                    <label className={classes.label}>{t('service-type')}</label>
                    <select
                      onChange={e => handleTypeChange(e)}
                      className={classes.newConstructionType}
                      id="newConstructionType"
                      value={serviceTypeID}
                    >
                      <option>-----</option>
                      {
                        Type.map((name, key) => <option key={key + 1} value={key + 1}>{name}</option>)
                      }
                    </select>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col medium-6 small-12 large-6">
                  <div className={classes.newConstructionItem}>
                    <label className={classes.label}>{t('Status')}</label>
                    <select
                      onChange={e => handleStatusChange(e)}
                      className={classes.newConstructionType}
                      id="newConstructionType"
                    >
                      <option>-----</option>
                      {
                        Status.map((name, key) => <option key={name.id} value={name.id}>{name.name}</option>)
                      }
                    </select>
                  </div>
                </div>
                <div className="col medium-6 small-12 large-6"></div>
              </div>
              <Button
                variant="contained"
                size="medium"
                color="secondary"
                className={classes.newConstructionBtn}
                onClick={handleEditConstruction}
              >
                {t('btn-update')}
              </Button>
            </div>
          </> :
          <div>{t('not-permission')} !</div>
      }
    </>

  );
}