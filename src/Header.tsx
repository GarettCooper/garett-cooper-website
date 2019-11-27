import React from 'react';
import Headroom from 'react-headroom';
import Switch from 'react-switch';
import {Link} from 'react-router-dom';
import {Page} from './App';
import gitLogo from './images/third_party/GitHub-Mark.svg';
import linkedInLogo from './images/third_party/LI-In-Bug.png';
import lightSymbol from './images/material_icons/white-balance-sunny.svg';
import darkSymbol from './images/material_icons/weather-night.svg';
import "./css/Header.css"
import menuSymbol from "./images/material_icons/menu-open.svg";
import {BrowserView, MobileOnlyView} from 'react-device-detect';

interface HeaderProps {
    tabs?: {label: string, page: Page}[];
    currentPage: Page;
    themeChecked: boolean;
    themeChangeCallback: () => void;
    menuOpenCallback: (open: boolean) => void;
}

const lightIcon = (<img src={lightSymbol} alt="Light Mode Enabled" className="theme-switch-icon"/>);
const darkIcon = (<img src={darkSymbol} alt="Dark Mode Enabled" className="theme-switch-icon"/>);

export default class Header extends React.Component<HeaderProps, {}> {
    render() {
        let tabs;
        if (this.props.tabs) {
            // Assumes one tab per page
            tabs = this.props.tabs.map((tab) => (<Tab key={tab.page.valueOf()} label={tab.label} page={tab.page} active={tab.page === this.props.currentPage}/>))
            //if (tabs.length > 0) tabs[0].props.active = true;
        }

        return (
        <Headroom>
<           div className="header drop">
                <header>
                    <div className="margin">
                        <div id="header-bar"/>
                        <span className="header-name">Garett Cooper</span>
                        <BrowserView renderWithFragment={true}>
                            <div className="header-tabs inline">{tabs}</div>
                        </BrowserView>
                        <MobileOnlyView renderWithFragment={true}>

                            <div className="header-menu-button inline">
                                <input type="image" className="menu-button" src={menuSymbol} alt="Open Menu" onClick={() => this.props.menuOpenCallback(true)}/>
                            </div>
                        </MobileOnlyView>
                        <BrowserView renderWithFragment={true}>
                            <HeaderButtons themeChecked={this.props.themeChecked} themeChangeCallback={this.props.themeChangeCallback}/>
                        </BrowserView>
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
}

class Tab extends React.Component<TabProps, {}> {

    render () {
        return (
        <div className={this.props.active ? "header-tab inline active" : "header-tab inline"}>
            <Link to={this.props.page}>
                {this.props.label}
            </Link>
        </div>
        )
    }
}


interface HeaderButtonProps {
    themeChecked: boolean;
    themeChangeCallback: () => void;
}

export class HeaderButtons extends React.Component<HeaderButtonProps, {}> {
    render() {
        return(
            <div className="header-buttons inline">
                <div className="media-widgets inline">
                    <a href="https://github.com/GarettCooper"><img src={gitLogo} className="media-widget" alt="GitHub logo"/></a>
                    <a href="https://www.linkedin.com/in/garett-cooper-b7b4a8128/"><img src={linkedInLogo} className="media-widget" alt="LinkedIn logo" /></a>
                </div>
                <Switch onChange={this.props.themeChangeCallback} checked={this.props.themeChecked} className="theme-switch" aria-label="Dark Mode Switch" uncheckedIcon={lightIcon} checkedIcon={darkIcon} onColor="#00ab44"/>
            </div>
        )
    }
}