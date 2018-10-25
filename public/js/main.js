
$(document).ready(function() {

	var backdrop = document.getElementById('backdrop');
	var newNote = document.getElementById('newNote');
	var viewNote = document.getElementById('viewNote');
	var trfromDb = document.getElementsByClassName('trfromDb');
	var content_body = document.getElementById("content_body");

	$('#add_note').click(function() {
		content_body.style.filter = 'blur(1px)';
		backdrop.style.display = 'block';
		backdrop.style.zIndex = '10';
		newNote.style.display = 'block';
		newNote.style.zIndex = '20';
	});

	$('#cancel_addNote').click(function() {
		content_body.style.filter = '';
		backdrop.style.display = 'none';
		newNote.style.display = 'none';
	});

	// отправка формы
	$("#notesForm").submit(function(event) {
		event.preventDefault();
		console.log(event.target);
		var note = $(event.target).serialize();
		CreateNote(note);
	});

	var tbody = document.getElementById("tbody_notes");
	var noNotes = document.getElementsByClassName("noNotes");
	var boxPage = document.getElementsByClassName("boxPage");
	var notNotes = document.getElementById("notNotes");
	// Добавление заметки
	function CreateNote(data) {
		$.ajax({
			url: "/notes",
			type: 'POST',
			data: data,
			success: function(note) {
				location.href = "/notes";
			}
		});
	};

	//Сообщение "Список заметок пока пуст", когда нет добавленных заметок
	if (tbody.rows[0] == undefined) {
		noNotes[0].style.opacity = 1;
		noNotes[0].style.margin = "30px auto";
		boxPage[0].style.visibility = "hidden";
		boxPage[1].style.visibility = "hidden";
	} else {
		notNotes.style.display = "none";
	};

	for (var i = 0; i < tbody.rows.length; i++) {
		tbody.rows[i].onmouseover = function() {
			this.style.backgroundColor = 'rgb(141, 181, 213)';
		};
		tbody.rows[i].onmouseout = function() {
			this.style.backgroundColor = 'rgb(210, 230, 232)';
		};
	};

	var currentPage = document.getElementById("current_page");
	if (currentPage == null) {
		var currentPageNum = 1;
	} else {
		var currentPageNum = currentPage.innerHTML;
	}
	tbody.onclick = function(event) {
		var target = event.target;
		if (target.type === "checkbox") {
			return;
		}
		while (target != tbody) {
			if (target.tagName === "TR") {
				content_body.style.filter = 'blur(1px)';
				backdrop.style.display = 'block';
				backdrop.style.zIndex = '10';
				viewNote.style.display = 'block';
				viewNote.style.zIndex = '20';
				var id = target.getAttribute("id");
				GetNote(id, currentPageNum);
			}
		target = target.parentNode;
		}
	}

	var info_noteName = document.getElementById("info_noteName");
	var info_content = document.getElementById("info_content");
	var info_created = document.getElementById("info_created");

	// Получение одной заметки
	function GetNote(id, currentPageNum) {
		$.ajax({
			url: "/notes/" + currentPageNum + "/" + id,
			type: "GET",
			contentType: "application/json",
			success: function (note) {
				console.log("Данные получены", note);
				info_noteName.innerHTML = note[0].note_name;
				info_content.innerHTML = note[0].content;
				info_created.innerHTML = note[0].createdFormatDate;
			}
		});
	}
	
	$('#cancel_viewNote').click(function() {
		content_body.style.filter = '';
		backdrop.style.display = 'none';
		viewNote.style.display = 'none';
		info_noteName.innerHTML = '';
		info_content.innerHTML = '';
		info_created.innerHTML = '';
	});

	$("#delNote").click(function() {
		var check = document.getElementsByClassName("checkbox");
		for (var i = 0; i < check.length; i++) {
			if (check[i].checked === true) {
				var noteId = (check[i].id.toString()).substr(3);
				deleteNote(currentPageNum, noteId);
			};
		}
	});	

	//Удаление заметки
	function deleteNote(currentPageNum, noteId) {
		$.ajax({
			url: "/notes/" + currentPageNum +"/" + noteId,
			contentType: "application/json",
			type: "DELETE"
		})
		window.location.reload(true);
	}
});