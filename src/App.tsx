import React from 'react';
import LoadingOverlay from 'react-loading-overlay';
import FadeSpinner from 'react-spinners/FadeLoader';
import Header from './Header';
import GitPage from './Git';
import HomePage from './Home';
import {
  Switch,
  Route,
  HashRouter
} from "react-router-dom";

export enum Page {
  Home = "/",
  OpenSourceProjects = "/open-source-projects"
}

export interface PageProps {
  loadingCallback?: (arg0: boolean) => void;
}

interface AppState {
  loading: boolean;
  darkMode: boolean;
  page: Page
}

const headerTabs = [{label: "Home", page: Page.Home}, {label: "Open Source Projects", page: Page.OpenSourceProjects}];

export default class App extends  React.Component<{}, AppState>{
  constructor (props: {}){
    super(props)

    this.state = {
      loading: true,
      darkMode: false,
      page: Page.Home
    }
  }

  setLoading (l: boolean) {
    this.setState({...this.state, loading: l});
  }

  setPage (p: Page){
    //console.log("Set page: " + p)
    this.setState({...this.state, loading: true, page: p});
  }

  changeTheme (){
    //console.log("Change theme");
    this.setState({...this.state, darkMode: !this.state.darkMode});
  }

  render () {
    // While not exactly in proper react style, I want the theme to be tied to the state of the App component while also covering the whole document.
    // By putting this in the render function, the theme will be updated with the App component.
    document.documentElement.className = this.state.darkMode ? "dark-mode" : "light-mode";

    return (
    <HashRouter>
      <div className="app">
        <Header tabs={headerTabs} currentPage={this.state.page} themeChecked={this.state.darkMode} themeChangeCallback={this.changeTheme.bind(this)} setPageCallback={this.setPage.bind(this)}/>
        <LoadingOverlay active={this.state.loading} spinner={<FadeSpinner height={64} width={32} radius={60} color="var(--theme-colour)"/>} fadeSpeed={500}>
          <div className="margin page">
            <Switch>              
              <Route path={Page.OpenSourceProjects}>
                <GitPage loadingCallback={this.setLoading.bind(this)}/>
              </Route>
              <Route path={Page.Home}>
                <HomePage loadingCallback={this.setLoading.bind(this)}/>
              </Route>
            </Switch>
            {/*page*/}
          </div>
        </LoadingOverlay>
      </div>
    </HashRouter>
    )  
  }
}