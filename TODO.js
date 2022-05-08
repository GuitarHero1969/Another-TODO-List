$(function () {
	
	// use Enter and Carriage Return keys to trigger the click...
	$('#taskItem').on('keypress', function(event) {
		
		if (event.keyCode === 13 && event.currentTarget.value.length > 0) {
			$('#addTask').trigger('click');
		}
	});
	
	$('#addTask').on('click', function () {
        add();
    });
	
	$('#reset').on('click', function () {
		clearAll();
	});
});

// keep track of how many todo items we have...
var todoCount = 0;

function clearAll() {
	
	if($('#listContainer .todoRow').length > 0){
		$('#listContainer .todoRow').empty();
	}
}

function add() {

    $('#listContainer').append(buildHtml());		
	var taskDescription = $('#taskItem').val();
	
	// copy the input text to the task list...
	$('.todoRow:eq(' + todoCount + ')').find('.clsDesc').val(0).html(taskDescription);
	todoCount++;
}

function remove(srcElem) {
	
	todoCount --;
	$(srcElem).parent().parent().remove();

	// re-index out-of-sequence repeated elements...
	$('#listContainer .todoRow').each(function (i){		
		$(this).attr('data-index', i).find('.clsDesc').attr('data-span-index', i);
	});
}

function completed(srcElem) {
	
	var indx = $(srcElem).parent().next().children().attr('data-span-index');
	$('#listContainer').find('.clsDesc:eq(' + indx + ')').toggleClass('markedAsComplete');
}

// generate an HTML string
function buildHtml() {
	
	var itemHtml = $([
		"<div class=\"row todoRow mb-1 bg-info\" data-index=\'" + todoCount + "'>",
		"<div class=\"col-1\"><input type=\"checkbox\" onclick=\"completed(this)\"/></div>",
		"<div class=\"col-9\"><span class=\"clsDesc\" data-span-index=\'" + todoCount + "'></span></div>",
		"<div class=\"col-2\"><button type=\"button\" class=\"btn btn-secondary btn-xs\" onclick=\"remove(this)\">Completely Remove</button></div></div>"
	].join("\n"));
	
	return itemHtml;
}

