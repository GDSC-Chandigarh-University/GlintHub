import React from "react";
import { Firestore } from "../../firebase";
import { v4 } from "uuid";
import { serverTimestamp } from "@firebase/firestore";
import { setDoc, doc } from "@firebase/firestore";
import Check from "../../assets/images/check-circle.svg";
import xCircle from "../../assets/images/x-circle.svg";
import { withRouter } from "react-router";

class GlintHubAddApp extends React.Component {
  state = {
    title: '',
    description: '',
    technology: '',
    imageURL: '',
    githubURL: '',
    addingProject: false,
    user: this.props.currentUser,
    appSaved: false,
    errors: false,
    isDrafted: false,
    draftAppsLimit: this.props.apps.draftedApps.length,
    reviewAppsLimit: this.props.apps.reviewApps.length,
    draftAppsLimitError: false,
    reviewAppsLimitError: false
  }

  handleChange = (event) => {
    this.setState(() => {
      return {
        [event.target.name]: event.target.value
      }
    })
  }

  isFormValid = ({ title, description, technology, imageURL, githubURL }) => {
    if (title && description && imageURL && technology && githubURL) {
      // if (imageURL.match(/\.(jpeg|jpg|gif|png)$/) != null) {
      //   return true
      // } else {
      //   this.setState(() => {
      //     return {
      //       errors: true
      //     }
      //   })
      //   setTimeout(() => {
      //     this.setState(() => {
      //       return {
      //         errors: false
      //       }
      //     })
      //   }, 2000)
      // }
      return true
    } else {
      this.setState(() => {
        return {
          errors: true
        }
      })
      setTimeout(() => {
        this.setState(() => {
          return {
            errors: false
          }
        })
      }, 2000)
      return false
    }
  }

  handleAddProject = async () => {
    const { title, technology, imageURL, description, githubURL, user, reviewAppsLimit } = this.state
    console.log(reviewAppsLimit)
    const projectId = v4()
    if (reviewAppsLimit > 2) {
      console.log(reviewAppsLimit, "good")
      this.setState(() => {
        return {
          reviewAppsLimitError: true
        }
      })
      setTimeout(() => {
        this.setState(() => {
          return {
            reviewAppsLimitError: false
          }
        })
      }, 2000)
    } else if (this.isFormValid(this.state) && reviewAppsLimit < 3) {
      console.log(reviewAppsLimit, "bad")
      this.setState(() => {
        return {
          addingProject: true
        }
      })
      await setDoc(doc(Firestore, "Users", user.uid, "Projects", projectId), {
        title,
        technology,
        imageURL,
        description,
        githubURL,
        id: projectId,
        isPublished: false,
        inReview: true,
        isDrafted: false,
        timestamp: serverTimestamp()
      })
      this.setState(() => {
        return {
          appSaved: true,
          addingProject: false
        }
      })
      setTimeout(() => {
        this.props.history.push("/glinthub")
      }, 2000)
    }
  }

  handleDraftProject = async () => {
    const { title, technology, imageURL, description, githubURL, user, draftAppsLimit } = this.state
    console.log(draftAppsLimit)
    const projectId = v4()
    if (draftAppsLimit > 4) {
      console.log(draftAppsLimit, "good")
      this.setState(() => {
        return {
          draftAppsLimitError: true
        }
      })
      setTimeout(() => {
        this.setState(() => {
          return {
            draftAppsLimitError: false
          }
        })
      }, 2000)
    } else if (this.isFormValid(this.state) && draftAppsLimit < 5) {
      console.log(draftAppsLimit, "bad")
      this.setState(() => {
        return {
          isDrafted: true,
          addingProject: true
        }
      })
      await setDoc(doc(Firestore, "Users", user.uid, "Projects", projectId), {
        title,
        technology,
        imageURL,
        description,
        githubURL,
        id: projectId,
        isPublished: false,
        inReview: false,
        isDrafted: true,
        timestamp: serverTimestamp()
      })
      this.setState(() => {
        return {
          appSaved: true,
          addingProject: false
        }
      })
      setTimeout(() => {
        this.props.history.push("/glinthub/drafted-app")
      }, 2000)
    }
  }

  render() {
    const { title, technology, imageURL, description, githubURL, appSaved, errors, addingProject, reviewAppsLimitError, draftAppsLimitError } = this.state
    return (
      <div id="glinthub-dashboard-add-app">
        <div id="app-upload-section">
          <div className="container-1">
            {appSaved && (this.state.isDrafted ? (<div className="appSaved">App Drafted <img src={Check} /></div>) : (<div className="appSaved">App Saved <img src={Check} /></div>))}
            {errors && (<div className="onError">Fields should not be empty <img src={xCircle} /></div>)}
            {reviewAppsLimitError && (<div className="onError"> Review Apps Limit Reached <img src={xCircle} /></div>)}
            {draftAppsLimitError && (<div className="onError"> Draft Apps Limit Reached <img src={xCircle} /></div>)}
            <h1 className=" heading">Add App</h1>
            <hr id="draft-line" />
            <div className="form-group card_radius">
              <div className="card-body text_card">
                <input
                  maxlength="15"
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
              name="addApp"
              className="btn btn-success add_button mr-15"
              onClick={this.handleAddProject}
              disabled={addingProject}>
              Add App
            </button>
            <button
              type="button"
              name="draftApp"
              className="btn btn-success add_button"
              onClick={this.handleDraftProject}
              disabled={addingProject}>
              Draft App
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

export default withRouter(GlintHubAddApp)