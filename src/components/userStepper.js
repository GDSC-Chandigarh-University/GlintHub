import React from "react"
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Header from "./header"
import { connect } from "react-redux";
import { serverTimestamp } from "@firebase/firestore";
import { uploadBytes, getDownloadURL } from "@firebase/storage";
import { setDocUser, storageUser, updateDocUser } from "../config/firebase";
import { setNewUser, setUser } from "./actions";


const steps = ['Social Profile', 'Work Profile'];


class HorizontalLinearStepper extends React.Component {
  state = {
    user: this.props.user,
    activeStep: 1,
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


  handleChange = (event) => {
    this.setState(() => ({ [event.target.name]: event.target.value }));
  };


  handleNext = async () => {
    const { user, activeStep, firstName, lastName, gitHub, linkedIn, twitter, website, bio, role, university, workExperience, skills, achievements } = this.state
    if (activeStep == 2) {
      let userData = {
        university,
        workExperience,
        achievements,
        skills,
      };
      await updateDocUser(user.uid, userData)
      this.props.setNewUser()
    }
    else {
      const image = document.getElementById("image").files[0]
      uploadBytes(storageUser(user.uid), image).then((snapshot) => {
        // console.log("Uploaded a blob or file!", snapshot);

        getDownloadURL(storageUser(user.uid))
          .then(async (url) => {
            if (!image) {
              url = ''
            }
            let userData = {
              uid: user.uid,
              displayName: user.displayName,
              photoURL: user.photoURL,
              image: url,
              role,
              firstName,
              lastName,
              gitHub,
              linkedIn,
              twitter,
              website,
              bio,
              role,
              university,
              workExperience,
              achievements,
              skills,
              timestamp: serverTimestamp(),
            };
            this.props.setUser(userData)
            await setDocUser(user.uid, userData);
            this.setState((prevState) => ({ activeStep: prevState.activeStep + 1 }))
          })
          .catch((error) => {
            // console.log(error)
          });
      });
    }
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
    this.setState(() => ({ userImage: '' }))
  }


  // handleBack = () => {
  //   this.setState((prevState) => ({ activeStep: prevState.activeStep - 1 }))
  // };


  render() {
    const { activeStep, firstName, lastName, gitHub, linkedIn, twitter, website, bio, role, userImage, university, skills, workExperience, achievements } = this.state
    return (
      <div id="userStepper">
        <Header activeLink="userStepper" />
        <div className="thinLine"></div>
        <Box sx={{ width: '100%' }}>
          <Stepper activeStep={activeStep - 1}>
            {steps.map((label, index) => {
              return (
                <Step key={label}>
                  <StepLabel>{label}</StepLabel>
                </Step>
              );
            })}
          </Stepper>
          {
            activeStep === 1 && (
              <div className="stepperContent">
                <div className="stepperTopFlex">
                  <h5>Tell us about yourself</h5>
                  <div className="stepperFlex">
                    <div>
                      <label id="chooseImage">
                        <input onChange={this.imageViewer} id="image" name="userImage" type="file" />
                        <div>Upload Image Here</div>
                        {<img id="imageViewer" style={{ visibility: userImage ? "visible" : "hidden" }} src="#" alt="Your Image Here" />}
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
            )
          }
          {
            activeStep === 2 && (
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
            )
          }
          {
            (
              <React.Fragment>
                <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
                  {/* <Button
                  color="inherit"
                  disabled={activeStep === 1}
                  onClick={this.handleBack}
                  sx={{ mr: 1 }}
                >
                  Back
                </Button> */}
                  <Box sx={{ flex: '1 1 auto' }} />

                  <Button variant="contained" onClick={this.handleNext}>
                    {activeStep === 2 ? 'Finish' : 'Next Step'}
                  </Button>
                </Box>
              </React.Fragment>
            )
          }
        </Box >
      </div>
    );
  }
}


export default connect((state) => {
  return {
    user: state.userReducer.user
  }
}, { setNewUser, setUser })(HorizontalLinearStepper)
