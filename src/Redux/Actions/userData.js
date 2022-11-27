import axios from "axios"

export const userDataFunc = () => async (dispatch) => {
    try {
        dispatch({ type: "USER_DATA_REQUEST" })
        const userInfo = JSON.parse(localStorage.getItem("userInfo"))
        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.accessToken}`,
            },
        };

        const { data } = await axios.get("https://acms-api.herokuapp.com/api/lead/get", config)
        dispatch({ type: "USER_DATA_SUCCESS", payload: data.leads })

    } catch (error) {
        dispatch({ type: "USER_DATA_FAIL", payload: "Error occured" })

    }
}

export const userLoginFunc = (email, password) => async (dispatch) => {
    try {
        dispatch({ type: "USER_LOGIN_REQUEST" });

        const config = {
            headers: { "Content-type": "application/json", },
        };

        const { data } = await axios.post("https://acms-api.herokuapp.com/api/user/signin", { email, password }, config);

        dispatch({ type: "USER_LOGIN_SUCCESS", payload: data.data });
        localStorage.setItem("userInfo", JSON.stringify(data.data))
    } catch (error) {
        dispatch({
            type: "USER_LOGIN_FAIL",
            payload: "Invalid Credentials"
        });
    }
};
export const logout = () => async (dispatch) => {
    localStorage.removeItem("userInfo");
    dispatch({ type: "USER_LOGOUT" });
};

