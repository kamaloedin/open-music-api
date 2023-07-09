const mapDBToModel = ({ id, title, year, performer, genre, duration, album_id }) => ({
  id,
  title,
  year,
  performer,
  genre,
  duration,
  albumId: album_id,
});

const mapDBAlbumToModel = ({ id, name, year, cover_url }) => ({
  id,
  name,
  year,
  coverUrl: cover_url,
});

module.exports = { mapDBToModel, mapDBAlbumToModel };
