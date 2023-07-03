const { nanoid } = require('nanoid');
const { Pool } = require('pg');
const InvariantError = require('../../exceptions/InvariantError');
const NotFoundError = require('../../exceptions/NotFoundError');
const { mapDBToModel } = require('../../utils');

class SongsService {
  constructor() {
    this._pool = new Pool();
  }

  async addSong({ title, year, performer, genre, duration, albumId }) {
    const id = `song-${nanoid(16)}`;

    const query = {
      text: 'INSERT INTO songs VALUES($1, $2, $3, $4, $5, $6, $7) RETURNING id',
      values: [id, title, year, performer, genre, duration, albumId],
    };

    const result = await this._pool.query(query);

    if (!result.rows.length) {
      throw new InvariantError('Failed to add new song');
    }

    return result.rows[0].id;
  }

  async getSongs(title, performer) {
    const query1 = {
      text: 'SELECT id, title, performer FROM songs',
      values: [],
    };

    const query2 = {
      text: 'SELECT id, title, performer FROM songs WHERE LOWER(title) LIKE $1 AND LOWER(performer) LIKE $2',
      values: [`%${title}%`, `%${performer}%`],
    };

    const query3 = {
      text: 'SELECT id, title, performer FROM songs WHERE LOWER(title) LIKE $1',
      values: [`%${title}%`],
    };

    const query4 = {
      text: 'SELECT id, title, performer FROM songs WHERE LOWER(performer) LIKE $1',
      values: [`%${performer}%`],
    };

    if (title && performer) {
      const result = await this._pool.query(query2);
      return result.rows;
    }

    if (title) {
      const result = await this._pool.query(query3);
      return result.rows;
    }

    if (performer) {
      const result = await this._pool.query(query4);
      return result.rows;
    }

    const result = await this._pool.query(query1);
    return result.rows;
  }

  async getSongById(id) {
    const query = {
      text: 'SELECT * FROM songs WHERE id = $1',
      values: [id],
    };

    const result = await this._pool.query(query);

    if (!result.rows.length) {
      throw new NotFoundError('Song cannot be found');
    }

    return result.rows.map(mapDBToModel)[0];
  }

  async editSongById(id, { title, year, performer, genre, duration, albumId }) {
    const query = {
      text: 'UPDATE songs SET title = $1, year = $2, performer = $3, genre = $4, duration = $5, album_id = $6 WHERE id = $7 RETURNING id',
      values: [title, year, performer, genre, duration, albumId, id],
    };

    const result = await this._pool.query(query);

    if (!result.rows.length) {
      throw new NotFoundError('Failed to update song, Id cannot be found');
    }
  }

  async deleteSongById(id) {
    const query = {
      text: 'DELETE FROM songs WHERE id = $1 RETURNING id',
      values: [id],
    };

    const result = await this._pool.query(query);

    if (!result.rows.length) {
      throw new NotFoundError('Failed to delete song, Id cannot be found');
    }
  }

  async getSongsByAlbumId(id) {
    const query = {
      text: 'SELECT id, title, performer FROM songs WHERE album_id = $1',
      values: [id],
    };

    const result = await this._pool.query(query);

    return result.rows;
  }

  async getSongsByPlaylistId(id) {
    const query = {
      text: `SELECT s.id, s.title, s.performer
      FROM playlist_songs ps
      LEFT JOIN songs s ON ps.song_id = s.id
      WHERE playlist_id = $1`,
      values: [id],
    };

    const result = await this._pool.query(query);

    return result.rows;
  }
}

module.exports = { SongsService };
