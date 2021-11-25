import React from "react";


class Spinner extends React.Component {
    componentDidMount() {
        document.body.style.overflow = "hidden"
    }


    componentWillUnmount() {
        document.body.style.overflow = "auto"
    }


    render() {
        return (
            <div id="spinner">
                <div className="load">
                    <hr /><hr /><hr /><hr />
                </div>
            </div>
        )
    }
}


export default Spinner
