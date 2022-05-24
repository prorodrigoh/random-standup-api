import connectDb from '../gateway/randomStandup.gateway.js';

// CREATE

export const addCohort = async (req, res) => {

    if(!req.body || !req.body.season || !req.body.year || !req.body.fulltime){
        res.status(401).send('Invalid request for creating Cohort Doc');
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
        res.status(401).send('Invalid request for creating Student Doc');
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
        const cohortRef = db.collection('cohorts').where("year", "==", 2022).where("fulltime", "==", false)
        const snapshot = await cohortRef.listCollections()

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
        const studentsDoc = await db.collection('cohorts').where('__name__', '==' ,cohortId).get();
        const studentsData = studentsDoc.docs.map((doc) => doc.data());
        res.send(studentsData);
    } catch (err) {
        res.status(500).send(err);
    }
}

// updateCohort,
// updateStudent,
// deactivateCohort,
// deactivateStudent,

// // UPDATE

// function validateUpdateParams (req){
//     if(!req.params.templateDocId || !req.body){
//         return -1
//     }
//     return 0
// }

// export function updateTemplateDoc(req, res){
//     const { templateDocId } = req.params

//     if(validateUpdateParams(req) < 0){
//         res.status(401).send('Invalid request for update: ' + templateDocId);
//         return;
//     }

//     const db = connectDb();

//     db.collection('templates').doc(templateDocId).update(req.body)
//         try {

//             res.status(201).send('Template Updated ' + templateDocId)
//         } catch (err){
//             res.status(500).send(err)
//         }
// }

// // DELETE

// // HARD DELETE
// export function eraseTemplateDoc(req, res){
//     const { templateDocId } = req.params
//     // validate req params
//     if(!templateDocId){
//         res.status(401).send('Invalid request for erase: ' + templateDocId);
//         return;
//     }
//     // connect to DB
//     const db = connectDb();
//     // hard delete data
//     db.collection('templates').doc(templateDocId).delete()
//     try{
//         res.status(201).send('Template erased: ' + templateDocId)
//     } catch (err) {
//         res.status(500).send(err)
//     }
// }

// // SOFT DELETE
// export function deleteTemplateDoc(req, res){
//     const { templateDocId } = req.params
//     // validate req params
//     if(!templateDocId){
//         res.status(401).send('Invalid request for delete: ' + templateDocId);
//         return;
//     }
//     // connect to DB
//     const db = connectDb();
//     // hard delete data
//     db.collection('templates').doc(templateDocId).update({deletedAt: new Date()})
//     try{
//         res.status(201).send('Template deleted: ' + templateDocId)
//     } catch (err) {
//         res.status(500).send(err)
//     }
// }