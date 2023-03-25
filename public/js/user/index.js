// type 3 question - add button

$(document.body).on('click','.add-row-button', function (e) {
	const table = $(this).closest('table');
	let elementCount = parseInt(table.attr('elements'));	// get current element count
	table.attr('elements', elementCount += 1);	// increment element count by one
	table.children('tbody').append(`<tr>
	<th class="sno">${elementCount}</th>
	<td><textarea></textarea></td>
	<th class="delete-row-button"><i class="fa-regular fa-circle-xmark"></i></th>
	</tr>`);
});

// type 3 qeuestion - delete button

$(document.body).on('click','.delete-row-button' ,function (e) {
	console.log($(this));
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
});