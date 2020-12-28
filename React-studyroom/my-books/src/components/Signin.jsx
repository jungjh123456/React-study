import {Row, Col, Input, Button} from 'antd';
import React from "react";
import styles from './Signin.module.css';

console.log(styles);

class Signin extends React.Component {
  state = {
    email: '',
    loading: false
  }
  render() {
    const {email, loading} = this.state;
    const isEmail =  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
      email,
    )
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
              {/* <Input
                placeholder="Email"
                autoComplete="email"
                name="email"
                className={styles.input}
              /> */}
              <input type="text" value={this.state.email}
                onChange={this.change}
              />
              {isEmail ? "이메일 맞음" : "이메일 아님"}
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
              />
            </div>
            <div className={styles.button_area}>
              <Button
                size="large"
                className={styles.button}
                onClick={this.click}
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
  click = () => {
    console.log('dd')
  }
  change = (e) => {
    this.setState({email: e.target.value})
  }
}
export default Signin;