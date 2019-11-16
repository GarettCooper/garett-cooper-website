import React from 'react';
import {PageProps} from './App'
import './css/Home.css'

export default class GitPage extends React.Component<PageProps, {}>{

    componentDidMount () {
        if (this.props.loadingCallback !== undefined) this.props.loadingCallback(false);
    }

    render () {
        return (
            <div className="home-page page">
                <div className="home-info">
                    <h1>Hello</h1>
                    <p>
                        Welcome to my personal website. My name is Garett Cooper, but you probably figured that out already.
                        For the time being, it is essentially an online résumé with a demonstration of basic React competency, but I plan to continue adding features to it as I have the time.
                        In future I would like to include a web assembly based version of my <a href="https://github.com/GarettCooper/gc_nes_emulator">gc_nes_emulator</a>, but that will have to wait.
                    </p>
                </div>
                <div className="home-resume">              
                    <h1>Skills and Qualifications</h1>
                    <ul>
                        <li>Proficiency in many programming languages, including Java, C, C#, and Python, with a strong understanding of their strengths and weaknesses.</li>
                        <li>Familiar with the structure of relational databases and the construction of efficient (My/Postgre/T-)SQL queries, as well as their usage in software development.</li>
                        <li>Understanding of web application architecture and technologies such as RESTful APIs, HTTP request methods, and data interchange formats.</li>
                        <li>Experience with both white and black box automated testing practices and design patterns.</li>
                    </ul>
                    <h1>Experience</h1>
                    <h3 className="inline">Electronic Arts, Vancouver</h3> <h4 className="inline"> - Software Engineer</h4>
                    <h6>September 2018 - April 2019</h6>
                    <ul>
                        <li>Developed automation scripts in C# for smoke and soak testing of the FIFA video game franchise on all major platforms, performing both stability testing and asset verification for new game features.</li>
                        <li>Independently conceived of and designed an IDE integration system for the scripting language used by FIFA Quality Engineering’s in house automation tool using Java and Groovy.</li>
                        <li>Administered farms and pools of consoles for automated testing, identifying game and script issues using the Jenkins-based in house automation tool.</li>
                    </ul>
                    <h3 className="inline">CBI Health Group, Toronto</h3> <h4 className="inline"> - Junior Developer</h4>
                    <h6>January 2018 - April 2018</h6>
                    <ul>
                        <li>Developed multiple tools for internal use by the product management, application, and QA teams to improve the efficiency of their workflows by automating regular tasks with Winform applications built in C#. Tasks included using RESTful and HTTP requests to exchange data with web services including JIRA and S-filer.</li>
                        <li>Added import/export functionality to CBI’s LinC platform for the transfer of physical rehabilitation toolkits from the test environment to the production environment using JSON and C#.</li>
                        <li>Updated legacy web application to comply with new BC legislation and ensure the safety of personal support workers operating remotely using AngularJS.</li>
                    </ul>
                    <h3 className="inline">Lean Industries,  Toronto</h3> <h4 className="inline"> - Junior Developer</h4>
                    <h6>July 2016 - August 2016</h6>
                    <ul>
                        <li>Developed a system health dashboard to provide clients with real-time server statistics by implementing Java Management Extensions within the Lean Industries Adjustment Hub platform, accelerating the system maintenance process. Position included presentation of the dashboard as part of company meetings.</li>
                    </ul>
                    <h6>July 2015 - August 2015</h6>
                    <ul>
                        <li>Developed a demonstration web service for use in industry presentations with the Vaadin Java Web UI Framework, effectively conveying the utility of new Adjustment Hub features to Lean Industries’ clients.</li>
                    </ul>
                    <h1>Education</h1>
                    <h3 className="inline">University of Waterloo</h3> <h4 className="inline"> - Candidate for Bachelor of Environmental Studies</h4>
                    <h6>Term 3B, September 2016 - Present</h6>
                    Studying in the Honours Geomatics program, which includes these relevant courses:
                    <ul>
                        <li>Elementary Algorithm Design and Data Abstraction</li>
                        <li>Data Types and Structures</li>
                        <li>Algorithmic Problem Solving</li>
                        <li>Applications Software Engineering</li>
                    </ul>
                    <h1>Activities and Interests</h1>
                    <h3 className="inline">Game Development</h3>
                    <ul>
                        <li>Proficient in the Unity and Unreal game engines.</li>
                        <li>Began developing games at age 12 as part of the Real Programming for Kids summer camp, using many languages including Visual Basic, Java, and C#.</li>
                        <li>Occasionally participate in the Ludum Dare game jam, developing games independently in a 48 hour period.</li>
                        <li>Spent the summer of 2017 independently developing a game in the Unity engine using C#.</li>
                        <li>Participated in the Electronic Arts Vancouver 2018 Game Jam.</li>
                    </ul>
                    <h3 className="inline">History Trivia</h3>
                    <ul>
                        <li>Captained the Bloor Collegiate Institute History Trivia Team.</li>
                        <li>Placed in the top ten nationally at the International History Bee in 2015 and 2016, competing as an individual.</li>
                        <li>Played in the International History Bowl in 2015 and 2016 and Reach for the Top in 2016 as part of the Bloor Collegiate Institute team.</li>
                    </ul>
                </div>
            </div>
        )
    }
} 