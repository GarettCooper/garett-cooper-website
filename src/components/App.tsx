import React from 'react';
import LoadingOverlay from 'react-loading-overlay';
import FadeSpinner from 'react-spinners/FadeLoader';
import Header from './Header';
import GitPage from './pages/Git';
import NesPage from "./pages/Nes";
import HomePage from './pages/Home';
import Menu from './Menu';
import {
  Switch,
  Route,
  HashRouter,
} from "react-router-dom";
import {BrowserView, MobileOnlyView} from "react-device-detect";

export enum Page {
  Home = "/",
  OpenSourceProjects = "/open-source-projects",
  NesEmulator = "/nes-emulator"
}

export interface PageProps {
  location?: any; // Location; // For some reason this type isn't working so I'll use any for now
  stateUpdateCallback: (state: {loading?: boolean, darkMode?: boolean, page?: Page}) => void;
}

interface AppState {
  loading: boolean;
  darkMode: boolean;
  menuOpen: boolean;
  page: Page
}

const headerTabs = [{label: "Home", page: Page.Home}, {label: "Open Source Projects", page: Page.OpenSourceProjects}, {label: "NES Emulator", page: Page.NesEmulator}];

export default class App extends  React.Component<{}, AppState>{
  constructor(props: {}){
    super(props);

    const darkMode = window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches;

    this.state = {
      loading: false,
      darkMode: darkMode,
      menuOpen: false,
      page: Page.Home
    }
  }

  stateUpdate(state: {loading?: boolean, darkMode?: boolean, menuOpen?: boolean, page?: Page}) {
    this.setState({
      loading: state.loading || this.state.loading,
      darkMode: state.darkMode || this.state.darkMode,
      page: state.page || this.state.page,
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

    let pageContent = (
        <div className="page-content">
          <Header tabs={headerTabs} currentPage={this.state.page} themeChecked={this.state.darkMode} themeChangeCallback={this.changeTheme.bind(this)} menuOpenCallback={this.setMenuOpen.bind(this)}/>
          <LoadingOverlay active={this.state.loading} spinner={<FadeSpinner height={64} width={32} radius={60} color="var(--theme-colour)"/>} fadeSpeed={500}>
            <div className="margin page">
              <Switch>
                <Route path={Page.NesEmulator}>
                  <NesPage stateUpdateCallback={this.stateUpdate.bind(this)}/>
                </Route>
                <Route path={Page.OpenSourceProjects}>
                  <GitPage stateUpdateCallback={this.stateUpdate.bind(this)}/>
                </Route>
                <Route path={Page.Home} render={(props) => (<HomePage location={props.location} stateUpdateCallback={this.stateUpdate.bind(this)}/>)}/>
              </Switch>
            </div>
          </LoadingOverlay>
        </div>
    );

    return (
    <HashRouter>
      <div className="app">
        <BrowserView>{pageContent}</BrowserView>
        <MobileOnlyView>
          <Menu isOpen={this.state.menuOpen} themeChecked={this.state.darkMode} themeChangeCallback={this.changeTheme.bind(this)} menuOpenCallback={this.setMenuOpen.bind(this)}>
            {pageContent}
          </Menu>
        </MobileOnlyView>
      </div>
    </HashRouter>
    )  
  }
}