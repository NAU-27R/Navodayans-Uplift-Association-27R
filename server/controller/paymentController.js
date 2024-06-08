import Razorpay from "razorpay";
import crypto from 'crypto';

const createOrder = async (req, res, next) => {
    try {
        const razorpay = new Razorpay({
            key_id: process.env.RAZORPAY_API_KEY,
            key_secret: process.env.RAZORPAY_SECRET_KEY,
        });

        if (!req.body) {
            return res.status(400).send("Bad Request");
        }

        const options = req.body;
        const order = await razorpay.orders.create(options);

        if (!order) return res.status(400).send("Bad Request");

        res.json(order);

    }
    catch (error) {
        console.log(error.message);
        res.status(500).send(error.message);
    }
}

const validateTransaction = async (req, res) => {

    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;

    const sha = crypto.createHmac('sha256', process.env.RAZORPAY_SECRET_KEY);

    sha.update(razorpay_order_id + razorpay_payment_id);

    const digest = sha.digest("hex");

    if (digest !== razorpay_signature) {
        return res.status(400).json({ paymentValidation: false })
    }

    return res.json({ paymentValidation: true})

}

export { createOrder, validateTransaction }