const userData = require("../data.json")
module.exports.create = (data) =>{
    data.id = Math.floor(Math.random() * 100)
    userData.push(data)
    return data
}

module.exports.verify = (acctNum) =>{
    const index = userData.findIndex(element => (element.user_account_number == acctNum));
    userData[index].is_verified = true
}

module.exports.delete = () =>{
    
}

module.exports.selectOneById = (id) =>{
    const index = userData.findIndex(element => element.id == id);
    if(index<0){return {}}
    return userData[index]
}

module.exports.selectOneByAcctNumAndCode = (acctNum, bankCode) =>{
    const index = userData.findIndex(element => ((element.user_account_number == acctNum)&&(element.user_bank_code==bankCode)));
    if(index<0){return {}}
    return userData[index]
}

module.exports.selectOneByAcctNum = (acctNum) =>{
    const index = userData.findIndex(element => (element.user_account_number == acctNum));
    if(index<0){return {}}
    return userData[index]
}

module.exports.selectAll = () =>{
    return userData
}