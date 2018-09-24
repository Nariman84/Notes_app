// function register() {
	
// }
var backdrop = document.getElementById('backdrop');
var newNote = document.getElementById('newNote');
function addNote() {
	backdrop.style.display = 'block';
	backdrop.style.zIndex = '10';
	newNote.style.display = 'block';
	newNote.style.zIndex = '20';
}
function cancel_note() {
	backdrop.style.display = 'none';
	newNote.style.display = 'none';
}

// // Получение всех заметок
// function GetNotes() {
// 	$.ajax({
// 		url: "/notes",
// 		type: "GET",
// 		contentType: "application/json",
// 		success: function (notes) {
// 			var rows = "";
// 			$.each(notes, function (index, note) {
// 				// добавляем полученные элементы в таблицу
// 				rows += row(note);
// 			});
// 			$("table tbody").append(rows);
// 		}
// 	});
// }

//Получение одной заметки
// function GetNote(id) {
// 	$.ajax({
// 		url: "/notes/"+id,
// 		type: "GET",
// 		contentType: "application/json",
// 		success: function (note) {
// 			var form = document.forms["noteForm"];
// 			form.elements["note_name"].value = note.note_name;
// 			form.elements["note_theme"].value = note.note_theme;
// 			form.elements["content"].value = note.content;
// 		}
// 	});
// }
$(document).ready(function() {
	// отправка формы
	$("#notesForm").submit(function(event) {
		event.preventDefault();
		console.log(event.target);
		var note = $(event.target).serialize();
		CreateNote(note);
		// if (id == 0)
		// 	CreateNote(note);
		// else
		// 	EditNote(note);
	});

		// Добавление заметки
	function CreateNote(data) {
		$.ajax({
			url: "/notes",
			type: 'POST',
			data: data,
			success: function(note) {
				$("table tbody").append(row(note));
				backdrop.style.display = 'none';
				newNote.style.display = 'none';
				
			}
		});
	};
});

// создание строки для таблицы
var n = 0;
function row(note) {
	n++;
	return "<tr id=" + n + " data-rowid=" + note._id + "'><td>" + note.created + "</td><td>" + note.created + "</td>" +
		   "<td>" + note.note_name + "</td> <td>" + note.note_theme + "</td></tr>";
};

// GetNotes();