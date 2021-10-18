const CommentsApi = require('../service/commentsApi');
const CommentBox = require('../component/commentBox');
/**
 * Controller class
 */
class Controller{
    /**
     * Constructor for the controller which initiates the class variable and calls the first function to create the elements
     * on load of the page
     */
    constructor(){
        this._comments = null;
        this._initialDraw();
    }

    /**
     * Function to fetch the comments and feed it as is to the function that builds the component
     *
     * @private
     * @async
     */
    async _initialDraw(){
        try{
            this._comments = await this._getComments();
            this._build(this._comments);
        }catch(error){
            console.log(`Error in _initialDraw. Error message ${error.message}`);
        }

    }

    /**
     * Function that puts together the comments heading, creates new CommentBox for each comment data block and appends it to the comment box list
     * along with a horizontal line
     *
     * @param {Array} comments
     *          Array of comments (sorted/unsorted) fetched from the API
     * @private
     */
    _build(comments){
        try{
            let totalCommentsSpan = document.getElementById("comments-count");

            let totalComments = comments && comments.length ? comments.length : 0;

            totalCommentsSpan.innerHTML = totalComments + " comments";

            let comment_box_list = document.getElementById("comment_box_list");

            //Clear the existing comment box list
            this._removeAllChildNodes(comment_box_list);

            if(comments && comments.length > 0){
                // iterate over each comment list and create a comment box for each
                // and append the Comment box and a horizontal line to the comment_box_list
                comments.forEach(comment => {
                    let commentComponent = new CommentBox(comment);
                    comment_box_list.appendChild(commentComponent.getWrapper());
                    comment_box_list.appendChild(document.createElement('hr'));
                });
            }else{
                // About to create the no Comments span
                let noCommentSpan = document.createElement('span');
                noCommentSpan.setAttribute('id', 'noCommentSpan');
                noCommentSpan.innerHTML = "No Comments to be shown";
                noCommentSpan.classList.add("noComment");

                comment_box_list.appendChild(noCommentSpan);
            }

        }catch(error){
            console.log(`Error in _build. Error message ${error.message}`);
        }

    }

    /**
     * Function to remove any existing child elements of a parent.
     * This function is used to ensure the comment box list is empty before adding in new comments
     *
     * @param {HTMLElement} parent
     * @private
     */
    _removeAllChildNodes(parent) {
        while (parent.firstChild) {
            parent.removeChild(parent.firstChild);
        }
    }

    /**
     * Function to fetch the comments and feed the sorted comments to the function that builds the component.
     * This function is to be used as handler for the 'Likes' button on the page.
     *
     * @private
     * @async
     */
    async sortAndRebuild(){
        try{
            this._comments = await this._getComments();
            if(this._comments && this._comments.length > 0){
                this._comments.sort((comment1, comment2) => {return comment2.getLikes() - comment1.getLikes()});
            }
            this._build(this._comments);
        }catch(error){
            console.log(`Error in sort. Error message ${error.message}`);
        }

    }


    /**
     * Private Function to fetch the comments through API before processing
     */
    async _getComments(){
        let comments = [];
        try{
            comments = await CommentsApi.getComments();
            console.log('The comments are');
            console.log(comments);
        }catch(error){
            console.log(`Error in _getComments. Error message ${error.message}`)
        }finally{
            return comments;
        }
    }
};

module.exports = Controller;