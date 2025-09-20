import { getRepository } from 'typeorm';
import BaseCtrl from './base.controller';
import { Project } from '../entities/project';
import * as fs from 'fs';
import Jimp from 'jimp';
import * as mime from 'mime-types';

export default class ProjectCtrl extends BaseCtrl {
    model = getRepository(Project);
    baseDirObj = {
      dir: process.env.FILE_PATH + 'project/',
      thumbnailsDir: process.env.THUMBNAIL_PATH + 'project/' ,
      fileDataField: 'fileData'
    };

    // Returns a file as base64 string
    file = async (req, res) => {
        const entity = await this.model.findOne(req.body.id);

        const dataObj = {};

        dataObj['name'] = entity[this.baseDirObj['fileDataField']];
        dataObj['data'] = await this.fileReader(entity, req.body.size, this.baseDirObj);

        res.send(dataObj);
    }

    getAll = async (req, res) => {
        let param = {};

        const order = {
          id: 'DESC'
        };

        try {
          param = JSON.parse(req.query.param);
        } catch (e) {

        }

        if (param === '') {
          param = { order: order };
        } else {
          param['order'] = order;
        }

        const post = await this.model.find(param);

        if (!post) {
          res.status(404);
          res.end();
          return;
        }

        // Temporary solution
        const newModel = [];
        for (const entity of post) {
          entity.fileData = await this.fileReader(entity, 'thumbnail', this.baseDirObj);
          newModel.push(entity);
        }

        res.send(newModel);
    }

    insert = async (req, res) => {
        const entity = this.model.create(req.body);
        let fileData: any;

        if (req.body[this.baseDirObj['fileDataField']]) {
          fileData = req.body[this.baseDirObj['fileDataField']];
          entity[this.baseDirObj['fileDataField']] = fileData['name'];
        }

        await this.model.save(entity);
        res.send({ id: entity['id'] });

        await this.fileWriter(entity['id'], fileData, this.baseDirObj);
        await this.createThumbnail(entity['id'], fileData, this.baseDirObj);
    }

    update = async (req, res) => {
        const entityToRemove = await this.model.findOne(req.body.id);
        await this.fileRemover(entityToRemove, this.baseDirObj);
        let fileData: any;

        if (req.body[this.baseDirObj['fileDataField']]) {
          fileData = req.body[this.baseDirObj['fileDataField']];
          req.body[this.baseDirObj['fileDataField']] = fileData['name'];
        }

        const entity = await this.model.save(req.body);
        res.send({ id: entity['id'] });

        await this.fileWriter(entity['id'], fileData, this.baseDirObj);
        await this.createThumbnail(entity['id'], fileData, this.baseDirObj);
    }

    delete = async (req, res) => {
        const entity = await this.model.findOne(req.params.id);

        await this.fileRemover(entity, this.baseDirObj);

        await this.model.remove(entity);
        res.send();
    }

    // Read file from directory
    async fileReader(entity, size, objDir) {
        const dir = objDir['dir'];
        const thumbnailDir = objDir['thumbnailsDir'];

        const fileName = entity['id'] + '_' + entity[objDir['fileDataField']];
        const fileNameEntity = entity[objDir['fileDataField']];

        if (fileNameEntity !== null && fileNameEntity !== undefined && fileNameEntity !== '') {
          const fileType = mime.lookup(dir + fileName);
          let completePath = dir + fileName;

          if (size === 'thumbnail' && fileType.split('/')[0] === 'image') {
            completePath = thumbnailDir + fileName;
          }

          if (size === 'thumbnail' && fileType.split('/')[0] !== 'image') {
            return 'data:' + fileType + ';base64,' + 'filePlaceHolder';
          }

          let data = '';

          try {
            data = fs.readFileSync(completePath, { encoding: 'Base64'});
          } catch (err) {
            console.log(err);
          }

          return 'data:' + fileType + ';base64,' + data;
        }
        return null;
    }

    // Remove files from directory
    async fileRemover(entity, objDir) {
        const dir = objDir['dir'];
        const thumbnailDir = objDir['thumbnailsDir'];
        const fileName = entity['id'] + '_' + entity[objDir['fileDataField']];

        const completePath = dir + fileName;
        const thPath = thumbnailDir + fileName;
        try {
            if (fs.existsSync(completePath)) {
                fs.unlinkSync(completePath);
            }
            if (fs.existsSync(thPath)) {
                fs.unlinkSync(thPath);
            }
          } catch (err) {
            console.error(err);
          }
    }

    // Writes file to directory
    async fileWriter(id, file, objDir) {
        const dir = objDir['dir'];
        const fileName = id + '_' + file['name'];
        const fileData = file['data'];

        // check if uploads/project directory exists
        if (!fs.existsSync(dir)) {
          try {
            fs.mkdirSync(dir);
          } catch (err) {
            if (err.code !== 'EEXIST') { throw err; }
          }
        }

        if (fileData !== null) {
          const data = fileData.split(',')[1];
          try {
              fs.writeFileSync(dir + fileName, new Buffer(data, 'base64'));
          } catch (err) {
              console.log(err);
          }
        }
    }

    // Creates thumbnail if file is image image
    createThumbnail(id, file, objDir) {
      const dir = objDir['dir'];
      const thumbnailDir = objDir['thumbnailsDir'];
      const fileName = id + '_' + file['name'];

      // check if thumbnais/project dir exists, if not then it creates one
      if (!fs.existsSync(thumbnailDir)) {
        try {
          fs.mkdirSync(thumbnailDir);
        } catch (err) {
          if (err.code !== 'EEXIST') { throw err; }
        }
      }

      if (mime.lookup(dir + fileName).split('/')[0] === 'image') {
        Jimp.read(dir + fileName)
        .then(img => {
            return img
            .resize(200, Jimp.AUTO) // resize
            .write(thumbnailDir + fileName); // save
        })
        .catch(err => {
          console.error(err);
        });
    }
  }
}
