import React from 'react'

export default class ReviewCard extends React.Component {
    render() {
        return (
            <div className="wrapper-review-card">
                <div className="logo-review">
                    <img src={this.props.image} alt="Error" />
                </div>
                <div className="content">
                    <h1>{this.props.heading}</h1>
                    <p>{this.props.para}</p>
                </div>
            </div>
        )
    }
}
