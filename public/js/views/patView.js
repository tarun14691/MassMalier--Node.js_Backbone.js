// var markup1 = '<table id="app" class="table table-bordered  table-hover">'+
				// +'<thead>'
					// +'<th style="width:5%;"></th>'
					// +'<th style="width:30%;">name</th>'
					// +'<th style="width:15%;">dob</th>'
					// +'<th style="width:30%;">email</th>'
					// +'<th style="width:20%;">mobile</th>'
				// +'</thead>'
				// +'<tbody>';
// var markup2 = '</tbody></table>';
var markupInner = '';
var patientView = Backbone.View.extend({
	tagName : 'tbody',
	el : '#appTableBody',
	render : function(){
		$('table#appTable').find('tbody').html('');
		data = this.options.patData ; 
		data = eval("(" + data + ")");
		$.each(data.items, function(index, value) {
				markupInner += '<tr id="'+value.id+'"><td class="patientSelector">'
							+'<input type="checkbox" patId="getEmail" name="patient_'+value.id+'"></td>'
							+'<td>'+value.name+'</td>'
							+'<td>'+value.dob+'</td>'
							+'<td>'+value.email+'</td>'
							+'<td>'+value.mobile+'</td></tr>';
		});
		this.$el.html(markupInner);
		return  this;
	}
});