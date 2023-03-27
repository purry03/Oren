const response = {};

// textarea event listener

function calculateResponse(textarea) {
	const questionElement = $(textarea).closest('div').find('[questionId]');
	const type = questionElement.attr('class');
	const questionId = (questionElement.attr('questionId')).toString();
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
	default:
		// get vertical div
		const verticalDiv = $(questionElement).closest('.vertical');
		// for each table in div
		response[questionId] = [];
		$('table', $(verticalDiv)).each(function(){
			// generate array of responses
			const arr = [];
			$('textarea', $(this)).each(function(){
				const value = $(this).val();
				arr.push(value);
				// push array to response[questionid]
			});
			response[questionId].push(arr);
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
window.onload = function() {
	$('textarea', $(document.body)).each(function () {
		calculateResponse(this);
	});	
	$('select', $(document.body)).each(function () {
		calculateResponse(this);
	});
};


/*
* whenever a textarea in the document is changed
* call calculateResponse()
*/
$(document.body).on('input','textarea', function (e) {
	calculateResponse(this);
});

$(document.body).on('change','select', function (e) {
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


// type 5 tab selection
$(document.body).on('click','.tab' ,function (e) {
	const parent = $(this).closest('.vertical');
	const currentTabCount = $(this).attr('tabCount');
	// set all tabs to deactivated
	$('.tab', $(parent)).each(function () {
		$(this).removeClass('activated');		
	});
	// set this tab to activated
	$(this).addClass('activated');
	// hide all tables
	$('table', $(parent)).each(function () {
		$(this).addClass('invisible');		
	});
	// set this tab's table to activated
	$(`.tab${currentTabCount}`).removeClass('invisible');
});

jQuery.fn.ForceNumericOnly =
function()
{
	return this.each(function()
	{
		$(this).keydown(function(e)
		{
			var key = e.charCode || e.keyCode || 0;
			// allow backspace, tab, delete, enter, arrows, numbers and keypad numbers ONLY
			// home, end, period, and numpad decimal
			return (
				key == 8 || 
                key == 9 ||
                key == 13 ||
                key == 46 ||
                key == 110 ||
                key == 190 ||
                (key >= 35 && key <= 40) ||
                (key >= 48 && key <= 57) ||
                (key >= 96 && key <= 105));
		});
	});
};

$('.number').ForceNumericOnly();

$('input[type=file]').change(function () {
	var fileExtension = ['jpeg', 'jpg', 'png', 'bmp', 'xls', 'xlsx', 'xlsm', 'txt', 'csv', 'pdf'];
	if ($.inArray($(this).val().split('.').pop().toLowerCase(), fileExtension) == -1) {
		alert('Only formats are allowed : '+fileExtension.join(', '));
	}
});

function uploadFiles(){
	return new Promise(function(resolve,reject){
		var formData = new FormData();

		$('input[type=file]', $('#main')).each(function () {
			try{
				const file = $(this)[0].files[0];
				formData.append($(this).attr('name'), file);
			}
			catch(err){
			// file is undefined
			// ignore error
			}
		});

		$.ajax({
			url : '/response/file/',
			type : 'POST',
			data : formData,
			processData: false,  // tell jQuery not to process the data
			contentType: false,  // tell jQuery not to set contentType
			success : function(data) {
				resolve();
			}
		});
	});
}

function uploadResponses(){
	return new Promise(function(resolve,reject){
		$.ajax({
			type: 'POST',
			url: '/response/',
			data: JSON.stringify(response),
			success: function(data) { resolve(); },
			contentType: 'application/json; charset=utf-8',	});
	});
}

$('.submit').on('click',async function(){	// on submit
	const promiseArr = [];
	promiseArr.push(uploadFiles());
	promiseArr.push(uploadResponses());
	await Promise.all(promiseArr);
	alert('Response Submitted');
});