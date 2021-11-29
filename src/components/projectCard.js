import React from "react";

export default class ProjectCard extends React.Component {

    render() {

        const project = this.props.project

        return (
            <div className="projectCard grid" key={project.id} style={{ backgroundColor: `${project.bgColor}` }}>
                <div className="img-box">
                    <img src={project.image} alt={project.title} />
                </div>
                <div className="text-box">
                    <div>
                        <h5>{project.title}</h5>
                        <h6>{project.description.length > 85 ? `${project.description.substr(0, 85)}... Read More` : project.description}</h6>
                    </div>
                    <h5 className="mb-0">#{project.coreTech}</h5>
                </div>
            </div>
        )
    }
}
