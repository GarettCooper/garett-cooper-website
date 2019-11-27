import React from 'react';
import LoadingOverlay from 'react-loading-overlay';
import FadeSpinner from 'react-spinners/FadeLoader';
import Header from './Header';
import GitPage from './Git';
import HomePage from './Home';
import Menu from './Menu';
import {
  Switch,
  Route,
  HashRouter,
} from "react-router-dom";

export enum Page {
  Home = "/",
  OpenSourceProjects = "/open-source-projects"
}

export interface PageProps {
  stateUpdateCallback: (state: {loading?: boolean, darkMode?: boolean, page?: Page}) => void;
}

interface AppState {
  loading: boolean;
  darkMode: boolean;
  menuOpen: boolean;
  page: Page
}

const headerTabs = [{label: "Home", page: Page.Home}, {label: "Open Source Projects", page: Page.OpenSourceProjects}];

export default class App extends  React.Component<{}, AppState>{
  constructor(props: {}){
    super(props);

    this.state = {
      loading: false,
      darkMode: false,
      menuOpen: false,
      page: Page.Home
    }
  }

  stateUpdate(state: {loading?: boolean, darkMode?: boolean, menuOpen?: boolean, page?: Page}) {
    this.setState({
      loading: state.loading ? state.loading : this.state.loading,
      darkMode: state.darkMode ? state.darkMode : this.state.darkMode,
      page: state.page ? state.page : this.state.page,
    });
  }

  setMenuOpen(open: boolean) {
    this.setState({...this.state, menuOpen: open})
  }

  changeTheme(){
    this.setState({...this.state, darkMode: !this.state.darkMode});
  }

  render() {
    // While not exactly in proper react style, I want the theme to be tied to the state of the App component while also covering the whole document.
    // By putting this in the render function, the theme will be updated with the App component.
    document.documentElement.className = this.state.darkMode ? "dark-mode" : "light-mode";
    return (
    <HashRouter>
      <div className="app">
        <Menu isOpen={this.state.menuOpen} themeChecked={this.state.darkMode} themeChangeCallback={this.changeTheme.bind(this)} menuOpenCallback={this.setMenuOpen.bind(this)}>
          <Header tabs={headerTabs} currentPage={this.state.page} themeChecked={this.state.darkMode} themeChangeCallback={this.changeTheme.bind(this)} menuOpenCallback={this.setMenuOpen.bind(this)}/>
          <LoadingOverlay active={this.state.loading} spinner={<FadeSpinner height={64} width={32} radius={60} color="var(--theme-colour)"/>} fadeSpeed={500}>
            <div className="margin page">
              <Switch>              
                <Route path={Page.OpenSourceProjects}>
                  <GitPage stateUpdateCallback={this.stateUpdate.bind(this)}/>
                </Route>
                <Route path={Page.Home}>
                  <HomePage stateUpdateCallback={this.stateUpdate.bind(this)}/>
                </Route>
              </Switch>
            </div>
          </LoadingOverlay>
        </Menu>
      </div>
    </HashRouter>
    )  
  }
}