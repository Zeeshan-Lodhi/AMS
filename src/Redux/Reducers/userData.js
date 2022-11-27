// const storagedata = JSON.parse(localStorage.getItem("userInfo"))
// console.log(storagedata);

// const initstate = {
//     userInfo: storagedata
// }
export const userDataReducer = (state = {}, action) => {
    switch (action.type) {
        case "USER_DATA_REQUEST":
            return { loading: true }

        case "USER_DATA_SUCCESS":
            return {
                usersInfo: action.payload,
                ...state,
                loading: false,
            }

        case "USER_DATA_FAIL":
            return { loading: false, error: action.payload }

        default:
            return state;
    }
}

export const userLoginReducer = (state = {}, action) => {
    switch (action.type) {
        case "USER_LOGIN_REQUEST":
            return { loading: true };

        case "USER_LOGIN_SUCCESS":
            return { loading: false, userInfo: action.payload };

        case "USER_LOGIN_FAIL":
            return { loading: false, error: action.payload };
        case "USER_LOGOUT":
            return {};
        default:
            return state;
    }
};
