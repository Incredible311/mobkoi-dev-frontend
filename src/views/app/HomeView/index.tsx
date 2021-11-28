import React, { useState, useMemo, useEffect, useCallback, ReactElement } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Button from '@material-ui/core/Button';
import { useHistory } from "react-router-dom";
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import InfinitScroll from 'react-infinite-scroll-component';
import Grid from '@material-ui/core/Grid';
import DeleteDialog from '../../../components/DeleteDialog';
import CampaignCard from '../../../components/CampaignCard';
import { getCampaigns } from '../../../redux/slices/campaign';
import { IRootState } from '../../../redux/store';
import { ICampaignUpdate } from '../../../interfaces';

const useStyles = makeStyles((theme) => ({
  icon: {
    marginRight: theme.spacing(2),
  },
  heroContent: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(6, 0, 0),
  },
  addNewButton: {
    backgroundColor: '#3f51b5',
    color: '#ffffff',
    height: '40px'
  },
  heroButtons: {
    marginTop: theme.spacing(4),
  },
  cardGrid: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(8),
  },
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
  },
  footer: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(6),
  },
  deleteIcon: {
    marginLeft: 'auto!important',
    marginRight: 0,
  },
  actionTopView: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
  }
}));

function HomeView() : ReactElement {

  const history = useHistory()
  const classes = useStyles();
  const dispatch = useDispatch();
  const { campaigns, total, hasMore } = useSelector((state: IRootState) => state.campaign);

  const [limit, setLimit] = useState(16)
  const [page, setPage] = useState(0);
  const [isFetch, setIsFetch] = useState(true);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [campaignId, setCampaignId] = useState('');

  const getCampaignDatas = useCallback(() => {
    if(isFetch) {
      dispatch(getCampaigns(limit, page));
      setIsFetch(false);
    }
  }, [dispatch, isFetch, page]);

  useEffect(() => {
    // Get registerd campaign datas
    getCampaignDatas();
  }, [dispatch, isFetch, page]);

  const handleNextPage = useCallback(() => {
    console.log("fetch: ", page)
    setTimeout(() => {
      setPage(page + 1);
      setIsFetch(true);
    }, 1000);
  }, [page]);

  const onDeleteCampaign = useCallback((campaignIndex: number) => {
    setCampaignId((campaigns[campaignIndex] as ICampaignUpdate).id);
    setIsDeleteOpen(true);
  }, [campaigns]);

  const onCloseDeleteDialog = useCallback(() => {
    setIsDeleteOpen(false);
  }, []);

  const onDeleteSuccess = useCallback(() => {
    setIsDeleteOpen(false);
    setPage(0);
    setIsFetch(true);
  }, []);

  const showDeleteDialog = useMemo(() => {

    return (
      <DeleteDialog
        isOpen = {isDeleteOpen}
        id = {campaignId}
        onCloseDeleteDialog = {onCloseDeleteDialog}
        onDeleteSuccess = {onDeleteSuccess}
      />
    );
  }, [isDeleteOpen]);

  const showCampaignCards = useMemo(() => {
    return campaigns.length > 0 ? campaigns.map((campaign: ICampaignUpdate, index: number) => (
      <Grid item key={campaign.id} xs={12} sm={6} md={4} lg={3}>
        <CampaignCard start={campaign.start} end={campaign.end} index={index} onDeleteCampaign={onDeleteCampaign} />
      </Grid>)) : <p style={{ fontSize: '20px', textAlign: 'center', width: '100%' }}>There is no campaign</p>;
  }, [campaigns])

  return (
    <main>
      <div className={classes.heroContent}>
        <Container className={classes.actionTopView}>
          <Button className={classes.addNewButton} variant="contained" color="primary" onClick={() => history.push(`/add-campaign`)}>
            Add New +
          </Button>
        </Container>
        <Container className={classes.cardGrid}>
          <InfinitScroll
              dataLength={total}
              next={() => handleNextPage()}
              hasMore={hasMore}
              loader={<h5 style={{textAlign: 'center'}}>Loading...</h5>}
              style={{ overflow: 'inherit' }}
            >
              <Grid container spacing={3}>
                {
                  showCampaignCards
                }
              </Grid>
            </InfinitScroll>
        </Container>
      </div>
      {showDeleteDialog}
    </main>
  );
}

export default HomeView;
