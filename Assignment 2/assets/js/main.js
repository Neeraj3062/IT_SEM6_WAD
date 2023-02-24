(function($) {
	"use strict";
	var fullHeight = function() {
		$('.js-fullheight').css('height', $(window).height());
		$(window).resize(function(){
			$('.js-fullheight').css('height', $(window).height());
		});

	};
	fullHeight();
	$('#sidebarCollapse').on('click', function () {
      $('#sidebar').toggleClass('active');
  });

})(jQuery);



$(document).ready(function () {
	$("#addData_form").submit(function (event) {
		event.preventDefault();

		let name = $("#name").val();
		let email = $("#email").val();
		let password = $("#password").val();

		$.ajax({
			type: "POST",
			url: "https://jsonplaceholder.typicode.com/posts",
			data: {
				name: name,
				email: email,
				password: password
			},
			success: function (response) {
				let entries = [];
				if (localStorage.getItem("entries")) {
					entries = JSON.parse(localStorage.getItem("entries"));
					window.location = "../../index.html";
				}
				entries.push({
					name: response.name,
					email: response.email,
					password: response.password
				});
				localStorage.setItem("entries", JSON.stringify(entries));
		
			}
		});
	});
});


window.onload = function() {
	let entries = JSON.parse(localStorage.getItem("entries"));
	let table = document.getElementById("entries");

	for (let i = 0; i < entries.length; i++) {
	  let row = table.insertRow(-1);
	  let nameCell = row.insertCell(0);
	  let emailCell = row.insertCell(1);
	  let passwordCell = row.insertCell(2);
	  let actionCell = row.insertCell(3);	  
	  nameCell.innerHTML = entries[i].name;
	  emailCell.innerHTML = entries[i].email;
	  passwordCell.innerHTML = entries[i].password;
	  actionCell.innerHTML = '<button id="deleteBtn_' + i + '" class="btn-danger ">Delete</button>';	  
	  let deleteBtn = document.getElementById("deleteBtn_" + i);


	  deleteBtn.addEventListener("click", function() {
		let entries = JSON.parse(localStorage.getItem("entries"));
		entries.splice(i, 1);
		localStorage.setItem("entries", JSON.stringify(entries));
		window.location.reload();
	  });	  
	}
  };