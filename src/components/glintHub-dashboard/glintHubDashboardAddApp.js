import React from "react";
import { withRouter } from "react-router"; // Redirecting after adding Project
import { connect } from "react-redux";
import { serverTimestamp } from "@firebase/firestore";
import { uploadBytes, getDownloadURL } from "@firebase/storage";
import { v4 } from "uuid"; // ProjectId
import { setReviewProject, setDraftedProject } from "../actions";
import { storageProject, setDocProject } from "../../firebase";
import checkCircle from "../../assets/images/check-circle.svg";
import xCircle from "../../assets/images/x-circle.svg";


class GlintHubDashboardAddApp extends React.Component {
  state = {
    user: this.props.user,
    projects: this.props.projects,
    title: "",
    image: "", // To pass inFormValid
    description: "",
    githubURL: "",
    coreTech: "",
    techUsed: "",
    addingProject: false,
    error: false, // Changed to error message
    projectAdded: false, // Changed to inReview or isDrafted
  };


  componentDidMount() {
    document.getElementById("imageLabel").style.display = "none";
  }

  componentWillUnmount() {
    console.log('Unmounted')
  }


  handleChange = (event) => {
    this.setState(() => ({ [event.target.name]: event.target.value }));
  };


  getFileExtension = (filename) => filename.split(".").pop();


  isFormValid = ({ title, image, description, githubURL, coreTech, techUsed }) => {
    if (title && image && description && githubURL && coreTech && techUsed) {
      // console.log(image, this.getFileExtension(image))
      if (this.getFileExtension(image) === "png" || this.getFileExtension(image) === "jpg" || this.getFileExtension(image) === "jpeg") {
        const imageFile = document.getElementById("image").files[0];
        if (imageFile.size > 1000000) {
          this.setState(() => ({ error: "Image size should be less than 1MB" }))
          setTimeout(() => {
            this.setState(() => ({ error: false })) // Making error false again so that user can again get error on mistake
          }, 1000)
          return false
        }
        return true
      }
      else {
        this.setState(() => ({ error: "Image should only be in PNG, JPG, or JPEG Format" }))
        setTimeout(() => {
          this.setState(() => ({ error: false })) // Making error false again so that user can again get error on mistake
        }, 1000)
        return false
      }
    }
    else {
      this.setState(() => ({ error: "Fields should not be empty" }))
      setTimeout(() => {
        this.setState(() => ({ error: false }))
      }, 1000);
      return false;
    }
  };


  handleAddProject = async (event) => {
    const { user, projects, title, description, githubURL, coreTech, techUsed } = this.state
    const imageFile = document.getElementById("image").files[0];
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
      this.setState(() => ({ addingProject: true }))
      uploadBytes(storageProject(projectId), imageFile).then((snapshot) => {
        // console.log("Uploaded a blob or file!", snapshot);
        getDownloadURL(storageProject(projectId))
          .then(
            async (url) => {
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

              // console.log(url);
              await setDocProject(projectId, projectData);

              if (event.target.name === 'draftApp') {
                console.log(JSON.parse(localStorage.getItem("draftedProjects")))
                // this.props.setDraftedProject(projectData);
                var storedDraftedProjects = JSON.parse(localStorage.getItem("draftedProjects"));
                storedDraftedProjects.push(projectData);
                // console.log(storedDraftedProjects);
                localStorage.setItem("draftedProjects", JSON.stringify(storedDraftedProjects));
              }
              else {
                console.log("setting app to Local Storage", JSON.parse(localStorage.getItem("reviewProjects")))
                // this.props.setReviewProject(projectData);
                let storedReviewProjects = JSON.parse(localStorage.getItem("reviewProjects"));
                storedReviewProjects.push(projectData);
                // console.log(storedReviewProjects);
                localStorage.setItem("reviewProjects", JSON.stringify(storedReviewProjects));
              }

              this.setState(() => ({
                addingProject: false,
                projectAdded: "inReview",
              }));

              if (event.target.name === "draftApp") {
                this.setState(() => ({ projectAdded: "isDrafted", }));
                setTimeout(() => {
                  this.props.history.push("/glinthub/draftedApp");
                }, 1000);
              }
              else {
                setTimeout(() => {
                  this.props.history.push("/glinthub");
                }, 1000);
              }
            })
          .catch((error) => {
            // console.log(error)
          });
      });
    }
  };


  uploadImage = (event) => {
    // Change Image value at state so that it can go through isFormValid
    this.setState(() => ({ [event.target.name]: event.target.value }));
    // console.log("pressed");
    var image = document.getElementById("image"); // Visibility Hidden at componentDidMount
    var imageLabel = document.getElementById("imageLabel");

    if (image.value !== "") {
      document.getElementById("labelCover").style.visibility = "hidden";
      var imageSplit = image.value.split("\\");
      var imageName = imageSplit[imageSplit.length - 1];
      imageLabel.textContent = imageName;
      imageLabel.style.display = "block";
      imageLabel.classList.add("imageLabel"); // Add border, padding etc.
      image.setAttribute("disabled", "disabled");
    }
  };


  removeImage = (event) => {
    var image = document.getElementById("image");
    var imageLabel = document.getElementById("imageLabel");

    // console.log(event.nativeEvent.offsetX, imageLabel.offsetWidth - 17);
    if (event.nativeEvent.offsetX > imageLabel.offsetWidth - 17) {
      image.value = "";
      this.setState(() => ({ image: "" }));
      document.getElementById("labelCover").style.visibility = "visible";
      imageLabel.style.display = "none";
      image.removeAttribute("disabled");
    }
  };


  render() {
    const { title, image, description, githubURL, techUsed, addingProject, projectAdded, error } = this.state
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
        <hr className="hrLine" />
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
            <label id="imageLabel" onClick={this.removeImage}>No file chosen</label>
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
  connect(null, { setDraftedProject, setReviewProject })(GlintHubDashboardAddApp)
);
