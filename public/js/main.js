// function register() {
	
// }
$(document).ready(function() {

	var backdrop = document.getElementById('backdrop');
	var newNote = document.getElementById('newNote');

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


	// Получение всех заметок
	// function GetNotes() {


	//Получение одной заметки
	// function GetNote(id) {


	// отправка формы
	$("#notesForm").submit(function(event) {
		event.preventDefault();
		console.log(event.target);
		var note = $(event.target).serialize();
		CreateNote(note);
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

	// создание строки для таблицы
	var n = 0;
	function row(note) {
		n++;
		return "<tr id=" + n + " data-rowid=" + note._id + "'><td>" + note.created + "</td><td>" + note.created + "</td>" +
			   "<td>" + note.note_name + "</td> <td>" + note.note_theme + "</td></tr>";
	};

});

