const PageTitle = () => {
    function goLogOut(){
        sessionStorage.removeItem('accessToken');
        sessionStorage.removeItem('refreshToken');
        sessionStorage.removeItem('memberId');
        sessionStorage.removeItem('companyId');

        document.location.href = "/dxai/";
    }

    return (
        <div className="w-full flex items-center gap-12 px-[1.875rem] py-7">
            <h4 className="text-xl font-bold relative before:content-[''] before:absolute before:top-1/2 before:-right-6 before:-translate-y-1/2 before:w-[1px] before:h-4 before:bg-[#CFCFCF]">CO2</h4>
            <div className="flex items-center gap-4">
                <p className="text-sm text-text-light">LCA</p>
                <i className="icon-chevron_right text-base text-text-light w-4 h-4 inline-block"></i>
                <p className="text-sm text-text-light">LCA</p>
                <i className="icon-chevron_right text-base text-text-light w-4 h-4 inline-block"></i>
                <p className="text-sm text-text-dark font-bold">CO2</p>
                <p className="text-sm text-text-dark font-bold">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<button onClick={() => {goLogOut()}}><b><font color="RED">LOGOUT</font></b></button></p>
            </div>
        </div>
    )
}

export default PageTitle