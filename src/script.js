// JavaScript code for console text effect
consoleText(['Hi, You!', 'This is Hackers With Hearts ed. 0x0', 'Brought to you with \u2764\uFE0F by', 'Creed'], 'text');

function consoleText(words, id) {
    var visible = true;
    var con = document.getElementById('console');
    var letterCount = 1;
    var waiting = false;
    var target = document.getElementById(id);

    // Segmenter to handle multi-byte characters like emojis correctly
    const segmenter = new Intl.Segmenter(undefined, { granularity: 'grapheme' });

    // Initial color setup
    setTargetColor();

    window.setInterval(function() {
        if (!waiting && letterCount === 0) {
            // Hide the blinking underscore and display "Ctrl" then "Ctrl+U" as keys
            con.classList.add('hidden');
            waiting = true;
            target.innerHTML = `<span class="key">Ctrl</span>`;
            setTimeout(() => {
                target.innerHTML = `<span class="key">Ctrl</span><span class="key">U</span>`;
                setTimeout(() => {
                    clearLine(); // Clear line after displaying "Ctrl+U"
                }, 200);
            }, 200);
        } else if (letterCount === words[0].length + 1 && !waiting) {
            // Start the clearing sequence after a full display
            waiting = true;
            setTimeout(() => {
                letterCount = 0;
                waiting = false;
            }, 1000);
        } else if (!waiting) {
            if (words[0] === 'Creed') {
                // Display "Creed" all at once in the Termina font, in #a54550 color, and hide the underscore
                con.style.display = 'none'; // Hide the underscore
                target.innerHTML = `<span style="font-weight: bold; font-family: 'Termina', sans-serif; font-size: 100px; color: #a54550;">Creed</span>`;
            } else {
                // Display other words letter by letter in off-white color
                const characters = Array.from(segmenter.segment(words[0])).map(segment => segment.segment);
                target.innerHTML = characters.slice(0, letterCount).join('');
                con.style.display = 'inline'; // Show underscore for other words
            }
            letterCount++;
        }
    }, 100);

    // Toggle underscore visibility, but only when not in "Ctrl+U" mode and not displaying "Creed"
    setInterval(() => {
        if ((!waiting || letterCount > 0) && words[0] !== 'Creed') {
            con.classList.toggle('hidden');
        }
    }, 400);

    function clearLine() {
        target.innerHTML = ''; // Clear the line
        // Cycle to the next word and set color conditionally for "Creed"
        words.push(words.shift());
        setTargetColor(); // Set color based on the next word
        letterCount = 1;
        waiting = false;
        con.style.display = 'inline'; // Reset underscore visibility for the next word
    }

    function setTargetColor() {
        // Set color conditionally: #FAF9F6 for all except "Creed", which is #a54550
        target.style.color = words[0] === 'Creed' ? '#a54550' : '#FAF9F6';
    }
}
