import { createSlice } from '@reduxjs/toolkit';
import {
  ICampaign,
  ICampaignUpdate,
  ICampaignDelete,
} from '../../interfaces'
import axios from "axios";

const initialState = {
  isLoading: false,
  error: false,
  campaigns: [],
  total: 0,
  hasMore: true
};

const slice = createSlice({
  name: 'campaign',
  initialState,
  reducers: {
    // START LOADING
    startLoading(state) {
      state.isLoading = true;
    },

    // HAS ERROR
    hasError(state, action) {
      state.isLoading = false;
      state.error = action.payload;
    },

    // GET campaigns Success
    getCampaignsSuccess(state, action) {
      state.isLoading = false;
      const page = action.payload.page;
      page > 0 ? 
        state.campaigns = state.campaigns.concat(action.payload.campaigns)
        : state.campaigns = action.payload.campaigns;
      state.total = action.payload.total;
      if(action.payload.campaigns.length < action.payload.total)
        state.hasMore = true;
      else state.hasMore = false;
    },
  }
});

// Reducer
export default slice.reducer;

// ----------------------------------------------------------------------

export function getCampaigns(limit: number, page: number) {
  return async (dispatch: any) => {
    try {
      // dispatch(slice.actions.startLoading());
  

      // dispatch(slice.actions.getCampaignSuccesss({
      //   campaigns: result.data.campaigns,
      //   total: JSON.parse(result_total.data.campaigns_length).total,
      //   page: page
      // }));
    } catch (error) {
      dispatch(slice.actions.hasError((error as Error).message));
    }
  };
}

export function createCampaign(campaignArgs: ICampaign) {
  return async () => {
    try {

      
      return true;
    } catch (error) {
      throw error;
    }
  };
}

export function updateCampaign(campaignArgs: ICampaignUpdate) {
  return async () => {
    try {


      return true;
    } catch (error) {
      throw error;
    }
  };
}

export function deleteCampaign(campaignArgs: ICampaignDelete) {
  return async () => {
    try {

      return true;
    } catch (error) {
      throw error;
    }
  };
}
