import Razorpay from "razorpay";
const transactionList = async (req,res,next)=>{
    const razorpay = new Razorpay({
        key_id: process.env.RAZORPAY_API_KEY,
        key_secret: process.env.RAZORPAY_SECRET_KEY,
    });
    razorpay.payments.all()
    .then((response)=>console.log(response))
    .catch((error)=>console.log(error))

    next();
}

export {transactionList}