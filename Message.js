var APP_ID = 'pKkU2717xaiyu8egOaNYucH9-gzGzoHsz';
var APP_KEY = 'pL66pN78H8USTLkSfi6S6Izn';


AV.init({
	appId: APP_ID,
	appKey: APP_KEY
});
var Message = AV.Object.extend('Message');
var message = new Message();

// 			留言功能的实现
// 			1 留言功能的实现重点在于数据的存储,数据存储到什么地方?又应该如何获取呢? leanCloud
// 			2 数据可以存入到leanCloud中,那我们能不能读取数据呢?能读取的话就可以将数据库中的数据全部填充到留言板中 leanCloud提供了api
// 			3 怎么让数据可以实时的显示在留言板中而不需要刷新页面,其实就可以直接在页面中添加一行li,因为数据是成功进入到数据库中的,所以每次刷新的时候都是可以重新加载li,这样就可以实现无刷新留言的功能了.
// 
// 			var todo = AV.Object.createWithoutData('Message', '5c2198b0fb4ffe005f51da3e');
// 			todo.fetch().then(function() {
// 				var title = todo.get('name'); // 读取 title
// 				var content = todo.get('words'); // 读取 content
// 				console.log(title, content)
// 			}, function(error) {
// 				// 异常处理
// 			});


var query = new AV.Query('Message');
query.find().then(function(messages) {
        let array = messages.map((item) => item.attributes)
        console.log(item.names,item.words)
		// array.forEach((item) => {
		// 	let li = document.createElement('li')
		// 	li.innerText = item.names + ' : ' + item.words
		// 	let messageList = document.querySelector('#messageList')
		// 	messageList.appendChild(li)
		// })
	}),
	function(error) {
		// 异常处理
	};

postMessageForm.addEventListener('submit', function(e) {
	e.preventDefault()

	Message.names = postMessagename.value
	// alert(postMessagename.value)
	Message.words = postMessagewords.value
	message.save({
		names: Message.names,
		words: Message.words
	}).then(function(message) {
		// let li = document.createElement('li')
		// console.log()
		// li.innerText = postMessagename.value + ' : ' +  postMessagewords.value
		// let messageList = document.querySelector('#messageList')
		// messageList.appendChild(li)
		// postMessagename.value = ''
		// postMessagewords.value = ''
		// // window.location.reload()
		// console.log(message)
	})
})
