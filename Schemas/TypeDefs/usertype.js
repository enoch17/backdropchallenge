const { GraphQLObjectType,GraphQLBoolean, GraphQLInt, GraphQLString } = require('graphql')

const UserType = new GraphQLObjectType({
    name: 'User',
    fields: () => ({
        id: { type: GraphQLInt },
        user_account_name: { type: GraphQLString },
        user_account_number :{ type: GraphQLString },
        user_bank_code :{ type: GraphQLString },
        is_verified: { type: GraphQLBoolean },
    })
})

module.exports = UserType