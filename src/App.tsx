import React from 'react';
import LoadingOverlay from 'react-loading-overlay';
import FadeSpinner from 'react-spinners/FadeLoader';
import Header from './Header';
import GitPage from './Git';
import HomePage from './Home';

enum Page {
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
      <Header/>
      <LoadingOverlay active={this.state.loading} spinner={<FadeSpinner height={64} width={32} radius={60} color="var(--theme-colour)"/>}>
        <div className="margin page">
          {page}
        </div>
      </LoadingOverlay>
    </div>
    )  
  }
}