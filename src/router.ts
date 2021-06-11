import express, { Request, Response } from 'express';
import DAO from './dao';
import { Tec } from './model/Tec';

const router = express.Router();
const dao: DAO = new DAO();

router.get('/', function (req: Request, res: Response) {
  let tecs: Tec[] = dao.listTecs();
  res.render(__dirname + '/pages/index.ejs', { tecs });
});

router.get('/create', function (req: Request, res: Response) {
  res.render(__dirname + '/pages/cadastro.ejs');
});

router.get('/update', function (req: Request, res: Response) {
  let tec: Tec = JSON.parse(String(req.query.tec));
  res.render(__dirname + '/pages/update.ejs', { tec });
});

router.post('/tecs/create', function (req: Request, res: Response) {
  let tec: Tec = new Tec("", req.body.name, req.body.cor, req.body.comp, parseFloat(req.body.vm));
  dao.createTec(tec);
  res.redirect('/create');
});

router.post('/tecs/update', function (req: Request, res: Response) {
  let tec: Tec = new Tec(req.body.id, req.body.name, req.body.cor, req.body.comp, parseFloat(req.body.vm.replace(',', '.')));
  dao.updateTec(tec);
  res.redirect('/');
});

router.post('/tecs/delete', function (req: Request, res: Response) {
  let tec: Tec = JSON.parse(req.body.tec);
  dao.deleteTec(tec.id);
  res.redirect('/');
});
export default router;