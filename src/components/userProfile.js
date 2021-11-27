import React from "react";
import { withRouter } from "react-router";
import { getDocs } from "@firebase/firestore";
import { connect } from "react-redux";
import { getCollectionUsers } from "../config/firebase";
import Spinner from "./spinner/Spinner"
import Header from "./header";
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import { updateDocUser, storageUser } from "../config/firebase";
import { uploadBytes, getDownloadURL } from "@firebase/storage";
import { setUser } from "./actions";


class UserProfile extends React.Component {
  state = {
    user: this.props.user,
    userData: {},
    isLoading: true,
    image: '',
    userImage: '',
    firstName: '',
    lastName: '',
    gitHub: '',
    linkedIn: '',
    website: '',
    twitter: '',
    bio: '',
    role: '',
    university: '',
    workExperience: '',
    skills: '',
    achievements: ''
  }


  componentDidMount() {
    this.userLoader()
  }


  handleChange = (event) => {
    this.setState(() => ({ [event.target.name]: event.target.value }));
  };


  imageViewer = () => {
    var reader = new FileReader()
    const image = document.getElementById("image")
    if (image.files && image.files[0]) {
      reader.readAsDataURL(image.files[0]);
      reader.onload = () => {
        document.getElementById("imageViewer").src = reader.result
        this.setState(() => ({ userImage: image.value }))
      }
    }
  }


  retriveImage = () => {
    document.getElementById("image").value = ''
    this.setState(() => ({
      userImage: '',
      image: ''
    }))
  }


  updateProfile = async () => {
    const { firstName, lastName, gitHub, linkedIn, twitter, website, bio, role, university, skills, workExperience, achievements, user } = this.state
    const image = document.getElementById("image").files[0]
    uploadBytes(storageUser(user.uid), image).then((snapshot) => {
      // console.log("Uploaded a blob or file!", snapshot);

      getDownloadURL(storageUser(user.uid))
        .then(async (url) => {
          if (!image) {
            url = ''
          }
          let userData = {
            image: url,
            firstName,
            lastName,
            gitHub,
            linkedIn,
            website,
            twitter,
            bio,
            role,
            university,
            workExperience,
            skills,
            achievements
          };
          this.props.setUser(userData)
          await updateDocUser(user.uid, userData).then(() => {
            this.props.history.push("/glintHub")
          })
        })
        .catch((error) => {
          // console.log(error)
        });
    });
  }


  userLoader = async () => {
    await getDocs(getCollectionUsers(this.props.user.uid)).then((snapshot) => {
      console.log(snapshot.docs[0].data())
      this.setState(() => ({
        userData: snapshot.docs[0].data(),
        image: snapshot.docs[0].data().image,
        firstName: snapshot.docs[0].data().firstName,
        lastName: snapshot.docs[0].data().lastName,
        bio: snapshot.docs[0].data().bio,
        university: snapshot.docs[0].data().university,
        gitHub: snapshot.docs[0].data().gitHub,
        linkedIn: snapshot.docs[0].data().linkedIn,
        website: snapshot.docs[0].data().website,
        twitter: snapshot.docs[0].data().twitter,
        role: snapshot.docs[0].data().role,
        workExperience: snapshot.docs[0].data().workExperience,
        skills: snapshot.docs[0].data().skills,
        achievements: snapshot.docs[0].data().achievements,
      }))
      this.setState(() => ({ isLoading: false }))
    })
  }


  render() {
    const { image, firstName, lastName, gitHub, linkedIn, twitter, website, bio, role, userImage, university, skills, workExperience, achievements } = this.state
    console.log(this.props)
    return this.state.isLoading ? <Spinner /> : (
      <div id="userStepper">
        <Header user={this.props.user} />
        <div className="thinLine"></div>
        <Box sx={{ width: '100%' }}>
          {
            <div className="stepperContent">
              <div className="stepperTopFlex">
                <h5>Tell us about yourself</h5>
                <div className="stepperFlex">
                  <div>
                    <label id="chooseImage">
                      <input onChange={this.imageViewer} id="image" name="userImage" type="file" />
                      <div>Upload Image Here</div>
                      {<img id="imageViewer" style={{ visibility: (userImage || image) ? "visible" : "hidden" }} src={image} alt="Your Image Here" />}
                    </label>
                    <Button variant="outlined" color="error" onClick={this.retriveImage}>Retrive Image</Button>
                  </div>
                  <div className="userInfo">
                    <div>
                      <TextField label="First Name" onChange={this.handleChange} name="firstName" value={firstName} variant="outlined" />
                      <TextField label="Last Name" onChange={this.handleChange} name="lastName" value={lastName} variant="outlined" />
                    </div>
                    <TextField label="Role" placeholder="" onChange={this.handleChange} name="role" value={role} variant="outlined" />
                    <div id="bio"><TextField label="Bio" placeholder="" onChange={this.handleChange} name="bio" multiline row={4} value={bio} variant="outlined" />
                    </div>
                  </div>
                </div>
              </div>
              <div className="stepperTopFlex">
                <h5>How can we reach out to you</h5>
                <div className="stepperFlex reach">
                  <div>
                    <TextField label="Website" onChange={this.handleChange} placeholder="https://" name="website" value={website} variant="outlined" />
                    <TextField label="LinkedIn" onChange={this.handleChange} placeholder="https://linkedin.com/in/username" name="linkedIn" value={linkedIn} variant="outlined" />
                  </div>
                  <div>
                    <TextField label="GitHub" onChange={this.handleChange} placeholder="https://github.com/username" name="gitHub" value={gitHub} variant="outlined" />
                    <TextField label="Twitter Link" onChange={this.handleChange} placeholder="https://twitter.com/username" name="twitter" value={twitter} variant="outlined" />
                  </div>
                </div>
              </div>
            </div>
          }
          {
            <div className="stepperContent">
              <div className="stepperTopFlex">
                <h5>Education</h5>
                <div className="stepperFlex reach">
                  <TextField label="College/University" onChange={this.handleChange} name="university" value={university} variant="outlined" />
                </div>
              </div>
              <div className="stepperTopFlex">
                <h5>Your Skills</h5>
                <div className="stepperFlex reach">
                  <TextField id="outlined-multiline-static" onChange={this.handleChange} name="skills" value={skills} label="Your Skills" multiline rows={4} />
                </div>
              </div>
              <div className="stepperTopFlex">
                <h5>Achievements</h5>
                <div className="stepperFlex reach">
                  <TextField id="outlined-multiline-static" onChange={this.handleChange} name="workExperience" value={workExperience} label="Achievements" multiline rows={4} />
                </div>
              </div>
              <div className="stepperTopFlex">
                <h5>Your Work Experience</h5>
                <div className="stepperFlex reach">
                  <TextField id="outlined-multiline-static" onChange={this.handleChange} name="achievements" value={achievements} label="Work Experience" multiline rows={4} />
                </div>
              </div>
            </div>
          }
        </Box >
        <div className="updateProfileButton"><Button variant="contained" onClick={this.updateProfile}>Update Profile</Button></div>
      </div>
    )
  }
}


export default withRouter(connect((state) => {
  return {
    user: state.userReducer.user
  }
}, { setUser })(UserProfile))
