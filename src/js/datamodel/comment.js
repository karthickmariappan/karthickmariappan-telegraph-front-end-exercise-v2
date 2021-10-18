/**
 * A data model class to represent each comment. This class sets class variables and provides
 * getters to access those data values
 */
class Comment{
    constructor(id, commentedOn, username, body, likes){
        this._id = id;
        this._commentedOn = commentedOn;
        this._username = username;
        this._body = body;
        this._likes = likes;
    }

    /**
     * Getter function for the Comment Id
     *
     * @returns {Number}
     */
    getCommentId(){
        return this._id;
    }

    /**
     * Getter function for the date on which the comment was added
     *
     * @returns {String}
     */
    getCommentedOn(){
        return this._commentedOn;
    }

    /**
     * Getter function for the Username
     *
     * @returns {String}
     */
    getUsername(){
        return this._username;
    }

    /**
     * Getter function for the body of the comment
     *
     * @returns {String}
     */
    getCommentBody(){
        return this._body;
    }

    /**
     * Getter function for the number of likes
     *
     * @returns {Number}
     */
    getLikes(){
        return this._likes;
    }
}

module.exports = Comment;