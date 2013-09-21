var AppRouter = Backbone.Router.extend({
		routes:{
			"":"notSelected",
			"#/":"notSelected",
			"patients": "getPatient",
			"patientsCheck" : "patientsCheck",
			"mails": "mailData"
		},
		notSelected: function(){
			$('table#appTable').find('tbody').html('');
			window.location.href ="http://localhost:3000/#/patients";
			//window.loaction.reload;
			//$('#app').html('NO data found');
		},
		getPatient: function (){
			window.location.href = '/#/patients';
			$('table#appTable').find('tbody').html('');
			// ajax request to get data from practo doc api
			$.ajax({url : ('http://localhost:3000/patients'),
				timeout: 100000,
				beforeSend: function(){
					//console.log("before starting doc api");
				},		
			}).done(function(data) {
				
				var view = new patientView({
						patData : data
					});
				 console.log(data);	
				$('#appTable').append(view.render().el);		
			}).fail(function(xhr, status){
				console.log('request failed');
			});
		},
		patientsCheck: function (){
			tempX = $('table#appTable').find('tbody').html();
			tmepX = $.trim(tempX);
			console.log("tempX :" + tempX);
			if(tempX == undefined || tempX == '' || tempX == null){
				console.log("tempX :1");
				getPatient();
			}else{
				console.log("tempX : 2");
				location.hash = '/patientsCheck';
			}
		},
		mailData: function (){
			window.location.href = '/#/mails';
			console.log("mail view");
			$('a#patientView').parent().removeClass('active');
			$('a#mailView').parent().addClass('active');
			$('#app').css('display','none');
			$('#appMails').css('display','block');
			$('a#sendMailBtn').css('display','none');
		}
});

var app =  new AppRouter();

$(function (){
	Backbone.history.start();
});