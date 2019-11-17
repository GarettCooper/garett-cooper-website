import React from 'react';
import LoadingOverlay from 'react-loading-overlay';
import FadeSpinner from 'react-spinners/FadeLoader';
import Header from './Header';
import GitPage from './Git';
import HomePage from './Home';

export enum Page {
  Home,
  OpenSourceProjects
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

    let targetPage: Page;
    // TODO: Rework this with a proper routing solution
    let path: string[] = window.location.pathname.split('/');
    switch (path[path.length - 1]) {
        case "Home":
        default:
          targetPage = Page.Home;
          break;
        case "OpenSourceProjects":
          targetPage = Page.OpenSourceProjects;
          break;
    }

    this.state = {
      loading: true,
      darkMode: false,
      page: targetPage
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

    let page;
    let path: string[] = window.location.pathname.split('/');
    switch (this.state.page){
      case Page.Home:
      default:
        page = (<HomePage loadingCallback={this.setLoading.bind(this)}/>);
        path[path.length - 1] = "Home";
        window.history.pushState('Home', 'Garett Cooper', path.join('/'));
        break;
      case Page.OpenSourceProjects:
        page = (<GitPage loadingCallback={this.setLoading.bind(this)}/>);
        path[path.length - 1] = "OpenSourceProjects";
        window.history.pushState('OpenSourceProjects', 'Garett Cooper', path.join('/'));
    }

    return (<div className="app">
      <Header tabs={headerTabs} currentPage={this.state.page} themeChecked={this.state.darkMode} themeChangeCallback={this.changeTheme.bind(this)} setPageCallback={this.setPage.bind(this)}/>
      <LoadingOverlay active={this.state.loading} spinner={<FadeSpinner height={64} width={32} radius={60} color="var(--theme-colour)"/>} fadeSpeed={500}>
        <div className="margin page">
          {page}
        </div>
      </LoadingOverlay>
    </div>
    )  
  }
}