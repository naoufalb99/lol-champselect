import { action } from "easy-peasy"


const membersModel = {
    members: new Map(),
    setMembers: action((state, payload) => {
        payload.map(({summonerId, summonerName}) => {
            state.members.set(summonerId, summonerName)
            return state
        })
    })
}

export default membersModel