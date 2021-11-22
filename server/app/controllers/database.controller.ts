import { NextFunction, Request, Response, Router } from "express";
import { inject, injectable } from "inversify";
import * as pg from "pg";

import { Animal } from '../../../common/tables/Animal';
import { Clinique } from '../../../common/tables/Clinique';
import { CliniquePks } from '../../../common/tables/HotelPK';
import { Personnel } from '../../../common/tables/Personnel';
import { DatabaseService } from "../services/database.service";
import Types from "../types";
import { ProprietairePK } from '../../../common/tables/ProprietairePKs';
//import { Traitement } from '../../../common/tables/Traitement';
import { Prescription } from '../../../common/tables/Prescription';
import { AnimalPk } from '../../../common/tables/AnimalPks';
import { Proprietaire } from '../../../common/tables/Proprietaire';

@injectable()
export class DatabaseController {
  public constructor(
    @inject(Types.DatabaseService) private databaseService: DatabaseService
  ) {}

  public get router(): Router {
    const router: Router = Router();

    // ======= Clinique ROUTES =======
    // ex http://localhost:3000/database/Clinique?CliniqueNb=3&name=LeGrandClinique&city=laval
    router.get("/cliniques", (req: Request, res: Response, _: NextFunction) => {
      const Noclinique = req.params.Noclinique ? req.params.Noclinique : "";
      const adresse = req.params.adresse ? req.params.adresse : "";
      const numTelephone = req.params.NumTelephone ? req.params.NumTelephone : "";
      const numTelecopie = req.params.NumTelecopie ? req.params.NumTelecopie : "";

      this.databaseService
        .filterCliniques(Noclinique, adresse, numTelephone, numTelecopie)
        .then((result: pg.QueryResult) => {
          const cliniques: Clinique[] = result.rows.map((clinique: any) => ({
            adresse: clinique.adresse,
            Noclinique: clinique.noclinique,
            NumTelephone: clinique.numtelephone,
            NumTelecopie : clinique.numtelecopie
          })
          );
          res.json(cliniques);

        })
        .catch((e: Error) => {
          console.error(e.stack);
        });
    });

    router.get(
      "/cliniques/Noclinique",
      (req: Request, res: Response, _: NextFunction) => {
        const Noclinique = req.params.Noclinique ? req.params.Noclinique : "";
        this.databaseService
          .getCliniqueNamesByNos(Noclinique)
          .then((result: pg.QueryResult) => {
            const keys: CliniquePks[] = result.rows.map((key: any) => ({
              Noclinique: key.noclinique
            }));

            res.json(keys);
          })

          .catch((e: Error) => {
            console.error(e.stack);
          });
      }
    );

    router.post(
      "/cliniques/insert",
      (req: Request, res: Response, _: NextFunction) => {
        const clinique: Clinique = {
          Noclinique: req.body.Noclinique,
          adresse: req.body.adresse,
          NumTelephone: req.body.NumTelephone,
          NumTelecopie: req.body.NumTelecopie,
        };

        this.databaseService
          .createClinique(clinique)
          .then((result: pg.QueryResult) => {
            res.json(result.rowCount);
          })
          .catch((e: Error) => {
            console.error(e.stack);
            res.json(-1);
          });
      }
    );

    router.post(
      "/cliniques/delete/:CliniqueNb",
      (req: Request, res: Response, _: NextFunction) => {
        const CliniqueNb: string = req.params.CliniqueNb;
        this.databaseService
          .deleteClinique(CliniqueNb)
          .then((result: pg.QueryResult) => {
            res.json(result.rowCount);
          })
          .catch((e: Error) => {
            console.error(e.stack);
          });
      }
    );

    router.put(
      "/cliniques/update",
      (req: Request, res: Response, _: NextFunction) => {
        const clinique: Clinique = {
          Noclinique: req.body.Cliniquenb,
          adresse: req.body.adresse ? req.body.adresse : "",
          NumTelephone: req.body.NumTelephone ? req.body.NumTelephone : "",
          NumTelecopie: req.body.NumTelecopie ? req.body.NumTelecopie : "",
        };

        this.databaseService
          .updateClinique(clinique)
          .then((result: pg.QueryResult) => {
            res.json(result.rowCount);
          })
          .catch((e: Error) => {
            console.error(e.stack);
          });
      }
    );

    // ======= PersonnelS ROUTES =======
    router.get("/personels", (req: Request, res: Response, _: NextFunction) => {

      this.databaseService
        .getAllStaff()
        .then((result: pg.QueryResult) => {
          const personels: Personnel[] = result.rows.map((personel: any) => ({
            NoPersonnel : personel.nopersonnel,
            Noclinique : personel.noclinique,
            nom : personel.nom,
            adresse : personel.adresse,
            NumTelephone : personel.numtelephone,
            DateNaissance : personel.datenaissance,
            sex       : personel.sex,
            NAS : personel.nas,
            salaire: personel.salaire ,
            fonction : personel.fonction
          }));
          res.json(personels);
        })
        .catch((e: Error) => {
          console.error(e.stack);
        });
    });

    router.get("/personels/:Noclinique", (req: Request, res: Response, _: NextFunction) => {
      const Noclinque = req.params.Noclinique;
      this.databaseService
      .filterStaff(Noclinque)
      .then((result: pg.QueryResult) => {
        const personels: Personnel[] = result.rows.map((personel: any) => ({
          NoPersonnel : personel.nopersonnel,
          Noclinique : personel.noclinique,
          nom : personel.nom,
          adresse : personel.adresse,
          NumTelephone : personel.numtelephone,
          DateNaissance : personel.datenaissance,
          sex       : personel.sexe,
          NAS : personel.nas,
          salaire: personel.salaire ,
          fonction : personel.fonction
        }));
        res.json(personels);
        console.log(personels);
        })
        .catch((e: Error) => {
          console.error(e.stack);
        });
    });

    router.post(
      "/personels/insert",
      (req: Request, res: Response, _: NextFunction) => {
        const personel: Personnel = {
          NoPersonnel : req.body.NoPersonnel,
          Noclinique : req.body.Noclinique,
          nom : req.body.nom,
          adresse : req.body.adresse,
          NumTelephone : req.body.NumTelephone,
          DateNaissance : req.body.DateNaissance,
          sex       : req.body.sex,
          NAS : parseInt(req.body.NAS),
          salaire: parseInt(req.body.salaire) ,
          fonction : req.body.fonction
        };

        this.databaseService
          .createPersonnel(personel)
          .then((result: pg.QueryResult) => {
            res.json(result.rowCount);
          })
          .catch((e: Error) => {
            console.error(e.stack);
            res.json(-1);
          });
      }
    );

    router.put(
      "/personels/update",
      (req: Request, res: Response, _: NextFunction) => {
        const personel: Personnel = {
          NoPersonnel : req.body.NoPersonnel,
          Noclinique : req.body.Noclinique,
          nom : req.body.nom,
          adresse : req.body.adresse,
          NumTelephone : req.body.NumTelephone,
          DateNaissance : req.body.DateNaissance,
          sex       : req.body.sex,
          NAS : parseInt(req.body.NAS),
          salaire: parseInt(req.body.salaire) ,
          fonction : req.body.fonction
        };
        console.log(personel);
        this.databaseService
          .updatePersonel(personel)
          .then((result: pg.QueryResult) => {
            res.json(result.rowCount);
          })
          .catch((e: Error) => {
            console.error(e.stack);
            res.json(-1);
          });
      }
    );

    router.post(
      "/personels/delete/:Noclinique/:Nopersonnel",
      (req: Request, res: Response, _: NextFunction) => {
        const Noclinique: string = req.params.Noclinique;
        const Nopersonnel: string = req.params.Nopersonnel;
        console.log(req.params.Noclinique);

        this.databaseService
          .deletePersonnel(Noclinique, Nopersonnel)
          .then((result: pg.QueryResult) => {
            res.json(result.rowCount);
          })
          .catch((e: Error) => {
            console.error(e.stack);
            res.json(-1);
          });
      }
    );

    router.get("/animals", (req: Request, res: Response, _: NextFunction) => {
      this.databaseService.getAllAnimals().then((result: pg.QueryResult) => {
        const animals: Animal[] = result.rows.map((animal: any) => ({
          noanimal: animal.noanimal,
          nom: animal.nom,
          noproprietaire: animal.noproprietaire,
          noclinique: animal.noclinique,
          dateinscription: animal.dateinscription,
          datedenaissance: animal.datedenaissance,
          type: animal.type,
          etat: animal.etat,
          poids: animal.poids,
          taille: animal.taille,
          espece: animal.espece,
          description: animal.description,
        }));
        res.json(animals);
     });
    });

    router.get("/animals/:Noclinique/:Noproprietaire", (req: Request, res: Response, _: NextFunction) => {

      const Noclinique: string = req.params.Noclinique;
      const Nopersonnel: string = req.params.Noproprietaire;
      this.databaseService.getAnimalByKeys(Noclinique,Nopersonnel).then((result: pg.QueryResult) => {
        const animals: Animal[] = result.rows.map((animal: any) => ({
          noanimal: animal.noanimal,
          nom: animal.nom,
          noproprietaire: animal.noproprietaire,
          noclinique: animal.noclinique,
          dateinscription: animal.dateinscription,
          datedenaissance: animal.datedenaissance,
          type: animal.type,
          etat: animal.etat,
          poids: animal.poids,
          taille: animal.taille,
          espece: animal.espece,
          description: animal.description,
        }));
        res.json(animals);
     });
    });

    router.get("/animals/:nom", (req: Request, res: Response, _: NextFunction) => {

      const nom: string = req.params.nom;
      this.databaseService.getAnimalsByName(nom).then((result: pg.QueryResult) => {
        const animals: Animal[] = result.rows.map((animal: any) => ({
          noanimal: animal.noanimal,
          nom: animal.nom,
          noproprietaire: animal.noproprietaire,
          noclinique: animal.noclinique,
          dateinscription: animal.dateinscription,
          datedenaissance: animal.datedenaissance,
          type: animal.type,
          etat: animal.etat,
          poids: animal.poids,
          taille: animal.taille,
          espece: animal.espece,
          description: animal.description,
        }));
        res.json(animals);
     });
    });
    router.post(
      "/animals/delete/:NoAnimal/:Noclinique/:NoProprietaire",
      (req: Request, res: Response, _: NextFunction) => {
        const Noclinique: string = req.params.Noclinique;
        const NoProprietaire: string = req.params.NoProprietaire;
        const NoAnimal: string = req.params.NoAnimal;
        console.log(req.params.Noclinique);

        this.databaseService
          .deleteAnimal(Noclinique, NoProprietaire,NoAnimal)
          .then((result: pg.QueryResult) => {
            res.json(result.rowCount);
          })
          .catch((e: Error) => {
            console.error(e.stack);
            res.json(-1);
          });
      }
    );

    router.get("/proprietaires/Noproprietaire", (req: Request, res: Response, _: NextFunction) => {
      this.databaseService.getProprietairePks()
        .then((resultat: pg.QueryResult) => {
          const Nums: ProprietairePK[] = resultat.rows.map((proprietairepk: any) => ({
            Noproprietaire:proprietairepk.noproprietaire
          }))
          res.json(Nums);
        }).catch((e: Error) => {
          console.error(e.stack);
        });
    });

    router.get("/proprietaires/:Noanimal/:Noclinique", (req: Request, res: Response, _: NextFunction) => {

      const noanimal = req.params.Noanimal
      const noclinique = req.params.Noclinique
      this.databaseService.getProprietaires(noanimal,noclinique)
        .then((resultat: pg.QueryResult) => {
          const proprietaires: Proprietaire[] = resultat.rows.map((proprietaire: Proprietaire) => ({
            noclinique: proprietaire.noclinique,
            adresse: proprietaire.adresse,
            numtelephone: proprietaire.numtelephone,
            noproprietaire: proprietaire.noproprietaire,
            nom: proprietaire.nom
          }))
          res.json(proprietaires);
        }).catch((e: Error) => {
          console.error(e.stack);
        });
    });


    router.post(
      "/animals/insert",
      (req: Request, res: Response, _: NextFunction) => {
        const animal: Animal = {
          noanimal : req.body.NoAnimal,
          noclinique: req.body.Noclinique,
          noproprietaire:req.body.NoProprietaire,
          nom : req.body.Nom,
          type : req.body.type,
          espece : req.body.espece,
          datedenaissance : req.body.DatedeNaissance,
          dateinscription       : req.body.DateInscription,
          taille : parseInt(req.body.taille),
          poids: parseInt(req.body.poids) ,
          description: req.body.description,
          etat:req.body.etat
        };

        this.databaseService
          .insertAnimal(animal)
          .then((result: pg.QueryResult) => {
            console.log(result.rowCount)
            res.json(result.rowCount);
          })
          .catch((e: Error) => {
            console.error(e.stack);
            res.json(-1);
          });
      }
    );

    router.put(
      "/animals/update",
      (req: Request, res: Response, _: NextFunction) => {
        const animal: Animal = {
          noanimal : req.body.NoAnimal,
          noclinique: req.body.Noclinique,
          noproprietaire:req.body.NoProprietaire,
          nom : req.body.Nom,
          type : req.body.type,
          espece : req.body.espece,
          datedenaissance : req.body.DatedeNaissance,
          dateinscription       : req.body.DateInscription,
          taille : parseInt(req.body.taille),
          poids: parseInt(req.body.poids) ,
          description: req.body.description,
          etat:req.body.etat
        };

        this.databaseService
          .updateAnimal(animal)
          .then((result: pg.QueryResult) => {
            console.log(result.rowCount)
            res.json(result.rowCount);
          })
          .catch((e: Error) => {
            console.error(e.stack);
            res.json(-1);
          });
      }
    );
    router.get("/traitements/:noanimal", (req: Request, res: Response, _: NextFunction) => {

      const noanimal: string = req.params.noanimal;
      this.databaseService.getTraitementByAnimal(noanimal).then((result: pg.QueryResult) => {
        const traitements: Prescription[] = result.rows.map((traitement: any) => ({
          NoTraitement: traitement.notraitement,
          NoExamen: traitement.noexamen,
          dateDebut:traitement.datedebut ,
          dateFin: traitement.datefin,
          quantiteTraitement: traitement.quantitetraitement,
          dateExamen: traitement.dateexamen,
          NoAnimal: traitement.noanimal
        }));
        res.json(traitements);
     });
    });

    router.get("/animals/NoAnimal/noanimals/allNumeroanimal", (req: Request, res: Response, _: NextFunction) => {
      console.log("data contre")
      this.databaseService.getAnimalsPks()
        .then((resultat: pg.QueryResult) => {
          const animalpk: AnimalPk[] = resultat.rows.map((animal: any) => ({
            NoAnimal: animal.noanimal
          }));         
          res.json(animalpk);
        }).catch((e: Error) => {
          console.error(e.stack);
        });
    });

    router.get("/examen")

    router.get(
      "/tables/:tableName",
      (req: Request, res: Response, next: NextFunction) => {
        this.databaseService
          .getAllFromTable(req.params.tableName)
          .then((result: pg.QueryResult) => {
            res.json(result.rows);
          })
          .catch((e: Error) => {
            console.error(e.stack);
          });
      }
    );

    return router;
  }
}
