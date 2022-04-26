import React from "react";
import "./login.css";
import { GoogleLogin } from "react-google-login";
import googleLogo from "../../assets/google.png";
import { SHA256 } from "crypto-js";
import { Login as apiLogin } from "../../_services/api.ts";
import { Link, Redirect } from "react-router-dom";
import { withTranslation } from "react-i18next";
import { compose } from "redux";
import { withCookies } from "react-cookie";
import querystring from "../../_services/helper.ts";
//import whiteLogo from "../../assets/logoWhite.png";
import i18n from "../../i18nextConf.ts";


interface IAccountInfoState {
  email: string;
  password: string;
  remember: boolean;
  continue: boolean | null;
  firstTime: boolean | null;
}

class Login extends React.Component<
  { t: any; cookies: any },
  IAccountInfoState
> {
  constructor(props: any) {
    super(props);
    this.state = {
      email: "",
      password: "",
      remember: false,
      continue: null,
      firstTime: null,
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  // Handle events
  handleChange(event: any) {
    const target = event.target;
    const name = target.name;
    let value;
    if (name === "remember") {
      value = target.checked;
    } else {
      value = target.value;
    }
    const newState = { [name]: value } as Pick<
      IAccountInfoState,
      keyof IAccountInfoState
    >;
    this.setState(newState);
  }
  
  handleSubmit(event: any) {
    let password = i18n.t('password') //placeholder
    this.login(this.state.email, this.state.password).then((res) => {
      if (res) {
        console.log("logged in");
        this.setState({ continue: true });
      } else {
        // handle error message
        console.log(res);
      }
    });
    event.preventDefault();
  }

  // Promise handling request to api
  login(email: string, password: string) {
    const { cookies } = this.props;
    let promise = new Promise((resolve, reject) => {
      let passwordHash = SHA256(password);
      apiLogin(email, passwordHash.toString())
        .then((response) => {
          this.setState({firstTime: true})
          if (this.state.remember) {
            cookies.set("GreenMarketToken", response.data.token, {
              maxAge: 2147483647,
            });
          } else {
            cookies.set("GreenMarketToken", response.data.token);
          }
          cookies.set("authenticated", true);
          this.setState(this.state);
          resolve(true);
        })
        .catch((error) => {
          cookies.set("authenticated", false);
          console.log(error);
          reject(error);
        });
    });
    return promise;
  }

  // Google login
  responseGoogle = (response: any) => {
    // call this.login
    console.log(response);
  };

  // Render webpage
  render() {
    const redirectLink = querystring("redirect", true);
    const redirect = querystring("redirect", false);
    if (this.state.continue) {
      if(this.state.firstTime) {
        return (
          <Redirect to={"/completeRegister"}/>
        )
      } else {
        return (
          <Redirect to={redirect === "" || redirect === null ? "/home" : redirect}/>
        );
      }
    } else {
      const { t } = this.props;
      return (
        <div className="loginPage bg-main flex justify-center text-center">
          <div className="md:w-3/6 m-auto">
            <Link to="/">
              <h1 className="text-8xl font-bold text-white">
                <div className="content-center inline-block">
                  <img className="h-50 w-auto" src={""} alt="Logo"/>
                </div>
              </h1>
            </Link>
            <form onSubmit={this.handleSubmit}>
              <input
                className="form-input mt-8 block w-full border-3 text-dark_blue border-darker_blue placeholder-dark_blue rounded-full pt-1 pb-1 pl-3 pr-3 bg-opacity-0 bg-salmon focus:outline-none focus:bg-beige_a_morrer focus:text-darker_blue focus:ring-0 focus:border-transparent"
                name="email"
                type="email"
                placeholder="E-mail"
                onChange={this.handleChange}
              />
              <input
                className="form-input mt-8 block w-full border-3 text-dark_blue border-darker_blue placeholder-dark_blue rounded-full pt-1 pb-1 pl-3 pr-3 bg-opacity-0 bg-salmon focus:outline-none focus:bg-beige_a_morrer focus:text-darker_blue focus:ring-0 focus:border-transparent"
                name="password"
                type="password"
                placeholder={t("password")}
                onChange={this.handleChange}
              />
              <label className="flex justify-between mt-8 ml-4 mr-4">
                <span>
                  <input
                    id="rememberMeBtn"
                    type="checkbox"
                    className="form-checkbox"
                    onChange={this.handleChange}
                    name="remember"
                  />
                  <span className="ml-3 text-darker_blue">{t("remember-me")}</span>
                </span>
                <span
                  className="text-darker_blue" /* use React.Router to forgot password route */
                >
                  {t("forgot-password")}
                </span>
              </label>
              <button
                type="submit"
                className="w-full block mt-12 text-white  bg-dark_blue font-bold text-2xl rounded-full pt-1 pb-2 focus:outline-none hover:bg-opacity-80 hover:bg-salmon hover:text-darker_blue"
              >
                {t("login")}
              </button>
            </form>
            <div className="text-white separator pt-4 mb-6 pl-4 pr-4">
              {t("sign-in-with")}
            </div>
            <GoogleLogin
              clientId="435001531571-aolerdljkcbrobj2qarsk6u9f87i3nrh.apps.googleusercontent.com"
              jsSrc="https://apis.google.com/js/platform.js"
              render={(renderProps) => (
                <button
                  className="rounded-full w-14 h-14 bg-white mx-auto focus:outline-none"
                  onClick={renderProps.onClick}
                  disabled={renderProps.disabled}
                >
                  <img
                    className="w-12 h-12 mx-auto"
                    src={googleLogo}
                    alt="Sign in with Google"
                  />
                </button>
              )}
              buttonText="Login"
              onSuccess={this.responseGoogle}
              onFailure={this.responseGoogle}
              isSignedIn={true}
              cookiePolicy={"single_host_origin"}
            />
            <p className="text-white mt-6">
              {t("new-member")}&nbsp;
              <Link
                className="font-bold underline"
                to={
                  redirectLink === "" || redirectLink === null
                    ? "/register"
                    : "/register" + redirectLink
                }
              >
                {t("create-account")}
              </Link>
            </p>
          </div>
        </div>
      );
    }
  }
}

export default compose<React.ComponentType<any>>(
  withTranslation(),
  withCookies
)(Login);


