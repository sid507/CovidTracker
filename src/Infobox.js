import React from 'react'
import { Card, CardContent, Typography } from '@material-ui/core';

function Infobox({ title, cases, total, date }) {
    return (
        <Card className="infobox">
            <CardContent>
                <Typography className='infobox__title' color="textPrimary">
                    {title}
                </Typography>
                <h2 className='infobox__case'>{cases}</h2>
                <Typography className='infobox__total' color="textSecondary">
                    {total} Total
                </Typography>
                <Typography className='infobox__total' color="textSecondary">
                    {date} Last updated
                </Typography>
            </CardContent>
        </Card>
    )
}

export default Infobox
