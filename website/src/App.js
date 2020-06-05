import React, { useEffect } from 'react'
import { useStoreState } from 'easy-peasy'
import './App.css';
import PickedChampions from './components/picked-champions'
import BannedChampions from './components/banned-champions'


import { createUseStyles } from 'react-jss'

const data = {
  bleuTeam: [
    {
      id: 122,
      summonerName: 'cofedd'
    },
    {
      id: 141,
      summonerName: 'yassman'
    },
    {
      id: 62,
      summonerName: 'DeathMsterNasus'
    },
    {
      id: 145,
      summonerName: 'BaddMaro'
    },
    {
      id: 412,
      summonerName: 'laktamabdellah'
    },
  ],
  redTeam: [
    {
      id: 41,
      summonerName: 'FTW Joo'
    },
    {
      id: 154,
      summonerName: 'Legasune'
    },
    {
      id: 61,
      summonerName: 'Legø'
    },
    {
      id: 523,
      summonerName: '4fun 4Head'
    },
    {
      id: 111,
      summonerName: 'EłOjoNinja'
    },
  ],
}

const useStyles = createUseStyles({
  outer: {
    position: 'absolute',
    bottom: 60,
    left: 0,
    right: 0,
  },
  pick: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'flex-end'
  },
  ban: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  timer: {
    width: '8vw',
    height: 50,
    backgroundColor: "#FFF",
  },
  patch: {
    width: '8vw',
    height: 80,
    backgroundColor: 'rgba(0,0,0, .7)'
  },
  teamName: {
    fontSize: '3.6vw',
    fontWeight: 800,
    lineHeight: 1,
    color: '#FFF',
    width: '19vw',
  },
  bleuTeamName: {
    extend: 'teamName'
  },
  redTeamName: {
    extend: 'teamName',
    textAlign: 'right'
  }
})

const App = () => {
  const classes = useStyles();
  const { teams: { bleu: bleuTeam, red: redTeam} } = useStoreState(state => state)
  return (
    <div className={classes.outer}>
      <div className={classes.pick}>
        <PickedChampions team={bleuTeam.picks} picking={[0]} blue/>
        <div className={classes.timer} />
        <PickedChampions team={redTeam.picks} picking={[0]} red/>
      </div>
      <div className={classes.ban}>
        <div className={classes.bleuTeamName}>FOX</div>
        <BannedChampions />
        <div className={classes.patch} />
        <BannedChampions />
        <div className={classes.redTeamName}>TBL</div>
      </div>
    </div>
  );
}

export default App;
