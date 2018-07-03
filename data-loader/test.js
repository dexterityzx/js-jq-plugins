$.dataLoader('set', {
	key: "test1",
	url: "https://jsonplaceholder.typicode.com/posts/1",
	fn: function (response) {
		console.log('test1:' + response.id);
	}
});

$.dataLoader('set', {
	key: "test2",
	url: "https://jsonplaceholder.typicode.com/posts/2",
	fn: function (response) {
		console.log('test2:' + response.id);
	}
});

$.dataLoader('set', {
	key: "test3",
	url: "https://jsonplaceholder.typicode.com/posts/3",
	fn: function (response) {
		console.log('test3:' + response.id);
	}
});

$.dataLoader('load', [{
	key: "test3",
	url: "https://jsonplaceholder.typicode.com/posts/3",
	fn: function (response) {
		console.log('test3:' + response.id);
	}
}]);

$.dataLoader.set({
	key: "test4",
	url: "https://jsonplaceholder.typicode.com/posts/4",
	fn: function (response) {
		console.log('test4:' + response.id);
	}
});

$.dataLoader.load([{
		key: "test1",
		data: {}
	},
	{
		key: "test2",
		data: {}
	},
	{
		key: "test3",
		data: {}
	},
	{
		key: "test4",
		data: {}
	},
]);