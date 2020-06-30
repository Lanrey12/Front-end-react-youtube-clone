import { GET_USERS } from '../type'

const initialState = {
    users: [],
    user: {}
}


export default function(state = initialState, action){
      switch(action.type){
          case GET_USERS: 
            return {
                ...state,
                users: action.payload
            }
      }
}