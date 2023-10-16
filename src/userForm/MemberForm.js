import { useReducer, useEffect } from "react";

const MemberForm = callback => {
    const initState = {
        input: {
            name: "",
            id: "",
            password: "",
            email: ""
        },
        validationErrs: {
            name: "",
            id: "",
            password: "",
            email: ""
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
                        name: "",
                        id: "",
                        password: "",
                        email: "",
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

export default MemberForm;


function validateOnSubmit(state){
    const { input } = state;
    let validationErrs = {};
    if (!input.email) validationErrs.email = "Email is required";
    else if(!/\S+@\S+\.\S+/.test(input.email))
        validationErrs.email = "Should be an email";
    if(!input.name) validationErrs.name = "Name is required";
    else if(input.name.length < 2 && input.name.length > 20)
        validationErrs.name = "Name must be at least 2 to 10 characters";
    if(!input.id) validationErrs.id = "ID is required";
    if(!input.password) validationErrs.password = "Password is required";
    //if(!input.tel) validationErrs.tel = "Tel is required";
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
