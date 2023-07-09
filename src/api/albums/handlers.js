const config = require('../../utils/config');

class AlbumsHandlers {
  constructor(albumsService, songsService, storageService, validator) {
    this._albumsService = albumsService;
    this._songsService = songsService;
    this._storageService = storageService;
    this._validator = validator;
  }

  async postAlbumHandler(request, h) {
    this._validator.validateAlbumPayload(request.payload);
    const { name, year } = request.payload;

    const albumId = await this._albumsService.addAlbum(name, year);

    const response = h.response({
      status: 'success',
      data: {
        albumId,
      },
    });

    response.code(201);
    return response;
  }

  async getAlbumByIdHandler(request) {
    const { id } = request.params;
    const album = await this._albumsService.getAlbumById(id);
    const songs = await this._songsService.getSongsByAlbumId(id);

    return {
      status: 'success',
      data: {
        album: {
          ...album,
          songs,
        },
      },
    };
  }

  async putAlbumByIdHandler(request) {
    this._validator.validateAlbumPayload(request.payload);
    const { id } = request.params;

    await this._albumsService.editAlbumById(id, request.payload);

    return {
      status: 'success',
      message: 'Album has been updated',
    };
  }

  async deleteAlbumByIdHandler(request) {
    const { id } = request.params;
    await this._albumsService.deleteAlbumById(id);

    return {
      status: 'success',
      message: 'Album has been deleted',
    };
  }

  async postAlbumCoverHandler(request, h) {
    const { cover } = request.payload;
    const { id } = request.params;

    this._validator.validateAlbumCover(cover.hapi.headers);
    const filename = await this._storageService.writeFile(cover, cover.hapi);
    const fileLocation = `http://${config.app.host}:${config.app.port}/albums/images/${filename}`;
    await this._albumsService.editAlbumCoverById(id, fileLocation);

    const response = h.response({
      status: 'success',
      message: 'Image has been succesfully uploaded',
      data: {
        fileLocation,
      },
    });
    response.code(201);
    return response;
  }

  async postLikeHandler(request, h) {
    const { id: userId } = request.auth.credentials;
    const { id: albumId } = request.params;

    await this._albumsService.verifyAlbum(albumId);
    await this._albumsService.verifyLike(userId, albumId);
    await this._albumsService.addLike(userId, albumId);

    const response = h.response({
      status: 'success',
      message: 'Like has been added',
    });
    response.code(201);
    return response;
  }

  async deleteLikeHandler(request) {
    const { id: userId } = request.auth.credentials;
    const { id: albumId } = request.params;

    await this._albumsService.deleteLike(userId, albumId);

    return {
      status: 'success',
      message: 'Album has been deleted',
    };
  }

  async getLikesHandler(request, h) {
    const { id: albumId } = request.params;

    const { likes, source } = await this._albumsService.getLikes(albumId);

    const response = h.response({
      status: 'success',
      data: {
        likes,
      },
    });
    response.header('X-Data-Source', source);
    return response;
  }
}

module.exports = AlbumsHandlers;
