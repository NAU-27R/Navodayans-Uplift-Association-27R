import Razorpay from "razorpay";
import { admin } from '../adminConfig.js'
const emailList = async (req, res) => {
    try {
        const docRef = admin.firestore().collection('JNVR-27_Charity_Fund').doc('Member_List');
        const docSnapshot = await docRef.get();

        if (!docSnapshot.exists) {
            return [];
        }
        const data = docSnapshot.data();
        for (const member in data) {
            // console.log(req.userData.email)
            // data[member].emails.includes(req.userData.email);
            if (data[member].emails.includes(req.userData.email)) return data[member].emails;
        }

        return [];
    } catch (error) {
        console.log(error);
        return [];
    }
}

const transactionList = async (req, res) => {
    const razorpay = new Razorpay({
        key_id: process.env.RAZORPAY_API_KEY,
        key_secret: process.env.RAZORPAY_SECRET_KEY,
    });
    try{

    razorpay.payments.all()
        .then(async (allTransactions) => {
            let userTransactionList = [];

            let userEmailList = await emailList(req, res)
            allTransactions.items.map((transaction, key) => {
                if (userEmailList.includes(transaction.email)) {

                    const { amount, currency, status, method, captured, description, email, contact, fee, tax, error_description, created_at } = transaction;
                    let date = new Date(created_at*1000);
                    // console.log(created_at);
                    date = date.toDateString()
                    // console.log(transaction);
                    userTransactionList.push(JSON.stringify({
                        Date: date,Status:status, Amount:amount/100,  Email: email, Contact:contact, Method:method,Fee:fee/100, "Tax(GST)":tax/100, Error:error_description, Description: description,
                    }))

                }
                })
            // console.log(userTransactionList);
            res.send({userTransactionList:userTransactionList});
        })
        .catch((error) => {
            console.log(error);
            res.status(500).send(error);
        })
    }
    catch(error){
        console.log(error);
    }
}

export { transactionList }