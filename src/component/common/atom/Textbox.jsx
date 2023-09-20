const Textbox = (props) => {
    const { field, type, placeholder, disabled, invalid, isSearchbox = false, fullWidth = false, defaultValue, hasCharacterLimit = false } = props;

    return (
        <div className={`relative ${fullWidth ? "w-full" : ""}`}>
            <input
                {...field}
                type={type}
                autoComplete="off"
                placeholder={placeholder}
                disabled={disabled}
                defaultValue={defaultValue}
                className={`peer ${fullWidth ? "w-full" : "w-[15.625rem]"} h-11 transition duration-200 bg-white border border-border-default rounded outline-none text-text-default text-15 ${isSearchbox ? 'pl-11 pr-2fsda' : 'pl-5 pr-2'} placeholder:text-default placeholder:font-light ${
                    invalid && '!border-error !caret-error'
                } hover:border-border-dark focus:border-primary focus:caret-primary disabled:bg-border-light disabled:border-none`}
            />
            {invalid && <i className="icon-alert_triangle text-2xl !absolute top-1/2 right-[0.875rem] -translate-y-1/2 text-error"></i>}
            {isSearchbox && <i className="icon-search text-2xl !absolute top-1/2 left-4 w-6 h-6 -translate-y-1/2 text-default transition duration-200 peer-focus:text-primary"></i>}
            {hasCharacterLimit && <p><span className="">2</span> / 20 자</p>}
        </div>
    );
};
export default Textbox;
