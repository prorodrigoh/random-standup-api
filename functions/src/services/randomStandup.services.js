import connectDb from '../gateway/randomStandup.gateway.js';

// CREATE

export const addCohort = async (req, res) => {

    if(!req.body || !req.body.season || !req.body.year || !req.body.fulltime){
        res.status(401).send('Invalid request for creating Cohort');
        return;
    }

    const db = connectDb();

    const newCohortDoc = {
        season: req.body.season,
        year: req.body.year,
        fulltime: req.body.fulltime,
    }

    try {
        const doc = await db.collection('cohorts').add(newCohortDoc);
        res.status(201).send('Cohort Created ' + doc.id )
    } catch (err) {
        res.status(500).send(err)
    }
}

export const addStudent = async (req, res) => {

    if(!req.body || !req.body.name || !req.body.aka){
        res.status(401).send('Invalid request for creating Student');
        return;
    }

    const db = connectDb();

    const newStudentDoc = {
        name: req.body.name,
        aka: req.body.aka,
    }

    try {
        const doc = await db.collection('students').add(newStudentDoc);
        res.status(201).send('Student Created ' + doc.id )
    } catch (err) {
        res.status(500).send(err)
    }
}

// READ

export const getAllCohorts = async (req, res) => {

    const db = connectDb();

    try {
        const snapshot = await db.collection('cohorts').get();
        const cohortsArray = snapshot.docs.map( doc => {
            let cohortDoc = doc.data();
            cohortDoc.id = doc.id;
            return cohortDoc
        })
        res.send(cohortsArray);
    } catch (err) {
        res.status(500).send(err);
    }
}

export const getAllStudents = async (req, res) => {

    const db = connectDb();

    try {
        const snapshot = await db.collection('students').get()

        const studentsArray = snapshot.docs.map( doc => {
            let studentDoc = doc.data();
            studentDoc.id = doc.id;
            return studentDoc
        })
        res.send(studentsArray);

    } catch (err) {
        res.status(500).send(err);
    }
}

export const getAllStudentsByCohort = async (req, res) => {

    const { cohortId } = req.params

    if(!cohortId){
        res.status(401).send('Invalid request for get Students by Cohort');
        return;
    }

    const db = connectDb();

    try {
        const studentsDoc = await db.collection('students').where('cohortId', '==' ,cohortId).get();
        const studentsData = studentsDoc.docs.map((doc) => doc.data());
        res.send(studentsData);
    } catch (err) {
        res.status(500).send(err);
    }
}

// // UPDATE

function validateUpdateParams (req){
    if(!req.params.cohortId || !req.body){
        return -1
    }
    return 0
}

export function updateCohort(req, res){
    const { cohortId } = req.params

    if(validateUpdateParams(req) < 0){
        res.status(401).send('Invalid request for update: ' + cohortId);
        return;
    }

    const db = connectDb();

    db.collection('cohorts').doc(cohortId).update(req.body)
        try {
            res.status(201).send('Cohort Updated ' + cohortId)
        } catch (err){
            res.status(500).send(err)
        }
}

export function updateStudent(req, res){
    const { studentId } = req.params

    if(validateUpdateParams(req) < 0){
        res.status(401).send('Invalid request for update: ' + studentId);
        return;
    }

    const db = connectDb();

    db.collection('students').doc(studentId).update(req.body)
        try {

            res.status(201).send('Student Updated ' + studentId)
        } catch (err){
            res.status(500).send(err)
        }
}

// // DELETE

// HARD DELETE
export function deleteCohort(req, res){
    const { cohortId } = req.params
    // validate req params
    if(!cohortId){
        res.status(401).send('Invalid request for delete Cohort: ' + cohortId);
        return;
    }
    // connect to DB
    const db = connectDb();
    // hard delete data
    db.collection('cohorts').doc(cohortId).delete()
    try{
        res.status(201).send('Cohort deleted: ' + cohortId)
    } catch (err) {
        res.status(500).send(err)
    }
}

export function deleteStudent(req, res){
    const { studentsId } = req.params
    // validate req params
    if(!studentsId){
        res.status(401).send('Invalid request for delete Student: ' + studentsId);
        return;
    }
    // connect to DB
    const db = connectDb();
    // hard delete data
    db.collection('students').doc(studentsId).delete()
    try{
        res.status(201).send('Student deleted: ' + studentsId)
    } catch (err) {
        res.status(500).send(err)
    }
}

// SOFT DELETE
export function deactivateCohort(req, res){
    const { cohortId } = req.params
    // validate req params
    if(!cohortId){
        res.status(401).send('Invalid request for Cohort deactivation: ' + cohortId);
        return;
    }
    // connect to DB
    const db = connectDb();
    // hard delete data
    db.collection('cohorts').doc(cohortId).update({deletedAt: new Date()})
    try{
        res.status(201).send('Cohort deactivated: ' + cohortId)
    } catch (err) {
        res.status(500).send(err)
    }
}

export function deactivateStudent(req, res){
    const { studentId } = req.params
    // validate req params
    if(!studentId){
        res.status(401).send('Invalid request for Student deactivation: ' + studentId);
        return;
    }
    // connect to DB
    const db = connectDb();
    // hard delete data
    db.collection('students').doc(studentId).update({deletedAt: new Date()})
    try{
        res.status(201).send('Student deactivated: ' + studentId)
    } catch (err) {
        res.status(500).send(err)
    }
}

