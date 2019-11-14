import React from 'react';
import Headroom from 'react-headroom';
import gitLogo from './images/third_party/GitHub-Mark.svg';
import linkedInLogo from './images/third_party/LI-In-Bug.png';

export default class Header extends React.Component<{}, {}> {
    render() {
        return (
        <Headroom>
<           div className="header drop">
                <header>
                    <div className="margin">
                        <div id="header-bar"/>
                        Garett Cooper
                        <a href="https://github.com/GarettCooper"><img src={gitLogo} className="media-widget" alt="GitHub logo"/></a>
                        <a href="https://www.linkedin.com/in/garett-cooper-b7b4a8128/"><img src={linkedInLogo} className="media-widget" alt="LinkedIn logo" /></a>
                    </div>
                </header>
            </div>
        </Headroom>
        );
    }
}
