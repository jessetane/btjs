/*
 * Requires DOJO
 */

var Services = {
    authenticate: function(args){
        var username = args.username || "";
        var password = args.password || "";
        var onSuccess = args.onSuccess;
        var onFail = args.onFail;
        
        //This will be removed when a real public key authentication service is implemented.
        var xhrArgs = {
            url: "http://" + HOST + ":8888/auth/login",
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
        console.log("Form being sent...");
        dojo.xhrPost(xhrArgs);
    }
}
