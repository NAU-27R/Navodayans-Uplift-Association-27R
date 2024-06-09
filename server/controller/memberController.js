import { admin } from '../adminConfig.js'


const isMember = async (req, res) => {
    try {
        const docRef = admin.firestore().collection('JNVR-27_Charity_Fund').doc('Member_List');
        const docSnapshot = await docRef.get();
        let memberStatus = false;
        if (!docSnapshot.exists) {
            res.send({ memberStatus: memberStatus });
        }
        const data = docSnapshot.data();
        // console.log(data);
        for (const member in data) {

            // console.log(data[member].emails.includes(req.userData.email
            // ))
            if (data[member].emails.includes(req.userData.email)) memberStatus = true;
        }
        res.send({ memberStatus: memberStatus })

    } catch (error) {
        console.error('Error checking field value:', error);
        // let memberStatus = false;
        res.send({ memberStatus: false })
    }

}

const memberList = async (req, res) => {
    const db = admin.firestore();
    const docRef = db.collection('JNVR-27_Charity_Fund').doc('Member_List');
    const doc = await docRef.get();
    if (doc.exists) {
        // console.log('Document data:', doc.data());
        res.send({ "MemberList": doc.data() });
    } else {
        // console.log('No such document!');
        res.send({ "MemberList:": [] })
    }


}

export { memberList, isMember }