consoleText(['Hi, You!', 'We are Hackers With Hearts', 'Brought to you with \u2764\uFE0F by', 'Creed', 'Stay tuned! 👀'], 'text');

function consoleText(words, id) {
    var visible = true;
    var letterCount = 1;
    var waiting = false;
    var target = document.getElementById(id);
    var container = document.querySelector('.console-container');
    const segmenter = new Intl.Segmenter(undefined, { granularity: 'grapheme' });

    setTargetColor();

    window.setInterval(function() {
        if (!waiting && letterCount === 0) {
            // Hide cursor when displaying "Ctrl+U"
            container.classList.add('no-cursor');
            waiting = true;
            target.innerHTML = `<span class="key">Ctrl</span>`;
            setTimeout(() => {
                target.innerHTML = `<span class="key">Ctrl</span><span class="key">U</span>`;
                setTimeout(() => {
                    clearLine();
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
            // Display "Creed" all at once in #a54550
            if (words[0] === 'Creed') {
                container.classList.add('no-cursor');
                target.innerHTML = `<a href="https://thecreed.xyz" target="_blank" style="text-decoration: none; color: inherit;"><span class='creed'>Creed</span></a>`;
            } else {
                // Display other words letter by letter
                const characters = Array.from(segmenter.segment(words[0])).map(segment => segment.segment);
                target.innerHTML = characters.slice(0, letterCount).join('');
                container.classList.remove('no-cursor');
            }
            letterCount++;
        }
    }, 100);

    function clearLine() {
        target.innerHTML = '';
        words.push(words.shift());
        setTargetColor();
        letterCount = 1;
        waiting = false;
        container.classList.remove('no-cursor');
    }

    function setTargetColor() {
        target.style.color = words[0] === 'Creed' ? '#a54550' : '#FAF9F6';
    }
}
