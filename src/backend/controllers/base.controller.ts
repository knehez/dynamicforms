import { Repository } from 'typeorm';

abstract class BaseCtrl {

  abstract model: Repository<any>;

  // Get all
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
    const entity = await this.model.save(req.body);
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
