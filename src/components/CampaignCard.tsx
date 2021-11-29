import { ReactElement, useCallback } from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import { useHistory } from "react-router-dom";

const useStyles = makeStyles(() => ({

  card: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    cursor: 'pointer'
  },
  cardMedia: {
    paddingTop: '56.25%', // 16:9
  },
  cardContent: {
    flexGrow: 1,
    wordBreak: 'break-word'
  }
}));

interface ICampaignCard {
  id: string;
  start: number;
  end: number;
  target: number;
  delivered: number;
  index: number;
}

function CampaignCard(props: ICampaignCard): ReactElement {

  const classes = useStyles();

  const history = useHistory();

  const onRouteCampaign = useCallback((id) => {
    history.push(`/campaign/${id}`)
  }, [])

  return (
    <Card className={classes.card} onClick={() => onRouteCampaign(props.id)}>
      <CardMedia
        className={classes.cardMedia}
        image={'https://images.unsplash.com/photo-1635623267084-7beec511a45f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxfDB8MXxyYW5kb218MHx8fHx8fHx8MTYzODEwNDA2NQ&ixlib=rb-1.2.1&q=80&w=1080'}
        title="Image title"
      />
      <CardContent className={`${classes.cardContent} m-1 p-2`}>
        <Typography>
          Start: {new Date(props.start).toLocaleDateString().toString()}
        </Typography>
        <Typography>
          End: {new Date(props.end).toLocaleDateString().toString()}
        </Typography>
        <Typography>
          Target Impressions: {props.target}
        </Typography>
        <Typography>
          Delivered Impressions: {props.delivered}
        </Typography>
      </CardContent>

    </Card>
  );
}

export default CampaignCard;
