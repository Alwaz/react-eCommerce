const express = require('express')
const cors = require('cors')
const stripe = require('stripe')('sk_test_51ImMYuDL5ibPWLMN9k59KdMOH5RxnXNtMe71NNMePIHorNz9GvzveBxSfCkF2aykiTSfjOmpzfe8RxGHkoHv56gx00LmFZw7XB')
const app = express();

const { v4: uuidv4 } = require('uuid');
app.use(cors());
app.use(express.json())
app.get('/', (req, res)=>{
    res.send('Welcome to react shope website')
})

app.post('/checkout',async (req, res)=>{
    let error, status;
    try {
        const {product, token} = req.body;
        const customer = await stripe.customers.create({
            email: token.email,
            source: token.id })

            const key= uuidv4();
            
            const charge = await stripe.charges.create(
                {
                  amount: product.price*100, 
                  currency: 'usd', 
                  customer: customer.id, 
                  receipt_email: token.email, 
                  description: 'all products description', 
                  shipping: 
                        { name: token.card.name,
                          address: {
                              line1: token.card.address_line1, 
                              line2: token.card.address_line2, 
                              city: token.card.address_city, 
                              country: token.card.address_country, 
                              postal_code: token.card.address_zip
                           }
                        }
                    },
                {idempotencyKey: key })
                status='success';

    } catch(error){
        console.error(error);
        status='failure'
    }
    res.json({status});
})
app.listen(8080, ()=>{
    console.log('App is running on port no 8080')
})