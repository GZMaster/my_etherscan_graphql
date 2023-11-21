const { ApolloServer } = require("apollo-server");
const { importSchema } = require("graphql-import");
const EtherDataSource = require("./datasource/ethDatasource");
const typeDefs = importSchema("./schema.graphql");

require("dotenv").config();

// Define the resolvers object
const resolvers = {
	Query: {
		// Resolver for etherBalanceByAddress query
		etherBalanceByAddress: (root, _args, { dataSources }) =>
			dataSources.ethDataSource.etherBalanceByAddress(),

		// Resolver for totalSupplyOfEther query
		totalSupplyOfEther: (root, _args, { dataSources }) =>
			dataSources.ethDataSource.totalSupplyOfEther(),

		// Resolver for latestEthereumPrice query
		latestEthereumPrice: (root, _args, { dataSources }) =>
			dataSources.ethDataSource.getLatestEthereumPrice(),

		// Resolver for blockConfirmationTime query
		blockConfirmationTime: (root, _args, { dataSources }) =>
			dataSources.ethDataSource.getBlockConfirmationTime(),
	},
};

// Create ApolloServer instance
const server = new ApolloServer({
	typeDefs,
	resolvers,
	dataSources: () => ({
		ethDataSource: new EtherDataSource(),
	}),
});

// Set timeout and start server
server.timeout = 0;
server.listen("9000").then(({ url }) => {
	console.log(`🚀 Server ready at ${url}`);
});
