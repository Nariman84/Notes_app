
$(document).ready(function() {

	$('#add_note').click(function() {
		$(".content_body").css("filter", "blur(1px)");
		$("#backdrop").css({"display":"block", "zIndex":10});
		$("#new_note").css({"display":"block", "zIndex":20});
	});

	$('#cancel_add_note').click(function() {
		$(".content_body").css("filter", "");
		$("#backdrop").css("display", "none");
		$("#new_note").css("display", "none");
	});

	// отправка формы
	$("#notes_form").submit(function(e) {
		e.preventDefault();
		var note = $(e.target).serialize();
		CreateNote(note);
	});

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
	if ($("tbody tr").length === 0) {
		$(".empty_table").css({"opacity":1, "margin":"30px auto"});
		$(".box_page").css("visibility", "hidden");
	};

	for (var i = 0; i < $("tbody tr").length; i++) {
		$("tbody tr").eq(i).mouseover(function() {
			this.style.backgroundColor = 'rgb(141, 181, 213)';
		});
		$("tbody tr").eq(i).mouseout(function() {
			this.style.backgroundColor = 'rgb(210, 230, 232)';
		});
	};

	var currentPage = $(".current_page");
	if (currentPage == null) {
		var currentPageNum = 1;
	} else {
		var currentPageNum = currentPage.innerHTML;
	}

	$("tbody").click(function(e) {
		var target = $(e.target);
		var tbody = $("tbody");
		var typeElem = $(target).attr("type");
		if (typeElem != undefined && target[0].type === "checkbox") {
			return;
		} else {
			while (target[0].nodeName != tbody[0].nodeName) {
				if (target[0].nodeName === "TR") {
					$(".content_body").css("filter", "blur(1px)");
					$("#backdrop").css({"display":"block", "zIndex":10});
					$("#view_note").css({"display":"block", "zIndex":20});
					var id = $(target).attr("id");
					GetNote(id, currentPageNum);
				}
			target = $(target).parent();
			}
		}
	});

	// Получение одной заметки
	function GetNote(id, currentPageNum) {
		$.ajax({
			url: "/notes/" + currentPageNum + "/" + id,
			type: "GET",
			contentType: "application/json",
			success: function (note) {
				console.log("Данные получены", note);
				$("#info_note_name").html(note[0].note_name);
				$("#info_content").html(note[0].content);
				$("#info_created").html(note[0].created_format_date);
			}
		});
	};
	
	$('#cancel_view_note').click(function() {
		$(".content_body").css("filter", "");
		$("#backdrop").css("display", "none");
		$("#view_note").css("display", "none");
	});

	$("#del_note").click(function() {
		var check = $(".checkbox");
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