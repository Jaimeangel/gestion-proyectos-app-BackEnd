const generatorId=()=>{
    const gId1=Math.random().toString().substring(2)
    const gId2=Date.now().toString()
    return gId1+gId2
}

export default generatorId;