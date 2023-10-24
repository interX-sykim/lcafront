import { useReducer, useEffect } from "react";

const ProductForm = callback => {
    const initState = {
        input: {
            "product name": "",
            co2eq: ""
        },
        validationErrs: {
            "product name": "",
            co2wq: ""
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
                        "product name": "",
                        co2eq: "",
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
        console.log(e.target)
        if (e.target.name === "co2eq") e.target.value = e.target.value.replace(/[^0-9.]/g, "")
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

    return {state, handleChange, handleSubmit}
}

export default ProductForm;

function validateOnSubmit(state) {
    const { input } = state;
    let validationErrs = {};
    if (!input["product name"]) validationErrs["product name"] = "Product name is required";
    if(!input["co2eq"]) validationErrs["co2eq"] = "CO2EQ is required";
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