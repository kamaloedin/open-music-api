/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = (pgm) => {
  pgm.addConstraint(
    'songs',
    'fk_songs.album_id_albums.Id',
    'FOREIGN KEY(album_id) REFERENCES albums(Id) ON DELETE CASCADE',
  );
};

exports.down = (pgm) => {
  pgm.dropConstraint('songs', 'fk_songs.album_id_albums.Id');
};
