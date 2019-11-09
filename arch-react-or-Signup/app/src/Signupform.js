import React, { Component } from "react";
import "./Signupform.css";

const userNameRegex = RegExp("^[A-Za-z0-9_-]{5,20}$");
const emailRegex = RegExp(
  /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
);
var passRegex = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})");

const formValid = ({ formErrors, ...rest }) => {
  let valid = true;
  Object.values(formErrors).forEach(val => {
    val.length > 0 && (valid = false);
  });

  Object.values(rest).forEach(val => {
    val === null && (valid = false);
  });

  return valid;
};

class Signupform extends Component {
  constructor(props) {
    super(props);

    this.state = {
      userName: null,
      email: null,
      password: null,
      Cpassword: null,

      formErrors: {
        userName: "",
        email: "",
        password: "",
        Cpassword: ""
      }
    };
  }

  handleSubmit = e => {
    e.preventDefault();
    if (formValid(this.state)) {
      
      console.log(`
      --SUBMITTING--
      
      User Name: ${this.state.userName}
      Email: ${this.state.email}
      Password: ${this.state.password}
      Confirm Password: ${this.state.Cpassword}
    `);

      fetch('http://localhost:3000/user/signup', {
          method: 'POST',
          headers : new Headers(),
          body:JSON.stringify({username:this.state.username, email:this.state.email, password:this.state.password})
      }).then((res) => res.json())
      .then((data) =>  console.log(data))
      .catch((err)=>console.log(err))
  }
  else {
    console.error("FORM INVALID - DISPLAY ERROR MESSAGE");
  }
    
  };

  handleChange = e => {
    e.preventDefault();
    const { name, value } = e.target;
    let formErrors = { ...this.state.formErrors };
    var passval =this.state.password;
    switch (name) {
     
      case "userName":
        formErrors.userName =
        userNameRegex.test(value) ? "" : "Minimum 5 characaters and maximum 20 required";
        break;
      case "email":
        formErrors.email = emailRegex.test(value)
          ? ""
          : "Invalid email address";
        break;
      case "password":
        formErrors.password = passRegex.test(value) && value.length > 7  && value.length < 16 ? ""
          : "Password should be contain one capital later, one small later, one symbol,one digit and length is at least 8 and at most 15" ;
        break;
      case "Cpassword":
        formErrors.Cpassword =
          passval !== value ? "Password did not match   " : "";
        break;
      default:
        break;
    }

    this.setState({ formErrors, [name]: value }, () => console.log(this.state));
  };

  render() {
    const { formErrors } = this.state;

    return (
      <div className="wrapper" >
        <div className="form-wrapper">
          <div className="logo_ago">
            <img className="logo" src={require('./Logowhite.png')} alt="fsf" />
          </div>
          <h1>SIGN UP</h1>
          <form onSubmit={this.handleSubmit} noValidate>
            <div className="userName">
              <input
                className={formErrors.userName.length > 0 ? "error" : "noerror"}
                placeholder="User Name"
                type="text"
                name="userName"
                noValidate
                onChange={this.handleChange}
              />
              <i  
              className="fa fa-user fa-lg fa-fw" aria-hidden="true"></i>
              {formErrors.userName.length > 0 && (
                <div className="errorMessage">{formErrors.userName}</div>
              )}
            </div>
            <div className="email">
              <input
                className={formErrors.email.length > 0 ? "error" : null}
                placeholder="Email"
                type="email"
                name="email"
                noValidate
                onChange={this.handleChange}
              />
              <i className="fa fa-envelope fa-lg fa-fw" aria-hidden="true"></i>
              {formErrors.email.length > 0 && (
                <span className="errorMessage">{formErrors.email}</span>
              )}
            </div>
            <div className="password">
              <input
                className={formErrors.password.length > 0 ? "error" : null}
                placeholder="Password"
                type="password"
                name="password"
                noValidate
                onChange={this.handleChange}
              />
              <i className="fa fa-lock fa-lg fa-fw" aria-hidden="true"></i>
              {formErrors.password.length > 0 && (
                <span className="errorMessage">{formErrors.password}</span>
              )}
            </div>
            <div className="Cpassword">
              <input
                className={formErrors.Cpassword.length > 0 ? "error" : null}
                placeholder="Confirm Password"
                type="password"
                name="Cpassword"
                noValidate
                onChange={this.handleChange}
              />
              <i className="fa fa-lock fa-lg fa-fw" aria-hidden="true"></i>
              {formErrors.Cpassword.length > 0 && (
                <span className="errorMessage">{formErrors.Cpassword}</span>
              )}
            </div>
            <div className="signup">
              <button type="submit">SIGN UP</button> 
            </div>
            <div >
            <p>By clicking on Sign Up , you agree to the Privacy Policy and Terms and condtions </p>
              
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default Signupform;
