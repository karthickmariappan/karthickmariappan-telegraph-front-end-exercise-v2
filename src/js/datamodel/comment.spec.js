const Comment = require('./comment');

describe('Comment', ()=>{
    let commentInstance;

    beforeEach(()=>{
        commentInstance = new Comment(1, "TEST_DATE", "TEST_USER", "COMMENT_BODY", 82);
    });

    it("defines and sets the class variables", ()=>{
        //tests
        expect(commentInstance._id).toBeDefined();
        expect(commentInstance._commentedOn).toBeDefined();
        expect(commentInstance._username).toBeDefined();
        expect(commentInstance._body).toBeDefined();
        expect(commentInstance._likes).toBeDefined();

        expect(commentInstance._id).toBe(1);
        expect(commentInstance._commentedOn).toBe("TEST_DATE");
        expect(commentInstance._username).toBe("TEST_USER");
        expect(commentInstance._body).toBe("COMMENT_BODY");
        expect(commentInstance._likes).toBe(82);
    });

    it("getter for CommentId returns the id set in constructor", ()=>{
        //test
        expect(commentInstance.getCommentId()).toBe(1);
    });

    it("getter for Commented On returns the commented date set in constructor", ()=>{
        //test
        expect(commentInstance.getCommentedOn()).toBe("TEST_DATE");
    });

    it("getter for Username returns the name set in constructor", ()=>{
        //test
        expect(commentInstance.getUsername()).toBe("TEST_USER");
    });

    it("getter for Comment Body returns the body set in constructor", ()=>{
        //test
        expect(commentInstance.getCommentBody()).toBe("COMMENT_BODY");
    });

    it("getter for Likes returns the number set in constructor", ()=>{
        //test
        expect(commentInstance.getLikes()).toBe(82);
    });
});