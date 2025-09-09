const backendDomin="https://api.primelendinghub.in"

const SummaryApi = {
    signUP : {
        url : `${backendDomin}/api/signup`,
        method : "post"
    },
    signIn : {
        url : `${backendDomin}/api/login`,
        method : "post"
    },
    current_user : {
        url : `${backendDomin}/api/user-details`,
        method : "get"
    },
    logout_user : {
        url : `${backendDomin}/api/userLogout`,
        method : 'get'
    },
    allUser : {
        url : `${backendDomin}/api/all-user`,
        method : 'get'
    },
    updateUser : {
        url : `${backendDomin}/api/update-user`,
        method : "post"
    },
    createCarousel : {
        url : `${backendDomin}/api/createCarousel`,
        method : "post"
    },
    getCarousels : {
        url : `${backendDomin}/api/getCarousels`,
        method : "get"
    },
    deleteCarousel: {
        url : `${backendDomin}/api/deleteCarousel`,
        method : "delete"
    }
}


export default SummaryApi
