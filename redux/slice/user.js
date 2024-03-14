const { createSlice, createAsyncThunk } = require("@reduxjs/toolkit");



// 创建异步 thunk 来获取初始数据
// export const fetchInitialUserData = createAsyncThunk(
//     'user/fetchInitialUserData',
//     async () => {
//       // 发送网络请求获取初始数据
//       const response = await axios.get('');
//       return response.data; // 返回获取到的数据
//     }
//   );

const initialState = {
    username: '',
    password: '',
    avater: '',
    age: 0,
    sex: true,
    like: '',
    location: '',
    personSlogan: '',
    loading: false,
    error: null
}

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUsername: (state, action) => {
            state.username = action.payload.username
        }
    },
    // extraReducers: {
    //     // 处理 fetchInitialUserData 成功的情况
    //     [fetchInitialUserData.pending]: (state) => {
    //       state.loading = true;
    //       state.error = null;
    //     },
    //     [fetchInitialUserData.fulfilled]: (state, action) => {
    //       state.loading = false;
    //       // 使用获取到的数据更新状态
    //       const userData = action.payload;
    //       state.username = userData.username;
    //       state.password = userData.password;
    //       state.avatar = userData.avatar;
    //       state.age = userData.age;
    //       state.sex = userData.sex;
    //       state.like = userData.like;
    //       state.location = userData.location;
    //       state.personSlogan = userData.personSlogan;
    //     },
    //     // 处理 fetchInitialUserData 失败的情况
    //     [fetchInitialUserData.rejected]: (state, action) => {
    //       state.loading = false;
    //       state.error = action.error.message;
    //     }
    //   }
})

export const { setUsername /* 其他 action creators */ } = userSlice.actions;

export default userSlice.reducer;