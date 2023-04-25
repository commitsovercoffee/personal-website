     window.onload = function () {
        fetch("https://official-joke-api.appspot.com/random_joke")
            .then((response) => response.json())
            .then((data) => {
                const jokeElement = document.getElementById("joke");
                jokeElement.innerHTML = `${data.setup} ${data.punchline}`;
            });
    };

