import { action } from 'easy-peasy'

const defaultPick = {
    summonerId: 0,
    championId: 0,
    spell1Id: 0,
    spell2Id: 0,
    completed: false,
    isInProgress: false,
}

const defaultState = {
    bleu: {
        picks: [defaultPick, defaultPick, defaultPick, defaultPick, defaultPick],
        bans: []
    },
    red: {
        picks: [defaultPick, defaultPick, defaultPick, defaultPick, defaultPick],
        bans: []
    },
}

const teamMap = (actor, _) => ({
    ...defaultPick,
     summonerId: actor.summonerId,
     championId: actor.championId,
     spell1Id: actor.spell1Id,
     spell2Id: actor.spell2Id
 })

const teams = {
    ...defaultState,
    createTeams: action((state, {myTeam, theirTeam}) => {
        state.bleu = {
            picks:[...myTeam.map(teamMap)],
            bans: []
        }
        state.red = {
            picks:[...theirTeam.map(teamMap)],
            bans: []
        }
        return state
    }),
    updateTeams: action((state, {myTeam, theirTeam, action}) => {
        state.bleu = {
            picks:[...myTeam.map(teamMap)],
            bans: []
        }
        state.red = {
            picks:[...theirTeam.map(teamMap)],
            bans: []
        }
        return state
    }),
    deleteTeams: action((state, payload) => {
        return {...defaultState}
    })
}

export default teams