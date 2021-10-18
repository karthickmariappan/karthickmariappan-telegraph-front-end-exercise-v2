class CommentBox{
    /**
     * Constructor for the Comment Box class. This sets the class variable which is later used while building the elements
     *
     * @param {Object} comment
     */
    constructor(comment){
        this._comment = comment;
        this._buildCommentBox();
    }

    /**
     * Function to create all the elements that makes up the comment box. This function also sets necessary attributes and css classes
     * <div id="comment_x" role="listitem"> //Unique id Where 'x' is the id from the comment data
     *      <span class="username"></span> //Element to show the Name of the user who commented
     *      <span class="likes"></span> //Element to show the number of likes on the comment
     *      <p class="comment-body"></p> //Element to show the content of the comment
     * </div>
     *
     * @private
     */
    _buildCommentBox(){
        this._commentBoxWrapper = document.createElement('div');
        this._commentBoxWrapper.setAttribute("id", "comment_"+this._comment.getCommentId());
        // The role is set as 'listitem' to support a11y and the div which would eventually hold this set with role as 'list'
        this._commentBoxWrapper.setAttribute("role", "listitem");
        this._commentBoxWrapper.classList.add("comment-box");

        this._userNameSpan = document.createElement('span');
        this._userNameSpan.innerHTML = this._comment.getUsername();
        this._userNameSpan.classList.add("username");
        this._commentBoxWrapper.appendChild(this._userNameSpan);

        this._likesSpan = document.createElement('span');
        this._likesSpan.innerHTML = this._comment.getLikes() + " Likes";
        this._likesSpan.classList.add("likes");
        this._commentBoxWrapper.appendChild(this._likesSpan);

        this._commentBody = document.createElement('p');
        this._commentBody.innerHTML = this._comment.getCommentBody();
        this._commentBody.classList.add("comment-body");
        this._commentBoxWrapper.appendChild(this._commentBody);
    }

    /**
     * Function that returns the constructed wrapper.
     * @public
     */
    getWrapper(){
        return this._commentBoxWrapper;
    }

}

module.exports = CommentBox;