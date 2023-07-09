/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = (pgm) => {
  pgm.createTable('user_album_likes', {
    id: {
      type: 'VARCHAR(50)',
      primaryKey: true,
    },
    user_id: {
      type: 'VARCHAR(50)',
      notNull: true,
    },
    album_id: {
      type: 'VARCHAR(50)',
      notNull: true,
    },
  });

  pgm.addConstraint(
    'user_album_likes',
    'fk_user_album_likes.user_id_albums.Id',
    'FOREIGN KEY(user_id) REFERENCES users(Id) ON DELETE CASCADE',
  );
  pgm.addConstraint(
    'user_album_likes',
    'fk_user_album_likes.album_id_albums.Id',
    'FOREIGN KEY(album_id) REFERENCES albums(Id) ON DELETE CASCADE',
  );
};

exports.down = (pgm) => {
  pgm.dropTable('user_album_likes');
};
