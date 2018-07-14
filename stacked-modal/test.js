$.stkModal.initialize({
	baseZIndex: 100,
	loadcss: true
}).create({
	id: 'test1',
	header: '<h3 class="modal-title">Test 1</h3>',
	body: '<p>test body</p>',
	footer: '<button class="btn btn-danger" data-dismiss="stkmodal">Close</button>' +
		'<button class="btn btn-info" stkmodal-target="test2">Modal 2</button>' +
		'<button class="btn btn-info" stkmodal-target="test3">Modal 3</button>'
}).create({
	id: 'test2',
	header: '<h3 class="modal-title">Test 2</h3>',
	body: '<p>test body 2</p>',
	footer: '<button class="btn btn-danger" data-dismiss="stkmodal">Close</button>'
}).create({
	id: 'test3',
	header: '<h3 class="modal-title">Test 3</h3>',
	body: '<p>test body 3</p>',
	footer: '<button class="btn btn-danger" data-dismiss="stkmodal">Close</button>' +
		'<button class="btn btn-info" stkmodal-target="test2">Modal 2</button>'
}).auto();

// without auto
// $('[stkmodal-target]').on('click',function(){
// 	$.stkModal.show($(this).attr('stkmodal-target'));
// });