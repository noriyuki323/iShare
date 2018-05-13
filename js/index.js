var dappAddress = "n1uVNkfzz9FWUfsMPCqBYfXTDiq2LQJ38vV";
$(function() {
	
	
	    var NebPay = require("nebpay"); //https://github.com/nebulasio/nebPay
        var nebpay = new NebPay();

		
        //var dappAddress = "n1nk8EEJcCE2J1fk2wdFCLMkhH8cttrxGJE";
        var txHash = "8a737f441be70e9dc81b06f12545f3354e14fbabf0f5dff359b98398c4e2ded2";
		
		
    $("#navall").click(function() {
        $("#detailTitle").text("所有分享");

        var to = dappAddress;
        var value = "0";
        var callFunction = "getAll";
        var callArgs = "[]";
        nebpay.simulateCall(to, value, callFunction, callArgs, {
            listener: function(resp) {
                //console.log(JSON.stringify(resp.result));
				if(resp.result == ""){
					$("#searchresult").html('<div class="panel-body">暂时没有记录</div>');
					return;
				}
                var myArr = JSON.parse(resp.result);
				if(myArr.length == 0){
					$("#searchresult").html('<div class="panel-body">暂时没有记录</div>');
					return;
				}

                var tempStr = "";

                for (var i = 0; i < myArr.length; i++) {
                    if (i % 2 == 0) {
                        tempStr += '<div class="panel-body"> ';
                    } else {
                        tempStr += '<div class="panel-footer">';
                    }

                    //					
                    tempStr += '<p>';
                    tempStr += myArr[i].content;
                    tempStr += '</p>';
                    tempStr += '<p>';
                    tempStr += '<small><cite>' + '作者：' + myArr[i].author + '</cite></small>';
                    tempStr += '<br>';
                    tempStr += '<a class="btn" href="#" id="like" onclick="addLike(';
                    tempStr += myArr[i].index;
                    tempStr += ')">收藏</a>';

                    tempStr += '</p> </div> ';
                }
                console.log(tempStr);
                $("#searchresult").html(tempStr);
            }
        });

    });
	$("#navall").click();

    $("#navlike").click(function() {
        $("#detailTitle").text("我收藏的分享");



        var to = dappAddress;
        var value = "0";
        var callFunction = "getMyLike";
        var callArgs = "[]";
        nebpay.simulateCall(to, value, callFunction, callArgs, {
            listener: function(resp) {
                //console.log(JSON.stringify(resp.result));
				if(resp.result == ""){
					$("#searchresult").html('<div class="panel-body">暂时没有记录</div>');
					return;
				}
                var myArr = JSON.parse(resp.result);
				if(myArr.length == 0){
					$("#searchresult").html('<div class="panel-body">暂时没有记录</div>');
					return;
				}
				

                var tempStr = "";

                for (var i = 0; i < myArr.length; i++) {
                    if (i % 2 == 0) {
                        tempStr += '<div class="panel-body"> ';
                    } else {
                        tempStr += '<div class="panel-footer">';
                    }

                    //					
                    tempStr += '<p>';
                    tempStr += myArr[i].content;
                    tempStr += '</p>';
                    tempStr += '<p>';
                    tempStr += '<small><cite>' + '作者：' + myArr[i].author + '</cite></small>';
                    
					tempStr += '<br>';
                    tempStr += '<a class="btn" href="#" id="removelike" onclick="removeLike(';
                    tempStr += myArr[i].index;
                    tempStr += ')">取消收藏</a>';
					
                    tempStr += '</p> </div> ';
                }
                console.log(tempStr);
                $("#searchresult").html(tempStr);
            }
        });

    });

    $("#navcreate").click(function() {
        $("#detailTitle").text("我要分享");

        var tempStr = '';
		tempStr += '<div class="panel-body"> ';
		tempStr += '<form role="form">';
        tempStr += '<div class="form-group">';
        tempStr += '<label for="content">要分享的内容</label>'; 
        tempStr += '<textarea class="form-control" rows="10" id="content"></textarea>';
		tempStr += '<button type="button" class="btn btn-primary" id="savebutton" onclick="save();">分享</button>';		
        tempStr += '</div>';
        tempStr += '</form>';
		tempStr += '</div> ';
		console.log(tempStr);

		$("#searchresult").html(tempStr);
    });

});

function addLike(index){
	var NebPay = require("nebpay"); //https://github.com/nebulasio/nebPay
    var nebpay = new NebPay();

    //var dappAddress = "n1nk8EEJcCE2J1fk2wdFCLMkhH8cttrxGJE";
    var txHash = "8f1ad354e2a5dd992ffaa3aa1b35fad074379760ca2e00d906e8b732809c03a3";

        var to = dappAddress;
        var value = "0";
        var callFunction = "addLike";
        var callArgs = "[\"" + index + "\"]";
        nebpay.call(to, value, callFunction, callArgs, {
            listener: function(resp) {
                console.log(JSON.stringify(resp.result));
            }
        });
};

function removeLike(index){
	var NebPay = require("nebpay"); //https://github.com/nebulasio/nebPay
    var nebpay = new NebPay();

    //var dappAddress = "n1nk8EEJcCE2J1fk2wdFCLMkhH8cttrxGJE";
    var txHash = "8f1ad354e2a5dd992ffaa3aa1b35fad074379760ca2e00d906e8b732809c03a3";

        var to = dappAddress;
        var value = "0";
        var callFunction = "removeLike";
        var callArgs = "[\"" + index + "\"]";
        nebpay.call(to, value, callFunction, callArgs, {
            listener: function(resp) {
                console.log(JSON.stringify(resp.result));
            }
        });
};

function save(){
	var NebPay = require("nebpay"); //https://github.com/nebulasio/nebPay
    var nebpay = new NebPay();

    //var dappAddress = "n1nk8EEJcCE2J1fk2wdFCLMkhH8cttrxGJE";
    var txHash = "8f1ad354e2a5dd992ffaa3aa1b35fad074379760ca2e00d906e8b732809c03a3";
	
	    var content = $("#content").val();

        if (content == "") {
            alert("请输入要分享的内容。");
            return;
        }
		
		content= content.replace(/\n/g,"<br>"); 

        var to = dappAddress;
        var value = "0";
        var callFunction = "save";
        var callArgs = "[\"" + content + "\"]";
        nebpay.call(to, value, callFunction, callArgs, {
            listener: function(resp) {
                console.log(JSON.stringify(resp));
				alert("分享成功");
            }
        });
	
};