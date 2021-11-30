import React from "react";
import Skeleton from '@mui/material/Skeleton';


export default class ProjectCard extends React.Component {
    state = {
        projectLoaded: false
    }


    projectLoader = () => {
        this.setState(() => ({ projectLoaded: true }))
    }


    render() {
        const project = this.props.project

        return (
            <div className="projectCard grid hover" key={project.id} style={{ backgroundColor: `${project.bgColor}` }}>
                {!this.state.projectLoaded && (
                <div>
                    <Skeleton variant="rectangular" width={163} height={150} />
                </div>
                )}
                 {(<div className="img-box" style={this.state.projectLoaded ? {} : {display: 'none'}}>
                    <img src={project.image} onLoad={this.projectLoader} alt={project.title} />
                </div>)}
                    {/* <img src={project.image} alt={project.title} /> */}
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
