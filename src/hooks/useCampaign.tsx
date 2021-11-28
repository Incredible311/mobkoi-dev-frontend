import { useDispatch } from 'react-redux';
import { createCampaign, updateCampaign, deleteCampaign } from '../redux/slices/campaign';
import { ICampaign, ICampaignUpdate, ICampaignDelete } from '../interfaces';

export default function useCampaign() {
  const dispatch = useDispatch();

  return {

    createCampaign: (campaignArgs: ICampaign) => dispatch(
      createCampaign({
        start: campaignArgs.start,
        end: campaignArgs.end,
        targetImpressions: campaignArgs.targetImpressions 
      })
    ),

    updateCampaign: (campaignArgs: ICampaignUpdate) => dispatch(
      updateCampaign({
        id: campaignArgs.id,
        start: campaignArgs.start,
        end: campaignArgs.end,
        targetImpressions: campaignArgs.targetImpressions 
      })
    ),

    deleteCampaign: (campaignArgs: ICampaignDelete) => dispatch(
      deleteCampaign({
        campaign_id: campaignArgs.campaign_id
      })
    )
  };
}
