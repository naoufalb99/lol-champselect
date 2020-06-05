import { createStore } from 'easy-peasy'
import thunk from "redux-thunk"


import storeModel from '../models'

const emit = (type, payload) => {
    console.log(type, payload)
}

const store = createStore(storeModel, {
    middleware: [thunk.withExtraArgument({ emit })]
})


const ws = new WebSocket("ws://localhost:8080/lcu")
ws.onmessage = ({data}) => {
    data = JSON.parse(data);
    // /lol-lobby/v2/lobby/members
    // /lol-champ-select/v1/session
    if(Array.isArray(data) && data.length >= 3) {
        if(data[2].uri === '/lol-lobby/v2/lobby/members') {
            store.getActions().members.setMembers(data[2].data)
        }else if(data[2].uri === '/lol-champ-select/v1/session') {
            
            if(data[2].eventType === "Create") {
                const  {myTeam, theirTeam} = data[2].data;
                store.getActions().teams.createTeams({myTeam, theirTeam})
            }else if(data[2].eventType === "Update") {
                const  {myTeam, theirTeam, bans,actions} = data[2].data;
                console.log(data[2].data)
                store.getActions().teams.updateTeams({myTeam, theirTeam, bans, action: actions[actions.length - 1]})
            }else if(data[2].eventType === "Delete") {
                store.getActions().teams.deleteTeams()
            }
            
        }

    }
    /*
        [
            {
                actorCellId: int,
                completed: bool,
                type: "pick" | "ban",
                isAllyAction: bool
            },
            ....
        ]
    */
    // console.log(data[2].data.myTeam)
    // console.log(data[2].data.theirTeam)
    /*
        championId
        spell1Id
        spell2Id
        summonerId
        cellId
    */
}


export default store