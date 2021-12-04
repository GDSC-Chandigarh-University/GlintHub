import React from "react";
import { Link } from "react-router-dom";
import { getDocs } from "@firebase/firestore";
import { getAllPublishedCollectionProjectsLimit } from "../../config/firebase";
import ProjectCard from "../projectCard";
import Spinner from "../spinner/Spinner";
import whiteArrow from "../../assets/images/whiteArrow.svg";


export default class GlintHubLandingProjects extends React.Component {
  state = {
    featuredProjects: [],
    isLoading: true
  }


  componentDidMount() {
    this.projectsLoader()
  }


  projectsLoader = async () => {
    await getDocs(getAllPublishedCollectionProjectsLimit)
      .then((snapshot) => {
        snapshot.docs.map((doc, key) => {
          if (doc.data().projectStatus == 'isPublished') {
            this.setState((prevState) => ({
              featuredProjects: [doc.data(), ...prevState.featuredProjects]
            }))
          }
          if (key + 1 == snapshot.docs.length) {
            this.setState(() => ({ isLoading: false }))
          }
        })
      })
  }


  render() {
    return this.state.isLoading ? <Spinner /> : (
      <div id="glinthubLandingProjects" className="mt-100">
        <div className="featured mb-4 pb-3 pr-2 pl-2">
          <h3 className="fw-600">Featured Projects</h3>
          <Link to="/glintHubSpace" className="h3 flex viewAll">View All <img className="ml-2" src={whiteArrow} /></Link>
        </div>
        <div className="glintHubSpaceGrid">
          {this.state.featuredProjects.map((project) => {
            return (<div>
              <Link to={`/projectPage/${project.id}`}><ProjectCard project={project} /></Link>
            </div>
            )
          })}
        </div>
      </div>
    );
  }
}
