import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import goalService from "./goalService";

const initialState = {
  goals: [],
  isloading: false,
  isSuccess: false,
  isError: false,
  message: "",
};

// thunk
export const createGoal = createAsyncThunk(
  "goal/create",
  async (goal, ThunkAPI) => {
    try {
      const token = ThunkAPI.getState().auth.user.token;
      return await goalService.createGoal(goal, token);
    } catch (error) {
      const msg =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();

      return ThunkAPI.rejectWithValue(msg);
    }
  }
);

export const deleteGoal = createAsyncThunk(
  "goal/delete",
  async (id, ThunkAPI) => {
    try {
      const token = ThunkAPI.getState().auth.user.token;
      return await goalService.deleteGoal(id, token);
    } catch (error) {
      const msg =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();

      return ThunkAPI.rejectWithValue(msg);
    }
  }
);

export const updateGoal = createAsyncThunk(
  "goal/update",
  async (goal, ThunkAPI) => {
    try {
      console.log(goal);
      const token = ThunkAPI.getState().auth.user.token;
      return await goalService.updateGoal(goal, token);
    } catch (error) {
      const msg =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();

      return ThunkAPI.rejectWithValue(msg);
    }
  }
);

export const getGoal = createAsyncThunk("goal/get", async (_, ThunkAPI) => {
  try {
    const token = ThunkAPI.getState().auth.user.token;
    return await goalService.getGoal(token);
  } catch (error) {
    const msg =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();

    return ThunkAPI.rejectWithValue(msg);
  }
});

const goalSlice = createSlice({
  name: "goal",
  initialState,
  reducers: {
    reset: () => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(createGoal.pending, (state) => {
        state.isloading = true;
      })
      .addCase(createGoal.fulfilled, (state, action) => {
        state.isloading = false;
        state.isSuccess = true;
        state.goals.push(action.payload);
      })
      .addCase(createGoal.rejected, (state, action) => {
        state.isloading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(getGoal.pending, (state) => {
        state.isloading = true;
      })
      .addCase(getGoal.fulfilled, (state, action) => {
        state.isloading = false;
        state.isSuccess = true;
        state.goals = action.payload;
      })
      .addCase(getGoal.rejected, (state, action) => {
        state.isloading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(deleteGoal.pending, (state) => {
        state.isloading = true;
      })
      .addCase(deleteGoal.fulfilled, (state, action) => {
        state.isloading = false;
        state.isSuccess = true;
        state.goals = state.goals.filter(
          (goal) => goal._id !== action.payload._id
        );
      })
      .addCase(deleteGoal.rejected, (state, action) => {
        state.isloading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(updateGoal.pending, (state) => {
        state.isloading = true;
      })
      .addCase(updateGoal.fulfilled, (state, action) => {
        state.isloading = false;
        state.isSuccess = true;
        let ga = state.goals;
        ga = ga.filter((goal) => goal._id !== action.payload._id);
        ga.push(action.payload);
        state.goals = ga;
      })
      .addCase(updateGoal.rejected, (state, action) => {
        state.isloading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export const goalActions = goalSlice.actions;

export default goalSlice.reducer;
