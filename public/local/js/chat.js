
function sendChatMessage()
{
	var chatMessage = $("#chatInput").val();

	console.log(documentID + " " + chatMessage);
	if(chatMessage != '')
	{
		var addMessageRequest = $.ajax({
			type: "POST",
			url: "/addChatMessage",
			data: {documentID:documentID, message: chatMessage},
			cache: false
		}).done(function(res){
			$("#chatInput").val('');
			$("#chatHistory").append('<div>'+res.username+': '+ res.message+'</div>');
		});
	}
}

function getChatHistory()
{
	var getChatHistoryRequest = $.ajax({
		type: "POST",
		url: "/getHistory",
		data: {documentID:documentID},
	}).done(function(res){
		//console.log(res.chatHistory + ' ' + res.error);
		$("#chatHistory").children().remove();
		if(res.error == 'No error')
			for(var i=0; i<res.chatHistory.length; i++)
				$("#chatHistory").append('<div>'+res.chatHistory[i].sourceName+': '+ res.chatHistory[i].text+'</div>');
			setTimeout(getChatHistory, 1000);
		});
}

$(document).ready(function() {
	setTimeout(getChatHistory, 1000);

	$("#chatInput").keyup(function(event){
		if(event.keyCode == 13){
			$("#chatSend").click();
		}
	});
});