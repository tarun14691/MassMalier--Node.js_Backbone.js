	//localStorage.sentMailNum = undefined;
	function compareDates(date1)
	{
		date1 = new Date(date1);
		
		today = new Date();
		now = today; 
		//var now_utc = new Date(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate(),  now.getUTCHours(), now.getUTCMinutes(), now.getUTCSeconds());
		today = now.getUTCDate()+'/'+now.getUTCMonth()+'/'+now.getUTCFullYear();
		now = date1;
		date1 = now.getUTCDate()+'/'+now.getUTCMonth()+'/'+now.getUTCFullYear();
		
		var dateVal1 = new Date(date1);
		var dateVal2 = new Date(today);
		var timeDiff = Math.abs(dateVal2.getTime() - dateVal1.getTime());
		var diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24)); 
		if(parseInt(diffDays) == 0 ){
			var ampm = "am";
			h = now.getUTCHours();
			if (h >= 12)
				ampm = "pm";
			h = h % 12;
			if(h == 0)
				h = 12;
			dateVal = h + ":"+ now.getUTCMinutes()+" "+ ampm; 
			
			console.log("its todays date  only" + dateVal);   
		}
		else{
			var monthNames = [ "Jan", "Feb", "Mar", "Apr", "May", "Jun",
								"Jul", "Aug", "Sept", "Oct", "Nov", "Dec" ];
								
			dateVal = monthNames[now.getMonth()] + " " + now.getUTCDate();
			console.log("its an old date" + dateVal);
		}
			 
		return dateVal;
	}
	
	function sendPost(rcpt , subj , body){
		console.log("before send" + rcpt + subj + body);
		 xurl = 'http://localhost:3000/sendPatMail'
		 domains = {"rcpt":""+rcpt+"" , "subj":""+subj+"" , "body":""+body+""};
		 $.ajax({
				type: 'POST',
				url: xurl,
				dataType: 'json',
                contentType: 'application/json;',
				data: JSON.stringify(domains)
         }).done(function( data ) {
			console.log("Mail Sent");
		 });
	
	}
	
	function getSelectedEmail(emailSelector){
		var emails = undefined;
		var emailsX = undefined;
		$.each(emailSelector, function(index, value) {
			id = $(value).parent().parent().attr('id');
			if(emails == undefined){
				emails = $('table#appTable > tbody').find('tr#'+id+' > td:eq(3)').html();
				emails = $.trim(emails);
			}
			else{
				emailsX = $('table#appTable > tbody').find('tr#'+id+' > td:eq(3)').html();
			}
			//console.log("emailsX avlue :" + emailsX);
			if($.trim(emailsX) != '' && $.trim(emailsX) != undefined && $.trim(emailsX) != null){
				emails += ', '+ emailsX;
			}
		});
		//console.log('emails:' + emails);
		return emails;
	}
	
	$( document ).ready(function() {
		// click to open mailer box
		$('a#sendMailBtn').on("click", function(event) {
			event.preventDefault();
			$('#mailBox').modal({
				show:true,
			});
			$('input[name="emailIds"]').val('');
			$('input[name="emailSubj"]').val('');
			$('#emailMsg').val('');
			var selected = $('input[type="checkbox"]:checked');
			newEmails = getSelectedEmail(selected);
			$('input[name="emailIds"]').val(newEmails);
			//console.log("selected " + newEmails);
		});
		
		//click to send mails
		$('a#yesMailme').on("click", function(event) {
			event.preventDefault();
			var rcpt = $('input[name="emailIds"]').val();
			//var rcpt = 'tarunblog@gmail.com, tarun14691@gmail.com ';
			rcpt = $.trim(rcpt);
			var subj = $('input[name="emailSubj"]').val();
			var body = $('#emailMsg').val();
			if($.trim(rcpt) == ''){
				$('input[name="emailIds"]').focus();
				$('input[name="emailIds"]').css('border-color','red');
				$('input[name="emailIds"]').attr('placeholder','Provide atleast one email');
			}else{
				$('input[name="emailIds"]').css('border-color','#eee');
			}
			if($.trim(subj) == ''){
				$('input[name="emailSubj"]').focus();
				$('input[name="emailSubj"]').css('border-color','red');
				$('input[name="emailSubj"]').attr('placeholder','Subject cant be empty');
			}else{
				$('input[name="emailSubj"]').css('border-color','#eee');
			}
			if($.trim(body) == ''){
				$('#emailMsg').focus();
				$('#emailMsg').css('border-color','red');
				$('#emailMsg').attr('placeholder','Email body cant be empty');
			}else{
				$('#emailMsg').css('border-color','#eee');
			}
			
			if( $.trim(rcpt) != '' && $.trim(subj) != '' && $.trim(body) != ''){
				console.log(body + subj + rcpt);
				sendPost(rcpt , subj , body);
				date1 = new Date().getTime();
				time = compareDates(date1);
				if(localStorage.sentMailNum == undefined){
					localStorage.sentMailNum = 1;
					
					mailDetails = rcpt +'$$'+subj +'$$'+ body+'$$'+time ;
					console.log("mail data :" + mailDetails);
					localStorage['sentmail_1']= mailDetails;
				}else{
					mailNum = localStorage.sentMailNum;
					localStorage.sentMailNum = parseInt(mailNum)+1;
					mailNum = localStorage.sentMailNum;
					mailDetails = rcpt +'$$'+subj +'$$'+ body+'$$'+time ;
					console.log("mail data :" + mailDetails);
					localStorage['sentmail_'+mailNum+'']= mailDetails;
				}
				$('input[type="checkbox"]:checked').removeAttr('checked');
				$('#mailBox').modal('hide');
			}
		});
		
		$('a#patientView').on("click", function(event) {
			event.preventDefault();
			tempX = $('table#appTable').find('tbody').html();
			console.log("tempX :" + tempX);
			if(tempX == undefined || tempX == '' || tempX == null){
				location.hash = '/patients';
			}else{
				location.hash = '/patientsCheck';
			}
			if($('a#mailView').parent().hasClass('active')){
				$('a#mailView').parent().removeClass('active');
				$(this).parent().addClass('active');
				$('#app').css('display','block');
				$('a#sendMailBtn').css('display','block');
				$('#appMails').css('display','none');
				
			}
		});
		
		$('a#mailView').on("click", function(event) {
			event.preventDefault();
			location.hash = '/mails';
			if($('a#patientView').parent().hasClass('active')){
				$('a#patientView').parent().removeClass('active');
				$(this).parent().addClass('active');
				$('#app').css('display','none');
				$('#appMails').css('display','block');
				$('#sendMailBtn').css('display','none');
			}
			mailNum = localStorage.sentMailNum;
			$('#appMailsTable').find('tbody').html('');
			for(x=1; x<= mailNum ; x++){
				maildata = localStorage['sentmail_'+x+''];
				var tempdata = maildata.split('$$');
				
				rcpt = tempdata[0];
				subj = tempdata[1];
				body = tempdata[2];
				time = tempdata[3];
				markupMails = '<tr >'
							+'<td>'+rcpt+'</td>'
							+'<td>'+subj+'</td>'
							+'<td>'+body+'</td>'
							+'<td>'+time+'</td></tr>';
				$('#appMailsTable').find('tbody').append(markupMails);
			}
		});
	});