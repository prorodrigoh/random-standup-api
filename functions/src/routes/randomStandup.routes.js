import { Router } from "express"
import { 
    addCohort,
    getAllCohorts,
    addStudent,
    getAllStudents,
    getAllStudentsByCohort,
    updateCohort,
    updateStudent,
    deactivateCohort,
    deactivateStudent,
    deleteCohort,
    deleteStudent,
} from "../services/randomStandup.services.js";

export const randomStandupRoutes = Router();

// - API ENDPOINTS - API ROUTES

randomStandupRoutes.post('/create/cohort', addCohort);
randomStandupRoutes.post('/create/student', addStudent);

randomStandupRoutes.get('/cohorts', getAllCohorts);
randomStandupRoutes.get('/students', getAllStudents);
randomStandupRoutes.get('/:cohortId', getAllStudentsByCohort);

randomStandupRoutes.patch('/update/:cohortId', updateCohort);
randomStandupRoutes.patch('/update/:studentId', updateStudent);

randomStandupRoutes.delete('/deactivate/:cohortId', deactivateCohort);
randomStandupRoutes.delete('/deactivate/:studentId', deactivateStudent);

randomStandupRoutes.delete('/delete/:cohortId', deleteCohort);
randomStandupRoutes.delete('/delete/:studentId', deleteStudent);
