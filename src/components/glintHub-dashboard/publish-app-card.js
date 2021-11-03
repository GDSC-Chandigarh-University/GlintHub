import React from 'react'

export default class PublishCard extends React.Component {
    render() {
        return (
            <div className="app-card">
                <div className="left-side">
                    <img src={this.props.image} alt="" />
                    <p>{this.props.imageText}</p>
                </div>
                <div className="right-side">
                    <p>{this.props.para1}</p>

                    <p className="type-android">{this.props.para2}</p>
                </div>
            </div>
        )
    }
}
