import React from 'react';
import Headroom from 'react-headroom';
import {Page} from './App';
import gitLogo from './images/third_party/GitHub-Mark.svg';
import linkedInLogo from './images/third_party/LI-In-Bug.png';
import "./css/Header.css"

interface HeaderProps {
    tabs?: {label: string, page: Page}[];
    currentPage: Page;
    setPageCallback?: (arg0: Page) => void;
}

export default class Header extends React.Component<HeaderProps, {}> {
    render() {
        let tabs;
        if (this.props.tabs) {
            // Assumes one tab per page
            tabs = this.props.tabs.map((tab) => (<Tab key={tab.page.valueOf()} label={tab.label} page={tab.page} setPageCallback={this.props.setPageCallback} active={tab.page === this.props.currentPage}/>))
            //if (tabs.length > 0) tabs[0].props.active = true;
        }

        return (
        <Headroom>
<           div className="header drop">
                <header>
                    <div className="margin">
                        <div id="header-bar"/>
                        <span className="header-name">Garett Cooper</span>
                        <div className="header-tabs inline">{tabs}</div>
                        <a href="https://github.com/GarettCooper"><img src={gitLogo} className="media-widget" alt="GitHub logo"/></a>
                        <a href="https://www.linkedin.com/in/garett-cooper-b7b4a8128/"><img src={linkedInLogo} className="media-widget" alt="LinkedIn logo" /></a>
                    </div>
                </header>
            </div>
        </Headroom>
        );
    }
}

interface TabProps {
    label: string;
    page: Page;
    active: boolean;
    setPageCallback?: (arg0: Page) => void;
}

class Tab extends React.Component<TabProps, {}> {

    click () {
        if (this.props.setPageCallback) this.props.setPageCallback(this.props.page)
    }

    render () {
        return (
        <div className="header-tab inline">
            <button onClick={this.click.bind(this)} disabled={this.props.active}>
                {this.props.label}
            </button>           
        </div>
        )
    }
}
