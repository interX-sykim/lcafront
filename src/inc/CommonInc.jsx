const commonInc = {
    headers: {
        headers: {
            'Authorization' : "Bearer " + localStorage.getItem("accessToken")
        }
    }
}

export default commonInc;