import React from 'react';
import './css/Git.css'

export interface GitCardProps {
    title: string;
    url: string;
    lang: string;
    desc: string;
}

class GitCard extends React.Component<GitCardProps, {}> {
    render() {
        return (
        <div className="git-card drop">
            <a href={this.props.url}>
                <div className="git-card-pad">
                    <div className="git-card-header">
                       <b>{this.props.title}</b> - <em>{this.props.lang}</em>
                    </div>
                    {this.props.desc}
                </div>
            </a>
        </div>
        );
    }
}

interface GitPanelProps {
    loadingCallback?: (arg0: boolean) => void;
}

interface GitPanelState {
    //TODO: setup an actual type for the api response
    gitRepos: [any]
}



export class GitPanel extends React.Component<GitPanelProps, GitPanelState>{

    constructor (props: {}) {
        super(props);
        this.state = {
            gitRepos: [0]
        }
    }

    async componentDidMount () {
        try {
            let response = await fetch("https://api.github.com/users/GarettCooper/repos");
            this.setState({gitRepos: await response.json()});
            console.log(this.state.gitRepos[0]);
            this.state.gitRepos.map(repo => console.log("Unique Key: " + repo.id));
            
            if (this.props.loadingCallback !== undefined) this.props.loadingCallback(false);

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
        <div className="git-panel">
            {this.state.gitRepos.sort((a, b) => Date.parse(b.pushed_at).valueOf()-Date.parse(a.pushed_at).valueOf()).map(repo => (<GitCard key={repo.id} title={repo.name} url={repo.html_url} lang={repo.language} desc={repo.description}/>))}
        </div>
        );
    }
}

export default class GitPage extends React.Component<GitPanelProps, {}>{

    render () {
        return (
            <div className="git-page margin">
                <div className="git-info">
                    <h1>Open Source Projects</h1>
                    These are a collection of the open source projects I've worked on, retrieved from my GitHub.
                </div>
                <GitPanel loadingCallback={this.props.loadingCallback}/>
            </div>
        )
    }

}