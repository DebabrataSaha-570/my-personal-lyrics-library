// ............ data load form website using async and await ........

// const searchSong = async() => {
    
//     const searchText = document.getElementById('search-field').value
   
//     const url = `https://api.lyrics.ovh/suggest/${searchText}`
//     const response = await fetch(url)
//     const json = await  response.json()
//         displaySong(json.data)
// }

// ............ data load from website using fetch .......

const searchSong = () => {
    
    const searchText = document.getElementById('search-field').value
   
    const url = `https://api.lyrics.ovh/suggest/${searchText}`
    fetch(url)
        .then(response => response.json())
        .then(json => displaySong(json.data))
        .catch(error => displayError('Something went wrong!! please try again later'))
}

const displaySong = songs => {
    const songContainer = document.getElementById('song-container')
    console.log(songs)
    songContainer.innerHTML = '';
    for (let i = 0; i < songs.length; i++) {
        const element = songs[i];
        console.log(element.title)
        const songDiv = document.createElement('div')
        songDiv.className = 'single-result row align-items-center my-3 p-3'
        songDiv.innerHTML = `
        <div class="col-md-9">
             <h3 class="lyrics-name">${element.title}</h3>
                <p class="author lead">Album by <span>${element.artist.name}</span></p>
                <audio controls>
                    <source src="${element.preview}">
                    
                </audio>
            </div>
             <div class="col-md-3 text-md-right text-center">
            <button onClick="displayLyrics('${element.artist.name}','${element.title}')" class="btn btn-success">Get Lyrics</button>
            </div>
        `
        songContainer.appendChild(songDiv)

    }
}
// const displayLyrics = async (artist, title) => {
//     // console.log(artist, title)
//     const url = `https://api.lyrics.ovh/v1/${artist}/${title}`
//     try{
        
//         const response = await fetch(url)
//            const json = await response.json()
//              displayLyricsInfo(json.lyrics)
//     }
//     catch(error){
//         displayError("Something went wrong to load lyrics!! Please try again later" )
//         // displayError(error )
//     }
    
// }




const displayLyrics = (artist, title) => {
    // console.log(artist, title)
    const url = `https://api.lyrics.ovh/v1/${artist}/${title}`
    fetch(url)
        .then(response => response.json())
        .then(json => displayLyricsInfo(json.lyrics))
        .catch(error => displayError(error))
}
const displayLyricsInfo = lyrics => {
    const lyricsDiv = document.getElementById('song-lyrics')
    lyricsDiv.innerText = lyrics
}

const displayError = error => {
    const errorTag = document.getElementById('error-message')
    errorTag.innerText = error
}