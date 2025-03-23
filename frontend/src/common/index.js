const backendDomain = "http://localhost:8080"

const summaryApi = {
    signUp : {
        url : `${backendDomain}/api/signup`,
        method: "post",
    },
    signIn : {
        url : `${backendDomain}/api/login`,
        method: "post"
    },
    current_user : {
        url: `${backendDomain}/api/user-details`,
        method : "get"
    },
    logout : {
        url : `${backendDomain}/api/userLogout`,
        method: "get"
    },
    allUser : {
        url : `${backendDomain}/api/all-user`,
        method : "get"
    },
    updateUser : {
        url : `${backendDomain}/api/update-user`,
        method : "post"
    },
    uploadProduct : {
        url : `${backendDomain}/api/upload-products`,
        method : "post"
    },
    allProducts : {
        url : `${backendDomain}/api/get-products`,
        method : "get"
    },
    updateProducts : {
        url : `${backendDomain}/api/update-products`,
        method : 'post'
    },
    productCategories : {
        url : `${backendDomain}/api/get-ProductCategory`,
        method : 'get'
    }

}

export default summaryApi;