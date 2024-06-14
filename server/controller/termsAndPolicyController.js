import { admin } from '../adminConfig.js'
const termsAndCondition = async (req, res) => {
    try {
        const docRef = admin.firestore().collection('JNVR-27_Charity_Fund').doc('Terms&Conditions');
        const docSnapshot = await docRef.get();

        if (!docSnapshot.exists) {
            res.send({Terms:{}})
        }
        const data = docSnapshot.data();
        // console.log(data);

        res.send({Terms:data});

    } catch (error) {
        console.log(error);
        res.status(502).send(error);
    }
}
const privacyPolicy = async (req, res) => {
    try {
        const docRef = admin.firestore().collection('JNVR-27_Charity_Fund').doc('Privacy_Policy');
        const docSnapshot = await docRef.get();

        if (!docSnapshot.exists) {
            res.send({Policy:{}})
        }
        const data = docSnapshot.data();
        // console.log(data);

        res.send({Policy:data});

    } catch (error) {
        console.log(error);
        res.status(502).send(error);
    }
}



export {termsAndCondition,privacyPolicy}