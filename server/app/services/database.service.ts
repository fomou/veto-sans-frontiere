import { injectable } from "inversify";
import * as pg from "pg";
import "reflect-metadata";
// import { Personnel } from "../../../common/tables/Personnel";
import { Animal } from '../../../common/tables/Animal';
import { Clinique } from "../../../common/tables/Clinique";
import { Personnel } from "../../../common/tables/Personnel";

@injectable()
export class DatabaseService {

  // TODO: A MODIFIER POUR VOTRE BD
  public connectionConfig: pg.ConnectionConfig = {
    user: "postgres",
    database: "vetosansfrontieresdatabase",
    password: "12345",
    port: 5432,
    host: "127.0.0.1",
    keepAlive: true
  };

  public pool: pg.Pool = new pg.Pool(this.connectionConfig);

  // ======= DEBUG =======
  public async getAllFromTable(tableName: string): Promise<pg.QueryResult> {

    const client = await this.pool.connect();
    const res = await client.query(`SELECT * FROM vetosansfrontieres.${tableName};`);

    client.release();
    return res;
  }

  // ======= Clinique =======
  public async createClinique(clinique: Clinique): Promise<pg.QueryResult> {
    const client = await this.pool.connect();

    if (!clinique.Noclinique || !clinique.adresse || !clinique.NumTelephone || !clinique.NumTelecopie) {
      throw new Error("Invalid create Clinique values");
    }

    const values: string[] = [clinique.Noclinique , clinique.adresse, clinique.NumTelephone, clinique.NumTelecopie];
    const queryText: string = `INSERT INTO vetosansfrontieres.clinique VALUES($1, $2, $3, $4);`;

    const res = await client.query(queryText, values);
    client.release();
    return res;
  }

  // get Cliniques that correspond to certain caracteristics
  public async filterCliniques(Noclinique: string, adresse: string, NumTelephone: string, numTelecopie: string): Promise<pg.QueryResult> {
    const client = await this.pool.connect();

    const searchTerms: string[] = [];
    if (Noclinique.length > 0) { searchTerms.push(`Noclinique = '${Noclinique}'`); }
    if (adresse.length > 0) { searchTerms.push(`adresse = '${adresse}'`); }
    if (NumTelephone.length > 0) { searchTerms.push(`NumTelephone = '${NumTelephone}'`); }
    if (numTelecopie.length > 0) { searchTerms.push(`NumTelecopie = '${numTelecopie}'`); }

    let queryText = "SELECT * FROM vetosansfrontieres.clinique";
    if (searchTerms.length > 0) { queryText += " WHERE " + searchTerms.join(" AND "); }
    queryText += ";";

    const res = await client.query(queryText);
    client.release();
    return res;
  }

  // get the Clinique names and numbers so so that the user can only select an existing Clinique
  public async getCliniqueNamesByNos(Noclinique: string): Promise<pg.QueryResult> {
    const client = await this.pool.connect();
    let query = `SELECT Noclinique FROM vetosansfrontieres.clinique `;
    query = Noclinique || Noclinique.length > 0 ? query + `WHERE Noclinique = '${Noclinique}'` : query;
    const res = await client.query(query);
    client.release();
    return res;
  }

  // modify name or city of a Clinique
  public async updateClinique(clinique: Clinique): Promise<pg.QueryResult> {
    const client = await this.pool.connect();

    const toUpdateValues = [];

    if (clinique.adresse.length > 0) { toUpdateValues.push(`adresse = '${clinique.adresse}'`); }
    if (clinique.NumTelephone.length > 0) { toUpdateValues.push(`NumTelephone = '${clinique.NumTelephone}'`); }
    if (clinique.NumTelecopie.length > 0) { toUpdateValues.push(`NumTelecopie = '${clinique.NumTelecopie}'`); }

    if (!clinique.Noclinique || clinique.adresse.length === 0 || clinique.NumTelephone.length === 0 || clinique.NumTelecopie.length === 0) {
      throw new Error("Invalid Clinique update query");
    }

    const query = `UPDATE vetosansfrontieres.Clinique SET ${toUpdateValues.join(", ")} WHERE Noclinique = '${clinique.Noclinique}';`;
    const res = await client.query(query);
    client.release();
    return res;
  }

  public async deleteClinique(CliniqueNb: string): Promise<pg.QueryResult> {
    // TO-DO

    const client = await this.pool.connect();

    const query = `DELETE FROM vetosansfrontieres.Clinique WHERE Noclinique='${CliniqueNb}'`;
    const res = await client.query(query);
    client.release();
    return res;
  }

