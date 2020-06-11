import React from "react";

interface ResumeProps {
    keywords?: string[];
    length?: number;
    history?: any;
}

interface ResumeState {
    resume?: Resume;
    initialized: boolean;
}

export default class ResumeComponent extends React.Component<ResumeProps, ResumeState> {

    constructor (props: {}) {
        super(props);
        this.state = {
            resume: undefined,
            initialized: false
        }
    }

    async componentDidUpdate (previousProps: ResumeProps, previousState: ResumeState) {
        // Awful hack for comparing arrays, but it works
        if (previousProps.keywords?.toString() !== this.props.keywords?.toString() || previousProps.length !== this.props.length || !this.state.initialized) {
            this.setState({initialized: true});
            let queryString = "";
            if (this.props.keywords && this.props.keywords.length > 0) {
                queryString += "keywords=" + this.props.keywords.join(",");
            }
            if (this.props.length) {
                if (this.props.keywords && this.props.keywords.length > 0) {
                    queryString += "&";
                }
                queryString += "length=" + this.props.length;
            }
            let response = await fetch("https://api.garettcooper.com/resume?" + queryString);
            this.setState({resume: await response.json()});

            if (queryString.length > 0) {
                this.props.history.push({
                    search: queryString
                });
            }
        }
    }

    render() {
        return (
            <div className="resume">
                {this.state.resume?.sections.map((section) => (<ResumeSectionComponent key={section.title} resumeSection={section}/>))}
            </div>
        );
    }
}

interface ResumeSectionProps {
    resumeSection: ResumeSection
}

class ResumeSectionComponent extends React.Component<ResumeSectionProps, {}> {

    render() {
        return (
            <div className="resume-section">
                <h1>{this.props.resumeSection.title}</h1>
                {this.props.resumeSection.blurb}
                <ul>
                    {this.props.resumeSection.points?.map((point) => <li key={point.text}>{point.text}</li>)}
                </ul>
                {this.props.resumeSection.subsections?.map((subsection) => <ResumeSubsectionComponent key={subsection.heading} resumeSubsection={subsection}/>)}
            </div>
        );
    }
}

interface ResumeSubsectionProps {
    resumeSubsection: ResumeSubsection
}

class ResumeSubsectionComponent extends React.Component<ResumeSubsectionProps, {}> {
    render() {
        return (
            <div className="resume-section">
                <h3 className="inline">{this.props.resumeSubsection.heading}</h3>{this.companionHeading()}
                <h6>{this.props.resumeSubsection.subheading}</h6>
                {this.props.resumeSubsection.blurb}
                <ul>
                    {this.props.resumeSubsection.points?.map((point) => <li key={point.text}>{point.text}</li>)}
                </ul>
            </div>
        );
    }

    private companionHeading() {
        if (this.props.resumeSubsection.companionHeading) {
            return (<h4 className="inline"> - {this.props.resumeSubsection.companionHeading}</h4>)
        }
    }
}

export interface ResumePoint {
    text: string;
}

export interface ResumeSubsection {
    heading: string;
    subheading?: string;
    companionHeading?: string;
    points: ResumePoint[];
    blurb?: string;
}

export interface ResumeSection {
    title: string;
    points?: ResumePoint[];
    subsections?: ResumeSubsection[];
    blurb?: string;
}

export interface Resume {
    name: string;
    phoneNumber: string;
    email: string;
    website: string;
    additionalContactInformation?: string[];
    sections: ResumeSection[];
}