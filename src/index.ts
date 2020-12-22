import "reflect-metadata";
import { MikroORM } from "@mikro-orm/core";
import { __prod__ } from "./constants";
// import { Post } from "./entities/Post";
import microConfig from "./mikro-orm.config";
import express from "express";
import { ApolloServer } from "apollo-server-express";
import { buildSchema } from "type-graphql";
import { HelloResolver } from "./resolvers/hello";
import { PostResolver } from "./resolvers/post";

const main = async () => {
  const orm = await MikroORM.init(microConfig); //connect to database.
  await orm.getMigrator().up(); //run migrations

  const app = express();
  //Express create a REST api get request response
  // app.get("/", (_req, res) => {
  //   res.send("hello");
  // });

  const apolloServer = new ApolloServer({
    schema: await buildSchema({
      resolvers: [HelloResolver, PostResolver],
      validate: false,
    }),
    context: () => ({ em: orm.em }), //accessible by all resolvers - can also get context: ({req, res} => {})
  });

  apolloServer.applyMiddleware({ app }); //creates graphQl endpoint on express

  app.listen(4000, () => {
    console.log("server started on localhost:4000");
  });

  //Mikro-Orm create a post and find post
  // const post = orm.em.create(Post, { title: "my first post" }); //creates instance of Post with title: "my first post".
  // await orm.em.persistAndFlush(post); //inserts post into database.

  // const posts = await orm.em.find(Post, {});
  // console.log("posts ===============", posts);
};

main().catch((error) => {
  console.error(error);
});

console.log("hello world");
