import {Row, Col, Input, Button} from 'antd';
import React from "react";
import styles from './Signin.module.css';
import axios from 'axios';

class Signin extends React.Component {
  _password = React.createRef();

  state = {
    email: '',
    loading: false
  }
  render() {
    const {email, loading} = this.state;
    const isEmail =  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
      email,
    )
    console.log(this._password);
  return  (
    <form>
    <Row align="middle" className={styles.signin_row}>
      <Col span={24}>
        <Row className={styles.signin_contents}>
          <Col span={12}>
            <img
              src="img/bg_signin.png"
              alt="Signin"
              className={styles.signin_bg}
            />
          </Col>
          <Col span={12}>
            <div className={styles.signin_title}>My Books</div>
            <div className={styles.signin_subtitle}>
              Please Note Your Opinion
            </div>
            <div className={styles.signin_underline} />
            <div className={styles.email_title}>
              Email
              <span className={styles.required}> *</span>
            </div>
            <div className={styles.input_area}>
              <Input
                placeholder="Email"
                autoComplete="email"
                name="email"
                className={styles.input}
                value={this.state.email}
                onChange={this.change}
              />

            </div>
            <div className={styles.password_title}>
              Password
              <span className={styles.required}> *</span>
            </div>
            <div className={styles.input_area}>
              <Input
                type="password"
                autoComplete="current-password"
                className={styles.input}
                ref={this._password}
              />
            </div>
            <div className={styles.button_area}>
              <Button
                size="large"
                className={styles.button}
                onClick={this.click}
                disabled={!isEmail}
              >
                Sign In
              </Button>
            </div>
          </Col>
        </Row>
      </Col>
    </Row>
  </form>
)
};

  click = async () => {
    const {email} = this.state;
    const password = this._password.current;
    console.log("clicked", email, password);

    // 이제 서버로 보내야한다.
    // const p = axios.port('https://api.marktube.tv/v1/me', {
    //   email,
    //   password,
    // })
    // p.then((response) => {
    //   console.log(response);
    // }).catch((error) => {
    //   console.log(error);
    // });
    try {
    // 호출 시작 => 로딩 시작
    const response = await axios.port('https://api.marktube.tv/v1/me', {
      email,
      password,
    });
    // 호출 완료 (정상)=> 로딩 끝
      console.log(response);
  } catch(error){
    // 호출 완료 (에러) => 로딩 끝
    console.log(error);
  }
  }

  change = (e) => {
    this.setState({email: e.target.value})
  }
}
export default Signin;