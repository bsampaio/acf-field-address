jQuery(document).ready(function ($){

	addressData = "";

	elements = [
		{
			name : "CEP",
			selector : "input[name$='[cep]']",
			visible : true
		},
		{
			name : "Logradouro",
			selector : "input[name$='[logradouro]']",
			visible : false
		},
		{
			name : "Bairro",
			selector : "input[name$='[bairro]']",
			visible : false
		},
		{
			name : "Cidade",
			selector : "input[name$='[cidade]']",
			visible : false
		},
		{
			name : "Estado",
			selector : "input[name$='[estado]']",
			visible : false
		},
	]

	postMonEndPoint = "http://api.postmon.com.br/v1/cep/";

	/*function inputToSelect(selector) {
		var isInput = $(selector).is('input');
		if(!isInput) return;
		var selectTemplate = "<select class='{{class}}'></select>";
		var select = select.replate("{{class}}", $(this).attr('class'));
		$(this).replaceWith(select);
	}*/

	function init(elements, postmon) {
		elements.forEach(function(element, index, all) {
			if(!element.visible && ($(element.selector).val() === "")) {
				var jElement = $(element.selector);
				jElement.prop("disabled", true);
			}
		});

		// Criar um botão de busca pelo cep
		
		cep = elements.filter(function(element) {
			return element.name.indexOf("CEP") > -1;
		})[0];

		var button = "<input id='#buscarcep' type='button' onclick='postmonSearch()' value='Buscar informações'/>";

		$(cep.selector).parent().append(button);
		//$("#buscarcep").off();
	}

	


	init(elements, postMonEndPoint);
});

function postmonSearch() {
	var cepValue = jQuery(cep.selector).val();
	jQuery.ajax({
		url: postMonEndPoint + cepValue,
		success: function(data) {
			addressData = data;
			fillElements(addressData);

		},
		error: function(data) {
			console.log("Erro! Veja os detalhes abaixo");
			console.log(data);
		}
	})
}

function fillElements(address) {
	elements.forEach(function(element){
		jQuery(element.selector)
			.val(addressData[element.name.toLowerCase()])
			.prop("disabled", false);
	});
}