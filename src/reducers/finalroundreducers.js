import * as types from '../constants/FinalRoundActionTypes'
import _ from 'lodash'

const initialState ={
  isStarted: null,
  records: [],
  judgeTotal: 0,
  judgeScores: [],
  interview: [],
  poise: []
}

export default function finalroundreducers(state = initialState, action={}){
  switch (action.type) {
    case types.FINAL_ROUND_STATUS:
      return _.assign({},state,{
        isStarted: action.status
      })
    case types.FINAL_ROUND_GETSCORES_SUCCESS:
      return _.assign({},state,{
        records: action.data.record,
        judgeTotal: action.data.judgeTotal,
        judgeScores: action.judgesScores
      })
    case types.FINAL_ROUND_POISE_SUCCESS:
      return _.assign({},state,{
        poise: action.data
      })
    case types.FINAL_ROUND_INTERVIEW_SUCCESS:
      return _.assign({},state,{
        interview: action.data
      })
    default:
      return state
  }
}