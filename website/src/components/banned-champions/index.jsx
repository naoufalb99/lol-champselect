import React from 'react'
import { createUseStyles } from 'react-jss'

import Champion from './champion'


const useStyles = createUseStyles({
    outer: {
        display: 'flex',
        '& :nth-child(3)': {
            marginRight: '2.12vw'
        }
    }
})


const BannedChampions = () => {
    const classes = useStyles()
    return (
        <div className={classes.outer}>
            <Champion />
            <Champion />
            <Champion />
            <Champion />
            <Champion />
        </div>
    )
}

export default BannedChampions
