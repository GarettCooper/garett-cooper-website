import React from 'react';
import Resume from "../Resume";
import {Page, PageProps} from '../App'
import {isMobile} from 'react-device-detect'
import '../../css/Home.css'

export default class HomePage extends React.Component<PageProps, {}>{

    componentDidMount () {
        document.title = "Garett Cooper";
        this.props.stateUpdateCallback({loading: false, page: Page.Home});
    }

    render () {
        return (
            <div className="home-page page">
                <div className="home-info">
                    <h1>Hello</h1>
                    <p>
                        {window.location.href.indexOf("dev.garettcooper") !== -1 ? (<b>Welcome to the development version of personal website. </b>) : "Welcome to my personal website. "}
                        My name is Garett Cooper, but you probably figured that out already.
                        This website is essentially an online résumé with a demonstration of basic React competency, as well as a place to host my WebAssembly based <a href="https://github.com/GarettCooper/gc_nes_emulator">gc_nes_emulator</a>
                        {isMobile ? ". Switch to a desktop or laptop" : " which allows you"} to play classic Nintendo Entertainment System games in your browser.
                    </p>
                </div>
                <Resume keywords={new URLSearchParams(this.props.location.search).get("keywords")?.split(",")} length={Number(new URLSearchParams(this.props.location.search).get("length"))}/>
            </div>
        )
    }
} 