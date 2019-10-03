const express = require( 'express' )
const app = express()
const port = 3002



app.get( '/', ( req, res ) => res.send( 'Its been 84 years' )
)
app.use( express.static( 'www' ) )
app.listen( port, () => console.log( `Shoo, the server is on port ${port}` ) )