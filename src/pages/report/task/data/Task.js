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

// components
import PageTitle from "../../../../components/PageTitle/PageTitle";
import useStyles from "./styles";
import { useTranslation } from 'react-i18next';

const url_task = `https://backend.omcloud.vn/api/task/`;

export default function TasksPage() {
  var classes = useStyles();
  const [query, setQuery] = useState('');
  const [data, setData] = useState([]);
  const { t } = useTranslation();

  useEffect(() => {
    loadTasks();
  }, []);

  const loadTasks = async () => {
    const result = await axios.get('https://backend.omcloud.vn/api/task');
    setData(result.data.data);
  };

  const handleDelete = (id) => {
    if (window.confirm('Bạn có muốn xóa không?')) {
      axios.delete(url_task + id)
        .then(res => {
          setData(data.filter((item) => item.id !== id));
        })
        .catch(error => console.log(error));
    }
  }

  const columns = [
    { field: 'name', headerName: t('device-maintenance'), width: 300 },
    {
        field: 'photo',
        headerName: t('photo-maintenance'),
        width: 300,
        renderCell: (params) => {
          return (
            <img src={'http://backend.omcloud.vn/uploads/' + params.row.photo} style={{width: '100px'}} />
          );
        }
      },
    { field: 'description', headerName: t('des-maintenance'), width: 400 },
    {
      field: 'hanhDong',
      headerName: t('Action'),
      width: 150,
      renderCell: (params) => {
        return (
          <div className={classes.buttonAction}>
            <Link to={"/app/edit-task/" + params.row.id}>
              <button className={classes.serviceListEdit}>Edit</button>
            </Link>
            <DeleteOutline className={classes.serviceListDelete} onClick={() => handleDelete(params.row.id)} />
          </div>
        );
      }
    },
  ];

  const search = (rows) => {
    return rows.filter(
      (tasks) =>
        tasks.name.toLowerCase().indexOf(query) > -1 ||
        tasks.name.indexOf(query) > -1 ||
        tasks.description.toLowerCase().indexOf(query) > -1 ||
        tasks.description.indexOf(query) > -1
    );
  }

  return (
    <>
      <PageTitle title={t("List-device")} button={(
        <Link to="/app/new-task">
          <Button
            variant="contained"
            size="medium"
            color="secondary"
          >
            {t("Add")}
          </Button>
        </Link>
      )} />
      <div className={classes.search}>
        <input type="text" className={classes.searchTerm} placeholder={t('Search-input')} onChange={e => setQuery(e.target.value)} />
        <button type="submit" className={classes.searchButton}>
          <i className="fa fa-search"></i>
        </button>
      </div>
      <DataGrid
        rows={search(data)}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5]}
        disableSelectionOnClick
        className={classes.taskData}
        rowHeight={150}
      />
    </>
  );
}
