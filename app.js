const searchSong = () => {
    const searchField = document.getElementById('search-field').value;
    const url = `https://api.lyrics.ovh/suggest/${searchField}`;
    fetch(url)
        .then(res => res.json())
        .then(data => displaySong(data.data))
        .catch(error => displayError('Result Not Found! Please Try Again Letter!'));
}
const displaySong = songs => {
    const listContainer = document.getElementById('list-container');
    listContainer.innerHTML = '';
    songs.forEach(song => {
        console.log(song)
        const div = document.createElement('div');
        div.className = "single-result row align-items-center my-3 p-3";
        div.innerHTML = `
            <div class="col-md-9">
                <h3 class="lyrics-name">${song.title}</h3>
                <p class="author lead">Album by <span>${song.artist.name}</span></p>
                <audio controls>
                
                <source src="${song.preview}" type="audio/mpeg">
               
                </audio>
            </div>
            <div class="col-md-3 text-md-right text-center">
                <button onclick="getLyrics('${song.artist.name}','${song.title}')" class="btn btn-success">Get Lyrics</button>
            </div>
        `;
        listContainer.appendChild(div);
    });
}
const getLyrics = async (artist, songTitle) => {
    const url = `https://api.lyrics.ovh/v1/${artist}/${songTitle}`;

    try {
        const res = await fetch(url);
        const data = await res.json();
        displayLyrics(data.lyrics);
    }
    catch{
        displayError('Sorry! Failed To Load Lyrics!!');
    }

}
const displayLyrics = lyrics => {
    const singleLyrics = document.getElementById('singleLyrics');
    singleLyrics.innerText = '';
    singleLyrics.innerText = lyrics;

}
const displayError = error => {
    const errorTag = document.getElementById('display-error');
    errorTag.innerText = error;
}