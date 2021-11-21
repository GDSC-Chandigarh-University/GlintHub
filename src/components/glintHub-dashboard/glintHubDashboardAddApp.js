import React from "react";
import { withRouter } from "react-router"; // Redirecting after adding Project
import { connect } from "react-redux";
import { serverTimestamp } from "@firebase/firestore";
import { uploadBytes, getDownloadURL } from "@firebase/storage"; // Upload the image to firebsae storage and get it's URL
import { v4 } from "uuid"; // ProjectId
import LinearProgress from '@mui/material/LinearProgress';
import { setReviewProject, setDraftedProject } from "../actions"; // Set Project to redux store
import { disablerOn, disablerOff } from "../actions"; // Disable all other activities (clicks) while adding the Project
import { storageProject, setDocProject } from "../../firebase"; //Set Project to firebase
import checkCircle from "../../assets/images/check-circle.svg";
import xCircle from "../../assets/images/x-circle.svg";


class GlintHubDashboardAddApp extends React.Component {
  state = {
    user: this.props.user,
    projects: this.props.projects,
    title: "",
    image: "", // To pass image through inFormValid
    description: "",
    githubURL: "",
    coreTech: "",
    techUsed: "",
    addingProject: false, // Disable the buttons while adding the Project
    addingProjectProgress: 0, // Loading of project to redux store and firebase
    error: false, // Changed to error message
    projectAdded: false, // Changed to inReview or isDrafted t0 show added status
  };


  handleChange = (event) => {
    this.setState(() => ({ [event.target.name]: event.target.value }));
  };


  getFileExtension = (filename) => filename.split(".").pop();


  isFormValid = ({ title, image, description, githubURL, coreTech, techUsed }) => {
    if (title && image && description && githubURL && coreTech && techUsed) {
      if (this.getFileExtension(image) === "png" || this.getFileExtension(image) === "jpg" || this.getFileExtension(image) === "jpeg") {
        const imageFile = document.getElementById("image").files[0];
        if (imageFile.size > 1000000) {
          this.setState(() => ({ error: "Image size should be less than 1MB" }))
          setTimeout(() => {
            this.setState(() => ({ error: false })) // Making error false again so that user can again get error on another mistake
          }, 1000)
          return false
        }
        return true
      }
      else {
        this.setState(() => ({ error: "Image should only be in PNG, JPG, or JPEG Format" }))
        setTimeout(() => {
          this.setState(() => ({ error: false })) // Making error false again so that user can again get error on another mistake
        }, 1000)
        return false
      }
    }
    else {
      this.setState(() => ({ error: "Fields should not be empty" }))
      setTimeout(() => {
        this.setState(() => ({ error: false })) // Making error false again so that user can again get error on another mistake
      }, 1000);
      return false;
    }
  };


  handleAddProject = async (event) => {
    document.getElementById('root-1').scrollTo({  // For mobile view
      top: 0,
      behavior: "smooth"
    });
    const { user, projects, title, description, githubURL, coreTech, techUsed } = this.state
    const projectId = v4();

    if (event.target.name === "addApp" && projects.reviewProjects.length > 2) {
      this.setState(() => ({ error: "Review App limit Reached" }))
      setTimeout(() => {
        this.setState(() => ({ error: false }))
      }, 1000);
    }
    else if (event.target.name === "draftApp" && projects.draftedProjects.length > 4) {
      this.setState(() => ({ error: "Drafted App limit Reached" }))
      setTimeout(() => {
        this.setState(() => ({ error: false }))
      }, 1000);
    }
    else if (this.isFormValid(this.state)) {
      const imageFile = document.getElementById("image").files[0];
      this.props.disablerOn()
      this.setState(() => ({
        addingProject: true,
        addingProjectProgress: 10
      }))
      setInterval(() => {
        this.setState((prevState) => {
          if (prevState.addingProjectProgress < 20) {
            return {
              addingProjectProgress: 20
            }
          }
        })
      }, 1000);
      setInterval(() => {
        this.setState((prevState) => {
          if (prevState.addingProjectProgress < 30) {
            return {
              addingProjectProgress: 30
            }
          }
        })
      }, 2000);
      setInterval(() => {
        this.setState((prevState) => {
          if (prevState.addingProjectProgress < 40) {
            return {
              addingProjectProgress: 40
            }
          }
        })
      }, 3000);
      setInterval(() => {
        this.setState((prevState) => {
          if (prevState.addingProjectProgress < 50) {
            return {
              addingProjectProgress: 50
            }
          }
        })
      }, 4000);

      uploadBytes(storageProject(projectId), imageFile).then((snapshot) => {
        // console.log("Uploaded a blob or file!", snapshot);
        this.setState(() => ({
          addingProjectProgress: 60
        }))
        getDownloadURL(storageProject(projectId))
          .then(async (url) => {

            let projectData = {
              title,
              image: url,
              description,
              githubURL,
              coreTech,
              techUsed,
              id: projectId,
              projectStatus: 'inReview',
              timestamp: serverTimestamp(),
              userUid: user.uid,
              userDisplayName: user.displayName,
              userPhotoURL: user.photoURL,
            };

            if (event.target.name === 'draftApp') {
              projectData = { ...projectData, projectStatus: "isDrafted" }
            }

            setInterval(() => {
              this.setState((prevState) => {
                if (prevState.addingProjectProgress < 70) {
                  return {
                    addingProjectProgress: 70
                  }
                }
              })
            }, 1000);
            await setDocProject(projectId, projectData);
            this.setState(() => ({
              addingProjectProgress: 80
            }))
            setInterval(() => {
              this.setState((prevState) => {
                if (prevState.addingProjectProgress < 90) {
                  return {
                    addingProjectProgress: 90
                  }
                }
              })
            }, 1000);

            if (event.target.name === 'draftApp') {
              this.props.setDraftedProject(projectData);
            }
            else {
              this.props.setReviewProject(projectData);
            }

            this.setState(() => ({
              addingProjectProgress: 100,
              addingProject: false,
              projectAdded: "inReview",
            }))
            
            if (event.target.name === "draftApp") {
              this.setState(() => ({ projectAdded: "isDrafted", }));
              setTimeout(() => {
                this.props.history.push("/glinthub/draftedApp");
              }, 1000);
            }
            else {
              setTimeout(() => {
                this.props.history.push("/glinthub/reviewApp");
              }, 1000);
            }
            this.props.disablerOff()
          })
          .catch((error) => {
            // console.log(error)
          });
      });
    }
  };


