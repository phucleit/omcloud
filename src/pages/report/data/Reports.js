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
import PageTitle from "../../../components/PageTitle/PageTitle";
import useStyles from "./styles";
import { useTranslation } from 'react-i18next';


const url_report = `https://backend.omcloud.vn/api/report/remove/`;

export default function ServicesPage() {
  var classes = useStyles();
  const [query, setQuery] = useState('');
  const [data, setData] = useState([]);
  const { t } = useTranslation()
  useEffect(() => {
    loadReports();
  }, []);

  const loadReports = async () => {
    const result = await axios.get(
      'https://backend.omcloud.vn/api/report',
      {
        headers: { 
          'Authorization': 'Bearer 10|wrpJyOOlFaGAbvXyOsSvHJQbpYmP0HiPi2KVMck4', 
          'Content-Type': 'application/json'
        },
      }
    );
    setData(result.data.data);
  };

  const handleDelete = (id) => {
    if (window.confirm('Bạn có muốn xóa không?')) {
      axios.delete(
        `https://backend.omcloud.vn/api/report/` + id,
        {
          headers: { 
            'Authorization': 'Bearer 10|wrpJyOOlFaGAbvXyOsSvHJQbpYmP0HiPi2KVMck4', 
            'Content-Type': 'application/json'
          },
        }
      ).then(res => {
          setData(data.filter((item) => item.id !== id));
        })
        .catch(error => console.log(error));
    }
  }

  const columns = [
    { field: 'name', headerName: t('title-name'), width: 350 },
    { field: 'code', headerName: t('code-name'), width: 150 },
    { 
      field: 'publish_day', 
      headerName: t('dateIssued'), 
      width: 150 ,
      renderCell: (params) => {
        return(
          <div>{new Date(params.row.publish_day).toLocaleDateString()}</div>
        );
      }
    },
    { field: 'representative_name', headerName: t('clientName'), width: 350 },
    { field: 'address', headerName: t('address'), width: 350 },
    {
      field: 'hanhDong',
      headerName: t('Action'),
      width: 150,
      renderCell: (params) => {
        return (
          <div className={classes.buttonAction}>
            <Link to={"/app/export-report/" + params.row.id}>
              <button className={classes.serviceListEdit}>View</button>
            </Link>
            
          </div>
        );
        // <DeleteOutline className={classes.serviceListDelete} onClick={() => handleDelete(params.row.id)} />
      }
    },
  ];

  const search = (rows) => {
    return rows.filter(
      (reports) =>
        reports.name.toLowerCase().indexOf(query) > -1 ||
        reports.name.indexOf(query) > -1
    );
  }

  return (
    <>
      <PageTitle title={t("List-report")} 
        // button={(
        // <Link to="/app/new-report">
        //   <Button
        //     variant="contained"
        //     size="medium"
        //     color="secondary"
        //   >
        //     {t("Add-List-Report")}
        //   </Button>
        // </Link>
        // )} 
      />
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
        className={classes.serviceData}
      />
    </>
  );
}
