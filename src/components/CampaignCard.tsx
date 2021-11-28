import { useCallback, ReactElement } from 'react';
import Button from '@material-ui/core/Button';
import DeleteIcon from '@material-ui/icons/Delete';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() => ({

  card: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
  },
  cardMedia: {
    paddingTop: '56.25%', // 16:9
  },
  cardContent: {
    flexGrow: 1,
    wordBreak: 'break-word'
  },
  deleteIcon: {
    marginLeft: 'auto!important',
    marginRight: 0,
  }
}));

interface ICampaignCard {
  start: number;
  end: number;
  index: number;
  onDeleteCampaign: (campaignIndex: number) => void;
}

function CampaignCard (props: ICampaignCard) : ReactElement {

  const classes = useStyles();

  const handleOnDelete = useCallback(() => {
    props.onDeleteCampaign(props.index);
  }, [props]);

  return (
    <Card className={classes.card}>
      <CardMedia
        className={classes.cardMedia}
        image={'https://images.unsplash.com/photo-1635623267084-7beec511a45f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxfDB8MXxyYW5kb218MHx8fHx8fHx8MTYzODEwNDA2NQ&ixlib=rb-1.2.1&q=80&w=1080'}
        title="Image title"
      />
      <CardContent className={classes.cardContent}>
        <Typography gutterBottom variant="h5" component="h2">
          {props.start}
        </Typography>
        <Typography>
          {props.end}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small" color="primary" className={classes.deleteIcon} onClick={handleOnDelete}><DeleteIcon color="primary" /></Button>
      </CardActions>
    </Card>
  );
}

export default CampaignCard;
