import React from "react";

export default class GlintHubAddApp extends React.Component {
  state = {
    title: '',
    description: '',
    technology: '',
    imageURL: '',
    githubURL: ''
  }
  handleChange = (event) => {
    this.setState(() => {
      return {
        [event.target.name]: event.target.value
      }
    })
  }
  handleAddProject = () => {

  }
  render() {
    console.log('Add-app')
    const { title, technology, imageURL, description, githubURL } = this.state
    return (
      <div id="glinthub-dashboard-add-app">
        <div id="app-upload-section">
          <div className="container-1">
            <h1 className=" heading">Add App</h1>
            <hr id="draft-line" />

            <div className="form-group card_radius">
              <div className="card-body text_card">
                <input
                  className="bg_color"
                  type="text"
                  name="title"
                  value={title}
                  className="form-control"
                  placeholder="Project Title"
                  onChange={this.handleChange}
                />
              </div>
            </div>

            <div className="form-group card_radius">
              <div className="card-body text_card">
                <input
                  className="bg_color"
                  type="text"
                  className="form-control"
                  placeholder="Technologies used"
                  name="technology"
                  value={technology}
                  onChange={this.handleChange}
                />
              </div>
            </div>

            <div className="form-group description_card">
              <div className="card-body text_card">
                <textarea
                  className="bg_desc"
                  type="text"
                  className="form-control"
                  placeholder="Project Description"
                  name="description"
                  value={description}
                  onChange={this.handleChange}
                ></textarea>
              </div>
            </div>

            <button
              type="button"
              className="btn btn-success add_button"
              onClick={this.handleAddProject}>
              Add
            </button>

            <div className="form-group upload_card">
              <div className="form-group card_radius">
                <div className="card-body text_card">
                  <input
                    className="bg_color"
                    type="text"
                    className="form-control"
                    placeholder="Image URL"
                    name="imageURL"
                    value={imageURL}
                    onChange={this.handleChange}
                  />
                </div>
              </div>
            </div>
            <div className="form-group upload_card githubURL">
              <div className="form-group card_radius">
                <div className="card-body text_card">
                  <input
                    className="bg_color"
                    type="text"
                    className="form-control"
                    placeholder="GitHub URL"
                    name="githubURL"
                    value={githubURL}
                    onChange={this.handleChange}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
