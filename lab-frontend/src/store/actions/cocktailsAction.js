import axiosApi from "../../axiosApi";
import {push} from 'connected-react-router';
import { toast } from 'react-toastify';

export const FETCH_COCKTAIL_SUCCESS = 'FETCH_COCKTAIL_SUCCESS';
export const FETCH_COCKTAIL_FAILURE = 'FETCH_COCKTAIL_FAILURE';

export const fetchCocktailSuccess = cocktail => ({type: FETCH_COCKTAIL_SUCCESS, cocktail});
export const fetchCocktailFailure = error => ({type: FETCH_COCKTAIL_FAILURE, error});

export const getCocktails = id => {
  return async dispatch => {
      try {
          let response;
          if(id) {
              response = await axiosApi.get('/cocktails?id=' + id)
          } else {
              response = await axiosApi.get('/cocktails');
          }
          dispatch(fetchCocktailSuccess(response.data));
      }catch (error) {
          dispatch(fetchCocktailFailure(error))
      }
  }
};

export const postCocktail = cocktailData => {
    return async (dispatch, getState) => {
        try {
            const role = getState().users.user.role;
            console.log(role)
            await axiosApi.post('/cocktails', cocktailData);
            dispatch(fetchCocktailSuccess());
            if (role === 'user') {
                toast.success('Ваш коктейль находится на рассмотрении модератора');
            } else {
                //nothing
            }
            dispatch(push('/'))
        }catch (error) {
            dispatch(fetchCocktailFailure(error))
        }
    }
};

export const cocktailPublish = id => {
    return async dispatch => {
        try {
            await axiosApi.post(`/cocktails/${id}/published`)
            dispatch(getCocktails())
        } catch (e) {
            console.error(e)
        }
    }
};

export const deleteCocktail = id => {
  return async dispatch => {
      try {
          await axiosApi.delete('/cocktails/' + id);
          dispatch(getCocktails())
      } catch (e) {
          console.error(e)
      }
  }
};