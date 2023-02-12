const express=require('express')
const app=express()
const orders=[],n=2,coupons=[]
// each coupon is of  type {id: Number, coupon: string}

app.use(express.json())
app.use((req,res,next)=>
{
    res.setHeader('Access-Control-Allow-Origin','*')
    res.setHeader('Access-Control-Allow-Methods','GET,POST')
    res.setHeader('Access-Control-Allow-Headers','Content-Type')
    next()
})

app.get('/',(req,res)=>
{
    res.json({orders, coupons})
})

app.post('/order',({body},res)=>
{
    // console.log(body)
    if(body.coupon)
    {
        body.coupon=body.coupon.trim()
        if(!body.coupon)
        {
            res.json({error: "Invalid coupon"})
            return
        }
        const id=coupons.findIndex(coupon => coupon.coupon==body.coupon)
        if(id==-1)
        {
            res.json({error: "Invalid coupon"})
            return
        }
        body.discountAmount=0.9*body.totalAmount
        coupons.splice(id,1)
    }
    // console.log(body)
    orders.push({id: orders.length, ...body})
    if(orders.length%n===0)
    {
        const coupon=Math.round(Math.random()*1e10).toString()
        coupons.push({id: coupons.length, coupon})
    }
    res.json({success: "Success"})
})

app.listen(8000)