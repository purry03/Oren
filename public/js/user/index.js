const response = {};

// textarea event listener

function calculateResponse(textarea) {
	const questionElement = $(textarea).closest('div').find('[questionId]');
	const type = questionElement.attr('class');
	const questionId = questionElement.attr('questionId');
	switch(type){
	case 'type1':
		const value = $(textarea).val();
		response[questionId] = value;
		break;
	case 'type2':
		// iterate through all textareas in question Element
		response[questionId] = [];
		$('textarea', $(questionElement)).each(function(){
			const value = $(this).val();
			response[questionId].push(value);
		});
		break;
	case 'type3':
		// iterate through all textareas in question Element
		response[questionId] = [];
		$('textarea', $(questionElement)).each(function(){
			const value = $(this).val();
			response[questionId].push(value);
		});
		break;
	case 'type4':
		// iterate through all textareas in question Element
		response[questionId] = [];
		$('textarea,select', $(questionElement)).each(function(){
			const value = $(this).val();
			response[questionId].push(value);
		});
		break;
	}
}

/*
* when the page is loaded
* scan through all textarea in the body
* and call calculateResponse() for them
* this is so that the response object is
* intialized with a default value
*/
document.addEventListener('DOMContentLoaded', function() {
	$('textarea', $(document.body)).each(function () {
		calculateResponse(this);
	});	
}, false);


/*
* whenever a textarea in the document is changed
* call calculateResponse()
*/
$(document.body).on('input','textarea', function (e) {
	calculateResponse(this);
});

// type 3 question - add button
$(document.body).on('click','.add-row-button', function (e) {
	const table = $(this).closest('table');
	let elementCount = parseInt(table.attr('elements'));	// get current element count
	table.attr('elements', elementCount += 1);	// increment element count by one
	table.children('tbody').append(`
	<tr>
	<th class="sno">${elementCount}</th>
	<td><textarea></textarea></td>
	<th class="delete-row-button"><i class="fa-regular fa-circle-xmark"></i></th>
	</tr>
	`);
});

// type 3 qeuestion - delete button
$(document.body).on('click','.delete-row-button' ,function (e) {
	const table = $(this).closest('table');
	let elementCount = parseInt(table.attr('elements'));	// get current element count
	$(this).closest('tr').remove();
	table.attr('elements', elementCount -= 1);	// decrement element count by one
	// recalculate table indices
	let idx = 1;
	$('.sno', $(table)).each(function () {
		$(this).html(idx);
		idx += 1;
	});
	// recalcuate response
	const childTextarea = table.find('textarea');	// get any child textarea of the table
	calculateResponse(childTextarea);
});