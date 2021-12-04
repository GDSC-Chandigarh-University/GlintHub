import React from "react";
import { connect } from "react-redux";
import Spinner from "./spinner/Spinner";
import { getDocs } from "@firebase/firestore";
import { Link } from "react-router-dom";
import { getAllPublishedCollectionProjects } from "../config/firebase";
import { setGlintHubSpaceProject, glintHubSpaceProjectsLoaded, glintHubSpaceFilterText, glintHubSpaceFilterTech } from "./actions";
import ProjectCard from "./projectCard";
import Header from "./header";
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import { InputLabel } from "@mui/material";
import TextField from '@mui/material/TextField';


class GlintHubSpace extends React.Component {
    state = {
        loadingProjects: false,
        textFilter: '',
        techFilter: ''
    }


    componentDidMount() {
        console.log(this.props.glintHubSpaceFilterReducer.text)
        this.setState(() => ({
            textFilter: this.props.glintHubSpaceFilterReducer.text,
            techFilter: this.props.glintHubSpaceFilterReducer.tech
        }))
        this.projectLoader()
    }


    projectLoader = async () => {
        await getDocs(getAllPublishedCollectionProjects)
            .then((snapshot) => {
                snapshot.docs.map((doc, key) => {
                    if (this.props.glintHubSpaceReducer.isLoading) {
                        if (doc.data().projectStatus == 'isPublished') {
                            this.props.setGlintHubSpaceProject(doc.data())
                        }
                        if (key + 1 == snapshot.docs.length) {
                            console.log('errorplace')
                            this.props.glintHubSpaceProjectsLoaded()
                        }
                    }
                })
            })
    }


    textFilter = (event) => {
        this.setState(() => ({ textFilter: event.target.value }))
        this.props.glintHubSpaceFilterText(event.target.value)
    }


    techFilter = (event) => {
        this.setState(() => ({ techFilter: event.target.value }))
        this.props.glintHubSpaceFilterTech(event.target.value)
    }


    render() {
        return (this.props.glintHubSpaceReducer.isLoading ? <Spinner /> :
            <div>
                <Header user={this.props.user} activeLink="glintHubSpace" />
                <div className="thinLine"></div>
                <div className="glintSpace">
                    <div className="filterSection">
                        <TextField className="glintSpaceSearchBar" label="Search for App tilte" variant="outlined" value={this.state.textFilter} onChange={this.textFilter} />
                        <FormControl>
                            <InputLabel id="demo-simple-select-helper-label">Filter Tech</InputLabel>
                            <Select
                                onChange={this.techFilter}
                                displayEmpty
                                inputProps={{ 'aria-label': 'Without label' }}
                            >
                                <MenuItem value="All">
                                    <em>All</em>
                                </MenuItem>
                                <MenuItem value="Web">Web</MenuItem>
                                <MenuItem value="Android/IOS">Android/IOS</MenuItem>
                                <MenuItem value="Other">Other</MenuItem>
                            </Select>
                        </FormControl>
                    </div>
                    <div className="glintHubSpaceGrid">
                        {this.props.glintHubSpaceReducer.glintHubSpaceProjects.map((project) => {
                            console.log(project.coreTech, this.props.glintHubSpaceFilterReducer.tech)
                            if (project.title.toLowerCase().includes(this.props.glintHubSpaceFilterReducer.text.toLowerCase())) {
                                if (this.state.techFilter === "All" && true) {
                                    return (
                                        <Link to={`/projectPage/${project.id}`}><ProjectCard project={project} /></Link>
                                    )
                                } else if (project.coreTech === this.props.glintHubSpaceFilterReducer.tech) {
                                    return (
                                        <Link to={`/projectPage/${project.id}`}><ProjectCard project={project} /></Link>
                                    )
                                }
                            }
                        })}
                    </div>
                </div>
            </div>
        )
    }
}


export default connect((state) => {
    return {
        glintHubSpaceReducer: state.glintHubSpaceReducer,
        glintHubSpaceFilterReducer: state.glintHubSpaceFilterReducer,
        user: state.userReducer.user
    }
}, { setGlintHubSpaceProject, glintHubSpaceProjectsLoaded, glintHubSpaceFilterText, glintHubSpaceFilterTech })(GlintHubSpace)
