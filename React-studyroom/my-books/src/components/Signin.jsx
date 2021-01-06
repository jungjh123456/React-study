import { Row, Col, Input, Button } from 'antd';
import React from "react";
import styles from './Signin.module.css';

class Signin extends React.Component {
  _password = React.createRef();

  state = {
    email: '',
  }
  render() {
    const { email } = this.state;
    const { loading } = this.props;
    const isEmail = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
      email,
    )
    console.log(this._password);
    return (
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
                    loading={loading}
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
    const { email } = this.state;
    const password = this._password.current.state.value;
    console.log("clicked", email, password);

    this.props.signin(email, password);

  }

  change = (e) => {
    this.setState({ email: e.target.value })
  }
}
export default Signin;

