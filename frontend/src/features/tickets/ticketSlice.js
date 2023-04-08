import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import ticketService  from './ticketService'


const initialState = {
    tickets: [],
    ticket: {},
    isLoading: false,
    isError: false,
    isSuccess: false,
    message: ''
}



// Create New Ticket
export const createTicket = createAsyncThunk (
    "ticket/create",
    async (ticketData, thunkAPI) => {
      try {
        // console.log(thunkAPI)
        // console.log(ticketData)
        const token = thunkAPI.getState().auth.user.token
        return await ticketService.createTicket(ticketData, token)
        
      } catch (error) {
        const message =
          (error.response && error.response.data && error.response.data.message) ||
          error.message ||
          error.toString();
        return thunkAPI.rejectWithValue(message);
      }
    }
  );



const ticketSlice = createSlice ({
    name: 'ticket',
    initialState,
    reducers: {
        reset: (state) => initialState
    },
    extraReducers: (builder) => {
      builder
        .addCase(createTicket.pending, (state) => {
          state.isLoading = true
        })
        .addCase(createTicket.fulfilled, (state, action) => {
          state.isLoading = false
          state.isSuccess = true
          state.tickets = action.payload
          // console.log(action)
          // console.log(action.payload)
        })
        .addCase(createTicket.rejected, (state, action) => {
          state.isLoading = false
          state.isError = true
          state.message = action.payload
        })

    }
})



export const { reset } = ticketSlice.actions
export default ticketSlice.reducer