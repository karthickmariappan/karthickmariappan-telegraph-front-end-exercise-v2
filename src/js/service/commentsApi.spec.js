const CommentsApi = require('./commentsApi');
const Comment = require('../datamodel/comment');

describe('CommentsApi', ()=>{
    overrideGlobalFetch();

    describe('getComments', ()=>{
        it("calls the fetch function and returns an array of Comment Objects", async () => {
            const comments = await CommentsApi.getComments();

            expect(global.fetch).toHaveBeenCalled();
            expect(comments.length).toBe(3);
            expect(comments[0] instanceof Comment).toBeTruthy();
        });

        it("returns an empty array when exception", async () => {
            fetch.mockImplementationOnce(() => Promise.reject({ message : "API is down" }));

            const comments = await CommentsApi.getComments();

            expect(global.fetch).toHaveBeenCalled();
            expect(comments.length).toBe(0);
          });
    });

});

function overrideGlobalFetch(){
    global.fetch = jest.fn(() =>
        Promise.resolve({
            json: () => Promise.resolve(
                [
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
                    }
                ]
            ),
        })
    );
}