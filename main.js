var music_rnn;
function load(a, b) {
    music_rnn = new mm.MusicRNN('https://storage.googleapis.com/magentadata/js/checkpoints/music_rnn/'+b);
    music_rnn.initialize();
    music_vae = new mm.MusicVAE('https://storage.googleapis.com/magentadata/js/checkpoints/music_vae/'+a);
    music_vae.initialize();
}

function viz(x) {
    var viz = new mm.Visualizer(x, document.getElementById('canvas'));

    vizPlayer = new mm.Player(false, {
        run: (note) => viz.redraw(note),
        stop: () => {console.log('done');}
    });
}

//music_rnn = new mm.MusicRNN('melody_rnn');
//music_rnn.initialize();

rnnPlayer = new mm.Player();

var sx;

function play(x, steps, temperature) {
    const qns = mm.sequences.quantizeNoteSequence(x, 4);
    music_rnn
    .continueSequence(qns, steps, temperature)
    .then(function (sample) {
        viz(sample)
        sx = sample;
        rnnPlayer.start(sample);
    });
}

var replay = function () {
    rnnPlayer.start(sx)
}

//music_vae = new mm.MusicVAE('https://storage.googleapis.com/magentadata/js/checkpoints/music_vae/groovae_2bar_humanize');
//music_vae.initialize();

vaePlayer = new mm.Player();

function playVAE(steps, temp) {
    music_vae
    .sample(1, temp||1.5)
    .then(function (sample) {
      play(sample[0], steps, temp||1.5)
    });
}

document.getElementById("load").addEventListener("click", function () {
    var vaeSrc = document.getElementById("vae").value;
    var rnnSrc = document.getElementById("rnn").value;
    load(vaeSrc, rnnSrc);
});

document.getElementById("play").addEventListener("click", function () {
    var steps = parseInt(document.getElementById("steps").value);
    var temp = parseInt(document.getElementById("temp").value);
    playVAE(steps, temp);
});
