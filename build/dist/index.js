"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const core_1 = require("@mikro-orm/core");
// import { Post } from "./entities/Post";
const mikro_orm_config_1 = __importDefault(require("./mikro-orm.config"));
const express_1 = __importDefault(require("express"));
const apollo_server_express_1 = require("apollo-server-express");
const type_graphql_1 = require("type-graphql");
const hello_1 = require("./resolvers/hello");
const post_1 = require("./resolvers/post");
const main = () => __awaiter(void 0, void 0, void 0, function* () {
    const orm = yield core_1.MikroORM.init(mikro_orm_config_1.default); //connect to database.
    yield orm.getMigrator().up(); //run migrations
    const app = express_1.default();
    //Express create a REST api get request response
    // app.get("/", (_req, res) => {
    //   res.send("hello");
    // });
    const apolloServer = new apollo_server_express_1.ApolloServer({
        schema: yield type_graphql_1.buildSchema({
            resolvers: [hello_1.HelloResolver, post_1.PostResolver],
            validate: false,
        }),
        context: () => ({ em: orm.em }),
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
});
main().catch((error) => {
    console.error(error);
});
console.log("hello world");
//# sourceMappingURL=index.js.map