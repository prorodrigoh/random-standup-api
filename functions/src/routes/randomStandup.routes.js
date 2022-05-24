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

randomStandupRoutes.post('/cohorts', addCohort);
randomStandupRoutes.get('/cohorts', getAllCohorts);

randomStandupRoutes.post('/students', addStudent);
randomStandupRoutes.get('/students', getAllStudents);
randomStandupRoutes.get('/:cohortId', getAllStudentsByCohort);

// randomStandupRoutes.patch('/:cohortId', updateCohort);
// randomStandupRoutes.patch('/:studentId', updateStudent);

// // set value active = false
// randomStandupRoutes.delete('/deactivate/:cohortId', deactivateCohort);
// randomStandupRoutes.delete('/deactivate/:studentId', deactivateStudent);
