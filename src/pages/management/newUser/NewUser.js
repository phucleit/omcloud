import React, { useState, useEffect } from "react";
import {
  Button
} from "@material-ui/core";
import axios from 'axios';
import {
  useHistory,
} from "react-router-dom";

// components
import PageTitle from "../../../components/PageTitle/PageTitle";
import useStyles from "./styles";
import { useTranslation } from 'react-i18next';

export default function NewUser() {
  const { t } = useTranslation()

  var classes = useStyles();
  let history = useHistory();

  const [roles, setRoles] = useState([]);
  const [roleID, setRoleID] = useState('');

  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [tel, setTel] = useState('');
  const [permission, setPermission] = useState(false)
  useEffect(() => {
    loadRoles();
    if (localStorage.abilities.includes("user-create"))
      setPermission(true)
    else setPermission(false)
  }, []);

  const loadRoles = async () => {
    const result = await axios.get('https://backend.omcloud.vn/api/role');
    setRoles(result.data.data);
  };

  const Role = roles.map(Role => Role)

  const handleRolesChange = (e) => {
    setRoleID(e.target.value);
  }

  const handleAddUser = (e) => {
    e.preventDefault();
    if (name === "") {
      alert("Vui lòng nhập họ tên");
      return;
    }

    if (username === "") {
      alert("Vui lòng nhập username");
      return;
    }

    if (password === "") {
      alert("Vui lòng nhập mật khẩu");
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

    const newUser = {
      name: name,
      username: username,
      password: password,
      email: email,
      tel: tel,
      role_id: roleID
    }

    axios.post('https://backend.omcloud.vn/api/user', newUser)
      .then(res => {
        alert(t('Success_Alert'));
        history.push('/app/users');
      })
      .catch(error => console.log(error));
  }

  return (
    <>
      {
        permission ?
          <>
            <PageTitle title={t("Account-Add")} />
            <div className={classes.newUserForm}>
              <div className={classes.newUserItem}>
                <label className={classes.label}>{t('Fullname')}</label>
                <input type="text" name="name" className={classes.inputName} value={name} onChange={(e) => setName(e.target.value)} placeholder={t('Fullname-enter')} />
              </div>
              <div className={classes.newUserItem}>
                <label className={classes.label}>{t('Username')}</label>
                <input type="text" name="username" className={classes.inputName} value={username} onChange={(e) => setUsername(e.target.value)} placeholder={t('Username-enter')} />
              </div>
              <div className={classes.newUserItem}>
                <label className={classes.label}>{t('Password')}</label>
                <input type="password" name="password" className={classes.inputName} value={password} onChange={(e) => setPassword(e.target.value)} placeholder={t('Password-enter')} />
              </div>
              <div className={classes.newUserItem}>
                <label className={classes.label}>Email</label>
                <input type="email" name="email" className={classes.inputName} value={email} onChange={(e) => setEmail(e.target.value)} placeholder={t('Email-enter')} />
              </div>
              <div className={classes.newUserItem}>
                <label className={classes.label}>{t('Password')}</label>
                <input type="tel" name="tel" className={classes.inputName} value={tel} onChange={(e) => setTel(e.target.value)} placeholder={t('Password-enter')} />
              </div>
              <div className={classes.newUserItem}>
                <label className={classes.label}>{t('Role')}</label>
                <select
                  onChange={e => handleRolesChange(e)}
                  className={classes.newUserType}
                  id="newUserType"
                >
                  <option>-----</option>
                  {
                    Role.map((value, key) => <option key={value.id} value={value.id}>{value.title}</option>)
                  }
                </select>
              </div>
              <Button
                variant="contained"
                size="medium"
                color="secondary"
                className={classes.newUserBtn}
                onClick={handleAddUser}
              >
                {t("Add")}
              </Button>
            </div>
          </>
          : <div>You do not have permission !</div>
      }
    </>

  );
}
