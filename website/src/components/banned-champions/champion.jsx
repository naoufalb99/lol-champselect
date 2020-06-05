import React from 'react'
import { createUseStyles } from 'react-jss'

const useStyles = createUseStyles({
    outer: {
        width: '4.24vw',
        height: '4.24vw',
        backgroundColor: 'red',
        '& img': {
            width: '100%',
            height: '100%'
        }
    }
})


const Champion = () => {
    const classes = useStyles()
    return (
        <div className={classes.outer}>
            <img src="https://ddragon.leagueoflegends.com/cdn/10.11.1/img/champion/Aatrox.png" />
        </div>
    )
}

export default Champion
