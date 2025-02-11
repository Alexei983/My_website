const express = require('express')
const { createHandler } = require("graphql-http/lib/use/express")
const { buildSchema } = require("graphql")
const { ruruHTML } = require("ruru/server")
const sequelize = require('./db.js')
const { Project } = require('./models/models.js')
require('dotenv').config()

const app = express()
const PORT = 3000

app.use(express.static('images'))

let schema = buildSchema(`
	type Project {
		id: ID!
		title: String!
		text: String!
		link: String
		image: String!	
	}	

	type Query{
		getAllProjects: [Project],
		getProject(id: ID!): Project,
	}
`)

let root = {
	getAllProjects: async () => {
		const projects = await Project.findAll({attridutes: ['id', 'title', 'text', 'link', 'iamge']})
		const result = projects.map(proj => proj.get());
		return result
		
	},
	getProject: async (args) => {
		const project = await Project.findByPk(args.id)
		if (!project) {
			throw new Error ('Pjoject not found')
		}
		const result = project.get()
		return result
	}
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



const start = async () => {
	try {
		await sequelize.authenticate()
		await sequelize.sync({force:false})
		app.listen(PORT, async () => console.log(`Server Work!`))
	} catch (e) {
		console.log(e)
	}
}

start()
