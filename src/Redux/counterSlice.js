import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  arreycart: localStorage.getItem('arreycart') ? JSON.parse(localStorage.getItem('arreycart')):[],
  arreycartid :localStorage.getItem('arreycartid') ? JSON.parse(localStorage.getItem('arreycartid')):[]
}
// 
// 
export const counterSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {

    Addprodack: (state, action) => {
      // @ts-ignore
      const cart ={ ...action.payload,'quantity': 1}
      state.arreycart.push(cart)
      state.arreycartid.push(action.payload.id)
      localStorage.setItem('arreycart',JSON.stringify(state.arreycart))
      localStorage.setItem('arreycartid',JSON.stringify(state.arreycartid))
    },
    Addplus: (state, action) => {
      // @ts-ignore
      const findd = state.arreycart.find((item) => {
        return item.id === action.payload.id
      })
     
 
      findd.quantity+= 1
      localStorage.setItem('arreycart',JSON.stringify(state.arreycart))
    },
    removeplus: (state, action) => {
      const findd = state.arreycart.find((item) => {
        return item.id === action.payload.id
      })
     
 
      findd.quantity-= 1
      if (findd.quantity === 0) {
        const nawarr = state.arreycart.filter((item) => {
          return item.id !== action.payload.id
        })
        const nawarrid = state.arreycartid.filter((item) => {
          return item !== action.payload.id
        })
state.arreycart = nawarr
state.arreycartid = nawarrid


      }
      localStorage.setItem('arreycart',JSON.stringify(state.arreycart))
      localStorage.setItem('arreycartid',JSON.stringify(state.arreycartid))
   

    },
    deleteprodack: (state, action) => {
      const nawarr = state.arreycart.filter((item) => {
        return item.id !== action.payload.id
      })
      const nawarrid = state.arreycartid.filter((item) => {
        return item !== action.payload.id
      })
      
state.arreycart = nawarr
state.arreycartid = nawarrid
localStorage.setItem('arreycart',JSON.stringify(state.arreycart))
localStorage.setItem('arreycartid',JSON.stringify(state.arreycartid))
    },

  },
})

// Action creators are generated for each case reducer function
export const {  Addprodack,Addplus , removeplus,deleteprodack  } = counterSlice.actions

export default counterSlice.reducer