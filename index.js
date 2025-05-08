const express = require('express');
const { ApolloServer, gql } = require('apollo-server-express');
const { GraphQLUpload, graphqlUploadExpress } = require('graphql-upload');
const { finished } = require('stream/promises');
const path = require('path');
const fs = require('fs');
const bcrypt = require('bcrypt');
const sequelize = require('./db.js');
const { Project, User } = require('./models/models.js');

const typeDefs = gql`
  scalar Upload

  input UserInput {
    name: String
    password: String
  }

  input ProjectInput {
    title: String
    text: String
    link: String
    image: [Upload!]!
  }

  type User {
    id: ID
    name: String
  }

  type Project {
    id: ID
    title: String
    text: String
    link: String
    image: [String]
  }

  type Query {
    getUser(input: UserInput): User
    getOneProject(id: ID!): Project
    getProjects: [Project]
  }

  type Mutation {
    createProject(input: ProjectInput): Project
  }
`;

const resolvers = {
  Upload: GraphQLUpload,
  Mutation: {
    createProject: async (_parent, { input }) => {
      const { title, text, link, image } = input;
      const savedFilePaths = [];
  
      for (const uploadPromise of image) {
        const { createReadStream, filename } = await uploadPromise;
        const stream = createReadStream();
  
        const filePath = path.join(__dirname, 'uploads', `${Date.now()}-${filename}`);
        await fs.promises.mkdir(path.dirname(filePath), { recursive: true });
  
        const out = fs.createWriteStream(filePath);
        stream.pipe(out);
        await finished(out);
  
        savedFilePaths.push(`/uploads/${path.basename(filePath)}`);
      }

      console.log(savedFilePaths[0])
  
      const project = await Project.create({
        title,
        text,
        link,
        image: savedFilePaths
      });
  
      return project; 
    },
  },
  
  Query: {
    getUser: async (_parent, { input }) => {
      const candidat = await User.findOne({ where: { name: input.name } });
      const hashPassword = await bcrypt.compare(input.password, candidat.dataValues.password);
      if (!hashPassword) throw new Error("No User");
      return {
        id: candidat.dataValues.id,
        name: candidat.dataValues.name,
      };
    },
    getOneProject: async(_parent, {id}) => {
      const candidat = await Project.findOne({where: {id}})
      if (!candidat){
        throw new Error
      }
      return candidat
    },
    getProjects: async () => {
      const projects = await Project.findAll()
      return projects
    }
  },
};

async function startServer() {
  const app = express();

  app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

  // Middleware для загрузки файлов
  app.use(graphqlUploadExpress({ maxFileSize: 10 * 1024 * 1024, maxFiles: 5 }));

  const server = new ApolloServer({
    typeDefs,
    resolvers,
  });

  await server.start();
  server.applyMiddleware({ app });

  sequelize.sync().then(() => {
    app.listen({ port: 4000 }, () => {
      console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`);
    });
  });
}

startServer();
