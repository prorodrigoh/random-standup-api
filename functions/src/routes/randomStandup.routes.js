import { Router } from "express"
import { 
    addCohort,
    getAllCohorts,
    addStudent,
    getAllStudents,
    getAllStudentsByCohort,
    // updateCohort,
    // updateStudent,
    // deactivateCohort,
    // deactivateStudent,
} from "../services/randomStandup.services.js";

export const randomStandupRoutes = Router();

// - API ENDPOINTS - API ROUTES

randomStandupRoutes.post('/cohort', addCohort);
randomStandupRoutes.get('/cohort', getAllCohorts);

randomStandupRoutes.post('/cohort', addStudent);
randomStandupRoutes.get('/cohort', getAllStudents);
randomStandupRoutes.get('/:cohortId', getAllStudentsByCohort);

// randomStandupRoutes.patch('/:cohortId', updateCohort);
// randomStandupRoutes.patch('/:studentId', updateStudent);

// // set value active = false
// randomStandupRoutes.delete('/deactivate/:cohortId', deactivateCohort);
// randomStandupRoutes.delete('/deactivate/:studentId', deactivateStudent);
