import React from "react";
import Sidebar from "./glintHub-dashboard-sidebar";
import Header from "../header/header";

export default class AddApp extends React.Component {
  render() {
    return (
      <div>
        <Header></Header>
        <div id="root">
          <Sidebar></Sidebar>
          <div id="root-1">
            <div className="upper-div">
              <div id="glinthub-dashboard-add-app">
                <div id="app-upload-section">
                  <div className="container-1">
                    <h1 className=" heading">Add App</h1>
                    <hr className="line" />

                    <div className="form-group card_radius">
                      <div className="card-body text_card">
                        <input
                          className="bg_color"
                          type="text"
                          className="form-control"
                          placeholder="Project Title"
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
                        ></textarea>
                      </div>
                    </div>

                    <button
                      type="button"
                      className="btn btn-success add_button"
                    >
                      Add
                    </button>

                    <div className="form-group upload_card">
                      <div className="card-body text_card">
                        <h1>
                          <b>Upload your Files</b>
                        </h1>
                        <h5>Files should be Zip</h5>
                        <br />
                        <div>
                          <div className="drop-zone">
                            <img src="./add-app.png" className="add-app" />
                            <p className="drag-files">
                              Drag & Drop files here.
                            </p>
                            <input
                              type="file"
                              name="myFile"
                              className="drop-zone__input"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
