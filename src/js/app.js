const CommentsController = require('./controller/commentsController');

function onLoadHandler(){
    let controller = new CommentsController();

    let likesButton = document.getElementById("likesBtn");
    likesButton.addEventListener("click", function(){
        controller.sortAndRebuild();
    });
};



window.onload = onLoadHandler;
