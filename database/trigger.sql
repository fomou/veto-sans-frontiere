SET search_path = VetoSansFrontieres;

CREATE OR REPLACE FUNCTION Enregistrement() RETURNS TRIGGER AS $$
BEGIN
CREATE TABLE tableHistorique (
	NoPersonnel VARCHAR(20),
	NoTraitement VARCHAR(30),
	Descriptiontraitement VARCHAR(30),
	Cout integer ,
	NoExamen VARCHAR(30),
	Date DATE ,
	Heure TIME ,
	DescriptionExamen VARCHAR(20),
	QuantiteTraitement smallint ,
	DateDebut DATE ,
	DateFin DATE
);
	INSERT INTO tableHistorique SELECT Ex.NoPersonnel, T.*, Ex.NoExamen, Ex.Dateexamen, Ex.Heure, Ex.Description, p.QuantiteTraitement, p.DateDebut, p.DateFin
	FROM Traitement T JOIN Prescription p USING(NoTraitement) INNER JOIN Examen Ex USING(NoExamen) WHERE Ex.NoAnimal = OLD.NoAnimal;
	RETURN OLD;
END; $$ LANGUAGE plpgsql;

CREATE TRIGGER historique BEFORE DELETE ON Animal FOR EACH ROW EXECUTE FUNCTION Enregistrement();

DELETE FROM Animal WHERE nom = 'Charlie';

SELECT * FROM tableHistorique;




