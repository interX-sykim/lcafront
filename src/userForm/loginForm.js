import { useReducer, useEffect } from "react";

const LoginForm = callback => {
    const initState = {
        input: {
            id: "",
            password: ""
        },
        validationErrs: {
            id: "",
            password: ""
        },
        isSubmiting: false
    };

    const reducer = (state, action) => {
        switch (action.type){
            case "INPUT_CHANGE":
                return{
                    ...state,
                    input: {
                        ...state.input,
                        ...action.payload
                    },
                    validationErrs: {
                        ...state.validationErrs,
                        ...validateOnTouch(state, action)
                    }
                };
            case "SUBMIT":
                return {
                    ...state,
                    validationErrs: {
                        id: "",
                        password: "",
                        ...validateOnSubmit(state)
                    },
                    isSubmiting: true
                };
            case "STOP_SUBMIT":
                return{
                    ...state,
                    isSubmiting: false
                };
            default:
                return state;
        }
    };

    const [state, dispatch] = useReducer(reducer, initState);

    const handleChange = e => {
        dispatch({
            type: "INPUT_CHANGE",
            payload: { [e.target.name]: e.target.value }
        });
    };

    const handleSubmit = e => {
        e.preventDefault();
        dispatch( {type: "SUBMIT"});
    };

    useEffect(() =>{
            if(
                Object.values(state.validationErrs).find(err => err.length)
                && state.isSubmiting
            )
                dispatch({ type: "STOP_SUBMIT" });
            if(
                !Object.values(state.validationErrs).find(err => err.length)
                && state.isSubmiting
            )
                callback(state.input);
        }, [state.isSubmiting]);

    return {state, handleChange, handleSubmit};
};

export default LoginForm;


function validateOnSubmit(state){
    const { input } = state;
    let validationErrs = {};
    if(!input.id) validationErrs.id = "ID is required";
    else if(input.id.length < 2 && input.id.length > 20)
        validationErrs.id = "ID must be at least 2 to 10 characters";
    if(!input.password) validationErrs.password = "Password is required";
    return validationErrs;
}

function validateOnTouch(state, action){
    let validationErr = {};
    for( let keyName in action.payload){
        if(state.input[keyName].length > 0 && action.payload[keyName].length === 0)
            validationErr[keyName] = "This field is required";
        if(state.input[keyName].length === 0 && action.payload[keyName].length > 0)
            validationErr[keyName] = "";
    }

    return validationErr;
}
