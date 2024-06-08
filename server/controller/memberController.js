import { admin } from '../adminConfig.js'


const isMember = async (req, res) => {
    try {
        const docRef = admin.firestore().collection('JNVR-27_Charity_Fund').doc('Member_List');
        const docSnapshot = await docRef.get();
        let memberStatus =false;
        if (!docSnapshot.exists) {
            res.send({memberStatus:memberStatus});
            }
            const data = docSnapshot.data();
        // console.log(data)
        // if(req.userData.email in data) console.log(true);
        // console.log(data.emails);
        for(const member in data){
            console.log(member,req.userData.email)
            if(member == req.userData.email)memberStatus=true;
        }
        // console.log(data.hasOwnProperty(req.userData.email));
        // console.log(req.userData.email)
        // if(data.hasOwnProperty(req.userData.email))memberStatus=true;
        res.send({ memberStatus: memberStatus })

    } catch (error) {
        console.error('Error checking field value:', error);
        let memberStatus = false;
        res.send({ memberStatus: memberStatus })
    }

}

const memberList = async (req, res) => {
    const db = admin.firestore();
    const docRef = db.collection('JNVR-27_Charity_Fund').doc('Member_List');
    const doc = await docRef.get();
    if (doc.exists) {
        console.log('Document data:', doc.data());
        // for(const member in doc.data()){
        //     console.log("key:",member,"value:",doc.data()[member]);
        //     const jsonString = doc.data()[member]
        //     console.log(jsonString)
        //     console.log(JSON.parse(jsonString))
        //   }
        res.send({ "MemberList": doc.data() });
    } else {
        console.log('No such document!');
        res.send({ "MemberList:": [] })
    }


}

export { memberList, isMember }