  // ======= PersonnelS =======
  public async createPersonnel(personel: Personnel): Promise<pg.QueryResult> {
    const client = await this.pool.connect();

    if (!personel.NoPersonnel || !personel.Noclinique || !personel.fonction || !personel.DateNaissance) {
      throw new Error("Invalid create Personnel values");
    }

    const values: string[] = [
      personel.NoPersonnel ,
      personel.Noclinique ,
      personel.nom ,
      personel.adresse ,
      personel.NumTelephone ,
      personel.DateNaissance ,
      personel.sex       ,
      personel.NAS.toString(),
      personel.salaire.toString(),
      personel.fonction,
    ];
    const queryText: string = `INSERT INTO vetosansfrontieres.Personnel VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10);`;
    
    const res = await client.query(queryText, values);
    client.release();
    return res;
  }

  public async filterStaff(
    Noclinique: string
    ): Promise<pg.QueryResult> {
    const client = await this.pool.connect();

    let searchTerms: string = "";
    if (!Noclinique || Noclinique.length === 0) {    searchTerms = `WHERE Noclinique = '${Noclinique}'`; }

    const queryText = `SELECT * FROM vetosansfrontieres.Personnel ${searchTerms};`;
    const res = await client.query(queryText);
    client.release();
    return res;
  }

  public async getAllStaff(): Promise<pg.QueryResult> {
    const client = await this.pool.connect();
    const query = `SELECT * FROM vetosansfrontieres.Personnel ;`;

    const res = await client.query(query);
    client.release();
    return res;
  }


  public async updatePersonel(personel: Personnel): Promise<pg.QueryResult> {
    // tslint:disable:typedef
    const client = await this.pool.connect();

    const toUpdateValues = [];

    if (personel.fonction.length > 0) {
      toUpdateValues.push(`fonction = '${personel.fonction}'`);
    }

    if (personel.adresse.length >= 0) { toUpdateValues.push(`adresse = '${personel.adresse}'`); }
    if (personel.NumTelephone.length >= 0) { toUpdateValues.push(`NumTelephone = '${personel.NumTelephone}'`); }
    if (personel.NAS >= 0) { toUpdateValues.push(`NAS = ${personel.NAS}`); }
    if (personel.nom.length >= 0) { toUpdateValues.push(`nom = '${personel.nom}'`); }
    if (personel.sex.length >= 0) { toUpdateValues.push(`sex = '${personel.sex}'`); }
    if (personel.DateNaissance.length >= 0) { toUpdateValues.push(`DateNaissance = '${personel.DateNaissance}'`); }
    if (personel.salaire >= 0) { toUpdateValues.push(`salaire = '${personel.salaire}'`); }

    if (!personel.Noclinique ||
      personel.Noclinique.length === 0 ||
      !personel.NoPersonnel ||
      personel.NoPersonnel.length === 0 ||
      toUpdateValues.length === 0
    ) { throw new Error("Invalid Personnel update query"); }

    const query = `UPDATE vetosansfrontieres.Personnel SET ${toUpdateValues.join(
    ", "
    )} WHERE NoPersonnel = '${personel.NoPersonnel}' AND Noclinique = '${personel.Noclinique}';`;

    const res = await client.query(query);
    client.release();
    return res;
  }

  public async deletePersonnel(Noclinique: string, Nopersonel: string): Promise<pg.QueryResult> {
    if (Noclinique.length === 0) { throw new Error("Invalid Personnel delete query"); }
    const client = await this.pool.connect();

    const query = `DELETE FROM vetosansfrontieres.Personnel WHERE Noclinique = '${Noclinique}' AND Nopersonnel = '${Nopersonel}';`;
    const res = await client.query(query);
    client.release();
    return res;
  }

  public async getAllAnimals(): Promise<pg.QueryResult> {
    const client = await this.pool.connect();
    const query = `SELECT *  FROM vetosansfrontieres.Animal`;
    const resultat = await client.query(query);
    client.release();
    return resultat;
  }

  public async getAnimalByKeys(Noclinique: string, NoProprietaire: string): Promise<pg.QueryResult> {
    if (!Noclinique || Noclinique.length === 0) { throw new Error("Invalid Personnel delete query"); }
    if (!NoProprietaire || NoProprietaire.length === 0) { throw new Error("Invalid Personnel delete query"); }

    const client = await this.pool.connect();

    const query = `SELECT *  FROM vetosansfrontieres.Animal WHERE Noclinique = '${Noclinique}' AND NoProprietaire = '${NoProprietaire}';`;
    const res = await client.query(query);
    client.release();
    return res;
  }

  public async getAnimalsByName(nom: string): Promise<pg.QueryResult> {

    const client = await this.pool.connect();

    const query = `SELECT *  FROM vetosansfrontieres.Animal WHERE nom LIKE  upper('%${nom}%') or nom LIKE lower('%${nom}%');`;
    const res = await client.query(query);
    client.release();
    return res;
  }


