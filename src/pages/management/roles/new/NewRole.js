import React, { useState, useEffect } from "react";
import {
  Button
} from "@material-ui/core";
import axios from 'axios';
import {
  useHistory,
} from "react-router-dom";
import { useTranslation } from 'react-i18next';
// components
import PageTitle from "../../../../components/PageTitle/PageTitle";
import useStyles from "./styles";

export default function NewRole() {
  const { t } = useTranslation()

  var classes = useStyles();
  let history = useHistory();

  const [permission, setPermission] = useState([]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [permissions, setPermissions] = useState([]);
  const [permit, setPermit] = useState(false)
  useEffect(() => {
    loadPermission();
    if (localStorage.abilities.includes("role-create"))
      setPermit(true)
    else setPermit(false)
  }, []);

  const loadPermission = async () => {
    const result = await axios.get('https://backend.omcloud.vn/api/permission');
    setPermission(result.data.data);
  };

  let listPermission = {};
  permission.forEach((item) => {
    if (!(item.group_name in listPermission)) {
      listPermission[item.group_name] = [];
    }
    listPermission[item.group_name].push(item);
  });

  let handleChangeRoleOne = (e) => {
    if (e.target.checked === true) {
      setPermissions([...permissions, Number(e.target.value)]);
    } else {
      let check_list = [];
      permissions.forEach(check => {
        if (Number(check) !== Number(e.target.value)) {
          check_list.push(Number(check));
        }
      });
      setPermissions(check_list);
    }
  }

  const handleAddRole = (e) => {
    e.preventDefault();
    if (title === "") {
      alert("Vui lòng nhập tên nhóm");
      return;
    } else if (description === "") {
      alert("Vui lòng nhập mô tả nhóm");
      return;
    } else {
      const newRole = {
        title: title,
        description: description,
        permissions: permissions
      };

      const config = {
        method: 'post',
        url: 'https://backend.omcloud.vn/api/role',
        headers: { 
            'Authorization': 'Bearer 10|wrpJyOOlFaGAbvXyOsSvHJQbpYmP0HiPi2KVMck4', 
            'Content-Type': 'application/json'
        },
        data: newRole
      };

      axios(config)
        .then(res => {
          alert('Thêm người dùng thành công!');
          history.push('/app/roles');
        })
        .catch(error => console.log(error));
    }
  }

  return (
    <>
      {
        permit ?
          <>
            <PageTitle title={t("Account-Add-Group")} />
            <div className={classes.newRolesForm}>
              <div className={classes.newRolesItem}>
                <label className={classes.label}>{t("GroupName")}</label>
                <input type="text" name="tennhom" className={classes.inputName} value={title} onChange={(e) => setTitle(e.target.value)} placeholder={t("GroupName-enter")} />
              </div>
              <div className={classes.newRolesItem}>
                <label className={classes.label}>{t("Desc")}</label>
                <textarea rows="4" name="motanhom" className={classes.inputName} value={description} onChange={(e) => setDescription(e.target.value)} placeholder={t("Desc-enter")}></textarea>
              </div>
              <div className={classes.newRolesItem}>
                <label className={classes.label}>{t('Decentralize')}</label>
                <div className={classes.listPermission}>
                  <div className={classes.itemPermisstion}>
                    <label>{t('Account')}</label>
                    {
                      Object.entries(listPermission).slice(1, 2).map(role_1 =>
                        role_1[1].map(
                          (value_1) =>
                            <div className={classes.checkPermission}>
                              <input className={classes.inputCheckbox} type="checkbox" key={value_1.id} value={value_1.id} onClick={e => handleChangeRoleOne(e)} /><label>{value_1.title}</label>
                            </div>
                        )
                      )
                    }
                  </div>
                  <div className={classes.itemPermisstion}>
                    <label>{t('Services')}</label>
                    {
                      Object.entries(listPermission).slice(2, 3).map(role_2 =>
                        role_2[1].map(
                          (value_2) =>
                            <div className={classes.checkPermission}>
                              <input className={classes.inputCheckbox} type="checkbox" key={value_2.id} value={value_2.id} onClick={e => handleChangeRoleOne(e)} /><label>{value_2.title}</label>
                            </div>
                        )
                      )
                    }
                  </div>
                  <div className={classes.itemPermisstion}>
                    <label>{t('Constructions')}</label>
                    {
                      Object.entries(listPermission).slice(3, 5).map(role_3 =>
                        role_3[1].map(
                          (value_3) =>
                            <div className={classes.checkPermission}>
                              <input className={classes.inputCheckbox} type="checkbox" key={value_3.id} value={value_3.id} onClick={e => handleChangeRoleOne(e)} /><label>{value_3.title}</label>
                            </div>
                        )
                      )
                    }
                  </div>
                </div>
              </div>
              <Button
                variant="contained"
                size="medium"
                color="secondary"
                className={classes.newRoleBtn}
                onClick={handleAddRole}
              >
                {t('add-group')}
              </Button>
            </div>
          </>
          : <div>{t('not-permission')} !</div>
      }
    </>

  );
}
