import React from 'react';
import Resume from "../Resume";
import {Page, PageProps} from '../App'
import {isMobile} from 'react-device-detect'
import TextInput from 'react-autocomplete-input';
import '../../css/Home.css'

interface HomePageState {
    keywords: string[],
    selectedKeywords: string[]
}

export default class HomePage extends React.Component<PageProps, HomePageState>{

    constructor (props: PageProps) {
        super(props);
        this.state = {
            keywords: [],
            selectedKeywords: []
        }
    }

    async componentDidMount () {
        document.title = "Garett Cooper";
        this.props.stateUpdateCallback({loading: false, page: Page.Home});
        let keywords = await (await fetch("https://api.garettcooper.com/resume/keywords")).json();
        this.setState({keywords: keywords});
    }

    private updateSelectedKeywords(input: string) {
        if (input !== "") {
            this.setState({selectedKeywords: input.split(" ") ?? []});
        }
    }

    render () {
        let updateSelectedKeywords =  this.updateSelectedKeywords.bind(this);
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
                <h1>Résumé</h1>
                <p>
                    Right below this point you'll find my résumé. It's retrieved from api.garettcooper.com/resume, an API that I have created to tailor my résumé to meet specific
                    criteria. Try entering some keywords in the text-box below and see how it changes to reflect the new parameters.
                </p>
                <TextInput Component="input" options={this.state.keywords} onBlur={(e: any) => updateSelectedKeywords((e.target as HTMLInputElement).value)} trigger=""/>
                <Resume history={this.props.history} keywords={this.state.selectedKeywords} length={Number(new URLSearchParams(this.props.history.location.search).get("length"))}/>
            </div>
        )
    }
} 