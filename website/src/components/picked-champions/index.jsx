import React from 'react'
import Champion from './champion'
import { createUseStyles } from 'react-jss'

const usestyles = createUseStyles({
    outer: {
        display: 'flex',
    }
})

const PickedChampions = ({ team, blue, red, picking }) => {

    const classes = usestyles();
    return (
        <div className={classes.outer}>
            {team.map(({summonerId, championId}, index) => {
                return <Champion summonerId={summonerId} championId={championId} position={index} key={index} blue={!!blue} red={!!red} picking={picking.includes(index)} />
            })}
        </div>
    )
}

export default PickedChampions
