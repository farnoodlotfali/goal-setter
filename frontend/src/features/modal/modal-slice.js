import modalService from "./modalService";
const { createSlice, createAsyncThunk } = require("@reduxjs/toolkit");

const initialState = {
  open: false,
  goalDatail: null,
};

export const openModal = createAsyncThunk("modal/open", async () => {
  try {
    const res = await modalService.openModal();
    return res.val;
  } catch (error) {
    console.log(error);
  }
});

export const modelSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    // openModal: (state) => {
    //   state.open = true;
    // },
    closeModal: (state) => {
      state.open = false;
    },
    setContent: (state, action) => {
      state.goalDatail = action.payload;
      //   state.open = true;
    },
  },
  extraReducers: (builder) =>
    builder.addCase(openModal.fulfilled, (state, action) => {
      state.open = action.payload;
    }),
});

export const modalActions = modelSlice.actions;
export default modelSlice.reducer;