  public async deleteAnimal(Noclinique: string, Noproprietaire: string,NoAnimal:string): Promise<pg.QueryResult>{
    if (!Noclinique || Noclinique.length === 0) { throw new Error("Invalid Personnel delete query"); }
    if (!Noproprietaire || Noproprietaire.length === 0) { throw new Error("Invalid Personnel delete query"); }

    const client = await this.pool.connect()
    const query= `DELETE FROM  vetosansfrontieres.Animal WHERE Noclinique = '${Noclinique}' AND NoProprietaire = '${Noproprietaire}' AND NoAnimal = '${NoAnimal}';`;
    const res = await client.query(query);
    client.release();

    return res;
  }


  public async getProprietairePks() :Promise<pg.QueryResult> {
    const client = await this.pool.connect()
    const query = `SELECT Noproprietaire FROM vetosansfrontieres.proprietaire`
    const res = await client.query(query)
    client.release()
    //console.log(res.rows)
    return res
  }

  public async insertAnimal(animal: Animal): Promise<pg.QueryResult>{
    const client = await this.pool.connect()
    
    if (!animal.noanimal || !animal.noproprietaire || !animal.noclinique) {
      throw new Error("Invalid Personnel delete query");
    }

    const values: string[] = [
      animal.noanimal,
      animal.noproprietaire,
      animal.noclinique,
      animal.nom,
      animal.type,
      animal.espece,
      animal.taille.toString(),
      animal.poids.toString(),
      animal.description,
      animal.datedenaissance,
      animal.dateinscription,
      animal.etat
    ]

    const queryText: string = `INSERT INTO vetosansfrontieres.Animal VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10,$11, $12);`;
    const res = await client.query(queryText, values);
    client.release()
    return res
  }

  public async updateAnimal(animal:Animal): Promise<pg.QueryResult>{
       // tslint:disable:typedef
       const client = await this.pool.connect();
       const toUpdateValues = [];
   

       if (animal.espece.length >= 0) { toUpdateValues.push(`espece = '${animal.espece}'`); }
       if (animal.dateinscription.length >= 0) { toUpdateValues.push(`DateInscription = '${animal.dateinscription}'`); }
       if (animal.dateinscription.length >= 0) { toUpdateValues.push(`DatedeNaissance = '${animal.datedenaissance}'`); }
       if (animal.nom.length >= 0) { toUpdateValues.push(`nom = '${animal.nom}'`); }
       if (animal.type.length >= 0) { toUpdateValues.push(`type = '${animal.type}'`); }
       if (animal.description.length >= 0) { toUpdateValues.push(`description = '${animal.description}'`); }
    if (animal.taille >= 0) { toUpdateValues.push(`taille = '${animal.taille}'`); };
    if (animal.poids >= 0) { toUpdateValues.push(`poids = '${animal.poids}'`); }
    if (animal.etat.length >= 0) { toUpdateValues.push(`etat = '${animal.etat}'`); }
   
       if (!animal.noclinique ||
        animal.noclinique.length === 0 ||!animal.noanimal||
         animal.noanimal.length === 0 ||
         toUpdateValues.length === 0
       ) { throw new Error("Invalid Personnel update query"); }
   
       const query = `UPDATE vetosansfrontieres.Animal SET ${toUpdateValues.join(
       ", "
       )} WHERE NoAnimal = '${animal.noanimal}' AND Noclinique = '${animal.noclinique}' AND Noproprietaire='${animal.noproprietaire}';`;
   
       const res = await client.query(query);
       client.release();
       return res;
  }


  public async getTraitementByAnimal(noanimal:string) : Promise<pg.QueryResult>{
    const client = await this.pool.connect();

    const query=`SELECT a.noanimal, e.noexamen, e.dateexamen, t.notraitement , p.datedebut, p.datefin,p.quantitetraitement
    from vetosansfrontieres.animal a, vetosansfrontieres.examen e, vetosansfrontieres.traitement t, vetosansfrontieres.prescription p
    where p.noexamen=e.noexamen and t.notraitement=p.notraitement and a.noanimal=e.noanimal AND e.noanimal='${noanimal}'; `
    const res = await client.query(query);
    client.release();
    return res;
  }

  public async getAnimalsPks():Promise<pg.QueryResult> {
    const client = await this.pool.connect()
    const query = "SELECT noanimal FROM vetosansfrontieres.animal ;"
    const res = await client.query(query)
    client.release()
   
    return res
  }

  public async getProprietaires(noanimal: string, noclinique: string): Promise<pg.QueryResult>{

    console.log("les parametres "+ noanimal +" "+noclinique)
    const client = await this.pool.connect();

    const query = `SELECT *  FROM vetosansfrontieres.proprietaire WHERE noproprietaire=(SELECT noproprietaire FROM vetosansfrontieres.animal WHERE noanimal = '${noanimal}' AND noclinique = '${noclinique}');`;

    const res = await client.query(query);
    client.release();
    return res;
  }


}
