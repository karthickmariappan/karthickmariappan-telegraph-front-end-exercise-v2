const CommentBox = require('./commentBox');
const Comment = require('../datamodel/comment');

describe('Comment Box', ()=>{
    let commentBox,commentData;
    beforeEach(()=>{
        commentData = new Comment(1, "TEST_DATE", "TEST_USER", "COMMENT_BODY", 82);
        //set up
        jest.spyOn(CommentBox.prototype, "_buildCommentBox");
    });

    afterEach(()=>{
        commentData = null;
    });

    describe('Constructor', ()=>{
        it("should set the class variable and call the buildCommentBox function", ()=>{

            //function call
            commentBox = new CommentBox(commentData);

            //tests
            expect(commentBox._comment).toBeDefined();
            expect(commentBox._comment).toBe(commentData);
            expect(commentBox._buildCommentBox).toHaveBeenCalled();
        });
    });

    describe('_buildCommentBox', ()=>{
        beforeEach(()=>{
            jest.spyOn(document, "createElement");

            //create instance
            commentBox = new CommentBox(commentData);

            CommentBox.prototype._buildCommentBox.mockReset();
        });

        it("should create the elements, set appropriate data and append them to the wrapper", ()=>{

            //function call
            commentBox._buildCommentBox();

            // tests - createElement
            expect(document.createElement).toHaveBeenCalledTimes(4);

            //tests - wrapper
            expect(commentBox._commentBoxWrapper).toBeDefined();
            expect(document.createElement.mock.calls[0][0]).toBe('div');
            expect(commentBox._commentBoxWrapper.getAttribute('id')).toBe('comment_1');
            expect(commentBox._commentBoxWrapper.classList.contains('comment-box')).toBe(true);

            //tests - username
            expect(commentBox._userNameSpan).toBeDefined();
            expect(document.createElement.mock.calls[1][0]).toBe('span');
            expect(commentBox._userNameSpan.innerHTML).toBe('TEST_USER');
            expect(commentBox._userNameSpan.classList.contains('username')).toBe(true);
            expect(commentBox._commentBoxWrapper.children[0]).toBe(commentBox._userNameSpan);

            //tests - likes
            expect(commentBox._likesSpan).toBeDefined();
            expect(document.createElement.mock.calls[2][0]).toBe('span');
            expect(commentBox._likesSpan.innerHTML).toBe('82 Likes');
            expect(commentBox._likesSpan.classList.contains('likes')).toBe(true);
            expect(commentBox._commentBoxWrapper.children[1]).toBe(commentBox._likesSpan);

            //tests - body
            expect(commentBox._commentBody).toBeDefined();
            expect(document.createElement.mock.calls[3][0]).toBe('p');
            expect(commentBox._commentBody.innerHTML).toBe('COMMENT_BODY');
            expect(commentBox._commentBody.classList.contains('comment-body')).toBe(true);
            expect(commentBox._commentBoxWrapper.children[2]).toBe(commentBox._commentBody);
        });
    });

    describe('getWrapper', ()=>{

        it("should return the object held by _commentBoxWrapper variable", ()=>{
            //local set up
            commentBox = new CommentBox(commentData);
            //overriding the variable data for testing
            commentBox._commentBoxWrapper = "MOCK_OBJECT";

            //function call
            let returnObj = commentBox.getWrapper();

            //test
            expect(returnObj).toBe('MOCK_OBJECT');
        });
    });
});