import React, { useRef, useState, useEffect } from "react";
import { PDFExport, savePDF } from "@progress/kendo-react-pdf";
import { Button } from "@mui/material";
import { useHistory, useParams } from "react-router-dom";
import axios from "axios";

const url = "https://backend.omcloud.vn/api/report";

const PreviewReport = () => {
  const [data, setData] = useState("");
  const pdfExportComponent = React.useRef(null);

  const paramId = useParams();
  const currentReportId = paramId.id;

  const handleExportWithComponent = (event) => {
    pdfExportComponent.current.save();
  };

  useEffect(async () => {
    try {
      const result = await axios.get(url + "/" + currentReportId);
      if (result.status === 200) {
        setData(result.data.data);
      }
    } catch (error) {
      console.log("====================================");
      console.log(error);
      console.log("====================================");
    }
  }, []);

  const showFrequency = (e) => {
    let string = "";
    if (e == 1) {
      string = "Hàng tháng";
    } else if (e == 2) {
      string = "Hàng quý";
    } else if (e == 3) {
      string = "Nửa năm";
    } else {
      string = "Hàng Năm";
    }

    return string;
  };

  const showImage = (e) => {
    let data = "";
    if (e.length > 0) {
      e.map(
        (item) =>
          (data += (
            <img
              src={item.photo}
              style={{
                width: "100px",
                height: "100px",
                objectFit: "cover",
                margin: "5px",
              }}
              alt=""
            />
          )),
      );
    }

    console.log("====================================");
    console.log(data);
    console.log("====================================");
    return data;
  };

  console.log("====================================");
  console.log(data);
  console.log("====================================");
  return (
    <>
      <PDFExport ref={pdfExportComponent} paperSize="A4">
        <div className="check">
          <div className="headers">
            <div className="header_left">
              <span className="header">HICON M&E</span>
              <div className="companyName">
                <span className="com1">
                  Công ty cổ phần cơ điện và bảo trì Hicon ( M&E)
                </span>
                <span className="com2">{data.name}</span>
              </div>
            </div>
            <div className="header_right">
              <div className="companyName">
                <span className="com1">Mã hiệu: KSBT-BC-01</span>
                <span className="com1">Ngày ban hành: 05-01-2016</span>
                <span className="com1">Lần ban hành: 01</span>
              </div>
            </div>
          </div>
          <h2
            style={{
              textAlign: "center",
              fontSize: "18px",
              fontWeight: 700,
              marginTop: "10px",
            }}
          >
            BÁO CÁO BẢO TRÌ HỆ THỐNG PHÒNG CHÁY CHỮA CHÁY
          </h2>
          <div className="main">
            <div className="left">
              <span
                style={{
                  fontSize: "14px",
                  fontWeight: 700,
                  width: "150px",
                }}
              >
                Tên khách hàng/ Client name
              </span>
              <span style={{ display: "inline-block", marginLeft: "20px" }}>
                {data.representative_name}
              </span>
            </div>
            <div className="left">
              <span
                style={{
                  fontSize: "14px",
                  fontWeight: 700,
                  width: "150px",
                }}
              >
                Địa chỉ/ Address
              </span>
              <span style={{ display: "inline-block", marginLeft: "20px" }}>
                {data.address}
              </span>
            </div>
            <div className="left">
              <span
                style={{
                  fontSize: "14px",
                  fontWeight: 700,
                  width: "150px",
                }}
              >
                Dự án/ Project
              </span>
              <span style={{ display: "inline-block", marginLeft: "20px" }}>
                {data.construction?.name}
              </span>
            </div>
            <div className="left">
              <span
                style={{
                  fontSize: "14px",
                  fontWeight: 700,
                  width: "150px",
                }}
              >
                Tần suất bảo dưỡng/ Frequency
              </span>
              <span style={{ display: "inline-block", marginLeft: "20px" }}>
                {showFrequency(data.frequency)}
              </span>
            </div>
            <div className="left">
              <span
                style={{
                  fontSize: "14px",
                  fontWeight: 700,
                  width: "150px",
                }}
              >
                Ngày kiểm tra/ Date
              </span>
              <span style={{ display: "inline-block", marginLeft: "20px" }}>
                {data.publish_day}
              </span>
            </div>
          </div>

          <table>
            <tr>
              <th>TT</th>
              <th>Thiết bị bảo trì</th>
              <th>Hình ảnh bảo trì</th>
              <th>Mô tả công việc</th>
            </tr>
            {data.task?.map((e) => (
              <tr key={e.id}>
                <td>{e.id}</td>
                <td>{e.name}</td>
                <td style={{ width: "300px" }}>
                  {e.report_task?.map((item) => (
                    <a
                      style={{ margin: "5px" }}
                      href={`https://backend.omcloud.vn/uploads/` + item.photo}
                      target="_blank"
                    >
                      Xem hình {e.id}
                    </a>
                  ))}
                </td>
                <td>{e.description}</td>
              </tr>
            ))}
          </table>

          <table>
            <tr>
              <th>Nhận xét của Hicon M-E</th>
              <th>Nhận xét khách hàng (*)</th>
            </tr>
            <tr>
              <td>{data.hicon_comment}</td>
              <td>{data.customer_comment}</td>
            </tr>
          </table>
          <h2
            style={{
              fontSize: "18px",
              fontWeight: 700,
              marginTop: "10px",
            }}
          >
            TỔNG HỢP VẬT TƯ THIẾT BỊ THAY THẾ
          </h2>
          <table>
            <tr>
              <th>Vật tư, thiết bị</th>
              <th>Đơn vị</th>
              <th>Số lượng</th>
            </tr>
            {data.item?.map((e) => (
              <tr key={e.id}>
                <td>{e.item_name}</td>
                <td style={{ width: "300px" }}>{e.item_unit}</td>
                <td>{e.item_quantity}</td>
              </tr>
            ))}
          </table>

          <h2
            style={{
              fontSize: "18px",
              fontWeight: 700,
              marginTop: "10px",
            }}
          >
            ĐÁNH GIÁ KHÁCH HÀNG
          </h2>
          <table>
            <tr>
              <th>Đội trưởng (Họ tên và chữ ký)/Team Leader:</th>
              <th>Mức độ hài lòng</th>
              <th>Kí tên</th>
              <th>Tên /Name</th>
              <th>Vị trí</th>
            </tr>

            <tr>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
            </tr>
          </table>
          <div className="footerr">
            <p style={{ fontStyle: "italic" }}>
              ..........., Ngày ..... tháng ..... năm .....
            </p>
            <span style={{ fontStyle: "italic" }}>
              HICON M&E AND MAINTENANCE SERVICES JSC.
            </span>
          </div>
        </div>
      </PDFExport>
      <Button
        style={{ marginTop: "10px", marginLeft: "20px" }}
        variant="outlined"
        onClick={handleExportWithComponent}
      >
        {" "}
        Xuất báo cáo / Export{" "}
      </Button>
    </>
  );
};

export default PreviewReport;
