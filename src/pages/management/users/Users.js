import React, { useState, useEffect } from "react";
import {
  Button
} from "@material-ui/core";
import axios from 'axios';
import { DataGrid } from '@mui/x-data-grid';
import { DeleteOutline } from '@mui/icons-material';
import {
  Link,
} from "react-router-dom";
import useStyles from "./styles";
import { useTranslation } from 'react-i18next';


// components
import PageTitle from "../../../components/PageTitle/PageTitle";

const url_user = `https://backend.omcloud.vn/api/user/`;


export default function UsersPage() {
  const { t } = useTranslation()
  var classes = useStyles();
  const [data, setData] = useState([]);
  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    const result = await axios.get('https://backend.omcloud.vn/api/user');
    setData(result.data.data);
  };

  const handleDelete = (id) => {
    if (window.confirm('Bạn có muốn xóa không?')) {
      axios.delete(url_user + id)
        .then(res => {
          setData(data.filter((item) => item.id !== id));
        })
        .catch(error => console.log(error));
    }
  }

  const columns = [
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'name', headerName: t('Fullname'), width: 250 },
    { field: 'username', headerName: t('Username'), width: 250 },
    { field: 'email', headerName: 'Email', width: 250 },
    {
      field: 'role_id',
      headerName: t('Role'),
      width: 250,
      valueGetter: (params) => `${params.row.role.title}`
    },
    {
      field: 'hanhDong',
      headerName: t('Action'),
      width: 150,
      renderCell: (params) => {
        return (
          <div className={classes.buttonAction}>
            <Link to={"/app/edit-user/" + params.row.id}>
              <button className={classes.userListEdit}>Edit</button>
            </Link>
            <DeleteOutline className={classes.userListDelete} onClick={() => handleDelete(params.row.id)} />
          </div>
        );
      }
    },
  ];

  return (
    <>
      <PageTitle title={t("Account-List")} button={(
        <Link to="/app/new-user">
          <Button
            variant="contained"
            size="medium"
            color="secondary"
          >
            {t("Add")}
          </Button>
        </Link>
      )} />
      <DataGrid
        rows={data}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5]}
        disableSelectionOnClick
        className={classes.userData}
      />
    </>
  );
}
