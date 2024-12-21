    $(document).ready(function() {
        // LOAD TODO
        loadToDo();

        // new TODO
        $("#newBtn").on("click", function() {
            const todoText = prompt("Enter your TO DO:").trim();
            if (todoText) {
                addToDo(todoText);
                saveToDo();
            }
        });

        // To do to DOM
        function addToDo(text) {
            const $toDoDiv = $("<div>").text(text).on("click", function() {
                deleteToDo($(this));
            });
            const $list = $("#ft_list");

            // Add to the top of the list
            if ($list.children().length > 0) {
                $list.prepend($toDoDiv);
            } else {
                $list.append($toDoDiv);
            }
        }

        // Remove todo
        function deleteToDo($toDoDiv) {
            if (confirm("Do you really want to delete this TO DO?")) {
                $toDoDiv.remove();
                saveToDo();
            }
        }

        // Save To-Do List to Cookies
        function saveToDo() {
            const toDoArray = [];
            $("#ft_list div").each(function() {
                toDoArray.push($(this).text());
            });
            document.cookie = "todo=" + encodeURIComponent(JSON.stringify(toDoArray)) + ";path=/";
        }

        // Load To-Do List from Cookies
        function loadToDo() {
            const cookie = document.cookie.split("; ").find(row => row.startsWith("todo="));
            if (cookie) {
                const toDoArray = JSON.parse(decodeURIComponent(cookie.split("=")[1]));
                toDoArray.reverse().forEach(item => addToDo(item));
            }
        }
    });

