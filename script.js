const express = require('express');
const Joi = require('joi');
const app = express();
app.use(express.json());

const customers = [
    {title: 'George' , id: 1},
    {title: 'Josh' , id: 2},
    {title: 'Tyler' , id: 3},
    {title: 'Alice' , id: 4},
    {title: 'Candice' , id: 5},
]

app.get('/', (req,res)=>{
    res.send(" RestApi Demo application");
});

app.get('/api/customers' ,(req,res) =>{
    res.send(customers);
})

app.get('/api/customers/:id' ,(req,res) =>{
    const customer = customers.find( c => c.id === parseInt(req.params.id));
    if(!customer) res.status(404).send('<h2 color: darkred; > OOOPs cannot find what you are looking for! </h2>');
    res.send(customer);
});

app.post('/api/customers', (req,res) => {
    const {error} = validateCustomer(req.body);
    if(error){
        res.status(400).send(error.details[0].message)
        return;
    }
    const customer = {
        id: customers.length+1,
        title: req.body.title
    };
    customers.push(customer);
    res.send(customer);
});

function validateCustomer(customer){
    const schema = {
        tilte: Joi.string().min(3).required()
    };
    //return Joi.validate(customer, schema);
    return true;
}

app.put('/api/customers/:id', (req,res) =>{
    const customer = customers.find( c => c.id === parseInt(req.params.id));
    if(!customer) res.status(404).send('<h2 color: darkred; > OOOPs cannot find what you are looking for! </h2>');
    
    const {error} = validateCustomer(req.body);
    if(error){
        res.status(400).send(error.details[0].message)
        return;
    }
    customer.title = req.body.title;
    res.send(customer);
});

app.delete('/api/customers/:id', (req,res) =>{
    const customer = customers.find( c => c.id === parseInt(req.params.id));
    if(!customer) res.status(404).send('<h2 color: darkred; > OOOPs cannot find what you are looking for! </h2>');
    
    const index = customers.indexOf(customer);
    customers.splice(index, 1);
    res.send(customer);
});

const port = process.env.PORT || 8080;
app.listen(port, () => console.log("Listening on port ${port}.. "));