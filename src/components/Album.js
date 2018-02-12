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
      currentTime: 0,
      duration: album.songs[0].duration,
      isPlaying: false,
      volume: .90
    };

    this.audioElement = document.createElement('audio');
    this.audioElement.src = album.songs[0].audioSrc;
    console.log(this.audioElement.volume);
  }

  componentDidMount() {
    this.eventListeners = {
      timeupdate: e => {
        this.setState({ currentTime: this.audioElement.currentTime });
      },
      durationchange: e => {
        this.setState({ duration: this.audioElement.duration });
      },
      volumechange: e => {
        this.setState({ volume: this.audioElement.volume });
      }
    };
    this.audioElement.addEventListener('timeupdate', this.eventListeners.timeupdate);
    this.audioElement.addEventListener('durationchange', this.eventListeners.durationchange);
    this.audioElement.addEventListener('volumechange', this.eventListeners.volumechange);
  }

  componentWillUnmount() {
    this.audioElement.src = null;
    this.audioElement.removeEventListener('timeupdate', this.eventListeners.timeupdate);
    this.audioElement.removeEventListener('durationchange', this.eventListeners.durationchange);
    this.audioElement.removeEventListener('volumechange', this.eventListeners.volumechange);
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

  handleTimeChange(e) {
    const newTime = this.audioElement.duration * e.target.value;
    this.audioElement.currentTime = newTime;
    this.setState({ currentTime: newTime });
  }

  handleVolumeChange(e) {
    const newVolume = e.target.value;
    this.audioElement.volume = newVolume;
    this.setState({ volume: newVolume });
  }

  formatTime(time) {
  return time ? `${Math.floor(time / 60)}:${Number(time % 60 / 100).toFixed(2).substr(2,3)}` : '-:--'
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
             volume={this.state.volume}
             currentTime={this.audioElement.currentTime}
             duration={this.audioElement.duration}
             formatTime={(t) => this.formatTime(t)}
             handleSongClick={() => this.handleSongClick(this.state.currentSong)}
             handlePrevClick={() => this.handlePrevClick()}
             handleNextClick={() => this.handleNextClick()}
             handleTimeChange={(e) => this.handleTimeChange(e)}
             handleVolumeChange={(e) => this.handleVolumeChange(e)}
           />
         </section>
        <br />

      </section>
    );
  }
}

export default Album;