  uploadImage = (event) => {
    var image = document.getElementById("image");
    var imageLabel = document.getElementById("imageLabel");

    if (image.value !== "") {
      document.getElementById("labelCover").style.visibility = "hidden";
      var imageName = image.value.split("\\").pop();
      this.setState(() => ({ [event.target.name]: imageName })); // Change Image value at state so that it can pass through isFormValid
      if (imageName.length > 22) {
        imageName = imageName.substr(0, 22) + '...' + this.getFileExtension(imageName)
      }
      imageLabel.textContent = imageName;
      imageLabel.style.display = "block";
      image.setAttribute("disabled", "disabled");
    }
  };


  removeImage = (event) => {
    var image = document.getElementById("image");
    var imageLabel = document.getElementById("imageLabel");

    if (event.nativeEvent.offsetX > imageLabel.offsetWidth - 17) {
      image.value = "";
      this.setState(() => ({ image: "" }));
      imageLabel.style.display = "none";
      imageLabel.textContent = "No file chosen";
      document.getElementById("labelCover").style.visibility = "visible";
      image.removeAttribute("disabled");
    }
  };


  render() {
    const { title, description, githubURL, techUsed, addingProject, addingProjectProgress, error, projectAdded } = this.state

    return (
      <div id="glinthubDashboardAddApp">
        {projectAdded && (projectAdded === "isDrafted" ? (
          <div className="greenSignal">
            App Drafted <img src={checkCircle} alt="checkCircle" />
          </div>
        ) : (
          <div className="greenSignal">
            App Saved <img src={checkCircle} alt="checkCircle" />
          </div>
        ))}
        {error && (
          <div className="redSignal">
            {error} <img src={xCircle} alt="xCircle" />
          </div>
        )}
        <h1>Add App</h1>
        <LinearProgress variant="determinate" value={addingProjectProgress} />
        <div className="addAppForm">
          <div className="addAppFormFields title">
            <input className="addAppFormField" maxLength="15" type="text" name="title" value={title} placeholder="Project Title" onChange={this.handleChange} />
          </div>
          <div className="addAppFormFields image position-relative">
            <div id="labelCover">
              <button className="labelCoverBtn">Choose Project Image</button>
              <span className="labelCover">No file chosen</span>
            </div>
            <input className="addAppFormField" type="file" id="image" name="image" onChange={this.uploadImage} />
            <label id="imageLabel" className="imageLabel" onClick={this.removeImage}>No file chosen</label>
          </div>
          <div className="addAppFormFields description">
            <textarea className="addAppFormField" type="text" placeholder="Project Description" name="description" value={description} onChange={this.handleChange}></textarea>
          </div>
          <div className="addAppFormFields githubURL">
            <input className="addAppFormField" type="text" placeholder="GitHub URL" name="githubURL" value={githubURL} onChange={this.handleChange} />
          </div>
          <div className="addAppFormFields coreTech">
            <label className="labels">Web
              <input type="radio" name="coreTech" value="Web" onChange={this.handleChange} />
              <span className="labelCheck"></span>
            </label>
            <label className="labels">Android/IOS
              <input type="radio" name="coreTech" value="Android/IOS" onChange={this.handleChange} />
              <span className="labelCheck"></span>
            </label>
            <label className="labels justify-self-end">Other
              <input type="radio" name="coreTech" value="Other" onChange={this.handleChange} />
              <span className="labelCheck"></span>
            </label>
          </div>
          <div className="addAppFormFields techUsed">
            <input className="addAppFormField" type="text" placeholder="Technologies used" name="techUsed" value={techUsed} onChange={this.handleChange} />
          </div>
        </div>

        <button type="button" name="addApp" className="btn btn-success addProject" onClick={this.handleAddProject} disabled={addingProject}>Add App</button>
        <button type="button" name="draftApp" className="btn btn-success addProject mr-0" onClick={this.handleAddProject} disabled={addingProject}>Draft App</button>
      </div>
    );
  }
}


export default withRouter(
  connect(null, { setDraftedProject, setReviewProject, disablerOn, disablerOff })(GlintHubDashboardAddApp)
);
