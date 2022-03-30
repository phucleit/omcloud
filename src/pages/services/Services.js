import React, { useState, useEffect } from "react";
import {
  Button
} from "@material-ui/core";
import axios from 'axios';
import MUIDataTable from "mui-datatables";

// components
import PageTitle from "../../components/PageTitle/PageTitle";

// icons sets
import "font-awesome/css/font-awesome.min.css";

const columns = [
  {
   name: "name",
   label: "Tên dịch vụ",
   options: {
    filter: true,
    sort: true,
   }
  },
  {
   name: "service_type",
   label: "Loại dịch vụ",
   options: {
    filter: true,
    sort: true,
   }
  },
  {
   name: "construction_count",
   label: "Số lượng công trình",
   options: {
    filter: true,
    sort: false,
   }
  },
  {
   name: "hanhDong",
   label: "Hành động",
   options: {
    filter: true,
    sort: false,
   }
  },
 ];
 
//  const data = [
//   { name: "Joe James", service_type: "Test Corp", construction_count: "Yonkers", hanhDong: "NY" },
//   { name: "John Walsh", service_type: "Test Corp", construction_count: "Hartford", hanhDong: "CT" },
//   { name: "Bob Herm", service_type: "Test Corp", construction_count: "Tampa", hanhDong: "FL" },
//   { name: "James Houston", service_type: "Test Corp", construction_count: "Dallas", hanhDong: "TX" },
//  ];

export default function ServicesPage () {
  const [data, setData] = useState([]);

  useEffect(() => {
    loadServices();
  }, []);

  const loadServices = async () => {
    const result = await axios.get('https://backend.omcloud.vn/api/service');
    setData(result.data.data);
    console.log(data);
  };

  const handleClick = (e) => {
    
  }

  return (
  <>
    <PageTitle title="Danh sách dịch vụ" button={(
      <>
        <Button
      variant="contained"
      size="medium"
      color="secondary"
      onClick={e => handleClick(e)}
    >
      Thêm mới
    </Button>
      </>
    )} />
    <MUIDataTable
      //data={data}
      columns={columns}
    />
  </>
);}
