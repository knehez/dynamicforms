import { Repository } from 'typeorm';

abstract class BaseCtrl {

  abstract model: Repository<any>;

  // Get all
  getAll = async (req, res) => {
    const post = await this.model.find();

    if (!post) {
      res.status(404);
      res.end();
      return;
    }

    res.send(post);
  }

  // Insert
  insert = async (req, res) => {
    const entity = this.model.create(req.body);
    await this.model.save(entity);
    res.send({ id: entity['id'] });
  }

  // Get by id
  get = async (req, res) => {
    const post = await this.model.findOne(req.params.id);

    if (!post) {
      res.status(404);
      res.end();
      return;
    }

    res.send(post);
  }

  // Update by id
  update = async (req, res) => {
    const entity = await this.model.findOne(req.params.id);
    await this.model.update(entity, req.body);
    res.send({ id: entity['id'] });
  }

  // Delete by id
  delete = async (req, res) => {
    const entity = await this.model.findOne(req.params.id);
    await this.model.remove(entity);
    res.send();
  }
}

export default BaseCtrl;
