const CommentsController = require('./commentsController');
const CommentsApi = require('../service/commentsApi');
const CommentBox = require('../component/commentBox');
const Comment = require('../datamodel/comment');

describe('Comments Controller', ()=>{
    let controllerIns;
    let testComments = getCommentsUtil();
    beforeEach(()=>{
        //local set up
        jest.spyOn(CommentsController.prototype, "_initialDraw").mockImplementation();
        jest.spyOn(CommentsController.prototype, "_getComments").mockImplementation(
            async () => { return testComments}
        );
        jest.spyOn(CommentsApi, "getComments").mockImplementation(
            async () => { return 'test_comments_from_API'}
        );

        //function call
        controllerIns = new CommentsController();
    });

    describe('construtor', ()=>{
        it("defines the class variable and calls the initialDraw function", ()=>{
            //tests
            expect(controllerIns._comments).toBeDefined();
            expect(controllerIns._initialDraw).toHaveBeenCalled();
        });
    });

    describe('_initialDraw', ()=>{
        beforeEach(()=>{
            CommentsController.prototype._initialDraw.mockRestore();
        })
        it("calls the class function _getComments and then calls the Build function with returned comments data", async ()=>{
            //local set up
            jest.spyOn(CommentsController.prototype, "_build").mockImplementation();

            await controllerIns._initialDraw();

            expect(CommentsController.prototype._getComments).toHaveBeenCalled();
            expect(CommentsController.prototype._build).toHaveBeenCalled();
            expect(CommentsController.prototype._build.mock.calls[0][0]).toBe(testComments);
        });
    });

    describe('sortAndRebuild', ()=>{

        it("calls the class function _getComments and then calls the Build function with sorted data", async ()=>{
            //local set up
            jest.spyOn(CommentsController.prototype, "_build").mockImplementation();

            await controllerIns.sortAndRebuild();

            expect(CommentsController.prototype._getComments).toHaveBeenCalled();
            expect(CommentsController.prototype._build).toHaveBeenCalled();
            let commentsInArgs = CommentsController.prototype._build.mock.calls[0][0];
            // tests proving the list is sorted
            expect(commentsInArgs[0].getLikes()).toBe(58);
            expect(commentsInArgs[1].getLikes()).toBe(33);
            expect(commentsInArgs[2].getLikes()).toBe(4);
        });
    });

    describe('_build', ()=>{
        beforeEach(() => {
            _preBuildSetUp();

            jest.spyOn(CommentBox.prototype, "constructor");
            jest.spyOn(CommentsController.prototype, "_removeAllChildNodes");
        });

        it("injects the total number of comments, removes the child nodes of commentsBoxList, creates new CommentBox for each comment, appends the commentBox and a horizontal line to the comment box list", ()=>{
            CommentsController.prototype._build.mockRestore();

            //function to test
            controllerIns._build(testComments);

            //expect
            expect(document.getElementById("comments-count").innerHTML).toBe("3 comments");
            expect(controllerIns._removeAllChildNodes).toHaveBeenCalled();
            expect(document.getElementsByClassName("comment-box").length).toBe(3);

            let commentBoxListDiv = document.getElementById("comment_box_list");
            expect(commentBoxListDiv.getElementsByTagName('hr').length).toBe(3);
        });

        it("displays the total number of comments as 0, removes the child nodes of commentsBoxList, creates new noComments span and appends to the comment box list when no comments data is passed", ()=>{
            //function to test
            controllerIns._build();

            //expect
            expect(document.getElementById("comments-count").innerHTML).toBe("0 comments");
            expect(controllerIns._removeAllChildNodes).toHaveBeenCalled();
            expect(document.getElementsByClassName("comment-box").length).toBe(0);

            let commentBoxListDiv = document.getElementById("comment_box_list");
            expect(commentBoxListDiv.getElementsByTagName('hr').length).toBe(0);
            expect(commentBoxListDiv.getElementsByTagName('span').length).toBe(1);
            expect(commentBoxListDiv.getElementsByTagName('span')[0].innerHTML).toBe('No Comments to be shown');
            expect(commentBoxListDiv.getElementsByTagName('span')[0].classList[0]).toBe('noComment');
        });

    });

    describe('_removeAllChildNodes', ()=>{
        it('removes child nodes of any passed in node', ()=>{
            //local set up
            _preBuildSetUp();

            let testNode = document.getElementById("home");

            let countB4Removal = testNode.childNodes.length;

            expect(countB4Removal).not.toBe(0);

            controllerIns._removeAllChildNodes(testNode);

            let countAfterRemoval = testNode.childNodes.length;

            expect(countAfterRemoval).toBe(0);

        });
    });

    describe("_getComments", ()=>{

        it("calls the comments api getComments function and returns the data from the api", async ()=>{
            //local set up
            CommentsController.prototype._getComments.mockRestore();

            let result = await controllerIns._getComments();

            expect(CommentsApi.getComments).toHaveBeenCalled();
            expect(result).toBe('test_comments_from_API');
        });
    });
});

function getCommentsUtil(){

    let data = [
		{
			"id": 1,
			"date": "2019-04-23T22:26:43.511Z",
			"name": "Dawud Esparza",
			"body": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. In sed gravida orci.",
			"likes": 33
		},
		{
			"id": 2,
			"date": "2019-04-23T19:26:41.511Z",
			"name": "Lennie Wainwright",
			"body": "Quisque maximus augue ut ex tincidunt sodales. Nullam interdum consectetur mi at pellentesque.",
			"likes": 4
		},
		{
			"id": 3,
			"date": "2019-04-23T18:26:48.511Z",
			"name": "Mindy Sykes",
			"body": "Nam sit amet diam rutrum, venenatis est ac, tempus massa. Etiam tempus libero sit amet bibendum lacinia. Quisque ligula dolor, venenatis quis urna non, tristique laoreet erat.",
			"likes": 58
        }];

    let comments = data.map(datum => {return new Comment(
        datum.id,
        datum.date,
        datum.name,
        datum.body,
        datum.likes
    )})

    return comments;
}

function _preBuildSetUp(){
    document.body.innerHTML = `
    <div id="home" class="homeContainer">
        <hr>
        <div class="comment-head">
            <span id="comments-count" class="comments-count"></span>
            <span class="sort">Sort</span>
            <button id="likesBtn" class="comment-head-button">Likes</button>
        </div>
        <hr>
        <div id="comment_box_list"></div>
    </div>
    `;
}