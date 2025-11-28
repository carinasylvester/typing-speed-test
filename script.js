// Paragraphs (source: https://www.gutenberg.org/)

const paragraphs = [
  // Moby Dick - Herman Melville
    "Call me Ishmael. Some years ago - never mind how long precisely - having little or no money in my purse, and nothing particular to interest me on shore, I thought I would sail about a little and see the watery part of the world. It is a way I have of driving off the spleen and regulating the circulation. Whenever I find myself growing grim about the mouth; whenever it is a damp, drizzly November in my soul; whenever I find myself involuntarily pausing before coffin warehouses, and bringing up the rear of every funeral I meet; and especially whenever my hypos get such an upper hand of me, that it requires a strong moral principle to prevent me from deliberately stepping into the street, and methodically knocking people's hats off - then, I account it high time to get to sea as soon as I can. This is my substitute for pistol and ball. With a philosophical flourish Cato throws himself upon his sword; I quietly take to the ship. There is nothing surprising in this. If they but knew it, almost all men in their degree, some time or other, cherish very nearly the same feelings towards the ocean with me.",
  // 'The Odyssey' by Homer
    "Tell me, O Muse, of that ingenious hero who travelled far and wide after he had sacked the famous town of Troy. Many cities did he visit, and many were the nations with whose manners and customs he was acquainted; moreover he suffered much by sea while trying to save his own life and bring his men safely home; but do what he might he could not save his men, for they perished through their own sheer folly in eating the cattle of the Sun-god Hyperion; so the god prevented them from ever reaching home. Tell me, too, about all these things, oh daughter of Jove, from whatsoever source you may know them.",
  // The Wonderful Wizard of Oz - L. Frank Baum
    "Dorothy leaned her chin upon her hand and gazed thoughtfully at the Scarecrow. Its head was a small sack stuffed with straw, with eyes, nose, and mouth painted on it to represent a face. An old, pointed blue hat, that had belonged to some Munchkin, was perched on his head, and the rest of the figure was a blue suit of clothes, worn and faded, which had also been stuffed with straw.",
  // Les Miserables - Victor Hugo
    "One day he heard a criminal case, which was in preparation and on the point of trial, discussed in a drawing-room. A wretched man, being at the end of his resources, had coined counterfeit money, out of love for a woman, and for the child which he had had by her. Counterfeiting was still punishable with death at that epoch. The woman had been arrested in the act of passing the first false piece made by the man. She was held, but there were no proofs except against her. She alone could accuse her lover, and destroy him by her confession.",
  // Don Quixote - Miguel de Cervantes 
    "In short, his wits being quite gone, he hit upon the strangest notion that ever madman in this world hit upon, and that was that he fancied it was right and requisite, as well for the support of his own honour as for the service of his country, that he should make a knight-errant of himself, roaming the world over in full armour and on horseback in quest of adventures, and putting in practice himself all that he had read of as being the usual practices of knights-errant; righting every kind of wrong, and exposing himself to peril and danger from which, in the issue, he was to reap eternal renown and fame.",
  // Le Morte D'Arthur - Thomas Malory
    "Then rode Merlin unto Arthur and the two kings, and told them how he had sped; whereof they had great marvel, that man on earth might speed so soon, and go and come. So Merlin told them ten thousand were in the forest of Bedegraine, well armed at all points. Then was there no more to say, but to horseback went all the host as Arthur had afore purveyed. So with twenty thousand he passed by night and day, but there was made such an ordinance afore by Merlin, that there should no man of war ride nor go in no country on this side Trent water, but if he had a token from King Arthur, where through the king's enemies durst not ride as they did to-fore to espy.",
  // The Time Machine - H. G. Wells
    "I am afraid I cannot convey the peculiar sensations of time travelling. They are excessively unpleasant. There is a feeling exactly like that one has upon a switchback--of a helpless headlong motion! I felt the same horrible anticipation, too, of an imminent smash. As I put on pace, night followed day like the flapping of a black wing. The dim suggestion of the laboratory seemed presently to fall away from me, and I saw the sun hopping swiftly across the sky, leaping it every minute, and every minute marking a day. I supposed the laboratory had been destroyed and I had come into the open air.",
];

// script.js
const typingText = document.querySelector(".typing-text p"),
inpField = document.querySelector(".wrapper .input-field"),
tryAgainBtn = document.querySelector(".content button"),
timeTag = document.querySelector(".time span b"),
mistakeTag = document.querySelector(".mistake span"),
wpmTag = document.querySelector(".wpm span"),
cpmTag = document.querySelector(".cpm span");

let timer,
maxTime = 60,
timeLeft = maxTime,
charIndex = mistakes = isTyping = 0;

function loadParagraph() {
    const ranIndex = Math.floor(Math.random() * paragraphs.length);
    typingText.innerHTML = "";
    paragraphs[ranIndex].split("").forEach(char => {
        let span = `<span>${char}</span>`
        typingText.innerHTML += span;
    });
    typingText.querySelectorAll("span")[0].classList.add("active");
    document.addEventListener("keydown", () => inpField.focus());
    typingText.addEventListener("click", () => inpField.focus());
}

function initTyping() {
    let characters = typingText.querySelectorAll("span");
    let typedChar = inpField.value.split("")[charIndex];
    if(charIndex < characters.length - 1 && timeLeft > 0) {
        if(!isTyping) {
            timer = setInterval(initTimer, 1000);
            isTyping = true;
        }
        if(typedChar == null) {
            if(charIndex > 0) {
                charIndex--;
                if(characters[charIndex].classList.contains("incorrect")) {
                    mistakes--;
                }
                characters[charIndex].classList.remove("correct", "incorrect");
            }
        } else {
            if(characters[charIndex].innerText == typedChar) {
                characters[charIndex].classList.add("correct");
            } else {
                mistakes++;
                characters[charIndex].classList.add("incorrect");
            }
            charIndex++;
        }
        characters.forEach(span => span.classList.remove("active"));
        characters[charIndex].classList.add("active");

        let wpm = Math.round(((charIndex - mistakes)  / 5) / (maxTime - timeLeft) * 60);
        wpm = wpm < 0 || !wpm || wpm === Infinity ? 0 : wpm;
        
        wpmTag.innerText = wpm;
        mistakeTag.innerText = mistakes;
        cpmTag.innerText = charIndex - mistakes;
    } else {
        clearInterval(timer);
        inpField.value = "";
    }   
}

function initTimer() {
    if(timeLeft > 0) {
        timeLeft--;
        timeTag.innerText = timeLeft;
        let wpm = Math.round(((charIndex - mistakes)  / 5) / (maxTime - timeLeft) * 60);
        wpmTag.innerText = wpm;
    } else {
        clearInterval(timer);
    }
}

function resetGame() {
    loadParagraph();
    clearInterval(timer);
    timeLeft = maxTime;
    charIndex = mistakes = isTyping = 0;
    inpField.value = "";
    timeTag.innerText = timeLeft;
    wpmTag.innerText = 0;
    mistakeTag.innerText = 0;
    cpmTag.innerText = 0;
}

loadParagraph();
inpField.addEventListener("input", initTyping);
tryAgainBtn.addEventListener("click", resetGame);
