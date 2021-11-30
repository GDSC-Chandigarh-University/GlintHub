import React from "react";
import Skeleton from '@mui/material/Skeleton';

export default class ProjectSkeletor extends React.Component {
    state = {
        projectLoaded: false
    }

    projectLoader = () => {
        this.setState(() => ({ projectLoaded: true }))
    }

    render() {
        return (
            <div>
                {!this.state.projectLoaded && (
                <div>
                    <Skeleton variant="rectangular" width={163} height={162} />
                </div>
                )}
                {(<div style={this.state.projectLoaded ? {} : {display: 'none'}}>
                    <img src={this.props.src} onLoad={this.projectLoader} alt="Error" />
                </div>)}
            </div>
        )
    }
}
