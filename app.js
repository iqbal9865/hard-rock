const searchSong = () => {
    const searchField = document.getElementById('search-field').value;
    const url = `https://api.lyrics.ovh/suggest/${searchField}`;
    fetch(url)
        .then(res => res.json())
        .then(data => displaySong(data.data))
}
const displaySong = songs => {
    const listContainer = document.getElementById('list-container');
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
const getLyrics = (artist, songTitle) => {
    console.log(artist,songTitle);
}