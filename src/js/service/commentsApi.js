const Comment = require('../datamodel/comment');
// This url could be placed in a config file (on environment level) out side the src code to enable flexibility of switching based on
// environment
const commentsApiUrl = "https://my-json-server.typicode.com/telegraph/frontend-exercise/comments";

async function getComments() {

    let comments = [];
    try{
        let response = await fetch(commentsApiUrl);

        let responseData = await response.json();

        // the API Handler sends back null in case the api fails
        // if an array of data is sent back, then a new array of Comment objects will be created and
        // handed back over to the Main app
        if(responseData && responseData.length > 0){
            responseData.forEach(data => {
                let comment = new Comment(data.id, data.date, data.name, data.body, data.likes);
                comments.push(comment);
            });
        }
    }catch(error){
        console.log(`GetComments call has an error with message: ${error.message}`);
    } finally{
        return comments;
    }
}

module.exports = { getComments };