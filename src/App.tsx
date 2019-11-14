import React from 'react';
import LoadingOverlay from 'react-loading-overlay';
import FadeSpinner from 'react-spinners/FadeLoader';
import Header from './Header';
import GitPanel from './Git'

enum Page {
  Home,
  OpenSourceProjects
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
      page: Page.OpenSourceProjects
    }
  }

  setLoading (l: boolean) {
    console.log("Set loading: " + l);
    this.setState({...this.state, loading: l});
  }

  render () {
    let page;
    switch (this.state.page){
      case Page.Home:
        page = (<FadeSpinner height={64} width={32} radius={60} color="var(--seconday-colour)"/>);
        break;
      case Page.OpenSourceProjects:
      default:
        page = (<GitPanel loadingCallback={this.setLoading.bind(this)}/>);
    }

    return (<div className="App">
      <Header/>
      <LoadingOverlay active={this.state.loading} spinner={<FadeSpinner height={64} width={32} radius={60} color="var(--seconday-colour)"/>}>
        <div className="margin page">
          {page}
        </div>
      </LoadingOverlay>
    </div>
    )  
  }
}