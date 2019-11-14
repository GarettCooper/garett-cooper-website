import React from 'react';
import Header from './Header';
import GitPanel from './Git'

enum Page {
  Home,
  OpenSourceProjects
}

interface AppState {
  page: Page
}

export default class App extends  React.Component<{}, AppState>{
  constructor (props: {}){
    super(props)
    this.state = {
      page: Page.OpenSourceProjects
    }
  }

  render () {
    let page;
    switch (this.state.page){
      case Page.Home:
      case Page.OpenSourceProjects:
      default:
        page = (<GitPanel/>);
    }

    return (<div className="App">
      <Header/>
      <div className="margin">
        {page}
      </div>
    </div>
    )  
  }
}