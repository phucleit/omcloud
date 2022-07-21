import React, { useState } from "react";
import {
  Grid,
  CircularProgress,
  Typography,
  Button,
  TextField,
  Fade,
} from "@material-ui/core";
import { withRouter, useHistory } from "react-router-dom";
import axios from 'axios';

// styles
import useStyles from "./styles";

// logo
import hcme from '../login/hcme-logo.png';

const URL_RESET_PASSWORD = 'https://backend.omcloud.vn/api/reset-password';

function ResetPass() {
  var classes = useStyles();
  let history = useHistory();

  // local
  var [usernameValue, setUsernameValue] = useState("");
  var [emailValue, setEmailValue] = useState("");

  const handleResetPass = (e) => {
    e.preventDefault();
    if (usernameValue === "") {
      alert("Vui lòng nhập tên đăng nhập");
      return;
    }

    if (emailValue === "") {
      alert("Vui lòng nhập email");
      return;
    }

    const newPassword = {
      username: usernameValue,
      email: emailValue,
    };

    const config = {
      method: 'post',
      url: URL_RESET_PASSWORD,
      headers: { 
          'Authorization': 'Bearer 10|wrpJyOOlFaGAbvXyOsSvHJQbpYmP0HiPi2KVMck4', 
          'Content-Type': 'application/json'
      },
      data: newPassword
    };

    axios(config)
      .then(res => {
        alert('Đổi mật khẩu thành công. Vui lòng kiểm tra mail!');
        history.push('/login');
      })
      .catch(error => console.log(error));

  };

  const handleBack = () => {
    history.push('/login');
  };

  return (
    <Grid container className={classes.container}>
      <div className={classes.logotypeContainer}>
        <img src={hcme} alt="hcme" className={classes.logotypeImage} />
        <Typography className={classes.logotypeText}>HICON M&E</Typography>
      </div>
      <div className={classes.formContainer}>
        <div className={classes.form}>
          <React.Fragment>
            <Typography variant="h3" className={classes.greeting}>
              Vui lòng nhập thông tin để lấy lại mật khẩu
            </Typography>
            <TextField
              id="username"
              InputProps={{
                classes: {
                  underline: classes.textFieldUnderline,
                  input: classes.textField,
                },
              }}
              value={usernameValue}
              onChange={e => setUsernameValue(e.target.value)}
              margin="normal"
              placeholder="Username"
              type="text"
              fullWidth
            />
            <TextField
              id="email"
              InputProps={{
                classes: {
                  underline: classes.textFieldUnderline,
                  input: classes.textField,
                },
              }}
              value={emailValue}
              onChange={e => setEmailValue(e.target.value)}
              margin="normal"
              placeholder="Email"
              type="text"
              fullWidth
            />
            <div className={classes.formButtons}>
              <Button
                variant="contained"
                color="primary"
                size="large"
                onClick={handleResetPass}
              >
                Xác nhận
              </Button>
              <Button
                color="primary"
                size="large"
                className={classes.forgetButton}
                onClick={handleBack}
              >
                Quay lại
              </Button>
            </div>
          </React.Fragment>
        </div>
        <Typography color="primary" className={classes.copyright}>
          Copyright © 2021 <a style={{ textDecoration: 'none', color: 'inherit' }} href="https://omcloud.vn/" rel="noopener noreferrer" target="_blank">HICON M&E.</a>
        </Typography>
      </div>
    </Grid>
  );
}

export default withRouter(ResetPass);
