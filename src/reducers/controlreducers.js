import * as types from '../constants/ControlActionTypes'
import _ from 'lodash'

const initialState = {
  admin: [],
  coronation: [],
  talent: [],
  production: [],
  final: []
}

export default function controlreducers(state = initialState, action = {}) {
  switch (action.type) {
    case types.CONTROLS_ADMIN_SUCCESS:
      return  _.assign({},state,{
        admin: action.data
      })
    case types.CONTROLS_CORONATION_SUCCESS:
      return _.assign({},state,{
        coronation: action.data
      })
    case types.CONTROLS_TALENT_SUCCESS:
      return _.assign({},state,{
        talent: action.data
      })
    case types.CONTROLS_PRODUCTION_SUCCESS:
      return _.assign({},state,{
        production: action.data
      })
    case types.CONTROLS_FINAL_SUCCESS:
      return _.assign({},state,{
        final: action.data
      })
    default:
      return state
  }
}