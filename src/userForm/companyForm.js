import { useReducer, useEffect } from "react";

const CompanyForm = callback => {
    const initState = {
        input: {
            name: "",
            website: "",
            logoImageUrl: "",
            email: ""
        },
        validationErrs: {
            name: "",
            website: "",
            logoImageUrl: "",
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
                        website: "",
                        logoImageUrl: "",
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

export default CompanyForm;


function validateOnSubmit(state){
    const { input } = state;
    let validationErrs = {};
    if (!input.email) validationErrs.email = "Email is required";
    else if(!/\S+@\S+\.\S+/.test(input.email))
        validationErrs.email = "Should be an email";
    if(!input.name) validationErrs.name = "Name is required";
    else if(input.name.length < 2 && input.name.length > 20)
        validationErrs.name = "Name must be at least 2 to 10 characters";
    if(!input.website) validationErrs.website = "Website is required";
    if(!input.logoImageUrl) validationErrs.logoImageUrl = "Logo Image Url is required";
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
