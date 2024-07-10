import axios from 'axios';
import { ImPlus } from 'react-icons/im';
import { ImMinus } from 'react-icons/im';
import { CiLocationOn } from "react-icons/ci";



const OneProject = ({ project }) => {

    const joinProject = async (projectID) => {
        try {
            await axios.post(`http://127.0.0.1:8000/api/projects/${projectID}/add-user`);

            document.getElementById(`join-btn-${projectID}`).style.display="none";
            document.getElementById(`leave-btn-${projectID}`).style.display="flex";
            // Optionally, you can update the project state here to reflect the changes
        } catch (error) {
            if (error.request.status === 409) {
                alert('You have already joined this project!');
                return;
            }
            console.error('Failed to join the project', error);
            alert('Failed to join the project. Please try again.');
          }
    }

    const leaveProject = async (projectID) => {
        try {
            await axios.delete(`http://127.0.0.1:8000/api/projects/${projectID}/remove-user`);

            document.getElementById(`join-btn-${projectID}`).style.display="flex";
            document.getElementById(`leave-btn-${projectID}`).style.display="none";
        } catch (error) {
            if (error.request.status === 404) {
                alert('You were not on this project')
                return;
            }
            alert('Failed to leave the project. Please try again.');
        }
    }

    return (
        <div className="project-card" id={`card-${project.id}`} >
            <img className="card-thumb" src="https://picsum.photos/300" alt="project-thumbnail" />
            <div className="card-body">
                <div className='card-headline'>
                    <h3 className="card-title">{project.name}</h3>
                    <h4 className='card-location'><CiLocationOn /> {project.city.name}</h4>
                </div>
                <p className="card-desc">{project.description}</p>
                <button className="join-button" id={`join-btn-${project.id}`} onClick={() => joinProject(project.id)}>
                    Join project 
                    <ImPlus />
                </button>
                <button className='leave-button' id={`leave-btn-${project.id}`} onClick={() => leaveProject(project.id)}>
                    Leave project
                    <ImMinus />
                </button>
            </div>
        </div>
    )
}

export default OneProject