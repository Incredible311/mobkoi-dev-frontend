import { useCallback, useState, useEffect, ReactElement } from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Notification from '../../../components/Notification';
import useCampaign from '../../../hooks/useCampaign';
import { makeStyles } from '@material-ui/core/styles';
import { useHistory } from "react-router-dom";

// interface ICampaignView {

// }

const useStyles = makeStyles((theme) => ({
    content: {
        backgroundColor: theme.palette.background.paper,
        padding: theme.spacing(6, 6, 6),
    },
    actionBtnGruop: {
        display: 'flex',
        justifyContent: 'flex-end'
    }
}))

function CampaignView() : ReactElement {
    const history = useHistory()
    const classes = useStyles();

    return (
        <div className={classes.content}>
            
        </div>
    );
}

export default CampaignView;