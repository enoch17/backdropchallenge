const { GraphQLObjectType, GraphQLSchema, GraphQLString, GraphQLList } = require('graphql')
const user = require("../Model/user")
const userService = require('../Services/userService')
const UserType = require('./TypeDefs/usertype')
const ld = require('../Util/ld')
const sentenceCase = require('../Util/sentenceCase')

const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        //Get User Account Name and Verify User if possible
        getUserAcctName: {
            type: UserType,
            args: { account_number: { type: GraphQLString }, bank_code: { type: GraphQLString } },
            async resolve(parent,args) {
                const dbUser = user.selectOneByAcctNumAndCode(args.account_number, args.bank_code)
                const paystackUser = await userService.verifyAcct(args.account_number, args.bank_code)
                if (!paystackUser.status) {
                    return { user_account_name: null }
                }
                if (dbUser.user_account_name == null) {
                    return { user_account_name: sentenceCase(paystackUser.data.account_name) }
                }
                else if (ld(dbUser.user_account_name, paystackUser.data.account_name) < 2) {
                    user.verify(dbUser.user_account_number)
                    return { user_account_name: sentenceCase(dbUser.user_account_name) }
                }else{
                    return { user_account_name: sentenceCase(dbUser.user_account_name) }   
                }
            }

        },
        getAllUsers: {
            type: GraphQLList(UserType),
            args: {},
            resolve() {
                return user.selectAll()
            }
        },
        getOneUser: {
            type: UserType,
            args: { account_number: { type: GraphQLString } },
            resolve(parent,args) {
                return user.selectOneByAcctNum(args.account_number)
            }
        },
    }
})

const Mutation = new GraphQLObjectType({
    name: "Mutation",
    fields: {
        //Verify and Add User
        verifyUser: {
            type: UserType,
            args: {
                user_account_number: { type: GraphQLString },
                user_bank_code: { type: GraphQLString },
                user_account_name: { type: GraphQLString },
            },
            async resolve(parent,args) {
                const res = await userService.verifyAcct(args.user_account_number, args.user_bank_code)
                if (res.status) {
                    let ldvalue = ld(res.data.account_name, args.user_account_name)
                    if (ldvalue > 2) {
                        args.is_verified = false
                        return args
                    }
                    args.is_verified = true
                    return (user.create(args))
                }
                else {
                    args.is_verified = false
                    return args
                }
            }
        }
    }
})


module.exports = new GraphQLSchema({ query: RootQuery, mutation: Mutation })
