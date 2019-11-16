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
  page: Page
}

export default class App extends  React.Component<{}, AppState>{
  constructor (props: {}){
    super(props)
    this.state = {
      loading: true,
      page: Page.Home
    }
  }

  setLoading (l: boolean) {
    this.setState({...this.state, loading: l});
  }

  setPage (p: Page){
    console.log("Set page: " + p)

    this.setState({loading: true, page: p});
  }

  render () {
    let page;
    switch (this.state.page){
      case Page.Home:
        page = (<HomePage loadingCallback={this.setLoading.bind(this)}/>);
        break;
      case Page.OpenSourceProjects:
      default:
        page = (<GitPage loadingCallback={this.setLoading.bind(this)}/>);
    }

    return (<div className="App">
      <Header tabs={[{label: "Home", page: Page.Home}, {label: "Open Source Projects", page: Page.OpenSourceProjects}]} currentPage={this.state.page} setPageCallback={this.setPage.bind(this)}/>
      <LoadingOverlay active={this.state.loading} spinner={<FadeSpinner height={64} width={32} radius={60} color="var(--theme-colour)"/>} fadeSpeed={500}>
        <div className="margin page">
          {page}
        </div>
      </LoadingOverlay>
    </div>
    )  
  }
}