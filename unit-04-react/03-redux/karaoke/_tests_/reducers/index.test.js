import * as actions from './../../src/actions';
import constants from './../../src/constants';
import songChangeReducer from './../../src/reducers/songChangeReducer';
import lyricChangeReducer from './../../src/reducers/lyricChangeReducer';
import rootReducer from './../../src/reducers';
import { createStore } from 'redux';

describe('Karaoke App', () => {
  const { initialState, types } = constants;
  const store = createStore(rootReducer, initialState);

  describe('lyricChangeReducer', () => {

    it('Should accept and return initial state', () => {
      expect(lyricChangeReducer(initialState.songsById, { type: null })).toEqual(initialState.songsById);
    });

    it('Should update currently-displayed lyric of song', () => {
      expect(lyricChangeReducer(initialState.songsById, actions.nextLyric(2))[2].arrayPosition).toEqual(initialState.songsById[2].arrayPosition + 1);
    });

    it('Should restart song', () => {
      let currentState = lyricChangeReducer(initialState.songsById, actions.nextLyric(1));
      expect(lyricChangeReducer(currentState, actions.restartSong(1))[1].arrayPosition).toEqual(0);
    });

    it('Should update state when API lyrics are being requested', () => {
      const action = actions.requestSong('crocodile rock');
      const newStateEntry = {
        isFetching: true,
        title: action.title,
        songId: action.songId
      };
      expect(lyricChangeReducer(initialState.songsById, action)[action.songId]).toEqual(newStateEntry);
    });

    it('Should update state on receive song', () => {
      const action = actions.receiveSong('Song Title', 'Artist Name', 0, ['lyric line 1', 'lyric line 2']);
      const newObject = {
        isFetching: false,
        title: action.title,
        artist: action.artist,
        songId: action.songId,
        receivedAt: action.receivedAt,
        songArray: action.songArray,
        arrayPosition: 0
      };
      expect(lyricChangeReducer(initialState.songsById, action)[action.songId]).toEqual(newObject);
    });

  });

  describe('songChangeReducer', () => {

    it('Should accept and return initial state', () => {
      expect(songChangeReducer(initialState.currentSongId, { type: null })).toEqual(initialState.currentSongId);
    });

    it('Should change selectedSong', () => {
      expect(songChangeReducer(initialState.currentSongId, actions.changeSong(2))).toEqual(2);
    });

  });

  describe('rootReducer', () => {

    it('Should accept and return initial state', () => {
      expect(rootReducer(initialState, { type: null })).toEqual(initialState);
    });

    it('Should contain logic from both reducers', () => {
      expect(store.getState().currentSongId).toEqual(songChangeReducer(undefined, { type: null }));
      expect(store.getState().songsById).toEqual(lyricChangeReducer(undefined, { type: null }));
    });

  });

});