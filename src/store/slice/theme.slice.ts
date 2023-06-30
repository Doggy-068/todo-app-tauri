import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export const themeSlice = createSlice({
  name: 'theme',
  initialState: {
    value: '#84709b'
  },
  reducers: {
    setValue: (state, action: PayloadAction<string>) => {
      state.value = action.payload
    }
  }
})

export const { setValue } = themeSlice.actions

export default themeSlice.reducer
