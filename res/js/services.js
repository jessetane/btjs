/*
 * Requires DOJO
 */

function AuthService() {}

AuthService.prototype.authenticate = function(args) {
    var username = args.username || "";
    var password = args.password || "";
    var onSuccess = args.onSuccess;
    var onFail = args.onFail;
    
    //This will be removed when a real public key authentication service is implemented.
    var xhrArgs = {
        url: "/auth/login",
        postData: "u=" + username + "&p=" + password,
        handleAs: "json",
        preventCache: true,
        load: function(data){
            console.log("Response: " + data);
            if(onSuccess) onSuccess();
        },
        error: function(data){
            console.log("Response (error): " + data);
            if(onFail) onFail();
        }
    }
    
    // Call the asynchronous xhrPost
    dojo.xhrPost(xhrArgs);
};
