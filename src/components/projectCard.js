import React from "react";

export default class ProjectCard extends React.Component {

    render() {
        let colorArray = [
            "#00a8ff70",
            "#ffd589e3",
            "#ff74389e",
            "#ff367270",
            "#9167af70",
            "#85cd669e",
            "#38c09082",
            "#7e987075"
        ]

        let bgColor = {
            backgroundColor: `${colorArray[Math.floor(Math.random() * 9)]}`
        }
        const project = this.props.project

        return (
            <div className="projectCard grid" key={project.id} style={bgColor}>
                <div className="img-box">
                    <img src={project.image} alt={project.title} />
                </div>
                <div className="text-box">
                    <h5>{project.title}</h5>
                    <h6>{project.description.length > 85 && `${project.description.substr(0, 85)}...`}<span>Read More</span></h6>
                    <h5>#{project.coreTech}</h5>
                </div>
            </div>
        )
    }
}
