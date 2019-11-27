import React from 'react';
import { Link } from 'react-router-dom';
import { Page } from './App';
import { HeaderButtons } from './Header';
import Sidebar from 'react-sidebar';
import './css/Menu.css';
import closeSymbol from './images/material_icons/close.svg';

interface MenuProps {
    isOpen: boolean
    themeChecked: boolean;
    themeChangeCallback: () => void;
    menuOpenCallback: (open: boolean) => void;
}

export default class Menu extends React.Component<MenuProps, {}> {
    render() {
        let sidebarContent = (
        <div className="sidebar-frame">
            <HeaderButtons themeChecked={this.props.themeChecked} themeChangeCallback={this.props.themeChangeCallback}/>
            <div className="inline sidebar-close">
                <input type="image" className="menu-button" src={closeSymbol} alt="Close Menu" onClick={() => this.props.menuOpenCallback(false)}/>
            </div>
            <div className="sidebar-items">
                <Link to={Page.Home} className="sidebar-item" onClick={() => this.props.menuOpenCallback(false)}><b>Home</b></Link>
                <Link to={Page.OpenSourceProjects} className="sidebar-item" onClick={() => this.props.menuOpenCallback(false)}><b>Open Source Projects</b></Link>
            </div>
        </div>);

        return (
            <Sidebar open={this.props.isOpen} pullRight={true} onSetOpen={this.props.menuOpenCallback} sidebar={sidebarContent} sidebarClassName="sidebar" overlayClassName="sidebar-overlay" contentClassName="sidebar-content">
                {this.props.children}
            </Sidebar>
        )
    }
}