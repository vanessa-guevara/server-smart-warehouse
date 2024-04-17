const express = require('express')
const itemsRoutes = require('./routes/items/items')
const warehousesRoutes = require('./routes/warehouses/warehouses')
const locationsRoutes =require('./routes/locations/locations')
const ordersRoutes =require('./routes/orders/orders')
const userRoutes=require('./routes/users/users')
const inventoryTransactionRoutes = require('./routes/inventoryTransactions/inventoryTransactions')
const authenticateToken = require('./middleware/authMiddleware');
require('dotenv').config()

const { PORT, BACKEND_URL } = process.env
const port = process.env.PORT || 8080

const app = express()
const cors = require('cors')

//middlewares

app.use(cors())

app.use(express.json())



// basic home route
app.get('/', (_req, res) => {
    res.send('Welcome to my API');
});

app.use('/user', userRoutes);
app.use('/items', authenticateToken,itemsRoutes)
app.use('/warehouses', authenticateToken,warehousesRoutes)
app.use('/locations', authenticateToken,locationsRoutes)
app.use('/orders', authenticateToken,ordersRoutes)
app.use('/inventoryTransaction', authenticateToken,inventoryTransactionRoutes)





//active server in a port
app.listen(port, () => {
  console.log(`Server is running on port ${port}`)
})
