import React from 'react';
import Resume from "../Resume";
import {Page, PageProps} from '../App'
import {isMobile} from 'react-device-detect'
import TextInput from 'react-autocomplete-input';
import '../../css/Home.css'
import ReactSlider from "react-slider";

interface HomePageState {
    keywords: string[],
    selectedKeywords: string,
    maxLength: number,
    length: number
}

export default class HomePage extends React.Component<PageProps, HomePageState>{

    constructor (props: PageProps) {
        super(props);
        this.state = {
            keywords: [],
            selectedKeywords: new URLSearchParams(this.props.history.location.search).get("keywords")?.split(",")?.join(", ") ?? "",
            maxLength: 25,
            length: Number(new URLSearchParams(this.props.history.location.search).get("length") ?? 20)
        }
    }

    async componentDidMount () {
        document.title = "Garett Cooper";
        this.props.stateUpdateCallback({loading: false, page: Page.Home});
        let [keywords, maxLength] = await Promise.all([
            fetch("https://api.garettcooper.com/resume/keywords").then((r) => r.json()),
            fetch("https://api.garettcooper.com/resume/max_length").then((r) => r.json())
        ]);
        this.setState({keywords: keywords, maxLength: maxLength});
    }

    private updateLength(value: number | number[] | null | undefined) {
        if (typeof value === "number") {
            this.setState({length: Math.max(Math.floor(value * this.state.maxLength / 100), 1)});
        }
    }

    private onChangeKeywords(value: string) {
        this.setState({selectedKeywords: value});
    }

    render () {
        return (
            <div className="home-page page">
                <div className="home-info">
                    <h1>Hello</h1>
                    <p>
                        {window.location.href.indexOf("dev.garettcooper") !== -1 ? (<b>Welcome to the staging version of my personal website. </b>) : "Welcome to my personal website. "}
                        My name is Garett Cooper, but you probably figured that out already.
                        This website is essentially an online résumé with a demonstration of basic React competency, as well as a place to host my WebAssembly based <a href="https://github.com/GarettCooper/gc_nes_emulator">gc_nes_emulator</a>
                        {isMobile ? ". Switch to a desktop or laptop" : " which allows you"} to play classic Nintendo Entertainment System games in your browser.
                    </p>
                </div>
                <div className="resume">
                    <h1>Résumé</h1>
                    <p>
                        Right below this point you'll find my résumé. It's retrieved from api.garettcooper.com/resume, an API that I created to tailor my résumé to meet specific
                        criteria. Try entering some keywords in the text-box below and see how it changes to fit to the new parameters. The state is also reflected in the URl
                        for simple saving and sharing.
                    </p>
                    <div className="resume-controls">
                        <table style={{width: "100%"}}>
                            <thead>
                                <tr>
                                    <th className="resume-control-header">
                                        <div className="resume-control-header">Keywords:</div>
                                    </th>
                                    <th className="resume-control-header">
                                        <div>Length:</div>
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>
                                        <div style={{position: "relative"}}>
                                            <TextInput Component="input" options={this.state.keywords} onChange={this.onChangeKeywords.bind(this)} value={this.state.selectedKeywords} trigger=""/>
                                        </div>
                                    </td>
                                    <td>
                                        <ReactSlider className="horizontal-slider" thumbClassName="slider-thumb" trackClassName="slider-track" defaultValue={(this.state.length / this.state.maxLength) * 100} onAfterChange={this.updateLength.bind(this)}/>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <Resume history={this.props.history} keywords={this.state.selectedKeywords.split(/[\s,]/).filter(s => this.state.keywords.includes(s)) ?? []} length={this.state.length}/>
                </div>
            </div>
        )
    }
} 