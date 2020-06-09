import React from "react";

interface ResumeProps {
    keywords?: string[],
    length?: number
}

interface ResumeState {
    resume?: Resume
}

export default class ResumeComponent extends React.Component<ResumeProps, ResumeState> {

    constructor (props: {}) {
        super(props);
        this.state = {
            resume: undefined
        }
    }

    async componentDidMount () {
        try {
            let queryString = "";
            if (this.props.keywords) {
                queryString += "keywords=" + this.props.keywords.join(",");
                if (this.props.length) {
                    queryString += "&";
                }
            }
            if (this.props.length) {
                queryString += "size=" + this.props.length;
            }
            let response = await fetch("https://api.garettcooper.com/resume?" + queryString);
            this.setState({resume: await response.json()});
        } catch (error) {
            console.log(error);
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