
$(document).ready(function() {
	
	var backdrop = document.getElementById('backdrop');
	var newNote = document.getElementById('newNote');
	var trfromDb = document.getElementById('trfromDb');


	$('#add_note').click(function() {
		backdrop.style.display = 'block';
		backdrop.style.zIndex = '10';
		newNote.style.display = 'block';
		newNote.style.zIndex = '20';
	});

	$('#cancel_note').click(function() {
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
		// Добавление заметки
	function CreateNote(data) {
		$.ajax({
			url: "/notes",
			type: 'POST',
			data: data,
			success: function(note) {
				$("table tbody").prepend(row(note));
				backdrop.style.display = 'none';
				newNote.style.display = 'none';
				noNotes[0].style.opacity = 0;
				noNotes[0].style.margin = "0px auto";
			}
		});
	};

	// создание строки для таблицы
	function row(note) {
		return "<tr id='trfromDb' style='height: 25px;'><td>" + note.created + "</td><td>" + note.created + "</td>" +
			   "<td>" + note.note_name + "</td> <td>" + note.note_theme + "</td></tr>";
	};

	//Скрытие надписи "Здесь пока нет заметок" после появления заметок
		if (tbody.rows[0].id === "trfromDb") {
			noNotes[0].style.opacity = 0;
			noNotes[0].style.margin = "0px auto";
		};

	for (var i = 0; i < tbody.rows.length; i++) {
		tbody.rows[i].onmouseover = function() {
			this.style.backgroundColor = '#cddc39';
		}
		tbody.rows[i].onmouseout = function() {
			this.style.backgroundColor = '#ffeb3b6e';
		}
	};

	

});