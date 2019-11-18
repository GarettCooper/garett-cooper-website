import React from 'react';
import { PageProps } from './App'
import './css/Git.css'

export interface GitCardProps {
    title: string;
    url: string;
    lang: string;
    desc: string;
    date: Date;
}

class GitCard extends React.Component<GitCardProps, {}> {
    render() {
        return (
        <a href={this.props.url} className="git-link">
            <div className="git-card drop">
                    <div className="git-card-pad">
                        <div className="git-card-header">
                            <b>{this.props.title}</b> - <em>{this.props.lang}</em>
                            <span className="git-date">{formatDate(this.props.date)}</span>
                        </div>
                        {this.props.desc}
                    </div>
            </div>
        </a>
        );
    }
}

function formatDate (date: Date) : string {
    var local = new Date(date);
    local.setMinutes(date.getMinutes() - date.getTimezoneOffset());
    if (local.toJSON() !== null){
        return local.toJSON().slice(0, 10);
    } else {
        return "0000-00-00"
    }
}

interface GitPanelProps {
    loadingCallback?: (arg0: boolean) => void;
}

interface GitPanelState {
    //TODO: setup an actual type for the api response
    gitRepos: any[]
}



export class GitPanel extends React.Component<GitPanelProps, GitPanelState>{

    constructor (props: {}) {
        super(props);
        this.state = {
            gitRepos: []
        }
    }

    async componentDidMount () {
        try {
            let response = await fetch("https://api.github.com/users/GarettCooper/repos");
            this.setState({gitRepos: await response.json()});
            //this.state.gitRepos.map(repo => console.log("Unique Key: " + repo.id));
            
            if (this.props.loadingCallback) this.props.loadingCallback(false);

        } catch (error) {
            console.log(error);
            this.setState({gitRepos: [{
                name: "Error",
                desc: "There has been an error retreiving repository information from GitHub"
            }]});
        }
    }

    render() {
        return (
        <div className="git-panel slide-in-bottom">
            {this.state.gitRepos.sort((a, b) => Date.parse(b.pushed_at)-Date.parse(a.pushed_at)).map(repo => (<GitCard key={repo.id} title={repo.name} url={repo.html_url} lang={repo.language} desc={repo.description} date={new Date(repo.pushed_at)}/>))}
        </div>
        );
    }
}

export default class GitPage extends React.Component<PageProps, {}>{

    render () {
        return (
            <div className="git-page page">
                <div className="git-info">
                    <h1>Open Source Projects</h1>
                    These are a collection of the open source projects I've worked on, retrieved from my GitHub.
                </div>
                <GitPanel loadingCallback={this.props.loadingCallback}/>
            </div>
        )
    }
}