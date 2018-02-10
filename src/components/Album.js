import React, { Component } from 'react';
import albumData from './../data/album';
import PlayerBar from './PlayerBar';

class Album extends Component {
  constructor(props) {
    super(props);
    const album = albumData.find( album => {
      return album.slug === this.props.match.params.slug
    });

    this.state = {
      album: album,
      currentSong: album.songs[0],
      isPlaying: false
    };

    this.audioElement = document.createElement('audio');
    this.audioElement.src = album.songs[0].audioSrc;
    console.log(this.audioElement);
  }

  play() {
    this.audioElement.play();
    this.setState({ isPlaying: true });
  }

  pause() {
    this.audioElement.pause();
    this.setState({ isPlaying: false });
  }

  setSong(song) {
    this.audioElement.src = song.audioSrc;
    this.setState({ currentSong: song });
  }

  handleSongClick(song) {
    const isSameSong = this.state.currentSong === song;
    if (this.state.isPlaying && isSameSong) {
      this.pause();
    } else {
      if (!isSameSong) { this.setSong(song); }
      this.play();
    }
  }

  handlePrevClick() {
    const currentIndex = this.state.album.songs.findIndex(song => this.state.currentSong === song);
    const newIndex = Math.max(0, currentIndex - 1);
    const newSong = this.state.album.songs[newIndex];
    this.setSong(newSong);
    this.play(newSong);
  }

  handleNextClick () {
    const indexNow = this.state.album.songs.findIndex(song => this.state.currentSong === song);
    const lastSong= this.state.album.songs.length - 1;
    const nextIndex = Math.min(indexNow + 1, lastSong) ;
    const nextSong= this.state.album.songs[nextIndex];
    this.setSong(nextSong);
    this.play(nextSong);
  }

  render() {
    return (
      <section className="album">
        <section id="album-info">
          <img id="album-cover-art" alt='' src={this.state.album.albumCover} />
          <div className="album-details">
            <h1 id="album-title">{this.state.album.title}</h1>
            <h2 className="artist">{this.state.album.artist}</h2>
            <div id="release-info">{this.state.album.releaseInfo}</div>
          </div>
        </section>
        <br />
        <section>
          <table id="song-list" align="center">
            <colgroup>
              <col id="song-number-column" />
              <col id="song-title-column" />
              <col id="song-duration-column" />
            </colgroup>
            <tbody>
              <tr>
                <th>Track</th>
                <th>Song</th>
                <th>Duration</th>
                <th></th>
              </tr>

              {this.state.album.songs.map( (song, index) =>
                <tr className="song" key={index} onClick={() => this.handleSongClick(song)} >
                  <td className="song-track">{index + 1}</td>
                  <td className="song-title">{song.title}</td>
                  <td className="song-duration">{song.duration}</td>
                  <td className="song-actions">
                    <button>
                      {/* <span className="song-number">{index+1}</span> */}
                      <span className="ion-ios-play"></span>
                      <span className="ion-ios-pause"></span>
                    </button>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
          <PlayerBar
             isPlaying={this.state.isPlaying}
             currentSong={this.state.currentSong}
             handleSongClick={() => this.handleSongClick(this.state.currentSong)}
             handlePrevClick={() => this.handlePrevClick()}
             handleNextClick={() => this.handleNextClick()}
           />
         </section>
        <br />

      </section>
    );
  }
}

export default Album;
