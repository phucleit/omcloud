import React, { useState, useEffect } from "react";
import {
  Button
} from "@material-ui/core";
import axios from 'axios';
import {
  useHistory,
  useParams,
} from "react-router-dom";
import { useTranslation } from 'react-i18next';

// components
import PageTitle from "../../../../components/PageTitle/PageTitle";
import useStyles from "./styles";

const url = `https://backend.omcloud.vn/api/user/`;

export default function EditUser() {
  var classes = useStyles();
  let history = useHistory();
  const { t } = useTranslation()

  const paramId = useParams();
  const currentUserId = paramId.id;

  const [checked, setChecked] = useState(false);

  const [roles, setRoles] = useState([]);
  const [roleID, setRoleID] = useState('');

  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [tel, setTel] = useState('');

  const [password, setPassword] = useState('');
  const [rePassword, setRePassword] = useState('');

  const [permission, setPermission] = useState(false)
  useEffect(() => {
    loadUser();
    loadRoles();
    if (localStorage.abilities.includes("user-update"))
      setPermission(true)
    else setPermission(false)
  }, []);

  const loadUser = async () => {
    const result = await axios.get(url + currentUserId);
    setName(result.data.data.name);
    setUsername(result.data.data.username);
    setEmail(result.data.data.email);
    setTel(result.data.data.tel);
    setRoleID(result.data.data.role_id);
  };

  const loadRoles = async () => {
    const result = await axios.get(
      'https://backend.omcloud.vn/api/role',
      {
        headers: { 
          'Authorization': 'Bearer 10|wrpJyOOlFaGAbvXyOsSvHJQbpYmP0HiPi2KVMck4', 
          'Content-Type': 'application/json'
        },
      }
    );
    setRoles(result.data.data);
  };

  const Role = roles.map(Role => Role)

  const handleRolesChange = (e) => {
    setRoleID(e.target.value);
  }

  const handleEditUser = (e) => {
    e.preventDefault();
    if (name === "") {
      alert("Vui lòng nhập họ tên");
      return;
    }

    if (username === "") {
      alert("Vui lòng nhập username");
      return;
    }

    if (email === "") {
      alert("Vui lòng nhập email");
      return;
    }

    if (tel === "") {
      alert("Vui lòng nhập số điện thoại");
      return;
    }

    if (checked === true && password === "") {
      alert("Vui lòng nhập mật khẩu");
      return;
    }

    if (checked === true && rePassword === "") {
      alert("Vui lòng nhập lại mật khẩu");
      return;
    }

    if (checked === true && password !== rePassword) {
      alert("Mật khẩu không trùng khớp");
      return;
    }

    const newUser = {
      name: name,
      username: username,
      email: email,
      tel: tel,
      role_id: roleID,
      password: password
    };

    const config = {
      method: 'put',
      url: 'https://backend.omcloud.vn/api/user/' + currentUserId,
      headers: { 
          'Authorization': 'Bearer 10|wrpJyOOlFaGAbvXyOsSvHJQbpYmP0HiPi2KVMck4', 
          'Content-Type': 'application/json'
      },
      data: newUser
    };

    axios(config)
      .then(res => {
        alert('Cập nhật tài khoản thành công!');
        history.push('/app/users');
      })
      .catch(error => console.log(error));
  }

  return (
    <>
      {
        permission ?
          <>
            <PageTitle title="Cập nhật tài khoản" />
            <div className={classes.newUserForm}>
              <div className="row">
                <div className="col medium-6 small-12 large-6">
                  <div className={classes.newUserItem}>
                    <label className={classes.label}>{t('Fullname')}</label>
                    <input type="text" name="name" className={classes.inputName} value={name} onChange={(e) => setName(e.target.value)} placeholder={t('Fullname-enter')} />
                  </div>
                </div>
                <div className="col medium-6 small-12 large-6">
                  <div className={classes.newUserItem}>
                    <label className={classes.label}>{t('Username')}</label>
                    <input type="text" disabled name="username" className={classes.inputName} value={username} onChange={(e) => setUsername(e.target.value)} placeholder={t('Username-enter')} />
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col medium-6 small-12 large-6">
                  <div className={classes.newUserItem}>
                    <label className={classes.label}>Email</label>
                    <input type="email" name="email" className={classes.inputName} value={email} onChange={(e) => setEmail(e.target.value)} placeholder={t('Email-enter')} />
                  </div>
                </div>
                <div className="col medium-6 small-12 large-6">
                  <div className={classes.newUserItem}>
                    <label className={classes.label}>{t('Role')}</label>
                    <select
                      onChange={e => handleRolesChange(e)}
                      className={classes.newUserType}
                      id="newUserType"
                      value={roleID}
                    >
                      <option>-----</option>
                      {
                        Role.map((value, key) => <option key={value.id} value={value.id}>{value.title}</option>)
                      }
                    </select>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col medium-6 small-12 large-6">
                  <div className={classes.newUserItem}>
                    <label className={classes.label}>{t('Phone')}</label>
                    <input type="tel" name="tel" className={classes.inputName} value={tel} onChange={(e) => setTel(e.target.value)} placeholder={t('Phone-enter')} />
                  </div>
                </div>
                <div className="col medium-6 small-12 large-6"></div>
              </div>
              {
                checked ?
                  <div className="row">
                    <div className="col medium-6 small-12 large-6">
                      <div className={classes.newUserItem}>
                        <label className={classes.label}>{t('Password')}</label>
                        <input type="password" name="password" className={classes.inputName} value={password} onChange={(e) => setPassword(e.target.value)} placeholder={t('Password-enter')} />
                      </div>
                    </div>
                    <div className="col medium-6 small-12 large-6">
                      <div className={classes.newUserItem}>
                        <label className={classes.label}>{t('Re-Password')}</label>
                        <input type="password" name="re_password" className={classes.inputName} value={rePassword} onChange={(e) => setRePassword(e.target.value)} placeholder={t('Re-Password-enter')} />
                      </div>
                    </div>
                  </div> : ''
              }
              <div className="row">
                <div className="col medium-12 small-12 large-12" style={{marginTop: '15px'}}>
                  <label>
                    <input type="checkbox"
                      defaultChecked={checked}
                      onChange={() => setChecked(!checked)}
                    /> {t('change-password')}
                  </label>  
                </div>
              </div>
              <Button
                variant="contained"
                size="medium"
                color="secondary"
                className={classes.newUserBtn}
                onClick={handleEditUser}
              >
                {t('btn-update')}
              </Button>
            </div>
          </>
          : <div>{t('not-permission')} !</div>
      }
    </>

  );
}
