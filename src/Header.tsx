import React from 'react';
import Headroom from 'react-headroom';
import gitLogo from './Images/ThirdParty/GitHub-Mark.svg';
import linkedInLogo from './Images/ThirdParty/LI-In-Bug.png';

export default class Header extends React.Component<{}, {}> {
    render() {
        return (
        <Headroom>
<           div className="Header">
                <header>
                    <div className="margin">
                        <div id="header-bar"/>
                        Garett Cooper
                        <a href="https://github.com/GarettCooper"><img src={gitLogo} className="logo" alt="GitHub logo"/></a>
                        <a href="https://www.linkedin.com/in/garett-cooper-b7b4a8128/"><img src={linkedInLogo} className="logo" alt="LinkedIn logo" /></a>
                    </div>
                </header>
            </div>
        </Headroom>
        );
    }
}
