import React from 'react'
import {createUseStyles} from 'react-jss'
import {useStoreState} from 'easy-peasy'


const SPLASH_END_POINT = 'https://127.0.0.1:50584/lol-game-data/assets/v1/champion-splashes/';
// 1/1000.jpg

const useStyles = createUseStyles({
    '@keyframes slideRight': {
        from: {backgroundSize: '500%'},
        to: {backgroundSize: '350%'}
      },
    outer: {
        position: 'relative',
        width: '8.48vw',
        height: '12.5vw',
        backgroundColor: '#000',
        backgroundImage: ({championId: id}) => `url(${SPLASH_END_POINT}${id}/${id}000.jpg)`,
        backgroundSize: 'auto 122%',
        backgroundPosition: 'top 30% center',
        borderLeft: '1px solid rgba(255,255,255,.4)',
        '&:first-child': {
            borderLeft: 'none'
        }
    },
    overlay: {
        position: 'absolute',
        top: 0, bottom: 0, left: 0, right: 0,
        backgroundImage: ({blue}) => blue ? 'linear-gradient(to left, #5dead3  0%, transparent 50%, #5dead3 100%)' : 
                                            'linear-gradient(to left, #ed3828  0%, transparent 50%, #ed3828 100%)'
        ,
        backgroundSize: '300%',
        backgroundPosition: 'center',
        animation: `.7s ease-in-out infinite alternate $slideRight`,
        visibility: ({picking}) => picking ? 'visible' : 'hidden'
    },
    name: {
        position: 'absolute',
        bottom: 0, left: 0, right:0,
        padding: {top: 8, bottom: 8},
        backgroundColor: '#000',
        color: '#FFF',
        textAlign: 'center',
        textTransform: 'uppercase',
        fontSize: '0.58vw',
        fontWeight: 600
    }
})

const Champion = ({ championId, summonerId,blue,position, ...props}) => {

    const classes = useStyles({championId, blue});
    const summonerName = useStoreState(state => state.members.members.get(summonerId))

    return (
        <div className={classes.outer}>
            <div className={classes.overlay} />
            <div className={classes.name}>{summonerName}</div>
        </div>
    )
}

export default Champion;