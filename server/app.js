const express = require('express')
const { createHandler } = require("graphql-http/lib/use/express")
const { buildSchema } = require("graphql")
const { ruruHTML } = require("ruru/server")


const app = express()
const port = 3000

var schema = buildSchema(`
	type Query {
		hello: String
	}
`)

var root = {
	hello() {
		return "Hello, World"
	},
}


app.all('/graphql', createHandler({ 
	schema: schema,
	rootValue: root,
	})
)

app.get("/", (_req, res) => {
	res.type("html")
	res.end(ruruHTML({endpoint: "/graphql" }))
})

app.listen(port, () => {
	console.log("Server work")
})
