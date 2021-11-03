import React from "react";
import Sidebar from "./glintHub-dashboard-sidebar";
import Header from "../header/header";
import { useRef } from 'react';

export default function AddApp() {
  const titleref = useRef();
  const descriptionref = useRef();
  const technologyref = useRef();
  const imageurlref = useRef();
//  const useruid = AuthState().uid;
//  console.log(useruid)
//  const projectuid = Projectuid().projectuid;
//  const docuid = Projectuid().projectuid + useruid; 
//  console.log(projectuid)
 const handleAddProject = async () => {
  //  const docref = doc(firestore,'projects',docuid)
  //  await setDoc(docref,{useruid, title: titleref.current.value, description: descriptionref.current.value, timestamp: serverTimestamp(), technology: technologyref.current.value, imageurl: imageurlref.current.value, published: false, drafted: false, inreview: true, projectuid })
 }

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
                    <hr id="draft-line" />

                    <div className="form-group card_radius">
                      <div className="card-body text_card">
                        <input
                          className="bg_color"
                          type="text"
                          className="form-control"
                          placeholder="Project Title"
                          ref={titleref}
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
                          ref={technologyref}
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
                          ref={descriptionref}
                        ></textarea>
                      </div>
                    </div>

                    <button
                      type="button"
                      className="btn btn-success add_button"
                      onClick={handleAddProject}
                    >
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
                          ref={imageurlref}
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
    );
  }
