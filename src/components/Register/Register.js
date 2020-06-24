import React, { Component } from 'react';

class Register extends Component {
  state = {
    name: '',
    email: '',
    password: ''
  };
  handleUserName = e => {
    this.setState({
      name: e.target.value
    });
  };
  handleUserEmail = e => {
    this.setState({
      email: e.target.value
    });
  };
  handleUserPassword = e => {
    this.setState({
      password: e.target.value
    });
  };
  handleRegister = () => {
    const { email, name, password } = this.state;
    fetch('https://facerecogination-backend.herokuapp.com/register', {
      method: 'post',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: name,
        email: email,
        password: password
      })
    })
      .then(response => response.json())
      .then(user => {
        if (user.email === email) {
          this.props.loadUser(user);
          this.props.changeRoute('home');
        }
      });
  };
  render() {
    return (
      <article className="br3 ba dark-gray b--black-10 mv4 w-100 w-50-m w-25-l mw6 shadow-2 center">
        <main className="pa4 black-80">
          <div className="measure">
            <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
              <legend className="f2 fw6 ph0 mh0">Register</legend>
              <div className="mt3">
                <label className="db fw6 lh-copy f6" htmlFor="name">
                  Name
                </label>
                <input
                  className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                  type="text"
                  name="name"
                  id="name"
                  onChange={this.handleUserName}
                />
              </div>
              <div className="mt3">
                <label className="db fw6 lh-copy f6" htmlFor="email-address">
                  Email
                </label>
                <input
                  className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                  type="email"
                  name="email-address"
                  id="email-address"
                  onChange={this.handleUserEmail}
                />
              </div>
              <div className="mv3">
                <label className="db fw6 lh-copy f6" htmlFor="password">
                  Password
                </label>
                <input
                  className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                  type="password"
                  name="password"
                  id="password"
                  onChange={this.handleUserPassword}
                />
              </div>
            </fieldset>
            <div className="">
              <input
                className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f5 dib"
                type="submit"
                value="Register"
                onClick={this.handleRegister}
              />
            </div>
            {/* <div className="lh-copy mt3">
            <a href="#0" className="f6 link dim black db">
              Register
            </a>
          </div> */}
          </div>
        </main>
      </article>
    );
  }
}

export default Register;
