// function register() {
	
// }

function addNote() {
	var backdrop = document.getElementById('backdrop');
	var newNote = document.getElementById('newNote');
	backdrop.style.display = 'block';
	backdrop.style.zIndex = '10';
	newNote.style.display = 'block';
	newNote.style.zIndex = '20';
}

function cancel_note() {
	backdrop.style.display = 'none';
	newNote.style.display = 'none';
}

// Получение всех заметок
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
// 			})
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

	// отправка формы
$("#notesForm").submit(function(event) {
	event.preventDefault();
	console.log(event.target);
	var note = $(event.target).serialize();
	console.log(note);
		CreateNote(note);
	// if (id == 0)
	// 	CreateNote(note);
	// else
	// 	EditNote(note);
});

	// Добавление заметки
function CreateNote() {
	$.ajax({
		url: "/notes",
		type: 'POST',
		data: note,
		success: function(note) {
			$("table tbody").append(row(note));
		}
	});
};

// создание строки для таблицы
function row(note) {
	return "<tr data-rowid='" + note._id + "'><td>" + note.created + "</td><td>" + note.created + "</td>" +
		   "<td>" + note.noteName + "</td> <td>" + note.noteTheme + "</td></tr>";
}