$(document).ready(function(){
	
	var userOrgKey = "";
	var userOrg = "";
	var userInstanceKey = "";
	var	userKey = "xyjfvhjajkmcarswif5k0whm7hkhmfju";

	var getTicketCount = function() {
		$.ajax({
			type: 'GET',
			beforeSend: function (xhr) {
				xhr.withCredentials = true;
				xhr.setRequestHeader('Authorization', 
                          'Basic ' + btoa(userOrgKey + '-' + userInstanceKey +':'+userKey));
				},

				url:"http://api.beta.sherpadesk.com/tickets/counts",
				dataType:"json",
				success: function(returnData) {
					$(".mainStat").html(returnData.open_all);
					$("#userStat").html(returnData.open_as_user);
					$("#techStat").html(returnData.open_as_tech);
					$("#altStat").html(returnData.open_as_alttech);

					},
				error: function() {
					alert("fail @ get getTicketCount");
					console.log(userOrgKey + '-' + userInstanceKey +':'+userKey);(userOrg);
					}
		});
	};

	var getQueueList = function() {
		$.ajax({
			type: 'GET',
			beforeSend: function (xhr) {
				xhr.withCredentials = true;
				xhr.setRequestHeader('Authorization', 
                          'Basic ' + btoa(userOrgKey + '-' + userInstanceKey +':'+userKey));
				},

				url:"http://api.beta.sherpadesk.com/queues?sort_by=tickets_count",
				dataType:"json",
				success: function(returnData) {
						var queuesLength = returnData.length; 
						$("#DashBoradQueues").empty();
						if(queuesLength > 3 ) {
							queuesLength = 3; 
						}
						for( var i = 0; i < queuesLength; i++)
						{
							var insertQueue = "<li><a href='ticket_list.html'><div class='OptionWrapper'><h3 class='OptionTitle'>"+returnData[i].fullname+"</h3></div><div class='NoticationWrapper'><h2>"+returnData[i].tickets_count+"</h2></div></a></li>";
        					$(insertQueue).prependTo("#DashBoradQueues");					
						}
					},
				error: function() {
					alert("fail");
					console.log(userOrgKey + '-' + userInstanceKey +':'+userKey);(userOrg);
					}
		});
	};

	var getActiveAccounts = function() {
		$.ajax({
			type: 'GET',
			beforeSend: function (xhr) {
				xhr.withCredentials = true;
				xhr.setRequestHeader('Authorization', 
                          'Basic ' + btoa(userOrgKey + '-' + userInstanceKey +':'+userKey));
				},

				url:"http://u0diuk-b95s6o:fzo3fkthioj5xi696jzocabuojekpb5o@api.beta.sherpadesk.com/accounts?query=account_statistics.ticket_counts.open>0",
				dataType:"json",
				success: function(returnData) {
					$(".ActiveAccountsContainer").empty();
					var tableHeader = "<ul class='tableHeader'><li></li><li>Hours</li><li>Invoice</li><li>Tickets</li></ul>";
					$(tableHeader).prependTo(".ActiveAccountsContainer");
					console.log(returnData);
					for (var i = 0; i < returnData.length; i++)
					{
						if(returnData[i].name.length > 10) {
							var activeAccount = "<ul class='tableRows'><li>"+returnData[i].name.substring(0,8)+"..."+"</li><li>"+returnData[i].account_statistics.timelogs+"</li><li>"+returnData[i].account_statistics.invoices+"</li><li>"+returnData[i].account_statistics.ticket_counts.open+"</li></ul>";
						$(activeAccount).appendTo(".ActiveAccountsContainer");
						}else{
						var activeAccount = "<ul class='tableRows'><li>"+returnData[i].name+"</li><li>"+returnData[i].account_statistics.timelogs+"</li><li>"+returnData[i].account_statistics.invoices+"</li><li>"+returnData[i].account_statistics.ticket_counts.open+"</li></ul>";
						$(activeAccount).appendTo(".ActiveAccountsContainer");
					}
					}

					},
				error: function() {
					alert("fail @ get getTicketCount");
					console.log(userOrgKey + '-' + userInstanceKey +':'+userKey);(userOrg);
					}
		});
	};
	
	var org = {
		init: function() {
			this.getOrg();
		},

		getOrg: function() {
			$.ajax({
				type: 'GET',
				beforeSend: function (xhr) {
					xhr.withCredentials = true;
					xhr.setRequestHeader('Authorization', 'Basic ' + btoa('x:' + userKey));
					},
				url: 'http://api.beta.sherpadesk.com/organizations/',
				async: true,
				cache: false,
				dataType: 'json',			
				success: function(returnData) {
					userOrgKey = returnData[0].key;
					userOrg = returnData[0].name;
					userInstanceKey = returnData[0].instances[0].key;
					$(".SherpaDesk").html(userOrg);
					getTicketCount();
					getQueueList();
					getActiveAccounts();
				},
				error: function() {
					alert("fail @ getOrg");
				}
			}).promise();

		}
	};

	


	(function() {
		org.init();
		
	}()); 
	

});
